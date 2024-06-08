"use client";

import { useState } from "react";
import Meal from "./types/meal";
import createNewMeal from "./_functions/createNewMeal";
import MealsSection from "./_components/MealsSection";

export default function Home() {
	const [page, setPage] = useState<"meals" | "nutrients">("meals");
	const [meals, setMeals] = useState<Meal[]>([createNewMeal()]);

	return (
		<main className="min-h-screen flex">
			<MealsSection
				meals={meals}
				setMeals={setMeals}
				onChangePage={() => setPage("nutrients")}
			/>
		</main>
	);
}
