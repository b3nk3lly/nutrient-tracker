"use client";

import React from "react";
import MealCard from "./MealCard";
import mealGenerator from "../../functions/mealGenerator";
import IconButton from "../IconButton";
import DeleteIcon from "../icons/DeleteIcon";
import { useMealsContext } from "../../store/MealsContextProvider";
import Button from "../Button";
import Meal from "../../types/meal";
import Section from "../layout/Section";

interface MealsSectionProps {
	navigationButtons: React.ReactNode[];
}

export default function MealsSection({ navigationButtons }: Readonly<MealsSectionProps>) {
	const { meals, mealsDispatch } = useMealsContext();

	const hasMultipleMeals = meals.length > 1;

	const handleAddMeal = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const newMeal = mealGenerator.next().value;
		mealsDispatch({ type: "CREATE_MEAL", meal: newMeal });
	};

	const handleDeleteMeal = (event: React.MouseEvent<HTMLButtonElement>, mealId: number) => {
		event.preventDefault();
		mealsDispatch({ type: "DELETE_MEAL", mealId });
	};

	const renderSidebarActionButtons = ({ id }: Meal) =>
		hasMultipleMeals
			? [
					<IconButton
						key={`${id}-delete`}
						tooltip="Remove Meal"
						onClick={(e) => handleDeleteMeal(e, id)}
					>
						<DeleteIcon />
					</IconButton>
			  ]
			: undefined;

	const renderMealDetails = (meal: Meal) => (
		<MealCard meal={meal} deletable={!hasMultipleMeals} />
	);

	return (
		<Section<Meal>
			title="Meals"
			items={meals}
			sidebarOptionProps={{
				label: ({ name }: Meal) => name,
				actionButtons: renderSidebarActionButtons
			}}
			renderItem={renderMealDetails}
			actionButtons={[
				<Button onClick={handleAddMeal}>+ Add Meal</Button>,
				...navigationButtons
			]}
		/>
	);
}
