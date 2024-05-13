"use client";

export default function MealNavigation(
	props: Readonly<{
		selectedMealId: number;
		mealCount: number;
		onClick: (mealId: number) => void;
	}>
) {
	return (
		<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
			<button
				className="btn btn-circle"
				onClick={() => props.onClick(props.selectedMealId - 1)}
				style={{ visibility: props.selectedMealId - 1 >= 0 ? "visible" : "hidden" }}
			>
				❮
			</button>
			<button
				className="btn btn-circle"
				onClick={() => props.onClick(props.selectedMealId + 1)}
				style={{
					visibility: props.selectedMealId + 1 < props.mealCount ? "visible" : "hidden"
				}}
			>
				❯
			</button>
		</div>
	);
}
