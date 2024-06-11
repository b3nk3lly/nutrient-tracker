// /api/nutrients

import { NextResponse } from "next/server";
import fetchNutrients from "../../cnf/fetchNutrients";
import Nutrient from "../../types/nutrient";

const nutrients: Nutrient[] = [];
let initialized = false;

/**
 * Fetches nutrient data from CNF and stores it.
 */
async function initNutrientData() {
	nutrients.push(...(await fetchNutrients()));

	initialized = true;
}

export async function GET() {
	if (!initialized) {
		await initNutrientData();
	}

	return NextResponse.json(nutrients, { status: 200 });
}
