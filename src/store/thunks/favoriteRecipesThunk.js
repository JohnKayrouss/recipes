import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const favoriteRecipesThunk = createAsyncThunk(
	"favoriteRecipes/fetch",
	async (listOfRecipes) => {
		const response = await axios.get(
			`https://api.spoonacular.com/recipes/informationBulk?ids=${listOfRecipes}&apiKey=${process.env.REACT_APP_API_KEY}`
		);
		return response.data;
	}
);

export { favoriteRecipesThunk };
