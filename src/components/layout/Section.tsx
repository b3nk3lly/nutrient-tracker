import React, { useCallback, useEffect, useRef, useState } from "react";
import SideContent from "./SideContent/SideContent";

interface Identifiable {
	id: number;
}

interface SidebarOptionProps<T> {
	label: (item: T) => React.ReactNode;
	actionButtons: (item: T) => JSX.Element[] | undefined;
}

interface SectionProps<T> {
	title: string;
	items: T[];
	sidebarOptionProps: SidebarOptionProps<T>;
	renderItem: (item: T) => React.ReactNode;
	actionButtons: React.ReactNode[];
}

export default function Section<T extends Identifiable>({
	title,
	items,
	sidebarOptionProps,
	renderItem,
	actionButtons
}: SectionProps<T>) {
	const [selectedItemId, setSelectedItemId] = useState<number | undefined>();
	const itemsRef = useRef<Map<number, HTMLDivElement>>(new Map());
	const prevItemLengthRef = useRef(items.length);

	const scrollToItem = useCallback(({ id }: T) => {
		itemsRef.current.get(id)?.scrollIntoView({ behavior: "smooth" });
	}, []);

	/**
	 * Detects changes in the length of `items` array
	 */
	useEffect(() => {
		if (prevItemLengthRef.current > 0 && items.length > prevItemLengthRef.current) {
			// new item added, scroll to it
			scrollToItem(items[items.length - 1]);
		}

		prevItemLengthRef.current = items.length;
	}, [items, scrollToItem]);

	/**
	 * Compute selected item based on scroll position
	 * @param event scroll event
	 */
	const handleScroll = (event: React.UIEvent) => {
		const height = event.currentTarget.clientHeight;
		const distanceFromTop = event.currentTarget.scrollTop;
		const selectedItemIndex = Math.round(distanceFromTop / height);

		setSelectedItemId(items[selectedItemIndex]?.id);
	};

	return (
		<>
			<SideContent title={title} width="w-0 md:w-1/3">
				<SideContent.Menu>
					{items.map((item) => (
						<SideContent.MenuOption
							key={item.id}
							selected={item.id === selectedItemId}
							onClick={() => scrollToItem(item)}
							label={sidebarOptionProps.label(item)}
							actionButtons={sidebarOptionProps.actionButtons(item)}
						/>
					))}
				</SideContent.Menu>
			</SideContent>
			<div className="flex flex-col w-full p-4">
				<div
					className="grow overflow-x-hidden overflow-y-auto snap-y snap-mandatory"
					onScroll={handleScroll}
				>
					{items.map((item) => (
						<div
							key={item.id}
							ref={(node) => {
								if (node) {
									itemsRef.current.set(item.id, node);
								} else {
									itemsRef.current.delete(item.id);
								}
							}}
							className="h-full flex flex-col overflow-hidden snap-start"
						>
							{renderItem(item)}
						</div>
					))}
				</div>

				<div className="align-bottom">
					<div className="flex justify-between">{actionButtons}</div>
				</div>
			</div>
		</>
	);
}
