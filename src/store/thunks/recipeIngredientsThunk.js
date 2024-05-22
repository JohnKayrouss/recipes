import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const recipeIngredientsThunk = createAsyncThunk(
	"recipeIngredients/fetch",
	async (id) => {
		const resp = await axios.get(
			`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`
		);
		return resp.data.ingredients;
	}
);

export { recipeIngredientsThunk };
