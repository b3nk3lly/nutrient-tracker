"use client";

const NutrientGroupSelection = (props: { children: React.ReactNode }) => {
	return (
		<div className="w-full">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{props.children}
			</div>
		</div>
	);
};

export default NutrientGroupSelection;
