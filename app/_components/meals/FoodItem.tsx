"use client";

import React, { useState } from "react";
import DeleteButton from "../DeleteButton";
import ServingSelection from "./ServingSelection";

const FoodItem = (props: { code: number; name: string; onDelete: () => void }) => {
	const [quantity, setQuantity] = useState(0);

	return (
		<div className="py-4 animate-flash">
			<div className="flex justify-between align-middle">
				<h2 className="font-bold">{props.name}</h2>
				<DeleteButton onClick={props.onDelete} />
			</div>
			<label className="w-full m-1">
				Quantity:
				<div className="join ml-3 w-3/4">
					<input
						className="input input-sm input-bordered rounded-l-none join-item w-1/2"
						type="number"
						value={quantity}
						onChange={(e) => setQuantity(Number(e.target.value))}
					/>
					<ServingSelection foodCode={props.code} />
				</div>
			</label>
		</div>
	);
};

export default FoodItem;
