"use client";

import { useState } from "react";
import { useMealsContext } from "../../_store/MealsContextProvider";
import Meal from "../../types/meal";
import MealsSection from "../MealsSection";
import NutrientsSection from "../NutrientsSection";

interface MealsFormProps {
	onSubmit: (meals: Meal[], selectedNutrientIds: Set<number>) => void;
}

export default function MealsForm({ onSubmit }: Readonly<MealsFormProps>) {
	const { meals, selectedNutrientIds } = useMealsContext();
	const [pageIndex, setPageIndex] = useState(0);

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, newIndex: number) => {
		event.preventDefault();
		setPageIndex(newIndex);
	};

	const handleSubmit = () => {
		onSubmit(meals, selectedNutrientIds);
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
