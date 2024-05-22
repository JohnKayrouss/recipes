import React from "react";
import { useParams } from "react-router-dom";

import RecipeInfoContainer from "../components/recipesInfo/RecipeInfoContainer";

const RecipePage = () => {
	let { id } = useParams();
	return <RecipeInfoContainer id={id} />;
};

export default RecipePage;
