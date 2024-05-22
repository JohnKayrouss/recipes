import React from "react";
import css from "./recipeInfoHeader.module.css";
const RecipeInfoHeader = ({ recipeImage, recipeTitle }) => {
	return (
		<React.Fragment>
			<div className={css.imgWrapper}>
				<img src={recipeImage} />
			</div>
			<dir className={css.titleBox}>
				<h1>{recipeTitle}</h1>
			</dir>
		</React.Fragment>
	);
};

export default RecipeInfoHeader;
