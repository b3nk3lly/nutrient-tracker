import MainContentHeader from "./MainContentHeader";
import MainContentBody from "./MainContentBody";

interface MainContentProps {
	children: React.ReactNode;
}

function MainContent({ children }: Readonly<MainContentProps>) {
	return (
		<section className="w-full sm:w-2/3 p-4 flex flex-col overflow-hidden">{children}</section>
	);
}

MainContent.Header = MainContentHeader;

export default MainContent;
