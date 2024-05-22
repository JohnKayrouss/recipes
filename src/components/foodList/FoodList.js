import React from "react";
import css from "./foodList.module.css";
import SidebarFoodList from "./SidebarFoodList";
import FoodListCardsContainer from "./FoodListCardsContainer";

const FoodList = ({ name, isSearchFood }) => {
	return (
		<div className={css.FoodListContainer}>
			<SidebarFoodList name={name} isSearchFood={isSearchFood} />
			<FoodListCardsContainer name={name} isSearchFood={isSearchFood} />
		</div>
	);
};

export default FoodList;
