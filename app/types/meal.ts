import Food from "./food";

export default interface Meal {
	id: number;
	name: string;
	foods: Food[];
}
