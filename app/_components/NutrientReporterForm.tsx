"use client";

import { useState } from "react";
import Meal from "../types/meal";
import MealCard from "./meals/MealCard";
import MealNavigation from "./meals/MealNavigation";

let mealCount = 0; // incremented to assign meal IDs

function createNewMeal() {
	return { id: mealCount, name: "Untitled meal " + mealCount, foods: [], isSelected: true };
}

export default function NutrientReporterForm() {
	const [meals, setMeals] = useState<Meal[]>([createNewMeal()]);
	const [selectedMealId, setSelectedMealId] = useState(0);

	const selectedMeal = meals.find((meal) => meal.id === selectedMealId) ?? meals[0];

	const handleAddMeal = () => {
		mealCount++;
		const newMeal = createNewMeal();
		setMeals((prevMeals) => [...prevMeals, newMeal]);
		setSelectedMealId(newMeal.id);
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

	/**
	 * Compute the next selected meal, assuming we are deleting the currently-selected meal.
	 * The next selected meal should be the one after this, unless this is the last one in the list,
	 * in which case the meal before this becomes selected.
	 * @returns the meal to be selected after the selected meal is deleted.
	 */
	const computeNextSelectedMeal = () => {
		for (let i = 0; i < meals.length; ++i) {
			if (meals[i].id === selectedMealId) {
				// if there are no more meals, the previous meal should be selected
				if (i === meals.length - 1) {
					return meals[i - 1];
				}

				// the next meal should be selected
				return meals[i + 1];
			}
		}

		throw new Error(
			`Could not find a meal other than the currently-selected one (ID ${selectedMealId})`
		);
	};

	const handleDeleteMeal = (mealId: number) => {
		const newSelectedMeal = computeNextSelectedMeal();

		setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== mealId));
		setSelectedMealId(newSelectedMeal.id);
	};

	return (
		<form className="w-full flex">
			<div className="w-1/3 bg-base-200">
				<MealNavigation
					meals={meals}
					selectedMealId={selectedMeal.id}
					onAddMeal={handleAddMeal}
					onSelectMeal={(mealId) => setSelectedMealId(mealId)}
				/>
			</div>
			<div className="w-2/3">
				<MealCard
					key={selectedMeal.id}
					meal={selectedMeal}
					isOnlyMeal={meals.length === 1}
					onChange={(property, value) =>
						handleMealChange(selectedMeal.id, property, value)
					}
					onDelete={() => handleDeleteMeal(selectedMeal.id)}
				/>
			</div>

			<button type="submit" className="btn btn-neutral fixed right-4 bottom-4">
				Generate Report
			</button>
		</form>
	);
}
