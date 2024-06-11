"use client";

interface IconButtonProps {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	children: React.ReactNode;
}

export default function IconButton({ onClick, disabled, children }: Readonly<IconButtonProps>) {
	return (
		<button
			className="btn btn-circle btn-sm btn-ghost p-1.5 disabled:opacity-25 disabled:bg-transparent"
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
