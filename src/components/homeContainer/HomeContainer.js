import React from "react";
import HomeHero from "../homeHero/HomeHero";
import HomePopular from "../homePopular/HomePopular";
import HomeHowItWorks from "../homeHowItWorks/HomeHowItWorks";
import SearchByFood from "../recipesInfo/SearchByFood";

const HomeContainer = () => {
	return (
		<div>
			<HomeHero />
			<HomeHowItWorks />
			<HomePopular />
			<SearchByFood />
		</div>
	);
};

export default HomeContainer;
