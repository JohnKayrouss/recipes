import React from "react";
import css from "./recipeInfoCard.module.css";
import Spinner from "../spinner/Spinner";

const RecipeInfoCard = ({
	header,
	image,
	content,
	updatedStyles,
	loadingStatus,
}) => {
	if (loadingStatus) {
		return (
			<div className={css.cardSpinnerContainer}>
				<Spinner title={header} />
			</div>
		);
	}
	return (
		header &&
		(image || content) && (
			<div className={css.cardContainer}>
				<div className={css.cardTitleContainer}>
					<h1>{header}</h1>
				</div>
				{image && (
					<dir className={css.cardImgWrapper} style={updatedStyles || {}}>
						<img src={image} />
					</dir>
				)}
				{content && (
					<div className={css.contentContainer} style={updatedStyles || {}}>
						<p>{content}</p>
					</div>
				)}
			</div>
		)
	);
};

export default RecipeInfoCard;
