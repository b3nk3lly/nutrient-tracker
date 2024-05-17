export default interface Food {
	id: number;
	code: number;
	description: string;
	quantity: number;
	selectedServingId: number | undefined;
}
