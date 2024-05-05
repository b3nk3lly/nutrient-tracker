"use client";

import React, { useState } from "react";
import Food from "../types/food";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState<Food[]>([]);

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

	return (
		<div>
			<input type="text" placeholder="Search..." value={query} onChange={handleInputChange} />
			<ul>
				{suggestions.map((result, index) => (
					<li key={index}>{result.food_description}</li>
				))}
			</ul>
		</div>
	);
};

export default SearchBar;
