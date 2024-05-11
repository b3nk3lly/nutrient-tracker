"use client";

import { useState } from "react";
import MealCard from "./_components/MealCard";
import SearchBar from "./_components/SearchBar";
import Food from "./types/food";
import FoodItem from "./_components/FoodItem";
import Meal from "./types/meal";
import Serving from "./types/serving";
import MealNavigation from "./_components/MealNavigation";

export default function Home() {
	let mealCount = 0; // incremented to assign meal IDs
	let foodCount = 0; // incremented to assign food IDs

	const defaultMeal = { id: mealCount, name: "Untitled meal", foods: [] };

	const [meals, setMeals] = useState<Meal[]>([defaultMeal]);
	const [selectedMealId, setSelectedMealId] = useState(mealCount);
	const [foods, setFoods] = useState<Food[]>([]);

	const handleMealDelete = (id: number) => {
		setMeals(meals.filter((meal) => meal.id !== id));
	};

	const handleMealNameChange = (id: number, name: string) => {
		setMeals(meals.map((meal) => (meal.id === id ? { ...meal, name: name } : meal)));
	};

	const addFood = (id: number, food: Food) => {
		foodCount++;
		setFoods([...foods, { ...food, id: foodCount, mealId: id, quantity: 0 }]);
	};

	const handleQuantityChange = (id: number, quantity: number) => {
		console.log("Quantity set to ", quantity);
		setFoods(
			foods.map((food) => (food.food_code === id ? { ...food, quantity: quantity } : food))
		);
	};

	const handleServingChange = (id: number, serving: Serving) => {
		console.log("Serving set to ", serving);
		setFoods(
			foods.map((food) => (food.food_code === id ? { ...food, serving: serving } : food))
		);
	};

	return (
		<main className="flex min-h-screen flex-col items-center space-y-8 p-8">
			<div className="w-full md:w-3/4 lg:w-1/2">
				<h1 className="text-center">Nutrient Reporter</h1>
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
									handleQuantityChange(food.food_code, quantity)
								}
								onServingChange={(serving: Serving) =>
									handleServingChange(food.food_code, serving)
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
