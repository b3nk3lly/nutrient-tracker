import Serving from "./serving";

export default interface Food {
	id: number;
	code: number;
	description: string;
	quantity: number;
	servings: Serving[];
	selectedServingId: number;
}
