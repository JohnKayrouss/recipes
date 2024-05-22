import React from "react";
import { useParams } from "react-router-dom";
import NutritionsContainer from "../components/recipeNutritions/NutritionsContainer";

const NutritionsPage = () => {
	let { id } = useParams();
	return <NutritionsContainer id={id} />;
};

export default NutritionsPage;
