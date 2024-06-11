"use client";

import Food from "../../types/food";
import SearchBar from "../search/SearchBar";
import FoodItem from "./FoodItem";
import Meal from "../../types/meal";
import Serving from "../../types/serving";

interface MealCardProps {
	meal: Meal;
	onChange: <T extends keyof Meal>(property: T, value: Meal[T]) => void;
}

let foodCount = 0; // incremented to assign food IDs
let servingCount = 0; // incremented to assign serving IDs

const MealCard = ({ meal, onChange }: MealCardProps) => {
	const handleAddFood = async (food: Food) => {
		// fetch serving sizes for food
		const response = await fetch(`/api/food/${food.code}/servings`);
		const servings: Serving[] = await response.json();

		// add IDs to servings
		servings.forEach((serving) => (serving.id = servingCount++));

		const newFood: Food = {
			...food,
			id: foodCount++,
			quantity: 0,
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
		<section className="animate-fadeIn">
			<div className="m-4">
				<SearchBar onSelect={(food: Food) => handleAddFood(food)} />
			</div>

			{meal.foods.length === 0 ? (
				<p className="m-4 text-center text-neutral">
					Search for food to add it to this meal.
				</p>
			) : (
				<ul className="space-y-1 divide-y divide-base-200">
					{meal.foods.map((food) => (
						<FoodItem
							key={food.id}
							food={food}
							onChange={(property, value) =>
								handleFoodChange(food.id, property, value)
							}
							onDelete={() => handleDeleteFood(food.id)}
						/>
					))}
				</ul>
			)}
		</section>
	);
};

export default MealCard;
