"use client";

import { useEffect, useState } from "react";
import MealCard from "./meals/MealCard";
import SearchBar from "./search/SearchBar";
import Food from "../types/food";
import FoodItem from "./meals/FoodItem";
import Meal from "../types/meal";
import Serving from "../types/serving";
import ReportData from "../types/reportData";
import NutrientGroupSelection from "./nutrients/NutrientGroupSelection";
import ServingSelection from "./meals/ServingSelection";
import Section from "./Section";
import NutrientGroup from "../types/nutrientGroup";
import NutrientGroupCheckbox from "./nutrients/NutrientGroupCheckbox";
import Carousel from "./Carousel";

let mealCount = 0; // incremented to assign meal IDs
let foodCount = 0; // incremented to assign food IDs
let servingCount = 0; // incremented to assign serving IDs

export default function NutrientReporterForm() {
	const [meals, setMeals] = useState<Meal[]>([{ id: mealCount, name: "Untitled meal" }]);
	const [foods, setFoods] = useState<Food[]>([]);
	const [servings, setServings] = useState<Serving[]>([]);
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

	const handleMealDelete = (id: number) => {
		setMeals((oldMeals) => oldMeals.filter((meal) => meal.id !== id));
	};

	const handleMealNameChange = (id: number, name: string) => {
		setMeals((oldMeals) =>
			oldMeals.map((meal) => (meal.id === id ? { ...meal, name: name } : meal))
		);
	};

	const addFood = async (id: number, food: Food) => {
		// set default properties on new food
		const newFood = { ...food, id: ++foodCount, mealId: id, quantity: 0 };

		// get servings for the newly added food
		const response = await fetch(`/api/food/${newFood.code}/servings`);
		const json: Serving[] = await response.json();

		// set IDs
		const newServings = json.map((serving) => ({
			...serving,
			id: ++servingCount,
			foodId: newFood.id
		}));

		// default to first selected serving
		newFood.selectedServingId = newServings[0].id;

		// add new servings to state
		setServings((oldServings) => oldServings.concat(newServings));

		// add new food to state
		// sort so that newest food appears first
		setFoods((oldFoods) => [newFood, ...oldFoods].sort((a, b) => (a.id > b.id ? -1 : 1)));
	};

	const handleQuantityChange = (id: number, quantity: number) => {
		setFoods((oldFoods) =>
			oldFoods.map((food) => (food.id === id ? { ...food, quantity: quantity } : food))
		);
	};

	const handleServingChange = (event: { target: { value: string } }, foodId: number) => {
		const selectedServingId = Number(event.target.value);
		setFoods((oldFoods) =>
			oldFoods.map((food) =>
				food.id === foodId ? { ...food, selectedServingId: selectedServingId } : food
			)
		);
	};

	const handleNutrientGroupChange = (event: { target: { checked: boolean } }, id: number) => {
		setSelectedNutrientGroupIds((oldSelectedNutrientGroupIds) =>
			event.target.checked
				? [...oldSelectedNutrientGroupIds, id] // add nutrient group
				: // remove nutrient group
				  oldSelectedNutrientGroupIds.filter((nutrientGroupId) => nutrientGroupId !== id)
		);
	};

	const handleGenerateReport = async () => {
		const reportData: ReportData = {
			meals: meals.map((meal) => ({
				name: meal.name,
				foods: foods
					.filter((food) => food.mealId === meal.id)
					.map((food) => ({
						code: food.code,
						description: food.description,
						quantity: food.quantity,
						serving: servings.find(
							(serving) => serving.id === food.selectedServingId
						) ?? { conversionFactor: 0.01, name: "g" }
					}))
			}))
		};

		await fetch("/api/report", { method: "POST", body: JSON.stringify(reportData) });
	};

	return (
		<form className="w-full flex flex-col items-center space-y-8">
			<Section label="Meals:">
				<Carousel>
					{meals.map((meal) => (
						<MealCard
							key={meal.id}
							name={meal.name}
							onNameChange={(name: string) => handleMealNameChange(meal.id, name)}
							onDelete={() => handleMealDelete(meal.id)}
							searchBar={
								<SearchBar onSelect={(food: Food) => addFood(meal.id, food)} />
							}
							className="w-full"
						>
							{foods.length == 0 ? (
								<p className="w-full text-center text-neutral">
									Search for food to add it to this meal.
								</p>
							) : (
								foods
									.filter((food) => food.mealId == meal.id)
									.map((food) => (
										<FoodItem
											key={food.id}
											name={food.description}
											quantity={food.quantity}
											onQuantityChange={(quantity: number) =>
												handleQuantityChange(food.id, quantity)
											}
										>
											<ServingSelection
												servings={servings.filter(
													(serving) => serving.foodId == food.id
												)}
												onServingChange={(event) =>
													handleServingChange(event, food.id)
												}
											/>
										</FoodItem>
									))
							)}
						</MealCard>
					))}
				</Carousel>
			</Section>
			<Section label="Nutrients:">
				<NutrientGroupSelection>
					{nutrientGroups.map((nutrientGroup) => (
						<NutrientGroupCheckbox
							key={nutrientGroup.id}
							nutrientGroupId={nutrientGroup.id}
							label={nutrientGroup.name}
							checked={selectedNutrientGroupIds.includes(nutrientGroup.id)}
							onChange={(event) => handleNutrientGroupChange(event, nutrientGroup.id)}
						/>
					))}
				</NutrientGroupSelection>
			</Section>
			<button className="btn btn-neutral" onClick={handleGenerateReport}>
				Generate Report
			</button>
		</form>
	);
}
