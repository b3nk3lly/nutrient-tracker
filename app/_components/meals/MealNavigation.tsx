"use client";

import Meal from "../../types/meal";

interface MealNavigationProps {
	meals: Meal[];
	selectedMealId: number;
	onAddMeal: () => void;
	onSelectMeal: (mealId: number) => void;
}

export default function MealNavigation({
	meals,
	selectedMealId,
	onAddMeal,
	onSelectMeal
}: Readonly<MealNavigationProps>) {
	const handleAddMeal = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		onAddMeal();
	};

	const handleSelectMeal = (event: React.MouseEvent<HTMLButtonElement>, mealId: number) => {
		event.preventDefault();
		onSelectMeal(mealId);
	};

	return (
		<aside className="flex flex-col items-center mx-1 my-4 space-y-4">
			<h2 className="text-xl font-bold text-center">Meals</h2>
			<button className="btn btn-sm btn-neutral" onClick={handleAddMeal}>
				+ Add Meal
			</button>
			<ul className="menu space-y-2 w-full">
				{meals.map((meal) => (
					<li key={meal.id}>
						<button
							className={`${meal.id === selectedMealId ? "bg-base-300" : ""}`}
							onClick={(e) => handleSelectMeal(e, meal.id)}
						>
							{meal.name}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
}
