import { useState } from "react";
import ReportData from "./types/reportData";
import Meal from "./types/meal";
import MealsContextProvider from "./store/MealsContextProvider";
import ReportSection from "./components/ReportSection";
import MealsForm from "./components/form/MealsForm";
import generateReportData from "./functions/generateReportData";

function App() {
	const [showTable, setShowTable] = useState(false);
	const [reportData, setReportData] = useState<ReportData>({});

	const fetchReportData = async (meals: Meal[], nutrientIds: number[]) => {
		const data = await generateReportData(meals, nutrientIds);

		setReportData(data);
		setShowTable(true);
	};

	return (
		<>
			<header className="text-center text-2xl border-b-2 border-base-200 p-2">
				<h1 className="drop-shadow">
					<span className="text-secondary">Nutrient</span>
					<span className="text-primary">Tracker</span>
				</h1>
			</header>
			<main className="flex grow">
				<MealsContextProvider>
					{showTable ? (
						<ReportSection data={reportData} />
					) : (
						<MealsForm onSubmit={fetchReportData} />
					)}
				</MealsContextProvider>
			</main>
		</>
	);
}

export default App;