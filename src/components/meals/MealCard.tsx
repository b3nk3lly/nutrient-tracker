"use client";

import Food from "../../types/food";
import SearchBar from "./SearchBar";
import FoodItem from "./FoodItem";
import Meal from "../../types/meal";
import { useMealsContext } from "../../store/MealsContextProvider";
import fetchServings from "../../functions/fetchServings";
import MealName from "./MealName";
import IconButton from "../IconButton";
import DeleteIcon from "../icons/DeleteIcon";

interface MealCardProps {
	meal: Meal;
	deletable: boolean;
}

let nextFoodId = 0; // incremented to assign food IDs

const MealCard = ({ meal, deletable }: MealCardProps) => {
	const { mealsDispatch } = useMealsContext();

	const handleChangeMealName = (mealId: number, newName: string) => {
		mealsDispatch({
			type: "UPDATE_MEAL",
			payload: { mealId: mealId, property: "name", value: newName }
		});
	};

	const handleDeleteMeal = (event: React.MouseEvent<HTMLButtonElement>, mealId: number) => {
		event.preventDefault();
		mealsDispatch({ type: "DELETE_MEAL", mealId });
	};

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
			<header className="flex justify-between border-b-2 border-base-200 pb-2">
				<MealName
					name={meal.name}
					onChange={(newName) => handleChangeMealName(meal.id, newName)}
				/>
				<IconButton
					tooltip="Remove Meal"
					onClick={(e) => handleDeleteMeal(e, meal.id)}
					disabled={!deletable}
				>
					<DeleteIcon />
				</IconButton>
			</header>
			<div className="m-4">
				<SearchBar onSelect={handleAddFood} />
			</div>

			<div className="mx-4 grow overflow-x-hidden overflow-y-auto">
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
