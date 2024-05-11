export default interface ReportData {
	meals: {
		name: string;
		foods: {
			food_code: number;
			food_description: string;
			quantity: number;
			serving: { conversion_factor_value: number; measure_name: string };
		}[];
	}[];
}
