"use client";

interface SideContentMenuOptionProps {
	label: React.ReactNode;
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
		<li className="animate-fadeIn group flex justify-between">
			<button
				className={`group-hover:bg-base-300 ${selected ? "bg-base-300" : ""}`}
				onClick={() => onSelect()}
			>
				{label}
			</button>

			{
				/* action buttons appear only if this option is hovered */
				actionButtons && (
					<div
						style={{
							backgroundColor:
								"initial" /* fixes an ugly on-click background color inherited from menu */
						}}
						className="hidden group-hover:flex gap-0 absolute right-1 top-1/2 -translate-y-1/2 p-0"
					>
						{actionButtons.map((actionButton, index) => (
							<div key={index} className="hover:bg-base-200 rounded-full">
								{actionButton}
							</div>
						))}
					</div>
				)
			}
		</li>
	);
}
