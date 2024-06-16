import React from "react";

interface SideContentMenuProps {
	children: React.ReactNode;
}

export default function SideContentMenu({ children }: SideContentMenuProps) {
	return (
		<div className="grow overflow-y-auto w-full">
			<ul className="menu space-y-2 flex-col overflow-auto">{children}</ul>
		</div>
	);
}
