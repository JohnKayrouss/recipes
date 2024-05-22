import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const searchRecipesThunk = createAsyncThunk("search/fetch", async (value) => {
	const response = await axios.get(
		`https://api.spoonacular.com/recipes/autocomplete?apiKey=${process.env.REACT_APP_API_KEY}&query=${value}`
	);
	return response["data"];
});

export { searchRecipesThunk };
