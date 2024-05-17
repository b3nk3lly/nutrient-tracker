"use client";

import { useEffect, useRef, useState } from "react";
import DeleteButton from "../DeleteButton";
import Food from "../../types/food";
import SearchBar from "../search/SearchBar";
import FoodItem from "./FoodItem";

const MealCard = (props: {
	id: number;
	className?: string;
	onNameChange: (name: string) => void;
}) => {
	const [name, setName] = useState("");
	const [foods, setFoods] = useState<Food[]>([]);

	const mealCardRef = useRef<HTMLDivElement>(null);

	/**
	 * Scrolls a meal into view the first time it's rendered
	 */
	useEffect(() => {
		mealCardRef.current?.scrollIntoView();
	}, []);

	const addFood = async (food: Food) => {
		// TODO set food ID

		// add new food to state
		// sort so that newest food appears first
		setFoods((oldFoods) => [food, ...oldFoods].sort((a, b) => (a.id > b.id ? -1 : 1)));
	};

	return (
		<div
			id={`meal${props.id}`}
			className={`card card-compact border-2 rounded-lg border-base-200 ${props.className}`}
			ref={mealCardRef}
		>
			<div className="card-header border-b-2">
				<div className="card-title bg-base-200 h-12 flex justify-between p-4">
					<input
						type="text"
						value={name}
						className="input input-sm bg-base-200 border-none p-0"
						placeholder="Enter meal name"
						onChange={(e) => props.onNameChange(e.target.value)}
					/>
					<DeleteButton />
				</div>
				<div className="p-4">
					<SearchBar onSelect={(food: Food) => addFood(food)} />
				</div>
			</div>
			<div className="card-body rounded-b-lg bg-base-100 divide-y overflow-y-auto max-h-64">
				{foods.length == 0 ? (
					<p className="w-full text-center text-neutral">
						Search for food to add it to this meal.
					</p>
				) : (
					foods.map((food) => (
						<FoodItem key={food.id} name={food.description} code={food.code} />
					))
				)}
			</div>
		</div>
	);
};

export default MealCard;
