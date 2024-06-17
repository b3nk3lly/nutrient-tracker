/**
 * Returns a 2D array of the values of a tables cells (i.e., the TH and TD elements).
 * @param tableId the ID prop of the table to scrape
 */
export default function scrapeTableData(tableId: string) {
	const table = document.getElementById(tableId);

	if (!table) {
		throw new Error(`Could not find element with ID ${tableId}`);
	} else if (table.tagName !== "TABLE") {
		throw new Error(`Provided ID ${tableId} must be that of a <table> element !`);
	}

	const data = [];
	const rows = table.getElementsByTagName("tr");

	for (let i = 0; i < rows.length; ++i) {
		const row = [];
		const cells = rows[i].querySelectorAll("th,td");

		for (let j = 0; j < cells.length; ++j) {
			row.push(cells[j].innerHTML);
		}

		data.push(row);
	}

	return data;
}
