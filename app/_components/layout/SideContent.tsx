interface SideContentProps {
	title: string;
	children: React.ReactNode;
}

export default function SideContent({ title, children }: Readonly<SideContentProps>) {
	return (
		<aside className="w-1/3 bg-base-200 flex flex-col items-center mx-1 py-4 space-y-4">
			<h2 className="text-xl font-bold text-center text-neutral">{title}</h2>
			{children}
		</aside>
	);
}
