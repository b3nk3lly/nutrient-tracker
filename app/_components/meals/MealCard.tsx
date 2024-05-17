"use client";

import { useEffect, useRef, useState } from "react";
import DeleteButton from "../DeleteButton";
import Food from "../../types/food";
import SearchBar from "../search/SearchBar";
import FoodItem from "./FoodItem";

let foodCount = 0; // incremented to assign food IDs

const MealCard = (props: {
	id: number;
	name: string;
	isOnlyMeal: boolean;
	className?: string;
	onNameChange: (name: string) => void;
	onDelete: () => void;
}) => {
	const [foods, setFoods] = useState<Food[]>([]);

	const mealCardRef = useRef<HTMLDivElement>(null);

	/**
	 * Scrolls a meal into view the first time it's rendered
	 */
	useEffect(() => {
		mealCardRef.current?.scrollIntoView();
	}, []);

	const handleAddFood = (food: Food) => {
		// add new food to state
		// sort so that newest food appears first
		setFoods((oldFoods) =>
			[{ ...food, id: foodCount++ }, ...oldFoods].sort((a, b) => (a.id > b.id ? -1 : 1))
		);
	};

	const handleDeleteFood = (foodId: number) => {
		setFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodId));
	};

	return (
		<div
			id={`meal${props.id}`}
			className={`card card-compact border-2 rounded-lg border-base-200 ${props.className}`}
			ref={mealCardRef}
		>
			<div className="card-header border-b-2 border-base-200">
				<div className="card-title bg-base-200 h-12 flex justify-between p-4">
					<input
						type="text"
						value={props.name}
						className="input input-sm bg-base-200 border-none p-0"
						placeholder="Enter meal name"
						onChange={(e) => props.onNameChange(e.target.value)}
					/>
					<DeleteButton onClick={props.onDelete} disabled={props.isOnlyMeal} />
				</div>
				<div className="p-4">
					<SearchBar onSelect={(food: Food) => handleAddFood(food)} />
				</div>
			</div>
			<div className="card-body rounded-b-lg bg-base-100 divide-y overflow-y-auto h-64">
				{foods.length == 0 ? (
					<p className="w-full text-center text-neutral">
						Search for food to add it to this meal.
					</p>
				) : (
					foods.map((food) => (
						<FoodItem
							key={food.id}
							name={food.description}
							code={food.code}
							onDelete={() => handleDeleteFood(food.id)}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default MealCard;
