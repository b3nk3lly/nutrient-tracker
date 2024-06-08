import { Dispatch, SetStateAction, useState } from "react";
import Meal from "../types/meal";
import MealCard from "./meals/MealCard";
import MealNavigationOption from "./meals/MealNavigationOption";
import SideContent from "./layout/SideContent";
import MainContent from "./layout/MainContent";
import createNewMeal from "../_functions/createNewMeal";

interface MealsSectionProps {
	meals: Meal[];
	setMeals: Dispatch<SetStateAction<Meal[]>>;
	onChangePage: () => void;
}

export default function MealsSection({
	meals,
	setMeals,
	onChangePage
}: Readonly<MealsSectionProps>) {
	const [selectedMealId, setSelectedMealId] = useState(0);

	const selectedMeal = meals.find((meal) => meal.id === selectedMealId) ?? meals[0];

	const handleAddMeal = () => {
		const newMeal = createNewMeal();
		setMeals((prevMeals) => [...prevMeals, newMeal]);
		setSelectedMealId(newMeal.id);
	};

	const handleMealChange = <T extends keyof Meal>(
		mealId: number,
		property: T,
		value: Meal[T]
	) => {
		setMeals((prevMeals) =>
			prevMeals.map((meal) => (meal.id === mealId ? { ...meal, [property]: value } : meal))
		);
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

	const handleDeleteMeal = (mealId: number) => {
		const newMeals = meals.filter((meal) => meal.id !== mealId);

		// if we're deleting the currently-selected meal, choose what to select next
		if (mealId === selectedMealId) {
			const newSelectedMeal = computeNextSelectedMeal();
			setSelectedMealId(newSelectedMeal.id);
		}

		setMeals(newMeals);
	};

	return (
		<>
			<SideContent title="Meals">
				<ul className="menu space-y-2 w-full">
					{meals.map((meal) => (
						<MealNavigationOption
							key={meal.id}
							meal={meal}
							selected={meal.id === selectedMealId}
							deletable={meals.length > 1}
							onSelect={(targetMeal) => setSelectedMealId(targetMeal.id)}
							onDelete={() => handleDeleteMeal(meal.id)}
						/>
					))}
				</ul>
				<div className="flex gap-x-8">
					<button className="btn btn-sm btn-neutral" onClick={() => handleAddMeal()}>
						+ Add Meal
					</button>
					<button className="btn btn-sm btn-neutral" onClick={() => onChangePage()}>
						Nutrients &gt;
					</button>
				</div>
			</SideContent>
			<MainContent>
				<MealCard
					key={selectedMeal.id}
					meal={selectedMeal}
					deletable={meals.length > 1}
					onChange={(property, value) =>
						handleMealChange(selectedMeal.id, property, value)
					}
					onDelete={() => handleDeleteMeal(selectedMeal.id)}
				/>
			</MainContent>
		</>
	);
}
