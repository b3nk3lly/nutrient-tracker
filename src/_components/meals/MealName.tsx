import { useEffect, useRef, useState } from "react";

interface MealNameProps {
	name: string;
	onChange: (name: string) => void;
}

export default function MealName({ name, onChange }: Readonly<MealNameProps>) {
	const [isEditing, setIsEditing] = useState(false);
	const [newName, setNewName] = useState(name);

	const input = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isEditing) {
			// select entire name on focus
			input.current?.select();
		} else {
			// force deselect on blur
			input.current?.blur();
		}
	}, [isEditing]);

	const saveMealName = () => {
		setIsEditing(false);

		if (newName.trim()) {
			// update name if it's not just whitespace
			onChange(newName);
		} else {
			// reset to previous name if only whitespace
			setNewName(name);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			saveMealName();
		}
	};

	return (
		<input
			type="text"
			maxLength={64}
			ref={input}
			className="text-xl text-neutral font-bold outline-none bg-inherit hover:bg-base-200 focus:bg-base-200 p-1 rounded-sm"
			value={newName}
			onChange={(event) => setNewName(event.target.value)}
			onKeyDown={handleKeyDown}
			onFocus={() => setIsEditing(true)}
			onBlur={() => saveMealName()}
		/>
	);
}
