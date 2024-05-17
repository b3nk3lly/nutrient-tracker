"use client";

import { useEffect, useState } from "react";
import MealCard from "./meals/MealCard";
import Meal from "../types/meal";
import NutrientGroupSelection from "./nutrients/NutrientGroupSelection";
import Section from "./Section";
import NutrientGroup from "../types/nutrientGroup";
import NutrientGroupCheckbox from "./nutrients/NutrientGroupCheckbox";
import Carousel from "./Carousel";
import MealNavigation from "./meals/MealNavigation";

let mealCount = 0; // incremented to assign meal IDs

export default function NutrientReporterForm() {
	const [meals, setMeals] = useState<Meal[]>([{ id: mealCount, name: "Untitled meal" }]);
	const [selectedNutrientGroupIds, setSelectedNutrientGroupIds] = useState<number[]>([]);
	const [nutrientGroups, setNutrientGroups] = useState<NutrientGroup[]>([]);

	useEffect(() => {
		const fetchNutrientGroups = async () => {
			const response = await fetch("/api/nutrient-groups");
			const json: NutrientGroup[] = await response.json();

			// init state with all nutrient groups selected
			setNutrientGroups(json);
			setSelectedNutrientGroupIds(json.map((nutrientGroup) => nutrientGroup.id));
		};

		fetchNutrientGroups();
	}, []);

	const handleAddMeal = () => {
		setMeals((oldMeals) => [...oldMeals, { id: ++mealCount, name: "Untitled meal" }]);
	};

	const handleMealNameChange = (mealId: number, name: string) => {
		setMeals((prevMeals) =>
			prevMeals.map((meal) => (meal.id === mealId ? { ...meal, name: name } : meal))
		);
	};

	const handleNutrientGroupChange = (event: { target: { checked: boolean } }, id: number) => {
		setSelectedNutrientGroupIds((oldSelectedNutrientGroupIds) =>
			event.target.checked
				? [...oldSelectedNutrientGroupIds, id] // add nutrient group
				: // remove nutrient group
				  oldSelectedNutrientGroupIds.filter((nutrientGroupId) => nutrientGroupId !== id)
		);
	};

	const handleGenerateReport = async () => {
		//await fetch("/api/report", { method: "POST", body: JSON.stringify(reportData) });
	};

	return (
		<form className="w-full flex flex-col items-center space-y-8">
			<Section label="Meals:">
				<Carousel>
					{meals.map((meal) => (
						<MealCard
							key={meal.id}
							id={meal.id}
							className="w-full"
							onNameChange={(name) => handleMealNameChange(meal.id, name)}
						/>
					))}
				</Carousel>
				<MealNavigation mealIds={meals.map((meal) => meal.id)} onNewMeal={handleAddMeal} />
			</Section>
			<Section label="Nutrients:">
				<NutrientGroupSelection>
					{nutrientGroups.map((nutrientGroup) => (
						<NutrientGroupCheckbox
							key={nutrientGroup.id}
							nutrientGroupId={nutrientGroup.id}
							label={nutrientGroup.name}
							checked={selectedNutrientGroupIds.includes(nutrientGroup.id)}
							onChange={(event) => handleNutrientGroupChange(event, nutrientGroup.id)}
						/>
					))}
				</NutrientGroupSelection>
			</Section>
			<button className="btn btn-neutral" onClick={handleGenerateReport}>
				Generate Report
			</button>
		</form>
	);
}
