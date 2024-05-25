"use client";

import { useEffect, useRef } from "react";
import DeleteButton from "../DeleteButton";
import Food from "../../types/food";
import SearchBar from "../search/SearchBar";
import FoodItem from "./FoodItem";
import Meal from "../../types/meal";
import Serving from "../../types/serving";

interface MealCardProps {
	meal: Meal;
	isOnlyMeal: boolean;
	onChange: <T extends keyof Meal>(property: T, value: Meal[T]) => void;
	onDelete: () => void;
}

let foodCount = 0; // incremented to assign food IDs
let servingCount = 0; // incremented to assign serving IDs

const MealCard = ({ meal, isOnlyMeal, onChange, onDelete }: MealCardProps) => {
	const mealCardRef = useRef<HTMLDivElement>(null);

	/**
	 * Scrolls a meal into view the first time it's rendered.
	 */
	useEffect(() => {
		// avoid scrolling if the page just loaded
		if (!isOnlyMeal) {
			mealCardRef.current?.scrollIntoView();
		}
	}, [isOnlyMeal]);

	const handleAddFood = async (food: Food) => {
		// fetch serving sizes for food
		const response = await fetch(`/api/food/${food.code}/servings`);
		const servings: Serving[] = await response.json();

		// add IDs to servings
		servings.forEach((serving) => (serving.id = servingCount++));

		const newFood = {
			...food,
			id: foodCount++,
			servings: servings,
			selectedServingId: servings[0].id
		};

		// add new food to state
		// newest food appears first
		onChange("foods", [newFood, ...meal.foods]);
	};

	const handleFoodChange = <T extends keyof Food>(
		foodId: number,
		property: T,
		value: Food[T]
	) => {
		const newFoods = meal.foods.map((food) =>
			food.id === foodId ? { ...food, [property]: value } : food
		);

		onChange("foods", newFoods);
	};

	const handleDeleteFood = (foodId: number) => {
		const newFoods = meal.foods.filter((food) => food.id !== foodId);
		onChange("foods", newFoods);
	};

	return (
		<div
			id={`meal${meal.id}`}
			className="card card-compact border-2 rounded-lg border-base-200 w-full"
			ref={mealCardRef}
		>
			<div className="card-header border-b-2 border-base-200">
				<div className="card-title bg-base-200 h-12 flex justify-between p-4">
					<input
						type="text"
						value={meal.name}
						className="input input-sm bg-base-200 border-none p-0"
						placeholder="Enter meal name"
						onChange={(e) => onChange("name", e.target.value)}
					/>
					<DeleteButton onClick={onDelete} disabled={isOnlyMeal} />
				</div>
				<div className="p-4">
					<SearchBar onSelect={(food: Food) => handleAddFood(food)} />
				</div>
			</div>
			<div className="card-body rounded-b-lg bg-base-100 divide-y overflow-y-auto h-64">
				{meal.foods.length === 0 ? (
					<p className="w-full text-center text-neutral">
						Search for food to add it to this meal.
					</p>
				) : (
					meal.foods.map((food) => (
						<FoodItem
							key={food.id}
							food={food}
							onChange={(property, value) =>
								handleFoodChange(food.id, property, value)
							}
							onDelete={() => handleDeleteFood(food.id)}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default MealCard;
