import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import favoriteHeart from "../../assets/favoriteLottie_2.json";
import Lottie from "lottie-react";
import css from "./favoriteContainer.module.css";
import RecipeCard from "../UI/cards/RecipeCard";
import { useNavigate } from "react-router-dom";
import { favoriteRecipesThunk } from "../../store/thunks/favoriteRecipesThunk";
import { nanoid } from "@reduxjs/toolkit";

const FavoirteContainer = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userInformation, favList } = useSelector((store) => store.user);

	useEffect(() => {
		if (userInformation && userInformation.userId) {
			fetchUserDataFromFirestore(userInformation.userId);
		} else {
			console.error("User ID is invalid or missing.");
		}
	}, [userInformation]);

	const fetchUserDataFromFirestore = async (uid) => {
		try {
			const userDocRef = doc(db, "users", uid);
			const userDoc = await getDoc(userDocRef);
			const favList = userDoc.data().favRecipes.join(", ");
			dispatch(favoriteRecipesThunk(favList));
			return userDoc.exists() ? userDoc.data() : null;
		} catch (error) {
			console.error("Error fetching user data:", error);
			return null;
		}
	};

	const seeRecipeHandler = (id) => {
		navigate(`/recipe/info/${id}`);
	};

	return (
		userInformation && (
			<div>
				<div className={css.favoriteContainer}>
					<div className={css.header}>
						<div className={css.headerContent}>
							<h1 className={css.headerH1}>
								{userInformation.username} Favoirte List
							</h1>
						</div>
						<div className={css.lottieContainer}>
							<Lottie animationData={favoriteHeart} />
						</div>
					</div>
					<div className={css.favsContainer}>
						{favList.map((recipe) => (
							<RecipeCard
								key={nanoid()}
								recipeName={recipe.title}
								recipeImg={recipe.image}
								recipeId={recipe.id}
								isFavorite={true}
								clickHandler={() => seeRecipeHandler(recipe.id)}
							/>
						))}
					</div>
				</div>
			</div>
		)
	);
};

export default FavoirteContainer;
