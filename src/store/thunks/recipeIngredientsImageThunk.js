import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const recipeIngredientsImageThunk = createAsyncThunk(
	"ingredientsImage/fetch",
	async (id) => {
		const response = await axios.get(
			`https://api.spoonacular.com/recipes/${id}/ingredientWidget.png?apiKey=${process.env.REACT_APP_API_KEY}`
		);
		return response.config.url;
		// return response.data;
	}
);

export { recipeIngredientsImageThunk };
