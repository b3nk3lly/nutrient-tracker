"use client";

import Meal from "../../types/meal";

export default function MealNavigation(
	props: Readonly<{
		meals: Meal[];
		onNewMeal: () => void;
	}>
) {
	return (
		<div className="flex flex-wrap justify-center w-full py-2 gap-2">
			{props.meals.map((meal, index) => (
				<div key={meal.id} className="tooltip tooltip-bottom" data-tip={meal.name}>
					<a href={`#meal${meal.id}`} className="btn btn-circle btn-sm">
						{index + 1}
					</a>
				</div>
			))}
			<div className="tooltip tooltip-bottom" data-tip="Add meal">
				<input
					type="button"
					className="btn btn-circle btn-sm"
					value="+"
					onClick={() => props.onNewMeal()}
				/>
			</div>
		</div>
	);
}
