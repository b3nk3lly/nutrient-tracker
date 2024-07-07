import MainContentHeader from "./MainContentHeader";

interface MainContentProps {
	children: React.ReactNode;
}

function MainContent({ children }: Readonly<MainContentProps>) {
	return (
		<section className="w-full sm:grow p-4 flex flex-col overflow-x-hidden overflow-y-auto">
			{children}
		</section>
	);
}

MainContent.Header = MainContentHeader;

export default MainContent;
