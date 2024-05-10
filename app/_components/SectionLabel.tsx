export default function SectionLabel(props: { label: string }) {
	return (
		<div className="label">
			<span className="label-text text-primary-content">{props.label}</span>
		</div>
	);
}
