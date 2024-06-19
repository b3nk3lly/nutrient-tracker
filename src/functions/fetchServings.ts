import Serving from "../types/serving";

const quantityRegex = new RegExp(/^\d+(\/\d+)?/); // finds a whole number or a fraction denoted with '/'
const gramsServingRegex = new RegExp(/\d+g/); // finds a whole-number gram measurement (e.g., 90g)

const namesToIgnore = ["no serving sizes specified", "no serving specified"];

let nextServingId = 0; // incremented to assign serving IDs

/**
 * The structure of the response from Canadian Nutrient File
 */
interface CNFServing {
	conversion_factor_value: number;
	measure_name: string;
}

/**
 * Extracts the quantity of a serving from its name. If the quantity is a fraction, the quantity
 * is first computed and then returned.
 *
 * Examples:
 * - For a serving named `15ml`, this returns `15`
 * - For a serving named `"1/2 egg"`, this returns `0.5`
 * @param serving the server whose quantity to compute
 * @returns the serving's quantity as a number
 */
const computeQuantity = ({ measure_name }: CNFServing) => {
	// try to parse quantity from name
	const quantity = quantityRegex.exec(measure_name)?.at(0);

	if (!quantity) {
		throw new Error(`Could not extract quantity from serving: ${measure_name}`);
	}

	// assume quantity is a fraction and split it
	const [numerator, denominator] = quantity.split("/");

	return denominator
		? Number(numerator) / Number(denominator) // if it is a fraction, compute it
		: Number(numerator); // else return numerator
};

/**
 * Formats the name of a serving by removing the numeric quantity, any trailing 's',
 * and any trailing or leading whitespace.
 * @param serving the serving whose name to format
 * @returns the formatted name
 */
const formatName = ({ measure_name }: CNFServing) => {
	const newName = measure_name
		.replace(quantityRegex, "") // remove quantity
		.trim();

	// remove trailing 's', if it exists
	return newName.endsWith("s") ? newName.slice(0, -1) : newName;
};

/**
 * Formats a list of serving sizes by filtering out placeholders, formatting measure names,
 * computing conversion factors, and removing duplicates.
 * @param servings the list of servings to format
 * @returns the formatted list
 */
const formatServings = (servings: CNFServing[]): Serving[] => {
	const formattedServings = servings
		.filter(
			(serving) =>
				// filter out meaningless serving sizes
				!namesToIgnore.includes(serving.measure_name) &&
				// filter options that include a serving in grams
				// we add our own grams serving later
				!gramsServingRegex.test(serving.measure_name)
		)
		// create a new serving with computed conversion factor and formatted measure name
		.map((serving) => ({
			// calculate the conversion factor per single unit of the serving
			conversion_factor_value: serving.conversion_factor_value / computeQuantity(serving),
			// format the serving name
			measure_name: formatName(serving)
		}));

	// add a default serving size, grams
	// helps with foods that otherwise have no serving sizes, and good to have a consistent measurement
	formattedServings.push({ conversion_factor_value: 0.01, measure_name: "g" });

	// sort alphabetically
	formattedServings.sort((a, b) => a.measure_name.localeCompare(b.measure_name));

	return (
		// remove duplicates by measure_name
		formattedServings
			.filter(
				(serving, index, array) => serving.measure_name != array.at(index + 1)?.measure_name
			)
			.map((serving) => ({
				name: serving.measure_name,
				conversionFactor: serving.conversion_factor_value,
				id: nextServingId++
			}))
	);
};

export default async function fetchServings(foodCode: number): Promise<Serving[]> {
	const cnfResponse = await fetch(
		`https://food-nutrition.canada.ca/api/canadian-nutrient-file/servingsize?id=${foodCode}`
	);
	const servings: CNFServing[] = await cnfResponse.json();

	return formatServings(servings);
}
