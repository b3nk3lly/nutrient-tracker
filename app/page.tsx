"use client";

import { useState } from "react";
import Meal from "./types/meal";
import MealsContextProvider from "./_store/MealsContextProvider";
import MealsForm from "./_components/form/MealsForm";
import ReportData from "./types/reportData";
import ReportSection from "./_components/ReportSection";

export default function Home() {
	const [showTable, setShowTable] = useState(false);
	const [reportData, setReportData] = useState<ReportData>({});

	const generateReportData = async (meals: Meal[], nutrientIds: number[]) => {
		const response = await fetch("/api/report", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ meals, nutrientIds })
		});
		const data: ReportData = await response.json();

		setReportData(data);
		setShowTable(true);
	};

	return (
		<MealsContextProvider>
			{showTable ? (
				<ReportSection data={reportData} />
			) : (
				<MealsForm onSubmit={generateReportData} />
			)}
		</MealsContextProvider>
	);
}
