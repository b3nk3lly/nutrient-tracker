import { useEffect, useState } from "react";
import SideContent from "./layout/SideContent";
import MainContent from "./layout/MainContent";
import NutrientGroup from "../types/nutrientGroup";
import SideContentMenuOption from "./layout/SideContentMenuOption";
import Nutrient from "../types/nutrient";
import IconButton from "./IconButton";
import DeselectAllIcon from "./DeselectAllIcon";
import SelectAllIcon from "./SelectAllIcon";
import { useMealsContext } from "../_store/MealsContextProvider";

interface NutrientsSectionProps {
	onChangePage: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function NutrientsSection({ onChangePage }: Readonly<NutrientsSectionProps>) {
	const { selectedNutrientIds, nutrientsDispatch } = useMealsContext();
	const [nutrientGroups, setNutrientGroups] = useState<NutrientGroup[]>([]);
	const [nutrients, setNutrients] = useState<Nutrient[]>([]);
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

		async function fetchNutrients() {
			const response = await fetch("/api/nutrients");
			const json: Nutrient[] = await response.json();

			setNutrients(json);
		}

		fetchNutrientGroups();
		fetchNutrients();
	}, []);

	const handleSelectNutrientGroup = (
		event: React.MouseEvent<HTMLButtonElement>,
		newNutrientGroupId: number
	) => {
		event.preventDefault();
		setSelectedNutrientGroupId(newNutrientGroupId);
	};

	const handleSelectNutrient = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nutrientId = Number(event.target.value);

		if (event.target.checked) {
			nutrientsDispatch({ type: "SELECT_ONE", nutrientId });
		} else {
			nutrientsDispatch({ type: "DESELECT_ONE", nutrientId });
		}
	};

	const handleSelectAllInGroup = (
		event: React.MouseEvent<HTMLButtonElement>,
		groupId: number
	) => {
		event.preventDefault();

		nutrientsDispatch({
			type: "SELECT_MANY",
			nutrientIds: nutrients
				.filter((nutrient) => nutrient.groupId === groupId)
				.map((nutrient) => nutrient.id)
		});
	};

	const handleDeselectAllInGroup = (
		event: React.MouseEvent<HTMLButtonElement>,
		groupId: number
	) => {
		event.preventDefault();

		nutrientsDispatch({
			type: "DESELECT_MANY",
			nutrientIds: nutrients
				.filter((nutrient) => nutrient.groupId === groupId)
				.map((nutrient) => nutrient.id)
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
							onClick={(e) => handleSelectNutrientGroup(e, group.id)}
							actionButtons={[
								<IconButton
									key={`${group.id}-deselect-all`}
									tooltip="Deselect All"
									onClick={(e) => handleDeselectAllInGroup(e, group.id)}
								>
									<DeselectAllIcon />
								</IconButton>,
								<IconButton
									key={`${group.id}-select-all`}
									tooltip="Select All"
									onClick={(e) => handleSelectAllInGroup(e, group.id)}
								>
									<SelectAllIcon />
								</IconButton>
							]}
						/>
					))}
				</ul>
				<div className="w-full flex justify-evenly">
					<button className="btn btn-sm btn-neutral" onClick={onChangePage}>
						&lt; Meals
					</button>
					<button className="btn btn-sm btn-neutral" onClick={onChangePage}>
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
							onClick={(e) => handleSelectAllInGroup(e, selectedNutrientGroupId)}
						>
							Select All
						</button>
						<button
							className="btn btn-sm btn-neutral"
							onClick={(e) => handleDeselectAllInGroup(e, selectedNutrientGroupId)}
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
