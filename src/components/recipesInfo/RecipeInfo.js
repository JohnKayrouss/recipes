import React, { useEffect } from "react";
import striptags from "striptags";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import lottieBtnRecipe from "../../assets/lottieBtnRecipe";
import { useDispatch, useSelector } from "react-redux";
import { recipeInfoThunk } from "../../store/thunks/recipeInfoThunk";
import css from "./recipeInfo.module.css";
import { recipeIngredientsThunk } from "../../store/thunks/recipeIngredientsThunk";
import { recipeEquipmentsImageThunk } from "../../store/thunks/recipeEquipmentsImage";
import { recipeIngredientsImageThunk } from "../../store/thunks/recipeIngredientsImageThunk";
import RecipeInfoCard from "../UI/recipeInfoCard/RecipeInfoCard";
import RecipeMoreInfo from "./RecipeMoreInfo";
import OrangeBtn from "../UI/buttons/OrangeBtn";
import RecipeInfoHeader from "../UI/recipeInfoHeader/RecipeInfoHeader";
const RecipeInfo = ({ id }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(recipeIngredientsThunk(id));
		dispatch(recipeInfoThunk(id));
		dispatch(recipeEquipmentsImageThunk(id));
		dispatch(recipeIngredientsImageThunk(id));
	}, []);
	const {
		data,
		ingredients,
		isLoading,
		isLoadingIngredients,
		EquipmentsImage,
		isLoadingEquipmentsmage,
		ingredientsImage,
	} = useSelector((store) => store.recipeInfo);

	const ingredientDetails = ingredients.map(
		(ingredient) =>
			`${ingredient.amount.metric.value} ${ingredient.amount.metric.unit} of ${ingredient.name}`
	);

	const cardContent = [
		{
			header: "ingredients",
			content: ingredientDetails,
		},
		{
			header: "instructions",
			content: striptags(data.instructions),
		},
		{ header: "summary", content: striptags(data.summary) },
		{ header: "diets", content: data.diets },
		{ header: "cuisines", content: data.cuisines },
		{ header: "dish types", content: data.dishTypes },
		{
			header: "wine pairing",
			content: data.winePairing ? data.winePairing["pairedWines"] : "",
		},
	];
	const seeNutritionHandler = (id) => {
		navigate(`/recipe/nutritions/${id}`);
	};

	if (data && ingredients) {
		return (
			<div className={css.recipeInfoContainer}>
				<RecipeInfoHeader recipeImage={data.image} recipeTitle={data.title} />
				<div className={css.nutritionContainer}>
					<div className={css.btnContainer}>
						<OrangeBtn
							clickHandler={() => seeNutritionHandler(id)}
							btnContent={"see nutrition & facts"}
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
				<div className={css.cardWithImgContainer}>
					<RecipeInfoCard header={"Ingredients"} image={ingredientsImage} />
				</div>
				<div className={css.cardWithContentContainer}>
					<RecipeInfoCard
						loadingStatus={isLoading}
						header={cardContent[1].header}
						content={cardContent[1].content}
					/>
				</div>
				<div className={css.cardWithContentContainer}>
					<RecipeInfoCard
						loadingStatus={isLoading}
						header={cardContent[2].header}
						content={cardContent[2].content}
					/>
				</div>
				<div className={css.cardWithImgContainer}>
					<RecipeInfoCard
						loadingStatus={isLoadingEquipmentsmage}
						header={"Essential tools for the recipe"}
						image={EquipmentsImage}
					/>
				</div>
				<RecipeMoreInfo
					cardContent={cardContent}
					data={data}
					ingredients={ingredients}
					isLoading={isLoading}
					isLoadingIngredients={isLoadingIngredients}
				/>
			</div>
		);
	}
};

export default RecipeInfo;
