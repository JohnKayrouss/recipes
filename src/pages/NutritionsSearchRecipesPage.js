import React from "react";
import { useParams } from "react-router-dom";
import NuritionsSearchRecipes from "../components/recipeNutritions/NuritionsSearchRecipes";

const NutritionsSearchRecipesPage = () => {
	let { id } = useParams();

	return <NuritionsSearchRecipes id={id} />;
};

export default NutritionsSearchRecipesPage;
