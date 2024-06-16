"use client";

import React from "react";
import ReportData from "../types/reportData";
import MainContent from "./layout/MainContent/MainContent";
import SideContent from "./layout/SideContent/SideContent";
import MealTable from "./report/MealTable";

interface ReportSectionProps {
	data: ReportData;
	navigationButtons?: React.ReactNode[];
}

export default function ReportSection({ data, navigationButtons }: ReportSectionProps) {
	return (
		<>
			<SideContent title="Report" width="w-0 sm:w-1/5">
				{navigationButtons && <SideContent.Footer>{navigationButtons}</SideContent.Footer>}
			</SideContent>
			<MainContent>
				<MealTable data={data} />
			</MainContent>
		</>
	);
}
