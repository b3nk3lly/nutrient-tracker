import Food from "../types/food";
import NutrientAmount from "../types/nutrientAmount";

/**
 * The structure of the nutrient amount response from Canadian Nutrient File
 */
interface CNFNutrientAmount {
	nutrient_name_id: number;
	food_code: number;
	nutrient_value: number;
}

/**
 * Fetches the amount of each nutrient that exists in the given food. Nutrient values are
 * specified in parts per 100g (see https://produits-sante.canada.ca/api/documentation/cnf-documentation-en.html#a6)
 * @param food the food for which to find nutrient amounts
 */
export default async function fetchNutrientAmounts(food: Food): Promise<NutrientAmount[]> {
	const response = await fetch(
		`https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?id=${food.code}`
	);
	const json: CNFNutrientAmount[] = await response.json();

	return json.map((nutrientAmount) => ({
		nutrientId: nutrientAmount.nutrient_name_id,
		foodCode: nutrientAmount.food_code,
		value: nutrientAmount.nutrient_value
	}));
}
