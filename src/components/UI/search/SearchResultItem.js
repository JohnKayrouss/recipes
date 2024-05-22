import React from "react";
import css from "./searchResultItem.module.css";
import { useNavigate } from "react-router-dom";

const SearchResultItem = ({ recipe, searchItemStyles, getNutritions }) => {
	const navigate = useNavigate();

	const handleNutritionsSearch = () => {
		navigate(`/recipe/nutritions/${recipe.id}`);
	};
	const handleRecipeSearch = () => {
		navigate(`/recipe/info/${recipe.id}`);
	};
	return (
		<div
			style={searchItemStyles || {}}
			className={css.itemContainer}
			onClick={getNutritions ? handleNutritionsSearch : handleRecipeSearch}>
			<p>{recipe.title}</p>
		</div>
	);
};

export default SearchResultItem;
