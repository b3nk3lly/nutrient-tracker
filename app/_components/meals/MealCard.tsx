"use client";

import { ReactNode } from "react";

const MealCard = (props: {
	name: string;
	onNameChange: (name: string) => void;
	onDelete: () => void;
	className?: string;
	searchBar: ReactNode;
	children?: ReactNode;
}) => {
	const handleInputChange = (event: { target: { value: string } }) => {
		const inputValue = event.target.value;
		props.onNameChange(inputValue);
	};

	return (
		<div className={`card card-compact border-2 rounded-lg border-base-200 ${props.className}`}>
			<div className="card-header border-b-2">
				<div className="card-title bg-base-200 h-12">
					<input
						type="text"
						value={props.name}
						className="input input-sm bg-base-200 border-none m-2"
						placeholder="Enter meal name"
						onChange={handleInputChange}
					/>
				</div>
				<div className="p-4">{props.searchBar}</div>
			</div>
			<div className="card-body rounded-b-lg bg-base-100 divide-y overflow-y-auto max-h-64">
				{props.children}
			</div>
		</div>
	);
};

export default MealCard;
