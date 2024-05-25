"use client";

import React from "react";
import DeleteButton from "../DeleteButton";
import ServingSelection from "./ServingSelection";
import Food from "../../types/food";

interface FoodItemProps {
	food: Food;
	onChange: <T extends keyof Food>(property: T, value: Food[T]) => void;
	onDelete: () => void;
}

const FoodItem = ({ food, onChange, onDelete }: FoodItemProps) => {
	return (
		<div className="py-4 animate-flash">
			<div className="flex justify-between align-middle">
				<h2 className="font-bold">{food.description}</h2>
				<DeleteButton onClick={onDelete} />
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
