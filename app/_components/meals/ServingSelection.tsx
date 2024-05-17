import { useEffect, useState } from "react";
import Serving from "../../types/serving";

export default function ServingSelection(
	props: Readonly<{
		foodCode: number;
	}>
) {
	const [servings, setServings] = useState<Serving[]>([]);
	const [selectedServing, setSelectedServing] = useState<Serving | null>(null);

	/**
	 * On first render, fetch list of serving options
	 */
	useEffect(() => {
		async function fetchServings() {
			const response = await fetch(`/api/food/${props.foodCode}/servings`);
			const json: Serving[] = await response.json();

			setServings(json);
			setSelectedServing(json[0]);
		}

		fetchServings();
	}, [props.foodCode]);

	return (
		<select
			className="select select-sm select-bordered join-item w-1/2"
			onChange={(e) => setSelectedServing(JSON.parse(e.target.value))}
			value={selectedServing ? JSON.stringify(selectedServing) : undefined}
		>
			{servings.map((serving) => (
				<option key={serving.id} value={JSON.stringify(serving)}>
					{serving.name}
				</option>
			))}
		</select>
	);
}
