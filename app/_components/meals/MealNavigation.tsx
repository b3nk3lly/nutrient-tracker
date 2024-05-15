"use client";

export default function MealNavigation(
	props: Readonly<{
		mealIds: number[];
	}>
) {
	return (
		<div className="flex justify-center w-full py-2 gap-2">
			{props.mealIds.map((id, index) => (
				<a key={id} href={`#meal${id}`} className="btn btn-xs">
					{index + 1}
				</a>
			))}
			<button className="btn btn-xs">+</button>
		</div>
	);
}
