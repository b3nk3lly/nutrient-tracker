"use client";

import React from "react";
import ReportData from "../../types/reportData";
import MainContent from "../layout/MainContent/MainContent";
import Table from "./Table";
import Button from "../Button";
import scrapeTableData from "../../functions/scrapeTable";
import { Download } from "../Icons";

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
			<MainContent>
				<MainContent.Header>
					<h2 className="text-xl text-neutral font-bold p-1">Nutrient Report</h2>
				</MainContent.Header>
				<div className="grow overflow-auto">
					<Table id={tableId} data={data} />
				</div>
				<div className="flex justify-evenly">
					{navigationButtons && <div>{navigationButtons}</div>}
					<Button onClick={() => handleExportToCsv()}>
						<Download />
						Export to CSV
					</Button>
				</div>
			</MainContent>
		</>
	);
}
