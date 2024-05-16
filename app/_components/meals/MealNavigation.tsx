"use client";

export default function MealNavigation(
	props: Readonly<{
		mealIds: number[];
		onNewMeal: () => void;
	}>
) {
	return (
		<div className="flex flex-wrap justify-center w-full py-2 gap-2">
			{props.mealIds.map((id, index) => (
				<a key={id} href={`#meal${id}`} className="btn btn-circle btn-sm">
					{index + 1}
				</a>
			))}
			<input
				type="button"
				className="btn btn-circle btn-sm"
				value="+"
				onClick={() => props.onNewMeal()}
			/>
		</div>
	);
}
