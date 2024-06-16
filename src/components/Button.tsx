"use client";

import React from "react";

interface ButtonProps {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: "submit" | "reset" | "button" | undefined;
	disabled?: boolean;
	children: React.ReactNode;
}

export default function Button({ onClick, type, disabled, children }: Readonly<ButtonProps>) {
	return (
		<button
			className="btn btn-sm btn-neutral"
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
