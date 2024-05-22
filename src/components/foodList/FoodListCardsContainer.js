import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import css from "./foodListCardsContainer.module.css";
import RecipeCard from "../UI/cards/RecipeCard";
import ShimmerEffect from "../UI/loading/ShimmerEffect";
import { nanoid } from "@reduxjs/toolkit";
import { searchByFoodThunk } from "../../store/thunks/searchByFoodThunk";
import { randomRecipesThunk } from "../../store/thunks/randomRecipesThunk";

const FoodListCardsContainer = ({ name, isSearchFood }) => {
	const [userFavorites, setUserFavorites] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchByFoodData = useSelector((store) => store.searchByFood.data);
	const randomRecipes = useSelector((store) => store.random.data);
	const { userInformation } = useSelector((store) => store.user);
	const { filterBtnClicked, filteredData, isLoading } = useSelector(
		(store) => store.filteredRecipes
	);

	useEffect(() => {
		if (name) {
			dispatch(searchByFoodThunk({ num: 100, queryName: name }));
		}
		if (isSearchFood) {
			dispatch(randomRecipesThunk(100));
		}
	}, [name, isSearchFood, dispatch]);

	useEffect(() => {
		if (userInformation && userInformation.userId) {
			const userInStorage = localStorage.getItem(userInformation.userId);
			if (userInStorage) {
				const userInStorageObj = JSON.parse(userInStorage);
				setUserFavorites(userInStorageObj.favRecipes || []);
			}
		}
	}, [userInformation]);

	useEffect(() => {
		if (userInformation && userInformation.userId) {
			const userInStorage = localStorage.getItem(userInformation.userId);
			if (userInStorage) {
				const userInStorageObj = JSON.parse(userInStorage);
				const newFavorites = userInStorageObj.favRecipes || [];
				if (JSON.stringify(userFavorites) !== JSON.stringify(newFavorites)) {
					setUserFavorites(newFavorites);
				}
			}
		}
	}, [searchByFoodData, randomRecipes, userInformation, userFavorites]);

	const seeRecipeHandler = (id) => {
		navigate(`/recipe/info/${id}`);
	};

	const updatedShimmerCard = {
		width: 310,
		height: 400,
	};

	const updatedShimmerBox = {
		width: "100%",
		height: "34em",
		marginTop: "3em",
	};

	if (isLoading) {
		return (
			<div className={css.cardsContainer}>
				<ShimmerEffect
					updatedShimmerCard={updatedShimmerCard}
					updatedShimmerBox={updatedShimmerBox}
					numOfCards={4}
				/>
				<ShimmerEffect
					updatedShimmerCard={updatedShimmerCard}
					updatedShimmerBox={updatedShimmerBox}
					numOfCards={4}
				/>
			</div>
		);
	}

	if (filterBtnClicked) {
		return (
			<div className={css.cardsContainer}>
				{filteredData.map((recipe) => (
					<RecipeCard
						key={nanoid()}
						recipeName={recipe.title}
						recipeImg={recipe.image}
						recipeId={recipe.id}
						isFavorite={userFavorites.includes(recipe.id)}
						clickHandler={() => seeRecipeHandler(recipe.id)}
					/>
				))}
			</div>
		);
	}

	return (
		<div className={css.cardsContainer}>
			{name &&
				searchByFoodData.map((recipe) => (
					<RecipeCard
						key={nanoid()}
						recipeName={recipe.title}
						recipeImg={recipe.image}
						recipeId={recipe.id}
						isFavorite={userFavorites.includes(recipe.id)}
						clickHandler={() => seeRecipeHandler(recipe.id)}
					/>
				))}
			{isSearchFood &&
				randomRecipes.map((recipe) => (
					<RecipeCard
						key={nanoid()}
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

export default FoodListCardsContainer;
