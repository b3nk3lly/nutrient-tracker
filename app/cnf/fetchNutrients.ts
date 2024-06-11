import Nutrient from "../types/nutrient";

/**
 * The structure of the nutrient response from Canadian Nutrient File
 */
interface CNFNutrient {
	nutrient_name_id: number;
	unit: string;
	nutrient_web_order: number;
	nutrient_name: string;
	nutrient_web_name: string;
	nutrient_group_id: number;
}

/**
 * Fetches all nutrients from Canadian Nutrient File.
 */
export default async function fetchNutrients(): Promise<Nutrient[]> {
	// fetch all nutrients from CNF
	const response = await fetch(
		`https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientname`
	);
	const json: CNFNutrient[] = await response.json();

	return json.map((nutrient) => ({
		id: nutrient.nutrient_name_id,
		groupId: nutrient.nutrient_group_id,
		name: nutrient.nutrient_name,
		webName: nutrient.nutrient_web_name,
		unit: nutrient.unit,
		order: nutrient.nutrient_web_order
	}));
}
