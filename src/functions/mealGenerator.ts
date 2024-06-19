import Meal from "../types/meal";

function* mealGenerator(): Generator<Meal, Meal, Meal> {
	let nextMealId = 0;

	while (true) {
		yield { id: nextMealId, name: `Untitled meal ${nextMealId}`, foods: [] };
		nextMealId++;
	}
}

export default mealGenerator();
