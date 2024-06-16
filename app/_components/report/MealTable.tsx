"use client";

import { useEffect, useState } from "react";
import Food from "../../types/food";
import Nutrient from "../../types/nutrient";
import ReportData from "../../types/reportData";
import { useMealsContext } from "../../_store/MealsContextProvider";

/**
 * Returns the name of a nutrient and its unit of measurement, if not already present in the name.
 * Examples:
 * - Energy (kCal)
 * - Lactose (g)
 * @param nutrient the nutrient whose name to format
 */
function formatNutrientName(nutrient: Nutrient) {
	const unitSuffix = `(${nutrient.unit})`;

	return nutrient.name.toLowerCase().includes(unitSuffix.toLowerCase())
		? nutrient.name
		: `${nutrient.name} ${unitSuffix}`;
}

/**
 * Returns the quantity of a food plus its unit of quantity.
 * Examples:
 * - 90 g
 * - 2 small box
 * @param food the food whose quantity to format
 */
function formatFoodQuantity(food: Food) {
	const selectedServing = food.servings.find((serving) => serving.id === food.selectedServingId);

	if (!selectedServing) {
		throw Error(
			`No serving with ID ${food.selectedServingId} found for food ${food.description}`
		);
	}

	return `${food.quantity} ${selectedServing.name}`;
}

/**
 * Returns the amount of a given nutrient present in a given food, based on the user's entered
 * quantity and serving size. The amount is rounded to the number of decimal places specified
 * in the nutrient data from CNF.
 * @param food the food containing the nutrient to format
 * @param nutrient the nutrient for which to format the amount
 * @param data object mapping foods and nutrients to a numeric amount
 */
function formatNutrientAmount(food: Food, nutrient: Nutrient, data: ReportData) {
	// get nutrient amount from report data
	const amount = data[food.id][nutrient.id];

	// round the amount to whatever number of decimals CNF says
	return (
		Math.round((amount + Number.EPSILON) * Math.pow(10, nutrient.decimals)) /
		Math.pow(10, nutrient.decimals)
	);
}

interface MealTableProps {
	data: ReportData;
}

export default function MealTable({ data }: Readonly<MealTableProps>) {
	const { meals, selectedNutrientIds } = useMealsContext();
	const [nutrients, setNutrients] = useState<Nutrient[]>([]);

	useEffect(() => {
		async function fetchNutrients() {
			const response = await fetch("/api/nutrients");
			const json: Nutrient[] = await response.json();

			setNutrients(json.filter(({ id }) => selectedNutrientIds.has(id)));
		}

		fetchNutrients();
	}, [selectedNutrientIds]);

	const headers = [
		"Food",
		"Quantity",
		"CNF Food Code",
		...nutrients.map((nutrient) => formatNutrientName(nutrient))
	];

	return (
		<table className="table table-pin-rows text-neutral">
			<thead>
				<tr>
					{headers.map((header) => (
						<th key={header}>{header}</th>
					))}
				</tr>
			</thead>
			{meals.map((meal) => (
				<>
					<thead key={`${meal.id}-head`}>
						<tr>
							<th>{meal.name}</th>
						</tr>
					</thead>
					<tbody key={`${meal.id}-body`}>
						{meal.foods.map((food) => {
							return (
								<tr key={food.id} className="hover:bg-base-200">
									<td>{food.description}</td>
									<td>{formatFoodQuantity(food)}</td>
									<td>{String(food.code)}</td>
									{nutrients.map((nutrient) => (
										<td key={`${food.id}-${nutrient.id}`}>
											{formatNutrientAmount(food, nutrient, data)}
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</>
			))}
		</table>
	);
}
