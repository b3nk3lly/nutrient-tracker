interface MainContentHeaderProps {
	children: React.ReactNode;
}

export default function MainContentHeader({ children }: Readonly<MainContentHeaderProps>) {
	return (
		<header className="flex justify-between border-b-2 border-base-200 pb-2">{children}</header>
	);
}
