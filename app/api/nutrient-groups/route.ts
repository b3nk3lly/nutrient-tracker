// /api/nutrient-groups

import { NextResponse } from "next/server";
import NutrientGroup from "../../types/nutrientGroup";

/**
 * The structure of the response from Canadian Nutrient File
 */
interface CNFNutrientGroup {
	nutrient_group_id: number;
	nutrient_group_name: string;
	nutrient_group_order: number;
}

export async function GET() {
	const response = await fetch(
		"https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientgroup"
	);
	const json: CNFNutrientGroup[] = await response.json();

	const nutrientGroups: NutrientGroup[] = json.map((nutrientGroup) => ({
		id: nutrientGroup.nutrient_group_id,
		name: nutrientGroup.nutrient_group_name,
		order: nutrientGroup.nutrient_group_order
	}));

	return NextResponse.json(nutrientGroups, { status: 200 });
}
