"use client";

import { useState } from "react";
import MealCard from "./meals/MealCard";
import SideContentMenuOption from "./layout/SideContentMenuOption";
import SideContent from "./layout/SideContent";
import MainContent from "./layout/MainContent";
import createNewMeal from "../functions/createNewMeal";
import MealName from "./meals/MealName";
import IconButton from "./IconButton";
import DeleteIcon from "./icons/DeleteIcon";
import { useMealsContext } from "../store/MealsContextProvider";

interface MealsSectionProps {
	onChangePage: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MealsSection({ onChangePage }: Readonly<MealsSectionProps>) {
	const { meals, mealsDispatch } = useMealsContext();
	const [selectedMealId, setSelectedMealId] = useState(0);

	const selectedMeal = meals.find((meal) => meal.id === selectedMealId) ?? meals[0];

	const handleAddMeal = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const newMeal = createNewMeal();
		mealsDispatch({ type: "CREATE_MEAL", meal: newMeal });
		setSelectedMealId(newMeal.id);
	};

	const handleChangeMealName = (mealId: number, newName: string) => {
		mealsDispatch({
			type: "UPDATE_MEAL",
			payload: { mealId: mealId, property: "name", value: newName }
		});
	};

	/**
	 * Compute the next selected meal, assuming we are deleting the currently-selected meal.
	 * The next selected meal should be the one after this, unless this is the last one in the list,
	 * in which case the meal before this becomes selected.
	 * @returns the meal to be selected after the selected meal is deleted.
	 */
	const computeNextSelectedMeal = () => {
		for (let i = 0; i < meals.length; ++i) {
			if (meals[i].id === selectedMealId) {
				// if there are no more meals, the previous meal should be selected
				if (i === meals.length - 1) {
					return meals[i - 1];
				}

				// the next meal should be selected
				return meals[i + 1];
			}
		}

		throw new Error(
			`Could not find a meal other than the currently-selected one (ID ${selectedMealId})`
		);
	};

	const handleDeleteMeal = (event: React.MouseEvent<HTMLButtonElement>, mealId: number) => {
		event.preventDefault();

		// if we're deleting the currently-selected meal, choose what to select next
		if (mealId === selectedMealId) {
			const newSelectedMeal = computeNextSelectedMeal();
			setSelectedMealId(newSelectedMeal.id);
		}

		mealsDispatch({ type: "DELETE_MEAL", mealId });
	};

	const handleSelectMeal = (event: React.MouseEvent<HTMLButtonElement>, mealId: number) => {
		event.preventDefault();
		setSelectedMealId(mealId);
	};

	return (
		<>
			<SideContent title="Meals">
				<div className="overflow-y-auto w-full">
					<ul className="menu space-y-2 flex-col overflow-auto">
						{meals.map((meal) => (
							<SideContentMenuOption
								key={meal.id}
								label={meal.name}
								selected={meal.id === selectedMealId}
								onClick={(e) => handleSelectMeal(e, meal.id)}
								actionButtons={[
									meals.length > 1 && (
										<IconButton
											key={`${meal.id}-delete`}
											tooltip="Remove Meal"
											onClick={(e) => handleDeleteMeal(e, meal.id)}
										>
											<DeleteIcon />
										</IconButton>
									)
								]}
							/>
						))}
					</ul>
				</div>

				<div className="w-full flex justify-evenly self-end">
					<button className="btn btn-sm btn-neutral" onClick={handleAddMeal}>
						+ Add Meal
					</button>
					<button className="btn btn-sm btn-neutral" onClick={onChangePage}>
						Nutrients &gt;
					</button>
				</div>
			</SideContent>
			<MainContent
				headerContent={
					<>
						<MealName
							key={`${selectedMeal.id}-name`}
							name={selectedMeal.name}
							onChange={(newName) => handleChangeMealName(selectedMeal.id, newName)}
						/>
						<IconButton
							key={`${selectedMeal.id}-delete`}
							tooltip="Remove Meal"
							onClick={(e) => handleDeleteMeal(e, selectedMeal.id)}
							disabled={meals.length === 1}
						>
							<DeleteIcon />
						</IconButton>
					</>
				}
			>
				<MealCard meal={selectedMeal} />
			</MainContent>
		</>
	);
}
