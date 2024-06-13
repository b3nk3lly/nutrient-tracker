import Meal from "../types/meal";

interface UpdateMealPayload<T extends keyof Meal> {
	mealId: number;
	property: T;
	value: Meal[T];
}

export type MealsAction =
	| { type: "CREATE_MEAL"; meal: Meal }
	| { type: "UPDATE_MEAL"; payload: UpdateMealPayload<keyof Meal> }
	| { type: "DELETE_MEAL"; mealId: number };

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
	}
}
