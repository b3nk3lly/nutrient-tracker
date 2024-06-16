import { useEffect, useState } from "react";
import SideContent from "./layout/SideContent/SideContent";
import MainContent from "./layout/MainContent/MainContent";
import NutrientGroup from "../types/nutrientGroup";
import Nutrient from "../types/nutrient";
import IconButton from "./IconButton";
import DeselectAllIcon from "./icons/DeselectAllIcon";
import SelectAllIcon from "./icons/SelectAllIcon";
import { useMealsContext } from "../store/MealsContextProvider";
import fetchNutrients from "../functions/fetchNutrients";
import ftechNutrientGroups from "../functions/fetchNutrientGroups";
import Button from "./Button";

interface NutrientsSectionProps {
	navigationButtons?: React.ReactNode[];
}

export default function NutrientsSection({ navigationButtons }: Readonly<NutrientsSectionProps>) {
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
		ftechNutrientGroups().then((groups) => {
			setNutrientGroups(groups);
			setSelectedNutrientGroupId(groups[0].id);
		});

		fetchNutrients().then((nutrients) => {
			setNutrients(nutrients);
		});
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
			<SideContent title="Nutrients" width="w-0 sm:w-1/3">
				<SideContent.Menu>
					{nutrientGroups.map((group) => (
						<SideContent.MenuOption
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
				</SideContent.Menu>
				<SideContent.Footer>
					{navigationButtons}
					<Button type="submit">Generate Report</Button>
				</SideContent.Footer>
			</SideContent>
			<MainContent>
				<MainContent.Header>
					<h2 className="text-xl text-neutral font-bold p-1">
						{selectedNutrientGroup?.name}
					</h2>
				</MainContent.Header>
				{selectedNutrientGroupId && (
					<div className="flex p-4 justify-evenly">
						<Button onClick={(e) => handleSelectAllInGroup(e, selectedNutrientGroupId)}>
							Select All
						</Button>
						<Button
							onClick={(e) => handleDeselectAllInGroup(e, selectedNutrientGroupId)}
						>
							Deselect All
						</Button>
					</div>
				)}
				<div className="grid grid-cols-3 gap-3 divide-y divide-base-200 grow overflow-x-hidden overflow-y-auto">
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
