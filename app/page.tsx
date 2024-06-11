"use client";

import { useEffect, useState } from "react";
import Meal from "./types/meal";
import createNewMeal from "./_functions/createNewMeal";
import MealsSection from "./_components/MealsSection";
import NutrientsSection from "./_components/NutrientsSection";
import Nutrient from "./types/nutrient";

export default function Home() {
	const [page, setPage] = useState<"meals" | "nutrients">("meals");
	const [meals, setMeals] = useState<Meal[]>([createNewMeal()]);
	const [nutrients, setNutrients] = useState<Nutrient[]>([]);
	const [selectedNutrientIds, setSelectedNutrientIds] = useState<Set<number>>(new Set());

	useEffect(() => {
		async function fetchNutrientGroups() {
			const response = await fetch("/api/nutrients");
			const json: Nutrient[] = await response.json();

			setNutrients(json);
		}

		fetchNutrientGroups();
	}, []);

	let displayedSection;

	switch (page) {
		case "meals":
			displayedSection = (
				<MealsSection
					meals={meals}
					setMeals={setMeals}
					onChangePage={() => setPage("nutrients")}
				/>
			);
			break;
		case "nutrients":
			displayedSection = (
				<NutrientsSection
					nutrients={nutrients}
					selectedNutrientIds={selectedNutrientIds}
					setSelectedNutrientIds={setSelectedNutrientIds}
					onChangePage={() => setPage("meals")}
				/>
			);
			break;
	}

	return <main className="min-h-screen flex">{displayedSection}</main>;
}
