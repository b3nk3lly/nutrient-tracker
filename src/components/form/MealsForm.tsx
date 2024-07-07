"use client";

import { useState } from "react";
import { useMealsContext } from "../../store/MealsContextProvider";
import Meal from "../../types/meal";
import MealsSection from "../meals/MealsSection";
import NutrientsSection from "../NutrientsSection";
import Button from "../Button";

interface MealsFormProps {
	onSubmit: (meals: Meal[], nutrientIds: number[]) => void;
}

export default function MealsForm({ onSubmit }: Readonly<MealsFormProps>) {
	const { meals, selectedNutrientIds } = useMealsContext();
	const [pageIndex, setPageIndex] = useState(0);

	const handleSubmit = () => {
		onSubmit(meals, Array.from(selectedNutrientIds));
	};

	const mealsAreEmpty = !meals.some((meal) => meal.foods.length > 0);

	const pages = [
		<MealsSection
			key="meals"
			navigationButtons={[
				<Button onClick={() => setPageIndex(1)} disabled={mealsAreEmpty}>
					Nutrients &gt;
				</Button>
			]}
		/>,
		<NutrientsSection
			key="nutrients"
			navigationButtons={[
				<Button onClick={() => setPageIndex(0)}>&lt; Meals</Button>,
				<Button onClick={() => handleSubmit()} disabled={selectedNutrientIds.size === 0}>
					Generate Report
				</Button>
			]}
		/>
	];

	return pages[pageIndex];
}
