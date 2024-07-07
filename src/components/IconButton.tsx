"use client";

import { IconContext } from "react-icons";

interface IconButtonProps {
	tooltip: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	children: React.ReactNode;
}

export default function IconButton({
	tooltip,
	onClick,
	disabled,
	children
}: Readonly<IconButtonProps>) {
	return (
		<div className="tooltip tooltip-bottom" data-tip={tooltip}>
			<button
				className="btn btn-circle btn-sm btn-ghost p-1.5 disabled:opacity-25 disabled:bg-transparent"
				onClick={onClick}
				disabled={disabled}
			>
				<IconContext.Provider
					value={{ className: "fill-neutral", style: { height: "100%", width: "100%" } }}
				>
					{children}
				</IconContext.Provider>
			</button>
		</div>
	);
}
