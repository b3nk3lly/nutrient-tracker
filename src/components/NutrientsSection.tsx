import { useEffect, useState } from "react";
import MainContent from "./layout/MainContent/MainContent";
import NutrientGroup from "../types/nutrientGroup";
import Nutrient from "../types/nutrient";
import IconButton from "./IconButton";
import { useMealsContext } from "../store/MealsContextProvider";
import fetchNutrients from "../functions/fetchNutrients";
import ftechNutrientGroups from "../functions/fetchNutrientGroups";
import Button from "./Button";
import Section from "./layout/Section";
import { DeselectAll, SelectAll } from "./Icons";

interface NutrientsSectionProps {
	navigationButtons: React.ReactNode[];
}

export default function NutrientsSection({ navigationButtons }: Readonly<NutrientsSectionProps>) {
	const { selectedNutrientIds, nutrientsDispatch } = useMealsContext();
	const [nutrientGroups, setNutrientGroups] = useState<NutrientGroup[]>([]);
	const [nutrients, setNutrients] = useState<Nutrient[]>([]);

	useEffect(() => {
		ftechNutrientGroups().then((groups) => {
			setNutrientGroups(groups);
		});

		fetchNutrients().then((nutrients) => {
			setNutrients(nutrients);
		});
	}, []);

	const handleSelectNutrient = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nutrientId = Number(event.target.value);

		if (event.target.checked) {
			nutrientsDispatch({ type: "SELECT_ONE", nutrientId });
		} else {
			nutrientsDispatch({ type: "DESELECT_ONE", nutrientId });
		}
	};

	const handleSelectAllInGroup = (groupId: number) => {
		nutrientsDispatch({
			type: "SELECT_MANY",
			nutrientIds: nutrients
				.filter((nutrient) => nutrient.groupId === groupId)
				.map((nutrient) => nutrient.id)
		});
	};

	const handleDeselectAllInGroup = (groupId: number) => {
		nutrientsDispatch({
			type: "DESELECT_MANY",
			nutrientIds: nutrients
				.filter((nutrient) => nutrient.groupId === groupId)
				.map((nutrient) => nutrient.id)
		});
	};

	const renderNutrientGroupLabel = (group: NutrientGroup) => {
		const nutrientsInGroup = nutrients.filter((nutrient) => nutrient.groupId === group.id);
		const selectedNutrientsInGroup = nutrientsInGroup.filter((nutrient) =>
			selectedNutrientIds.has(nutrient.id)
		);

		return (
			<p>
				{group.name}&nbsp;
				<span className="font-light opacity-60">
					{`${selectedNutrientsInGroup.length}/${nutrientsInGroup.length}`}
				</span>
			</p>
		);
	};

	const renderActionButtons = (group: NutrientGroup) => [
		<IconButton
			key={`${group.id}-select-all`}
			tooltip="Select All"
			onClick={() => handleSelectAllInGroup(group.id)}
		>
			<SelectAll />
		</IconButton>,
		<IconButton
			key={`${group.id}-deselect-all`}
			tooltip="Deselect All"
			onClick={() => handleDeselectAllInGroup(group.id)}
		>
			<DeselectAll />
		</IconButton>
	];

	const renderNutrientGroupDetails = (group: NutrientGroup) => (
		<>
			<header className="flex justify-between border-b-2 border-base-200 pb-2">
				<h2 className="text-xl text-neutral font-bold p-1">{group.name}</h2>
				<div className="mr-4">{renderActionButtons(group)}</div>
			</header>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 divide-y divide-base-200 grow overflow-x-hidden overflow-y-auto mx-4">
				{nutrients
					.filter((nutrient) => nutrient.groupId === group.id)
					.map((nutrient) => (
						<label key={nutrient.id} className="cursor-pointer label p-4">
							<div className="label-text">
								<p>{nutrient.webName}</p>
								<p className="font-light opacity-60 text-xs">{nutrient.name}</p>
							</div>
							<input
								type="checkbox"
								className="checkbox"
								value={nutrient.id}
								onChange={(event) => handleSelectNutrient(event)}
								checked={selectedNutrientIds.has(nutrient.id)}
							/>
						</label>
					))}
			</div>
		</>
	);

	return (
		<Section<NutrientGroup>
			title="Nutrients"
			items={nutrientGroups}
			sidebarOptionProps={{
				label: renderNutrientGroupLabel,
				actionButtons: renderActionButtons
			}}
			renderItem={renderNutrientGroupDetails}
			actionButtons={[...navigationButtons]}
		/>
	);
}
