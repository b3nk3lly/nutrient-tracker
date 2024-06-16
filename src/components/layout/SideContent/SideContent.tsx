import SideContentMenu from "./SideContentMenu";
import SideContentMenuOption from "./SideContentMenuOption";
import SideContentFooter from "./SideContentFooter";

interface SideContentProps {
	title: string;
	children: React.ReactNode;
}

function SideContent({ title, children }: Readonly<SideContentProps>) {
	return (
		<aside className="w-0 sm:w-1/3 bg-base-200 flex flex-col items-center py-4 space-y-4 overflow-hidden">
			<h2 className="text-xl font-bold text-center text-neutral">{title}</h2>
			{children}
		</aside>
	);
}

SideContent.Menu = SideContentMenu;
SideContent.MenuOption = SideContentMenuOption;
SideContent.Footer = SideContentFooter;

export default SideContent;
