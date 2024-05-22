import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const recipeInfoThunk = createAsyncThunk("recipe/fetch", async (id) => {
	const response = await axios.get(
		`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
	);
	return response.data;
});

export { recipeInfoThunk };
