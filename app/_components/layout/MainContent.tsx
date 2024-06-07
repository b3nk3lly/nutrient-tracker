interface MainContentProps {
	children: React.ReactNode;
}

export default function MainContent({ children }: Readonly<MainContentProps>) {
	return <section className="w-2/3 p-4">{children}</section>;
}
