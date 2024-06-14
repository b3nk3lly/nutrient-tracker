export default interface ReportData {
	[foodId: number]: {
		[nutrientId: number]: number;
	};
}
