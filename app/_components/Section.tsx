export default function Section(props: Readonly<{ label: string; children: React.ReactNode }>) {
	return (
		<section className="w-full">
			<div className="label">
				<span className="label-text text-primary-content">{props.label}</span>
			</div>
			{props.children}
		</section>
	);
}
