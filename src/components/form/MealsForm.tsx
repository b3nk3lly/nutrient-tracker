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

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, newIndex: number) => {
		event.preventDefault();
		setPageIndex(newIndex);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit(meals, Array.from(selectedNutrientIds));
	};

	const mealsAreEmpty = !meals.some((meal) => meal.foods.length > 0);

	const pages = [
		<MealsSection
			key="meals"
			navigationButtons={[
				<Button onClick={(e) => handleChangePage(e, 1)} disabled={mealsAreEmpty}>
					Nutrients &gt;
				</Button>
			]}
		/>,
		<NutrientsSection
			key="nutrients"
			navigationButtons={[
				<Button onClick={(e) => handleChangePage(e, 0)}>&lt; Meals</Button>
			]}
		/>
	];

	return (
		<form className="w-full flex" onSubmit={handleSubmit}>
			{pages[pageIndex]}
		</form>
	);
}
