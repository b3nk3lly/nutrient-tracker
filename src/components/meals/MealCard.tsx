"use client";

import Food from "../../types/food";
import SearchBar from "./SearchBar";
import FoodItem from "./FoodItem";
import Meal from "../../types/meal";
import { useMealsContext } from "../../store/MealsContextProvider";
import fetchServings from "../../functions/fetchServings";

interface MealCardProps {
	meal: Meal;
}

let nextFoodId = 0; // incremented to assign food IDs

const MealCard = ({ meal }: MealCardProps) => {
	const { mealsDispatch } = useMealsContext();

	const handleAddFood = async (food: Food) => {
		// fetch serving sizes for food
		const servings = await fetchServings(food.code);

		const newFood: Food = {
			...food,
			id: nextFoodId++,
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
		<>
			<div className="m-4">
				<SearchBar onSelect={(food: Food) => handleAddFood(food)} />
			</div>

			<div className="grow overflow-x-hidden overflow-y-auto">
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
			</div>
		</>
	);
};

export default MealCard;
