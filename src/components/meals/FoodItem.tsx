"use client";

import ServingSelection from "./ServingSelection";
import Food from "../../types/food";
import IconButton from "../IconButton";
import { useMealsContext } from "../../store/MealsContextProvider";
import { Delete } from "../Icons";

interface FoodItemProps {
	food: Food;
	mealId: number;
}

const FoodItem = ({ food, mealId }: FoodItemProps) => {
	const { mealsDispatch } = useMealsContext();

	const handleUpdateFood = <T extends keyof Food>(property: T, value: Food[T]) => {
		mealsDispatch({
			type: "UPDATE_FOOD",
			mealId,
			payload: {
				foodId: food.id,
				property,
				value
			}
		});
	};

	const handleDeleteFood = () => {
		mealsDispatch({ type: "DELETE_FOOD", mealId, foodId: food.id });
	};

	return (
		<div className="p-4 animate-flash">
			<div className="flex justify-between align-middle">
				<p className="font-semibold text-neutral">{food.description}</p>
				<IconButton tooltip="Remove Food" onClick={() => handleDeleteFood()}>
					<Delete />
				</IconButton>
			</div>
			<label className="w-full m-1 text-neutral">
				Quantity:
				<div className="join ml-3 w-3/4">
					<input
						className="input input-sm input-bordered rounded-l-none join-item w-1/2"
						type="number"
						value={food.quantity}
						onChange={(e) => handleUpdateFood("quantity", Number(e.target.value))}
					/>
					<ServingSelection
						servings={food.servings}
						onChange={(servingId) => handleUpdateFood("selectedServingId", servingId)}
					/>
				</div>
			</label>
		</div>
	);
};

export default FoodItem;
