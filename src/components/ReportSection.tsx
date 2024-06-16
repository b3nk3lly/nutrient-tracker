"use client";

import ReportData from "../types/reportData";
import MainContent from "./layout/MainContent/MainContent";
import SideContent from "./layout/SideContent/SideContent";
import MealTable from "./report/MealTable";

interface ReportSectionProps {
	data: ReportData;
}

export default function ReportSection({ data }: ReportSectionProps) {
	return (
		<>
			<SideContent title="Report">This is side content.</SideContent>
			<MainContent>
				<MealTable data={data} />
			</MainContent>
		</>
	);
}
