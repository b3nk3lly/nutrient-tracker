"use client";

import { useEffect, useState } from "react";
import Meal from "../types/meal";
import NutrientGroup from "../types/nutrientGroup";
import Section from "./Section";
import Carousel from "./Carousel";
import MealCard from "./meals/MealCard";
import MealNavigation from "./meals/MealNavigation";

let mealCount = 0; // incremented to assign meal IDs

function downloadReport(csv: Blob) {
	const url = window.URL.createObjectURL(csv);
	const downloadLink = document.createElement("a");

	downloadLink.href = url;
	downloadLink.download = "report.csv";
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}

function createNewMeal() {
	return { id: mealCount, name: "Untitled meal", foods: [] };
}

export default function NutrientReporterForm() {
	const [meals, setMeals] = useState<Meal[]>([createNewMeal()]);
	const [nutrientGroups, setNutrientGroups] = useState<NutrientGroup[]>([]);

	useEffect(() => {
		const fetchNutrientGroups = async () => {
			const response = await fetch("/api/nutrient-groups");
			const json: NutrientGroup[] = await response.json();

			setNutrientGroups(json);
		};

		fetchNutrientGroups();
	}, []);

	const handleAddMeal = () => {
		mealCount++;
		setMeals((prevMeals) => [...prevMeals, createNewMeal()]);
	};

	const handleMealChange = <T extends keyof Meal>(
		mealId: number,
		property: T,
		value: Meal[T]
	) => {
		setMeals((prevMeals) =>
			prevMeals.map((meal) => (meal.id === mealId ? { ...meal, [property]: value } : meal))
		);
	};

	const handleDeleteMeal = (mealId: number) => {
		setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== mealId));
	};

	const handleFormSubmit = async (formData: FormData) => {
		// get selected nutrient groups
		const selectedNutrientGroupIds = formData.getAll("nutrientGroupId");
		const selectedNutrientGroups = nutrientGroups.filter((group) =>
			selectedNutrientGroupIds.includes(String(group.id))
		);

		// get CSV report from backend
		const response = await fetch("/api/report", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ meals: meals, nutrientGroups: selectedNutrientGroups })
		});

		const csv = await response.blob();
		downloadReport(csv);
	};

	return (
		<form className="w-full flex flex-col items-center space-y-8" action={handleFormSubmit}>
			<Section label="Meals:">
				<Carousel>
					{meals.map((meal) => (
						<MealCard
							key={meal.id}
							meal={meal}
							isOnlyMeal={meals.length === 1}
							onChange={(property, value) =>
								handleMealChange(meal.id, property, value)
							}
							onDelete={() => handleDeleteMeal(meal.id)}
						/>
					))}
				</Carousel>
				<MealNavigation meals={meals} onAddMeal={handleAddMeal} />
			</Section>

			<Section label="Nutrients:">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
					{nutrientGroups.map((nutrientGroup) => (
						<label
							key={nutrientGroup.id}
							className="label cursor-pointer justify-self-start"
						>
							<input
								type="checkbox"
								defaultChecked
								name="nutrientGroupId"
								className="checkbox checkbox-sm mr-2"
								value={nutrientGroup.id}
							/>
							<span className="label-text m-1">{nutrientGroup.name}</span>
						</label>
					))}
				</div>
			</Section>

			<button type="submit" className="btn btn-neutral">
				Generate Report
			</button>
		</form>
	);
}
