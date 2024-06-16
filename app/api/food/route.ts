// /api/food

import { NextResponse, NextRequest } from "next/server";

const processedFoodData = new Map<string, CNFFood>();
const strippingRegex = new RegExp(/[^a-zA-Z0-9 ]/, "g"); // used for removing special characters

/**
 * The structure of the response from Canadian Nutrient File
 */
interface CNFFood {
	food_code: number;
	food_description: string;
}

let initialized = false;

/**
 * Formats a string so it can be used for searches. Specifically, this function emoves special characters
 * and sets letters to lowercase.
 * @param s the string to format
 * @returns the formatted string
 */
function formatString(s: string) {
	return s.replace(strippingRegex, "").toLowerCase();
}

/**
 * Returns true if a food item's key matches the search string.
 * A key matches if each word in the search string is contained in a word in the food key.
 * Order matters. If a word in the search matches word `i` in the key, then the next search word
 * will be tested against key words starting at `i + 1`.
 *
 * Examples:
 * - Searching `corn chips` matches `corn-based, extruded, chips`,
 *   but does NOT match `tortilla chips, plain, yellow corn`
 * @param foodKey the key for the food item
 * @param query the string used to search
 * @returns true if the food key matches the search string
 */
function matches(foodKey: string, query: string) {
	const queryWords = query.split(" ");
	const keyWords = foodKey.split(" ");
	let prevMatchPosition = 0; // we use this to only match keywords that come after the previous match

	for (let queryWord of queryWords) {
		let matchFound = false;

		for (let i = prevMatchPosition; i < keyWords.length; ++i) {
			if (keyWords[i].includes(queryWord)) {
				matchFound = true;
				prevMatchPosition = i;
				break;
			}
		}

		// no match if any search word does not match any key word
		if (!matchFound) {
			return false;
		}
	}

	return true;
}

/**
 * Fetches food data from CNF and stores it. Also stores stripped versions of the food descriptions,
 * which are used for searching.
 */
async function initFoodData() {
	const response = await fetch(
		"https://food-nutrition.canada.ca/api/canadian-nutrient-file/food"
	);
	const json: CNFFood[] = await response.json();

	json.forEach((food) => {
		processedFoodData.set(formatString(food.food_description), food);
	});

	initialized = true;
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	let query = request.nextUrl.searchParams.get("query");

	if (!initialized) {
		await initFoodData();
	}

	// check if any query was provided
	if (!query) {
		return NextResponse.json(
			{ message: "Missing required parameter 'query'." },
			{ status: 400 }
		);
	}

	query = formatString(query);

	// check if there is still a query after formatting it
	if (!query) {
		return NextResponse.json(
			{
				message: "Invalid query. Please remove special characters and try again."
			},
			{ status: 400 }
		);
	}

	const searchByFoodCode = !isNaN(Number(query));

	// match foods either by food code or with string search
	const matchingEntries = Array.from(processedFoodData.entries()).filter(([key, value]) =>
		searchByFoodCode ? value.food_code === Number(query) : matches(key, query)
	);

	return NextResponse.json(
		matchingEntries.map(([key, value]) => ({
			code: value.food_code,
			description: value.food_description
		})),
		{ status: 200 }
	);
}
