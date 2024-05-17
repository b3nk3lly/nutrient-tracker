"use client";

import { useEffect, useState } from "react";
import NutrientGroup from "../../types/nutrientGroup";
import Section from "../Section";
import NutrientGroupCheckbox from "./NutrientGroupCheckbox";

export default function NutrientGroupSection() {
	const [selectedNutrientGroupIds, setSelectedNutrientGroupIds] = useState<number[]>([]);
	const [nutrientGroups, setNutrientGroups] = useState<NutrientGroup[]>([]);

	useEffect(() => {
		const fetchNutrientGroups = async () => {
			const response = await fetch("/api/nutrient-groups");
			const json: NutrientGroup[] = await response.json();

			// init state with all nutrient groups selected
			setNutrientGroups(json);
			setSelectedNutrientGroupIds(json.map((nutrientGroup) => nutrientGroup.id));
		};

		fetchNutrientGroups();
	}, []);

	const handleNutrientGroupChange = (event: { target: { checked: boolean } }, id: number) => {
		setSelectedNutrientGroupIds((oldSelectedNutrientGroupIds) =>
			event.target.checked
				? [...oldSelectedNutrientGroupIds, id] // add nutrient group
				: // remove nutrient group
				  oldSelectedNutrientGroupIds.filter((nutrientGroupId) => nutrientGroupId !== id)
		);
	};

	return (
		<Section label="Nutrients:">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{nutrientGroups.map((nutrientGroup) => (
					<NutrientGroupCheckbox
						key={nutrientGroup.id}
						nutrientGroupId={nutrientGroup.id}
						label={nutrientGroup.name}
						checked={selectedNutrientGroupIds.includes(nutrientGroup.id)}
						onChange={(event) => handleNutrientGroupChange(event, nutrientGroup.id)}
					/>
				))}
			</div>
		</Section>
	);
}
