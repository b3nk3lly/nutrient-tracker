export default function SectionLabel(props: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="label">
			<span className="label-text text-primary-content">{props.children}</span>
		</div>
	);
}
