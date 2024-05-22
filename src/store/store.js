import { configureStore } from "@reduxjs/toolkit";
import { randomReducer } from "./slices/randomSlice";
import { recipeInfoReducer } from "./slices/recipeInfoSlice";
import { searchByFoodReducer } from "./slices/searchByFoodSlice";
import { filteredRecipesReducer } from "./slices/filteredRecipesSlice";
import { searchRecipesReducer } from "./slices/searchRecipesSlice";
import { recipeNutritionsReducer } from "./slices/recipeNutritionsSlice";
import { isUserReducer } from "./slices/isUserSlice";

export const store = configureStore({
	reducer: {
		random: randomReducer,
		recipeInfo: recipeInfoReducer,
		searchByFood: searchByFoodReducer,
		filteredRecipes: filteredRecipesReducer,
		searchRecipes: searchRecipesReducer,
		recipeNutritions: recipeNutritionsReducer,
		user: isUserReducer,
	},
});
