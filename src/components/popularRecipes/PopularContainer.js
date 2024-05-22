import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { randomRecipesThunk } from "../../store/thunks/randomRecipesThunk";
import { nanoid } from "@reduxjs/toolkit";
import ShimmerEffect from "../UI/loading/ShimmerEffect";
import css from "./popularsContainer.module.css";
import RecipeCard from "../UI/cards/RecipeCard";

const PopularContainer = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [userFavorites, setUserFavorites] = useState([]);

	const { isUser, userInformation } = useSelector((store) => store.user);
	const { data, isLoading } = useSelector((store) => store.random);

	const seeRecipeHandler = (id) => {
		navigate(`/recipe/info/${id}`);
	};

	useEffect(() => {
		dispatch(randomRecipesThunk(100));
	}, [dispatch, isUser, userInformation]);

	const updatedShimmerCard = {
		width: 310,
		height: 400,
	};

	useEffect(() => {
		const userInStorage = localStorage.getItem(userInformation.userId);
		if (userInStorage) {
			const userInStorageObj = JSON.parse(userInStorage);
			setUserFavorites(userInStorageObj.favRecipes || []);
		}
	}, [userInformation.userId]);

	const updatedShimmerBox = {
		width: "100%",
		height: "34em",
		marginTop: "3em",
	};
	const updatedStyles = {
		width: "100% ",
		padding: "0 .5em",
	};

	if (isLoading) {
		return (
			<div className={css.popularContainer}>
				<React.Fragment>
					<ShimmerEffect
						updatedShimmerCard={updatedShimmerCard}
						updatedShimmerBox={updatedShimmerBox}
						numOfCards={5}
					/>
					<ShimmerEffect
						updatedShimmerCard={updatedShimmerCard}
						updatedShimmerBox={updatedShimmerBox}
						numOfCards={5}
					/>
				</React.Fragment>
			</div>
		);
	}
	return (
		<div className={css.popularContainer}>
			{data.map((recipe) => (
				<RecipeCard
					key={nanoid()}
					updatedStyles={updatedStyles}
					recipeName={recipe.title}
					recipeImg={recipe.image}
					recipeId={recipe.id}
					isFavorite={userFavorites.includes(recipe.id)}
					clickHandler={() => seeRecipeHandler(recipe.id)}
				/>
			))}
		</div>
	);
};

export default PopularContainer;
