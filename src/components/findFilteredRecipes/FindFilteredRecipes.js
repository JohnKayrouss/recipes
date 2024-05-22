import React, { useState } from "react";
import FoodList from "../foodList/FoodList";

const FindFilteredRecipes = () => {
	const [isSearchFood, setIsSearchFood] = useState(true);
	return (
		<div>
			<FoodList isSearchFood={isSearchFood} />
		</div>
	);
};

export default FindFilteredRecipes;
