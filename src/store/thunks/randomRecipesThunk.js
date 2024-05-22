import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const randomRecipesThunk = createAsyncThunk(
	"recipes/fetch",
	async (numOfRecipes) => {
		const response = await axios.get(
			`https://api.spoonacular.com/recipes/random?number=${numOfRecipes}&apiKey=${process.env.REACT_APP_API_KEY}`
		);
		return response.data.recipes;
	}
);

export { randomRecipesThunk };
