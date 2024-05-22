import React, { useState } from "react";
import css from "./nurtritionsSearchRecipes.module.css";
import SearchContainer from "../UI/search/SearchContainer";
import Lottie from "lottie-react";
import lottieAnalytics from "../../assets/lottieAnalytics";
import HomePopular from "../homePopular/HomePopular";
const NuritionsSearchRecipes = () => {
	const [getNutritions, setGetNutritions] = useState(true);

	const searchContainerStyles = {
		width: "100%",
		height: "10em",
		borderRadius: "10px",
	};
	const searchListStyles = {
		marginTop: "53em",
		marginLeft: ".5em",
		maxHeight: "30em",
	};
	const popularUpdatedStyles = {
		background: "transparent",
		width: "100%",
	};
	return (
		<div className={css.nuritionsContainer}>
			<div className={css.headerContainer}>
				<div className={css.nuritionsSearchBox}>
					<div className={css.searchHeadeer}>
						<h1>Nourish with knowledge </h1>
						<p>Recipe nutrition matters!</p>
					</div>
					<SearchContainer
						searchContainerStyles={searchContainerStyles}
						searchListStyles={searchListStyles}
						getNutritions={getNutritions}
					/>
				</div>
				<div className={css.lottieContainer}>
					<Lottie animationData={lottieAnalytics} />
				</div>
			</div>
			<HomePopular
				popularUpdatedStyles={popularUpdatedStyles}
				numOfShimmerCards={4}
				Header={"Lookup Nutritions"}
				btnContent={"find Nutritions"}
				getNutritions={getNutritions}
			/>
		</div>
	);
};

export default NuritionsSearchRecipes;
