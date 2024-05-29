import Papa from "papaparse";
import { NextRequest, NextResponse } from "next/server";
import Food from "../../types/food";
import Nutrient from "../../types/nutrient";
import NutrientAmount from "../../types/nutrientAmount";
import Meal from "../../types/meal";
import NutrientGroup from "../../types/nutrientGroup";
import fetchNutrients from "../../cnf/fetchNutrients";
import fetchNutrientAmounts from "../../cnf/fetchNutrientAmounts";

/**
 * Returns the amount of a given nutrient contained in a given quantity of food, according to
 * Canadian Nutrient File.
 * @param nutrient the nutrient for which to compute the amount
 * @param food the food for which to compute the nutrient amount
 * @param nutrientAmounts a list of all nutrient amounts for the specified food per 100g
 */
function computeNutrientValueForFood(
	nutrient: Nutrient,
	food: Food,
	nutrientAmounts: NutrientAmount[]
) {
	// get amount of nutrient in food
	const nutrientAmount = nutrientAmounts.find((amount) => amount.nutrientId === nutrient.id);

	if (!nutrientAmount) {
		return 0;
	}

	// get the selected serving, which contains the conversion factor we need
	const selectedServing = food.servings.find((serving) => serving.id === food.selectedServingId);

	if (!selectedServing) {
		throw Error(
			`No serving with ID ${food.selectedServingId} found for food ${food.description}`
		);
	}

	return nutrientAmount.value * selectedServing.conversionFactor * food.quantity;
}

function round(num: number, decimalPlaces: number) {
	return (
		Math.round((num + Number.EPSILON) * Math.pow(10, decimalPlaces)) /
		Math.pow(10, decimalPlaces)
	);
}

/**
 * Returns the name of a nutrient and its unit of measurement, if not already present in the name.
 * Examples:
 * - Energy (kCal)
 * - Lactose (g)
 * @param nutrient the nutrient whose name to format
 */
function formatNutrientName(nutrient: Nutrient) {
	const unitSuffix = `(${nutrient.unit})`;

	return nutrient.name.toLowerCase().includes(unitSuffix.toLowerCase())
		? nutrient.name
		: `${nutrient.name} ${unitSuffix}`;
}

/**
 * Returns the quantity of a food plus its unit of quantity.
 * Examples:
 * - 90 g
 * - 2 small box
 * @param food the food whose quantity to format
 */
function formatFoodQuantity(food: Food) {
	const selectedServing = food.servings.find((serving) => serving.id === food.selectedServingId);

	if (!selectedServing) {
		throw Error(
			`No serving with ID ${food.selectedServingId} found for food ${food.description}`
		);
	}

	return `${food.quantity} ${selectedServing.name}`;
}

/**
 * Generates data for the nutrient report.
 * @param meals the meals to be used for the report
 * @param nutrientGroups the nutrient groups to include in the report
 * @returns a 2D array containing the report data
 */
async function generateReportData(meals: Meal[], nutrientGroups: NutrientGroup[]) {
	const nutrientGroupIds = nutrientGroups.map((nutrientGroup) => nutrientGroup.id);
	const nutrients = (await fetchNutrients()).filter((nutrient) =>
		nutrientGroupIds.includes(nutrient.groupId)
	);

	const headers = [
		"Food",
		"Quantity",
		"CNF Food Code",
		...nutrients.map((nutrient) => formatNutrientName(nutrient))
	];

	const reportData = [headers];

	for (const meal of meals) {
		// row containing only the meal name
		reportData.push([meal.name, ...Array(headers.length - 1).fill("")]);

		for (const food of meal.foods) {
			const row = [food.description, formatFoodQuantity(food), String(food.code)];
			const nutrientAmounts = await fetchNutrientAmounts(food);

			for (const nutrient of nutrients) {
				const nutrientValue = computeNutrientValueForFood(nutrient, food, nutrientAmounts);
				row.push(String(round(nutrientValue, 4)));
			}

			reportData.push(row);
		}
	}

	return reportData;
}

export async function POST(request: NextRequest) {
	const body: { meals: Meal[]; nutrientGroups: NutrientGroup[] } = await request.json();
	const { meals, nutrientGroups } = body;

	const reportData = await generateReportData(meals, nutrientGroups);
	const csv = Papa.unparse(reportData);

	return new Response(csv, {
		headers: {
			"Content-Type": "text/csv",
			"Content-Disposition": "attachment; filename=data.csv"
		}
	});
}
