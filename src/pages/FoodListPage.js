import React from "react";
import FoodList from "../components/foodList/FoodList";
import { useParams } from "react-router-dom";

const FoodListPage = () => {
	const { name } = useParams();
	return <FoodList name={name} />;
};

export default FoodListPage;

// cusienes - diet (minCalories - maxCalories)

/*
	state withoutfilters => searchBYfood

	add filter -> adde it to the thunk

	empty state -> 'none found'









*/
