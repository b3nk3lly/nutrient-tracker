"use client";

import { Context, Dispatch, createContext, useContext, useReducer } from "react";
import Meal from "../types/meal";
import createNewMeal from "../_functions/createNewMeal";
import mealsReducer, { MealsAction } from "../_reducers/mealsReducer";
import nutrientsReducer, { NutrientsAction } from "../_reducers/nutrientsReducer";

interface IMealsContext {
	meals: Meal[];
	mealsDispatch: Dispatch<MealsAction>;
	selectedNutrientIds: Set<number>;
	nutrientsDispatch: Dispatch<NutrientsAction>;
}

interface MealsContextProviderProps {
	children: React.ReactNode;
}

export const MealsContext: Context<IMealsContext> = createContext<IMealsContext>({
	meals: [],
	mealsDispatch: () => {},
	selectedNutrientIds: new Set<number>(),
	nutrientsDispatch: () => {}
});

export default function MealsContextProvider({ children }: Readonly<MealsContextProviderProps>) {
	const [meals, mealsDispatch] = useReducer(mealsReducer, [createNewMeal()]);
	const [selectedNutrientIds, nutrientsDispatch] = useReducer(
		nutrientsReducer,
		new Set<number>()
	);

	return (
		<MealsContext.Provider
			value={{ meals, mealsDispatch, selectedNutrientIds, nutrientsDispatch }}
		>
			{children}
		</MealsContext.Provider>
	);
}

export function useMealsContext() {
	const context = useContext(MealsContext);

	if (!context) {
		throw new Error(
			"useMealsContext must only be used in components wrapped by MealsContextProvider !"
		);
	}

	return context;
}
