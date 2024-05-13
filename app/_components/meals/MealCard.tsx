"use client";

import { ReactNode } from "react";

const MealCard = (props: {
	name: string;
	onNameChange: (name: string) => void;
	onDelete: () => void;
	children?: ReactNode;
}) => {
	const handleInputChange = (event: { target: { value: string } }) => {
		const inputValue = event.target.value;
		props.onNameChange(inputValue);
	};

	return (
		<div className="card card-compact border-2 rounded-lg border-base-200 z-1">
			<div className="card-header bg-base-200 h-12 place-content-center">
				<div className="card-title">
					<input
						type="text"
						value={props.name}
						className="input input-sm bg-base-200 border-none m-2"
						placeholder="Enter meal name"
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className="card-body rounded-b-lg bg-base-100 divide-y overflow-y-auto max-h-64">
				{props.children}
			</div>
		</div>
	);
};

export default MealCard;
