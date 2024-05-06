import Serving from "./serving";

export default interface Food {
	food_code: number;
	food_description: string;
	quantity: number;
	serving: Serving;
}
