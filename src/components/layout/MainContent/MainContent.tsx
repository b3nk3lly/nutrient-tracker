import MainContentHeader from "./MainContentHeader";

interface MainContentProps {
	children: React.ReactNode;
}

function MainContent({ children }: Readonly<MainContentProps>) {
	return (
		<section className="w-full sm:grow p-4 flex flex-col overflow-hidden">{children}</section>
	);
}

MainContent.Header = MainContentHeader;

export default MainContent;
