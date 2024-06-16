"use client";

import { useState } from "react";
import { useMealsContext } from "../../store/MealsContextProvider";
import Meal from "../../types/meal";
import MealsSection from "../MealsSection";
import NutrientsSection from "../NutrientsSection";

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

	const pages = [
		<MealsSection key="meals" onChangePage={(e) => handleChangePage(e, 1)} />,
		<NutrientsSection key="nutrients" onChangePage={(e) => handleChangePage(e, 0)} />
	];

	return (
		<form className="w-full flex" onSubmit={handleSubmit}>
			{pages[pageIndex]}
		</form>
	);
}
