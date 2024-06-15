"use client";

import React, { useState } from "react";
import Food from "../../types/food";
import SearchIcon from "../icons/SearchIcon";

const SearchBar = (props: { onSelect: (food: Food) => void }) => {
	const [suggestions, setSuggestions] = useState<Food[]>([]);
	const [searchFocused, setSearchFocused] = useState(false);

	/**
	 * Fetches search suggestions from the backend
	 * @param query search string for finding food items
	 * @returns list of food items that matched the search string
	 */
	const fetchSearchSuggestions = async (query: string) => {
		const response = await fetch(`/api/food?query=${query}`);
		const suggestions: Food[] = await response.json();
		return suggestions;
	};

	/**
	 * Updates search query and retrieves and sets search suggestions
	 * @param event onChange event
	 */
	const handleInputChange = (event: { target: { value: string } }) => {
		const inputValue = event.target.value;

		// if query is too short, we don't want to overdo it on suggestions
		if (inputValue && inputValue.length >= 3) {
			fetchSearchSuggestions(inputValue).then((result) => {
				setSuggestions(result);
			});
		} else {
			setSuggestions([]);
		}
	};

	const shouldRenderOptions = () => {
		return searchFocused && suggestions.length > 0;
	};

	return (
		<>
			<label className="input input-bordered flex items-center gap-2">
				<SearchIcon className="w-4 h-4 opacity-70" />
				<input
					type="text"
					placeholder="Enter a name or food code"
					onChange={handleInputChange}
					onFocus={() => setSearchFocused(true)}
					onBlur={() => setSearchFocused(false)}
				/>
			</label>
			<div className="relative">
				{shouldRenderOptions() && (
					<div className="absolute top-0 left-0 z-10 overflow-y-auto max-h-64 rounded-box w-full">
						<ul className="menu menu-vertical bg-base-200 flex flex-col">
							{suggestions.map((food) => (
								<li key={food.code}>
									{/* use onMouseDown so this is clickable before the options are 
								    un-rendered after the search bar loses focus */}
									<button onMouseDown={() => props.onSelect(food)}>
										{`[${food.code}] ${food.description}`}
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	);
};

export default SearchBar;
