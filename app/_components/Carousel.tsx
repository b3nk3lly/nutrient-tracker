import React from "react";

export default function Carousel(props: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="carousel space-x-8 w-full overflow-x-visible">
			{React.Children.map(props.children, (child) => (
				<div className="carousel-item w-full">{child}</div>
			))}
		</div>
	);
}
