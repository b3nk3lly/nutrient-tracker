"use client";

import React from "react";
import ReportData from "../../types/reportData";
import MainContent from "../layout/MainContent/MainContent";
import SideContent from "../layout/SideContent/SideContent";
import Table from "./Table";
import Button from "../Button";
import scrapeTableData from "../../functions/scrapeTable";

interface ReportSectionProps {
	data: ReportData;
	navigationButtons?: React.ReactNode[];
}

export default function ReportSection({ data, navigationButtons }: ReportSectionProps) {
	const tableId = "nutrient-table";

	const handleExportToCsv = () => {
		// generate CSV data
		const data = scrapeTableData(tableId);
		const csvString = data.map((row) => row.join(",")).join("\n");
		const csvFile = new Blob([csvString], { type: "text/csv" });

		// create a download link
		const downloadLink = document.createElement("a");
		downloadLink.download = "nutrients.csv";
		downloadLink.href = window.URL.createObjectURL(csvFile);
		downloadLink.style.display = "none";

		// click the link, then remove it
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	return (
		<>
			<SideContent title="Report" width="w-0 sm:w-1/5">
				{navigationButtons && <SideContent.Footer>{navigationButtons}</SideContent.Footer>}
				<Button onClick={() => handleExportToCsv()}>Export to CSV</Button>
			</SideContent>
			<MainContent>
				<Table id={tableId} data={data} />
			</MainContent>
		</>
	);
}
