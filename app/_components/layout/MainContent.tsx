interface MainContentProps {
	headerContent?: React.ReactNode;
	children: React.ReactNode;
}

export default function MainContent({ headerContent, children }: Readonly<MainContentProps>) {
	return (
		<section className="w-2/3 p-4">
			{headerContent && (
				<header className="flex justify-between border-b-2 border-base-200 pb-2">
					{headerContent}
				</header>
			)}

			{children}
		</section>
	);
}
