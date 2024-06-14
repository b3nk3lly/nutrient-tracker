"use client";

import { useState } from "react";
import Meal from "./types/meal";
import MealsContextProvider from "./_store/MealsContextProvider";
import MealsForm from "./_components/form/MealsForm";

export default function Home() {
	const [showTable, setShowTable] = useState(false);

	const generateReportData = (meals: Meal[], selectedNutrientIds: Set<number>) => {
		// TODO call backend for table data
		// TODO update reportData state with new data
		setShowTable(true);
	};

	return showTable ? (
		<></>
	) : (
		<MealsContextProvider>
			<MealsForm onSubmit={generateReportData} />
		</MealsContextProvider>
	);
}
