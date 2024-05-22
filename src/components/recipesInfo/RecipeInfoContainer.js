import React from "react";
import css from "./recipeInfoConainer.module.css";
import SearchByFood from "./SearchByFood";
import RecipeInfo from "./RecipeInfo";

const RecipeInfoContainer = ({ id }) => {
	return (
		<div className={css.recipeContainer}>
			<RecipeInfo id={id} />
			<SearchByFood />
		</div>
	);
};

export default RecipeInfoContainer;
