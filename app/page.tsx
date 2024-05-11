"use client";

import { useState } from "react";
import MealCard from "./_components/MealCard";
import SearchBar from "./_components/SearchBar";
import Food from "./types/food";
import FoodItem from "./_components/FoodItem";
import Meal from "./types/meal";
import Serving from "./types/serving";
import MealNavigation from "./_components/MealNavigation";

let mealCount = 0; // incremented to assign meal IDs
let foodCount = 0; // incremented to assign food IDs

export default function Home() {
	const [meals, setMeals] = useState<Meal[]>([{ id: mealCount, name: "Untitled meal" }]);
	const [selectedMealId, setSelectedMealId] = useState(mealCount);
	const [foods, setFoods] = useState<Food[]>([]);

	const handleMealDelete = (id: number) => {
		setMeals(meals.filter((meal) => meal.id !== id));
	};

	const handleMealNameChange = (id: number, name: string) => {
		setMeals(meals.map((meal) => (meal.id === id ? { ...meal, name: name } : meal)));
	};

	const addFood = (id: number, food: Food) => {
		const newFood = { ...food, id: ++foodCount, mealId: id, quantity: 0 };

		// sort so that newest food appears first
		const sortedFoods = [newFood, ...foods].sort((a, b) => (a.id > b.id ? -1 : 1));
		setFoods(sortedFoods);
	};

	const handleQuantityChange = (id: number, quantity: number) => {
		setFoods(foods.map((food) => (food.id === id ? { ...food, quantity: quantity } : food)));
	};

	const handleServingChange = (id: number, serving: Serving) => {
		setFoods(foods.map((food) => (food.id === id ? { ...food, serving: serving } : food)));
	};

	return (
		<main className="min-h-screen flex flex-col items-center">
			<div className="flex flex-col items-center space-y-8 p-8 w-full md:w-3/4 lg:w-1/2">
				<h1>Nutrient Reporter</h1>
				<SearchBar onSelect={(food: Food) => addFood(selectedMealId, food)} />
				<MealCard
					name={meals.find((meal) => meal.id === selectedMealId)?.name ?? ""}
					onNameChange={(name: string) => handleMealNameChange(selectedMealId, name)}
					onDelete={() => handleMealDelete(selectedMealId)}
				>
					{foods
						.filter((food) => food.mealId == selectedMealId)
						.map((food) => (
							<FoodItem
								key={food.id}
								foodCode={food.food_code}
								name={food.food_description}
								quantity={food.quantity}
								onQuantityChange={(quantity: number) =>
									handleQuantityChange(food.id, quantity)
								}
								onServingChange={(serving: Serving) =>
									handleServingChange(food.id, serving)
								}
							/>
						))}
				</MealCard>
				<MealNavigation
					selectedMealId={selectedMealId}
					mealCount={mealCount}
					onClick={setSelectedMealId}
				/>
			</div>
		</main>
	);
}
