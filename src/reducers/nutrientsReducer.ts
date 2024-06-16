export type NutrientsAction =
	| { type: "SELECT_ONE"; nutrientId: number }
	| { type: "SELECT_MANY"; nutrientIds: number[] }
	| { type: "DESELECT_ONE"; nutrientId: number }
	| { type: "DESELECT_MANY"; nutrientIds: number[] };

export default function nutrientsReducer(
	nutrientIds: Set<number>,
	action: NutrientsAction
): Set<number> {
	switch (action.type) {
		case "SELECT_ONE":
			return new Set(nutrientIds.add(action.nutrientId));

		case "SELECT_MANY": {
			const newNutrientIds = new Set(nutrientIds);
			action.nutrientIds.forEach((id) => newNutrientIds.add(id));
			return newNutrientIds;
		}

		case "DESELECT_ONE": {
			const newNutrientIds = new Set(nutrientIds);
			newNutrientIds.delete(action.nutrientId);
			return newNutrientIds;
		}

		case "DESELECT_MANY": {
			const newNutrientIds = new Set(nutrientIds);
			action.nutrientIds.forEach((id) => newNutrientIds.delete(id));
			return newNutrientIds;
		}
	}
}
