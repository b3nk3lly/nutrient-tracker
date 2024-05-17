"use client";

import MealsSection from "./meals/MealsSection";
import NutrientGroupSection from "./nutrients/NutrientGroupSection";

export default function NutrientReporterForm() {
	const handleGenerateReport = async () => {
		//await fetch("/api/report", { method: "POST", body: JSON.stringify(reportData) });
	};

	return (
		<form
			className="w-full flex flex-col items-center space-y-8"
			onSubmit={handleGenerateReport}
		>
			<MealsSection />
			<NutrientGroupSection />
			<button type="submit" className="btn btn-neutral">
				Generate Report
			</button>
		</form>
	);
}
