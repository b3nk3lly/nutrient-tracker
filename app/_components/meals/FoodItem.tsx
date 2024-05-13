"use client";

import React, { ReactNode } from "react";

const FoodItem = (props: {
	name: string;
	quantity: number;
	onQuantityChange: (quantity: number) => void;
	children?: ReactNode;
}) => {
	const handleQuantityChange = (event: { target: { value: string } }) => {
		const inputValue = Number(event.target.value);
		props.onQuantityChange(inputValue);
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
					{props.children}
				</div>
			</label>
		</div>
	);
};

export default FoodItem;
