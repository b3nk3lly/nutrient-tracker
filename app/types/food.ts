export default interface Food {
	id: number;
	food_code: number;
	food_description: string;
	mealId: number;
	quantity: number;
	selectedServingId: number | undefined;
}
