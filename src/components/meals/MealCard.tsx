"use client";

import Food from "../../types/food";
import SearchBar from "../search/SearchBar";
import FoodItem from "./FoodItem";
import Meal from "../../types/meal";
import Serving from "../../types/serving";
import { useMealsContext } from "../../store/MealsContextProvider";
import fetchServings from "../../functions/fetchServings";

interface MealCardProps {
	meal: Meal;
}

let foodCount = 0; // incremented to assign food IDs
let servingCount = 0; // incremented to assign serving IDs

const MealCard = ({ meal }: MealCardProps) => {
	const { mealsDispatch } = useMealsContext();

	const handleAddFood = async (food: Food) => {
		// fetch serving sizes for food
		const servings = await fetchServings(food.code);

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
		mealsDispatch({
			type: "CREATE_FOOD",
			mealId: meal.id,
			food: newFood
		});
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
						<FoodItem key={food.id} mealId={meal.id} food={food} />
					))}
				</ul>
			)}
		</section>
	);
};

export default MealCard;
