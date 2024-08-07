"use client";

import React from "react";
import MealCard from "./MealCard";
import mealGenerator from "../../functions/mealGenerator";
import IconButton from "../IconButton";
import { useMealsContext } from "../../store/MealsContextProvider";
import Button from "../Button";
import Meal from "../../types/meal";
import Section from "../layout/Section";
import { Add, Delete } from "../Icons";

interface MealsSectionProps {
	navigationButtons: React.ReactNode[];
}

export default function MealsSection({ navigationButtons }: Readonly<MealsSectionProps>) {
	const { meals, mealsDispatch } = useMealsContext();

	const hasMultipleMeals = meals.length > 1;

	const handleAddMeal = () => {
		const newMeal = mealGenerator.next().value;
		mealsDispatch({ type: "CREATE_MEAL", meal: newMeal });
	};

	const handleDeleteMeal = (mealId: number) => {
		mealsDispatch({ type: "DELETE_MEAL", mealId });
	};

	const renderSidebarActionButtons = ({ id }: Meal) =>
		hasMultipleMeals
			? [
					<IconButton
						key={`${id}-delete`}
						tooltip="Remove Meal"
						onClick={() => handleDeleteMeal(id)}
					>
						<Delete />
					</IconButton>
			  ]
			: undefined;

	return (
		<Section<Meal>
			title="Meals"
			items={meals}
			sidebarOptionProps={{
				label: ({ name }: Meal) => name,
				actionButtons: renderSidebarActionButtons
			}}
			renderItem={(meal: Meal) => <MealCard meal={meal} deletable={hasMultipleMeals} />}
			actionButtons={[
				<Button onClick={handleAddMeal}>
					<Add />
					Add Meal
				</Button>,
				...navigationButtons
			]}
		/>
	);
}
