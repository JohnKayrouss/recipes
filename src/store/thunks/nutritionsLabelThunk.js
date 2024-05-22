import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const nutritionsLabelThunk = createAsyncThunk(
	"nutritionsLabel/fetch",
	async (id) => {
		const response = await axios.get(
			`https://api.spoonacular.com/recipes/${id}/nutritionLabel.png?apiKey=${process.env.REACT_APP_API_KEY}`
		);
		return response.config.url;
		// return response.data;
	}
);
export { nutritionsLabelThunk };
