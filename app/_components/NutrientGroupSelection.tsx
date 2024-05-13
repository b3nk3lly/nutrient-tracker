"use client";

import { useEffect, useState } from "react";
import SectionLabel from "./SectionLabel";
import NutrientGroup from "../types/nutrientGroup";

const NutrientGroupSelection = (props: {
	onSelect: (id: number) => void;
	onDeselect: (id: number) => void;
}) => {
	const [nutrientGroups, setNutrientGroups] = useState<NutrientGroup[]>([]);

	useEffect(() => {
		const fetchNutrientGroups = async () => {
			const response = await fetch("/api/nutrient-groups");
			const json: NutrientGroup[] = await response.json();
			setNutrientGroups(json);
		};

		fetchNutrientGroups();
	}, []);

	return (
		<div className="w-full">
			<SectionLabel>Nutrients:</SectionLabel>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{nutrientGroups.map((nutrientGroup) => (
					<label
						key={nutrientGroup.id}
						className="label cursor-pointer justify-self-start"
					>
						<input
							type="checkbox"
							className="checkbox checkbox-sm mr-2"
							checked={true}
							value={nutrientGroup.id}
						/>
						<span className="label-text m-1">{nutrientGroup.name}</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default NutrientGroupSelection;
