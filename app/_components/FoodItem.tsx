"use client";

import React, { useEffect, useState } from "react";
import Serving from "../types/serving";

const FoodItem = (props: {
	foodCode: number;
	name: string;
	quantity: number;
	onQuantityChange: (quantity: number) => void;
	onServingChange: (serving: Serving) => void;
}) => {
	const [servings, setServings] = useState<Serving[]>([]);

	// fetch servings from backend on render
	useEffect(() => {
		const fetchServings = async () => {
			const response = await fetch(`/api/food/${props.foodCode}/servings`);
			const json: Serving[] = await response.json();

			setServings(json);
		};

		fetchServings();
	}, [props.foodCode]);

	const handleQuantityChange = (event: { target: { value: string } }) => {
		const inputValue = Number(event.target.value);
		props.onQuantityChange(inputValue);
	};

	const handleServingChange = (event: { target: { value: string } }) => {
		const selectValue = Number(event.target.value);
		const selectedServing = servings[selectValue];
		props.onServingChange(selectedServing);
	};

	return (
		<div className="py-4 animate-flash">
			<h2 className="m-1 font-bold">{props.name}</h2>
			<label className="w-full m-1">
				Quantity:
				<div className="join ml-3 w-3/4">
					<input
						className="input input-sm input-bordered rounded-l-none join-item w-1/2"
						type="number"
						value={props.quantity}
						onChange={handleQuantityChange}
					/>
					<select
						className="select select-sm select-bordered join-item w-1/2"
						onChange={handleServingChange}
					>
						{servings.map((serving, index) => (
							<option key={index} value={index}>
								{serving.measure_name}
							</option>
						))}
					</select>
				</div>
			</label>
		</div>
	);
};

export default FoodItem;
