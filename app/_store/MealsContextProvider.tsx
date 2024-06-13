"use client";

import { Context, Dispatch, createContext, useReducer } from "react";
import Meal from "../types/meal";
import createNewMeal from "../_functions/createNewMeal";
import mealsReducer, { MealsAction } from "../_reducers/mealsReducer";

interface IMealsContext {
	meals: Meal[];
	dispatch: Dispatch<MealsAction>;
}

interface MealsContextProviderProps {
	children: React.ReactNode;
}

export const MealsContext: Context<IMealsContext> = createContext<IMealsContext>({
	meals: [],
	dispatch: () => {}
});

export default function MealsContextProvider({ children }: Readonly<MealsContextProviderProps>) {
	const [meals, dispatch] = useReducer(mealsReducer, [createNewMeal()]);

	return <MealsContext.Provider value={{ meals, dispatch }}>{children}</MealsContext.Provider>;
}
