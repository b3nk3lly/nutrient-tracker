"use client";

import { useState } from "react";
import Carousel from "../Carousel";
import Section from "../Section";
import MealCard from "./MealCard";
import MealNavigation from "./MealNavigation";
import Meal from "../../types/meal";

let mealCount = 0; // incremented to assign meal IDs

export default function MealsSection() {
	const [meals, setMeals] = useState<Meal[]>([{ id: mealCount, name: "Untitled meal" }]);

	const handleAddMeal = () => {
		setMeals((oldMeals) => [...oldMeals, { id: ++mealCount, name: "Untitled meal" }]);
	};

	const handleMealNameChange = (mealId: number, name: string) => {
		setMeals((prevMeals) =>
			prevMeals.map((meal) => (meal.id === mealId ? { ...meal, name: name } : meal))
		);
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
						id={meal.id}
						name={meal.name}
						isOnlyMeal={meals.length === 1}
						className="w-full"
						onNameChange={(name) => handleMealNameChange(meal.id, name)}
						onDelete={() => handleDeleteMeal(meal.id)}
					/>
				))}
			</Carousel>
			<MealNavigation meals={meals} onNewMeal={handleAddMeal} />
		</Section>
	);
}
