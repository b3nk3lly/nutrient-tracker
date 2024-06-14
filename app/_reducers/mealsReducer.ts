import Food from "../types/food";
import Meal from "../types/meal";

interface UpdateMealPayload<T extends keyof Meal> {
	mealId: number;
	property: T;
	value: Meal[T];
}

interface UpdateFoodPayload<T extends keyof Food> {
	foodId: number;
	property: T;
	value: Food[T];
}

export type MealsAction =
	| { type: "CREATE_MEAL"; meal: Meal }
	| { type: "UPDATE_MEAL"; payload: UpdateMealPayload<keyof Meal> }
	| { type: "DELETE_MEAL"; mealId: number }
	| { type: "CREATE_FOOD"; mealId: number; food: Food }
	| { type: "UPDATE_FOOD"; mealId: number; payload: UpdateFoodPayload<keyof Food> }
	| { type: "DELETE_FOOD"; mealId: number; foodId: number };

export default function mealsReducer(meals: Meal[], action: MealsAction): Meal[] {
	switch (action.type) {
		case "CREATE_MEAL":
			return [...meals, action.meal];

		case "UPDATE_MEAL":
			return meals.map((meal) =>
				meal.id === action.payload.mealId
					? { ...meal, [action.payload.property]: action.payload.value }
					: meal
			);

		case "DELETE_MEAL":
			return meals.filter((meal) => meal.id !== action.mealId);

		case "CREATE_FOOD":
			return meals.map((meal) =>
				meal.id === action.mealId ? { ...meal, foods: [...meal.foods, action.food] } : meal
			);

		case "UPDATE_FOOD":
			return meals.map((meal) =>
				meal.id === action.mealId
					? {
							...meal,
							foods: meal.foods.map((food) =>
								food.id === action.payload.foodId
									? { ...food, [action.payload.property]: action.payload.value }
									: food
							)
					  }
					: meal
			);

		case "DELETE_FOOD":
			return meals.map((meal) =>
				meal.id === action.mealId
					? { ...meal, foods: meal.foods.filter((food) => food.id !== action.foodId) }
					: meal
			);
	}
}
