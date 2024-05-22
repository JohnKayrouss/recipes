import React, { useEffect } from "react";
import css from "./nutritionsContainer.module.css";
import SearchByFood from "../recipesInfo/SearchByFood";
import { useDispatch, useSelector } from "react-redux";
import RecipeInfoHeader from "../UI/recipeInfoHeader/RecipeInfoHeader";
import Lottie from "lottie-react";
import lottieBtnRecipe from "../../assets/lottieBtnRecipe";
import OrangeBtn from "../UI/buttons/OrangeBtn";
import { useNavigate } from "react-router-dom";
import { nutritionalInfoThunk } from "../../store/thunks/nutritionalInfoThunk";
import RecipeInfoCard from "../UI/recipeInfoCard/RecipeInfoCard";
import { recipeInfoThunk } from "../../store/thunks/recipeInfoThunk";
import { nutritionsLabelThunk } from "../../store/thunks/nutritionsLabelThunk";
import { recipeTasteThunk } from "../../store/thunks/recipeTasteThunk";

const NutritionsContainer = ({ id }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(recipeInfoThunk(id));
		dispatch(nutritionalInfoThunk(id));
		dispatch(nutritionsLabelThunk(id));
		dispatch(recipeTasteThunk(id));
	}, []);

	const { data } = useSelector((store) => store.recipeInfo);
	const { nutritionalInfoImg, nutritionsLabelImg, recipeTaste } = useSelector(
		(store) => store.recipeNutritions
	);

	const seeRecipeHandler = (id) => {
		navigate(`/recipe/info/${id}`);
	};
	return (
		<React.Fragment>
			<div className={css.nutritionContainer}>
				<RecipeInfoHeader recipeImage={data.image} recipeTitle={data.title} />
				<div className={css.seeInfoBtnContainer}>
					<div className={css.btnContainer}>
						<OrangeBtn
							clickHandler={() => seeRecipeHandler(id)}
							btnContent={"see recipe Information"}
							updatedStyles={{
								width: "18em",
								height: "5em",
								fontSize: "1.1em",
							}}
						/>
					</div>
					<div className={css.lottieContainer}>
						<Lottie animationData={lottieBtnRecipe} />
					</div>
				</div>
				<div className={css.nutritionalInfoContainer}>
					<RecipeInfoCard
						header={"nutritional information:"}
						image={nutritionalInfoImg}
						updatedStyles={{ height: "80em", overflow: "hidden" }}
					/>
				</div>
				<div className={css.recipeTasteContainer}>
					<RecipeInfoCard
						header={"recipe taste:"}
						image={recipeTaste}
						updatedStyles={{ height: "50em", overflow: "hidden" }}
					/>
				</div>
				<div className={css.nutritionaLabelContainer}>
					<RecipeInfoCard
						header={"nutritions label:"}
						image={nutritionsLabelImg}
						updatedStyles={{ height: "65em", overflow: "hidden" }}
					/>
				</div>
			</div>
			<SearchByFood />
		</React.Fragment>
	);
};

export default NutritionsContainer;
