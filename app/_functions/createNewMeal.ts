import Meal from "../types/meal";

let mealCount = 0; // incremented to assign meal IDs

export default function createNewMeal(): Meal {
	return { id: mealCount++, name: `Untitled meal ${mealCount}`, foods: [] };
}
