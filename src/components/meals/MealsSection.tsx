"use client";

import { useRef, useState } from "react";
import MealCard, { MealCardHandle } from "./MealCard";
import SideContent from "../layout/SideContent/SideContent";
import mealGenerator from "../../functions/mealGenerator";
import IconButton from "../IconButton";
import DeleteIcon from "../icons/DeleteIcon";
import { useMealsContext } from "../../store/MealsContextProvider";
import Button from "../Button";

interface MealsSectionProps {
	navigationButtons?: React.ReactNode[];
}

export default function MealsSection({ navigationButtons }: Readonly<MealsSectionProps>) {
	const { meals, mealsDispatch } = useMealsContext();
	const mealsRef = useRef<Map<number, MealCardHandle>>(new Map());
	const [selectedMealId, setSelectedMealId] = useState(0);

	const handleAddMeal = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const newMeal = mealGenerator.next().value;
		mealsDispatch({ type: "CREATE_MEAL", meal: newMeal });
		setSelectedMealId(newMeal.id);
	};

	const handleSelectMeal = (event: React.MouseEvent<HTMLButtonElement>, mealId: number) => {
		event.preventDefault();
		mealsRef.current.get(mealId)?.scrollIntoView();
	};

	const handleDeleteMeal = (event: React.MouseEvent<HTMLButtonElement>, mealId: number) => {
		event.preventDefault();
		mealsDispatch({ type: "DELETE_MEAL", mealId });
	};

	const hasMultipleMeals = meals.length > 1;

	return (
		<>
			<SideContent title="Meals" width="w-0 md:w-1/3">
				<SideContent.Menu>
					{meals.map((meal) => (
						<SideContent.MenuOption
							key={meal.id}
							label={meal.name}
							selected={meal.id === selectedMealId}
							onClick={(e) => handleSelectMeal(e, meal.id)}
							actionButtons={[
								hasMultipleMeals && (
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
				</SideContent.Menu>
			</SideContent>
			<div className="flex flex-col w-full p-4">
				<div className="grow overflow-x-hidden overflow-y-auto snap-y snap-mandatory">
					{meals.map((meal) => (
						<MealCard
							key={meal.id}
							ref={(node) => {
								if (node) {
									mealsRef.current.set(meal.id, node);
								} else {
									mealsRef.current.delete(meal.id);
								}
							}}
							meal={meal}
							deletable={!hasMultipleMeals}
						/>
					))}
				</div>

				<div className="align-bottom">
					<div className="flex justify-between">
						<Button onClick={handleAddMeal}>+ Add Meal</Button>
						{navigationButtons}
					</div>
				</div>
			</div>
		</>
	);
}
