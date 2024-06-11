"use client";

import React from "react";
import ServingSelection from "./ServingSelection";
import Food from "../../types/food";
import IconButton from "../IconButton";
import DeleteIcon from "../DeleteIcon";

interface FoodItemProps {
	food: Food;
	onChange: <T extends keyof Food>(property: T, value: Food[T]) => void;
	onDelete: () => void;
}

const FoodItem = ({ food, onChange, onDelete }: FoodItemProps) => {
	return (
		<div className="p-4 animate-flash">
			<div className="flex justify-between align-middle">
				<p className="font-semibold">{food.description}</p>
				<IconButton onClick={onDelete}>
					<DeleteIcon />
				</IconButton>
			</div>
			<label className="w-full m-1">
				Quantity:
				<div className="join ml-3 w-3/4">
					<input
						className="input input-sm input-bordered rounded-l-none join-item w-1/2"
						type="number"
						value={food.quantity}
						onChange={(e) => onChange("quantity", Number(e.target.value))}
					/>
					<ServingSelection
						servings={food.servings}
						onChange={(servingId) => onChange("selectedServingId", servingId)}
					/>
				</div>
			</label>
		</div>
	);
};

export default FoodItem;
