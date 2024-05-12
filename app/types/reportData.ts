export default interface ReportData {
	meals: {
		name: string;
		foods: {
			code: number;
			description: string;
			quantity: number;
			serving: { conversionFactor: number; name: string };
		}[];
	}[];
}
