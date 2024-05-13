"use client";

export default function NutrientGroupCheckbox(
	props: Readonly<{
		nutrientGroupId: number;
		label: string;
		checked: boolean;
		onChange: (event: { target: { checked: boolean } }) => void;
	}>
) {
	return (
		<label className="label cursor-pointer justify-self-start">
			<input
				type="checkbox"
				className="checkbox checkbox-sm mr-2"
				checked={props.checked}
				value={props.nutrientGroupId}
				onChange={props.onChange}
			/>
			<span className="label-text m-1">{props.label}</span>
		</label>
	);
}
