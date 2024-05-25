"use client";

import { useState } from "react";
import Carousel from "../Carousel";
import Section from "../Section";
import MealCard from "./MealCard";
import MealNavigation from "./MealNavigation";
import Meal from "../../types/meal";

let mealCount = 0; // incremented to assign meal IDs

function createNewMeal() {
	return { id: mealCount, name: "Untitled meal", foods: [] };
}

export default function MealsSection() {
	const [meals, setMeals] = useState<Meal[]>([createNewMeal()]);

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
		console.log(meals);
	};

	const handleDeleteMeal = (mealId: number) => {
		setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== mealId));
	};

	return (
		<Section label="Meals:">
			<Carousel>
				{meals.map((meal) => (
					<MealCard
						key={meal.id}
						meal={meal}
						isOnlyMeal={meals.length === 1}
						onChange={(property, value) => handleMealChange(meal.id, property, value)}
						onDelete={() => handleDeleteMeal(meal.id)}
					/>
				))}
			</Carousel>
			<MealNavigation meals={meals} onAddMeal={handleAddMeal} />
		</Section>
	);
}
