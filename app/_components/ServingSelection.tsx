import Serving from "../types/serving";

export default function ServingSelection(
	props: Readonly<{
		servings: Serving[];
		onServingChange: (event: { target: { value: string } }) => void;
	}>
) {
	return (
		<select
			className="select select-sm select-bordered join-item w-1/2"
			onChange={props.onServingChange}
		>
			{props.servings.map((serving) => (
				<option key={serving.id} value={serving.id}>
					{serving.name}
				</option>
			))}
		</select>
	);
}
