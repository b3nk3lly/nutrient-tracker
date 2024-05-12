export default interface Food {
	id: number;
	code: number;
	description: string;
	mealId: number;
	quantity: number;
	selectedServingId: number | undefined;
}
