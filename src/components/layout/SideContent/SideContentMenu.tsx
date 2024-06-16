import React from "react";

interface SideContentMenuProps {
	children: React.ReactNode;
}

export default function SideContentMenu({ children }: SideContentMenuProps) {
	return (
		<div className="grow w-full overflow-x-hidden overflow-y-auto">
			<ul className="menu space-y-2 flex-col">{children}</ul>
		</div>
	);
}
