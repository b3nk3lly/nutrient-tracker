"use client";

interface MealNavigationProps {
	onAddMeal: () => void;
	children: React.ReactNode;
}

export default function MealNavigation({ onAddMeal, children }: Readonly<MealNavigationProps>) {
	const handleAddMeal = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		onAddMeal();
	};

	return (
		<aside className="flex flex-col items-center mx-1 my-4 space-y-4">
			<h2 className="text-xl font-bold text-center">Meals</h2>
			<button className="btn btn-sm btn-neutral" onClick={handleAddMeal}>
				+ Add Meal
			</button>
			<ul className="menu space-y-2 w-full">{children}</ul>
		</aside>
	);
}
