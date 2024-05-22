import React from "react";
import css from "./similarRecipes.module.css";
import img_1 from "../../assets/searchFoodImgs/pizza.png";
import img_2 from "../../assets/searchFoodImgs/burger.png";
import img_3 from "../../assets/searchFoodImgs/noodles.png";
import img_4 from "../../assets/searchFoodImgs/dessert.jpg";
import img_5 from "../../assets/searchFoodImgs/chicken.jpg";
import img_6 from "../../assets/searchFoodImgs/steak.png";
import { Link } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

const food = [
	{ name: "pizza", image: img_1 },
	{ name: "burger", image: img_2 },
	{ name: "noodles", image: img_3 },
	{ name: "chicken", image: img_5 },
	{ name: "steak", image: img_6 },
	{ name: "dessert", image: img_4 },
];

const SearchByFood = () => {
	return (
		<div className={css.foodContainer}>
			<div className={css.food}>
				<div className={css.header}>
					<h1>search by food</h1>
				</div>
				<div className={css.foodCardsContainer}>
					{food.map((item) => (
						<div key={nanoid()} className={css.foodCard}>
							<div className={css.imgWrapper}>
								<img src={item.image} alt='' />
							</div>
							<div className={css.foodNames}>
								<Link
									to={`/food/${item.name}`}
									className={css.foodName}
									name={item.name}>
									<h1>{item.name}</h1>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SearchByFood;
