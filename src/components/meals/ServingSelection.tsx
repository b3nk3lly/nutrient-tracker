import Serving from "../../types/serving";

interface ServingSelectionProps {
	servings: Serving[];
	onChange: (servingId: number) => void;
}

export default function ServingSelection({ servings, onChange }: ServingSelectionProps) {
	return (
		<select
			className="select select-sm select-bordered join-item w-1/2"
			onChange={(e) => onChange(Number(e.target.value))}
		>
			{servings.map((serving) => (
				<option key={serving.id} value={serving.id}>
					{serving.name}
				</option>
			))}
		</select>
	);
}
