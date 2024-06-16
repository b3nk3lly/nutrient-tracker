import React from "react";

interface SideContentFooterProps {
	children: React.ReactNode;
}

export default function SideContentFooter({ children }: SideContentFooterProps) {
	return <div className="w-full flex justify-evenly self-end">{children}</div>;
}
