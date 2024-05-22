import React from "react";
import css from "./homehero.module.css";
import recipeImg from "../../assets/headeRecipeImg.png";
import SearchContainer from "../UI/search/SearchContainer";
import Lottie from "lottie-react";
import lottieRecipe from "../../assets/lottieFood";

const HomeHero = () => {
	return (
		<div className={css.hero}>
			<div className={css.content}>
				<div className={css.caption}>
					<h1>Are you starving?</h1>
					<p>Within a few clicks, find meals that are up to your taste</p>
					<div className={css.searchSection}>
						<div className={css.searchBox}>
							<SearchContainer />
						</div>
						<div className={css.lottieContainer}>
							<Lottie animationData={lottieRecipe} />
						</div>
					</div>
				</div>
				<div className={css.imgWarp}>
					<img src={recipeImg} />
				</div>
			</div>
		</div>
	);
};

export default HomeHero;
