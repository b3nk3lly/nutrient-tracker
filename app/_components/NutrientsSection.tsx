import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SideContent from "./layout/SideContent";
import MainContent from "./layout/MainContent";
import NutrientGroup from "../types/nutrientGroup";
import SideContentMenuOption from "./layout/SideContentMenuOption";
import Nutrient from "../types/nutrient";
import IconButton from "./IconButton";
import DeselectAllIcon from "./DeselectAllIcon";
import SelectAllIcon from "./SelectAllIcon";

interface NutrientsSectionProps {
	nutrients: Nutrient[];
	selectedNutrientIds: Set<number>;
	setSelectedNutrientIds: Dispatch<SetStateAction<Set<number>>>;
	onChangePage: () => void;
}

export default function NutrientsSection({
	nutrients,
	selectedNutrientIds,
	setSelectedNutrientIds,
	onChangePage
}: Readonly<NutrientsSectionProps>) {
	const [nutrientGroups, setNutrientGroups] = useState<NutrientGroup[]>([]);
	const [selectedNutrientGroupId, setSelectedNutrientGroupId] = useState<number | undefined>();

	const selectedNutrientGroup = nutrientGroups.find(
		(group) => group.id === selectedNutrientGroupId
	);

	const displayedNutrients = nutrients.filter(
		(nutrient) => nutrient.groupId === selectedNutrientGroupId
	);

	useEffect(() => {
		async function fetchNutrientGroups() {
			const response = await fetch("/api/nutrient-groups");
			const json: NutrientGroup[] = await response.json();

			setNutrientGroups(json);
			setSelectedNutrientGroupId(json[0].id);
		}

		fetchNutrientGroups();
	}, []);

	const handleSelectNutrient = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nutrientId = Number(event.target.value);

		setSelectedNutrientIds((prevNutrientIds) => {
			if (event.target.checked) {
				// add the nutrient to the set
				return new Set(prevNutrientIds.add(nutrientId));
			}

			// remove the nutrient from the set
			const newNutrientIds = new Set(prevNutrientIds);
			newNutrientIds.delete(nutrientId);

			return newNutrientIds;
		});
	};

	const handleSelectAll = (groupId: number) => {
		setSelectedNutrientIds((prevNutrientIds) => {
			const newNutrientIds = new Set(prevNutrientIds);
			nutrients
				.filter((nutrient) => nutrient.groupId === groupId)
				.forEach((nutrient) => newNutrientIds.add(nutrient.id));
			return newNutrientIds;
		});
	};

	const handleDeselectAll = (groupId: number) => {
		setSelectedNutrientIds((prevNutrientIds) => {
			const newNutrientIds = new Set(prevNutrientIds);
			nutrients
				.filter((nutrient) => nutrient.groupId === groupId)
				.forEach((nutrient) => newNutrientIds.delete(nutrient.id));
			return newNutrientIds;
		});
	};

	const countSelectedNutrientsInGroup = (nutrientGroupId: number) => {
		return nutrients.filter(
			(nutrient) =>
				nutrient.groupId === nutrientGroupId && selectedNutrientIds.has(nutrient.id)
		).length;
	};

	const countNutrientsInGroup = (nutrientGroupId: number) => {
		return nutrients.filter((nutrient) => nutrient.groupId === nutrientGroupId).length;
	};

	return (
		<>
			<SideContent title="Nutrients">
				<ul className="menu space-y-2 w-full">
					{nutrientGroups.map((group) => (
						<SideContentMenuOption
							key={group.id}
							label={
								<p>
									{group.name}&nbsp;
									<span className="font-light opacity-60">
										{countSelectedNutrientsInGroup(group.id)}/
										{countNutrientsInGroup(group.id)}
									</span>
								</p>
							}
							selected={group.id === selectedNutrientGroupId}
							onSelect={() => setSelectedNutrientGroupId(group.id)}
							actionButtons={[
								<IconButton
									key={`${group.id}-deselect-all`}
									tooltip="Deselect All"
									onClick={() => handleDeselectAll(group.id)}
								>
									<DeselectAllIcon />
								</IconButton>,
								<IconButton
									key={`${group.id}-select-all`}
									tooltip="Select All"
									onClick={() => handleSelectAll(group.id)}
								>
									<SelectAllIcon />
								</IconButton>
							]}
						/>
					))}
				</ul>
				<div className="w-full flex justify-evenly">
					<button className="btn btn-sm btn-neutral" onClick={() => onChangePage()}>
						&lt; Meals
					</button>
					<button className="btn btn-sm btn-neutral" onClick={() => onChangePage()}>
						Generate Report
					</button>
				</div>
			</SideContent>
			<MainContent
				headerContent={
					<h2 className="text-xl font-bold p-1">{selectedNutrientGroup?.name}</h2>
				}
			>
				{selectedNutrientGroupId && (
					<div className="flex p-4 justify-evenly">
						<button
							className="btn btn-sm btn-neutral"
							onClick={() => handleSelectAll(selectedNutrientGroupId)}
						>
							Select All
						</button>
						<button
							className="btn btn-sm btn-neutral"
							onClick={() => handleDeselectAll(selectedNutrientGroupId)}
						>
							Deselect All
						</button>
					</div>
				)}
				<div className="grid grid-cols-3 gap-3 divide-y divide-base-200">
					{displayedNutrients.map((nutrient) => (
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
			</MainContent>
		</>
	);
}
