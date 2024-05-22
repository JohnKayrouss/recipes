import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { randomRecipesThunk } from "../../store/thunks/randomRecipesThunk";
import ShimmerEffect from "../UI/loading/ShimmerEffect";
import css from "./homePopular.module.css";
import OrangeBtn from "../UI/buttons/OrangeBtn";
import { nanoid } from "@reduxjs/toolkit";

const HomePopular = ({
	popularUpdatedStyles,
	numOfShimmerCards,
	Header,
	getNutritions,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [width, setWidth] = useState(0);
	const carouselWidth = useRef();
	useEffect(() => {
		dispatch(randomRecipesThunk(10));
	}, []);
	const { data, isLoading } = useSelector((store) => store.random);

	useEffect(() => {
		setWidth(
			carouselWidth.current.scrollWidth - carouselWidth.current.offsetWidth
		);
	}, []);

	const seeRecipeHandler = (id) => {
		navigate(`/recipe/info/${id}`);
	};
	const seeNutritionsHandler = (id) => {
		navigate(`/recipe/nutritions/${id}`);
	};

	const updatedShimmerCard = {
		width: 310,
		height: 500,
		borderRadius: "10px",
	};

	const updatedShimmerBox = {
		width: "100%",
		height: "85%",
		display: "flex",
		paddingRight: "3.5em",
	};

	if (isLoading) {
		return (
			<div className={css.popularContainer} style={popularUpdatedStyles || {}}>
				<div className={css.popularHeader}>
					<h1>{Header || "Popular Recipes"}</h1>
				</div>
				<div className={css.carousel}>
					<ShimmerEffect
						updatedShimmerCard={updatedShimmerCard}
						updatedShimmerBox={updatedShimmerBox}
						numOfCards={numOfShimmerCards || 5}
					/>
				</div>
			</div>
		);
	}
	return (
		<div className={css.popularContainer} style={popularUpdatedStyles || {}}>
			<div className={css.popularHeader}>
				<h1>{Header || "Popular Recipes"}</h1>
			</div>
			<motion.div
				className={css.carousel}
				whileTap={{ cursor: "grabbing" }}
				ref={carouselWidth}>
				<motion.div
					drag='x'
					dragConstraints={{ right: 0, left: -width }}
					className={css.innerCarousel}>
					{data.length > 0 &&
						data.map((recipe) => (
							<motion.div className={css.item} key={nanoid()}>
								<div className={css.card}>
									<img src={recipe.image} className={css.cardImg} />
									<div className={css.cardBody}>
										<h1 className={css.cardHeader}>{recipe.title}</h1>
										<div className={css.btnContainer}>
											<OrangeBtn
												btnContent={"See Recipe"}
												clickHandler={
													getNutritions
														? () => seeNutritionsHandler(recipe.id)
														: () => seeRecipeHandler(recipe.id)
												}
											/>
										</div>
									</div>
								</div>
							</motion.div>
						))}
				</motion.div>
			</motion.div>
		</div>
	);
};

export default HomePopular;
