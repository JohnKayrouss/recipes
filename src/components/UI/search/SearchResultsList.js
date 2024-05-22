import React from "react";
import css from "./searchResultsList.module.css";
import SearchResultItem from "./SearchResultItem";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

const SearchResultsList = ({
	value,
	searchListStyles,
	searchItemStyles,
	getNutritions,
}) => {
	const { data } = useSelector((store) => store.searchRecipes);
	return (
		<div className={css.resultsContainer} style={searchListStyles || {}}>
			{value.length !== 0 &&
				data?.map((recipe) => (
					<SearchResultItem
						key={nanoid()}
						recipe={recipe}
						searchItemStyles={searchItemStyles}
						getNutritions={getNutritions}
					/>
				))}
		</div>
	);
};

export default SearchResultsList;
