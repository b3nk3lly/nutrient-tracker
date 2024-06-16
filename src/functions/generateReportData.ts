import fetchNutrientAmounts from "./fetchNutrientAmounts";
import fetchNutrients from "./fetchNutrients";
import Food from "../types/food";
import Meal from "../types/meal";
import Nutrient from "../types/nutrient";
import NutrientAmount from "../types/nutrientAmount";
import ReportData from "../types/reportData";

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

/**
 * Generates data for the nutrient report.
 * @param meals the meals to be used for the report
 * @param nutrientGroups the nutrient groups to include in the report
 * @returns a 2D array containing the report data
 */
export default async function generateReportData(meals: Meal[], nutrientIds: number[]) {
	const nutrients = (await fetchNutrients()).filter((nutrient) =>
		nutrientIds.includes(nutrient.id)
	);
	const data: ReportData = {};

	for (const meal of meals) {
		for (const food of meal.foods) {
			data[food.id] = {};
			const nutrientAmounts = await fetchNutrientAmounts(food);

			for (const nutrient of nutrients) {
				const nutrientValue = computeNutrientValueForFood(nutrient, food, nutrientAmounts);
				data[food.id][nutrient.id] = nutrientValue;
			}
		}
	}

	return data;
}
