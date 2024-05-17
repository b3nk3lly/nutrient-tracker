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

	return (
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
	);
}
