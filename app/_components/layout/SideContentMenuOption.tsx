"use client";

interface SideContentMenuOptionProps {
	label: string;
	selected?: boolean;
	onSelect: () => void;
	actionButtons?: React.ReactNode[];
}

export default function SideContentMenuOption({
	label,
	selected,
	onSelect,
	actionButtons
}: Readonly<SideContentMenuOptionProps>) {
	return (
		<li className="animate-fadeIn group">
			<button
				className={`group-hover:bg-base-300 ${selected ? "bg-base-300" : ""}`}
				onClick={() => onSelect()}
			>
				{label}
			</button>

			{
				/* action buttons appear only if this option is hovered */
				actionButtons && (
					<div className="hidden group-hover:block hover:bg-base-200 absolute right-1 top-1/2 -translate-y-1/2 p-0 rounded-full">
						{actionButtons}
					</div>
				)
			}
		</li>
	);
}
