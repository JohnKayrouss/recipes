import React, { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../../firebase";
import css from "./recipeCard.module.css";
import imgNotFound from "../../../assets/recipeNotFound_2.png";
import OrangeBtn from "../buttons/OrangeBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const RecipeCard = ({
	recipeName,
	recipeImg,
	recipeId,
	isFavorite: initialFavorite,
	clickHandler,
	cardStyles,
	updatedStyles,
}) => {
	const [isFavorite, setIsFavorite] = useState(initialFavorite);
	const nowUser = useSelector((store) => store.user.isUser);
	const userId = useSelector((store) => store.user.userInformation.userId);

	const addToUserFavorites = async (userId, recipeId) => {
		try {
			const userDocRef = doc(db, "users", userId);
			await updateDoc(userDocRef, {
				favRecipes: arrayUnion(recipeId),
			});

			const userInStorage = JSON.parse(localStorage.getItem(userId)) || {};
			const favRecipes = userInStorage.favRecipes || [];
			if (!favRecipes.includes(recipeId)) {
				favRecipes.push(recipeId);
				localStorage.setItem(
					userId,
					JSON.stringify({ ...userInStorage, favRecipes })
				);
			}
		} catch (error) {
			return error;
		}
	};

	const removeFromUserFavorites = async (userId, recipeId) => {
		try {
			const userDocRef = doc(db, "users", userId);
			await updateDoc(userDocRef, {
				favRecipes: arrayRemove(recipeId),
			});

			const userInStorage = JSON.parse(localStorage.getItem(userId)) || {};
			const favRecipes = userInStorage.favRecipes || [];
			const updatedFavRecipes = favRecipes.filter((id) => id !== recipeId);
			if (updatedFavRecipes.length !== favRecipes.length) {
				localStorage.setItem(
					userId,
					JSON.stringify({ ...userInStorage, favRecipes: updatedFavRecipes })
				);
			}
		} catch (error) {
			return error;
		}
	};

	const favoriteHandler = (id) => {
		if (isFavorite) {
			removeFromUserFavorites(userId, id);
		} else {
			addToUserFavorites(userId, id);
		}
		setIsFavorite(!isFavorite);
	};

	return (
		<div className={css.card} style={cardStyles || null}>
			<img
				src={recipeImg || imgNotFound}
				className={recipeImg ? css.cardImg : css.cardImgNotFound}
			/>
			<div className={css.cardBody}>
				{nowUser && (
					<div className={css.favoriteIconContainer}>
						<FontAwesomeIcon
							icon={faHeart}
							className={`${css.favoriteIcon} ${
								isFavorite ? css.alreadyFavorite : css.notFavorite
							}`}
							onClick={() => favoriteHandler(recipeId)}
						/>
					</div>
				)}
				<h1 className={css.cardHeader}>
					{recipeName ? recipeName : "Name not found!"}
				</h1>
				<div className={css.btnContainer}>
					<OrangeBtn
						btnContent={"See Recipe"}
						updatedStyles={updatedStyles}
						clickHandler={clickHandler}
					/>
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
