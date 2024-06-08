"use client";

import Meal from "../../types/meal";
import DeleteButton from "../DeleteButton";

interface MealNavigationOptionProps {
	meal: Meal;
	selected?: boolean;
	deletable?: boolean;
	onSelect: (meal: Meal) => void;
	onDelete: () => void;
}

export default function MealNavigationOption({
	meal,
	selected,
	deletable,
	onSelect,
	onDelete
}: Readonly<MealNavigationOptionProps>) {
	const handleSelect = (selectedMeal: Meal) => {
		onSelect(selectedMeal);
	};

	return (
		<li key={meal.id} className="animate-fadeIn group">
			<button
				className={`group-hover:bg-base-300 ${selected ? "bg-base-300" : ""}`}
				onClick={() => handleSelect(meal)}
			>
				{meal.name}
			</button>

			{
				// delete button appears only if this option is hovered and the meal is deletable
				deletable && (
					<div className="hidden group-hover:block hover:bg-base-200 absolute right-1 top-1/2 -translate-y-1/2 p-0 rounded-full">
						<DeleteButton onClick={onDelete} disabled={!deletable} />
					</div>
				)
			}
		</li>
	);
}
