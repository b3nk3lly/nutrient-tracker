"use client";

import React, { useState } from "react";
import Food from "../types/food";

const SearchBar = (props: { onSelect: (food: Food) => void }) => {
	const [query, setQuery] = useState("");
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
		setQuery(inputValue);

		if (inputValue) {
			// debounce filtering
			setTimeout(async () => {
				fetchSearchSuggestions(inputValue).then((result) => {
					setSuggestions(result);
				});
			}, 300);
		} else {
			setSuggestions([]);
		}
	};

	const shouldRenderOptions = () => {
		return searchFocused && suggestions.length > 0;
	};

	return (
		<div className="w-3/4">
			<input
				className="input input-bordered w-full"
				type="text"
				placeholder="Search..."
				value={query}
				onChange={handleInputChange}
				onFocus={() => setSearchFocused(true)}
				onBlur={() => setSearchFocused(false)}
			/>
			<div className="overflow-y-auto max-h-64">
				{shouldRenderOptions() && (
					<ul className="menu menu-vertical bg-base-200 rounded-box flex flex-col">
						{suggestions.map((food, index) => (
							<li key={index}>
								{/* use onMouseDown so this is clickable before the options are 
								    un-rendered after the search bar loses focus */}
								<button onMouseDown={() => props.onSelect(food)}>
									{food.food_description}
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
