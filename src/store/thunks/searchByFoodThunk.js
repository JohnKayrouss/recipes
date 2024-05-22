import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const searchByFoodThunk = createAsyncThunk(
	"searchByFood/fetch",
	async ({ num, queryName }) => {
		const response = await axios.get(
			`https://api.spoonacular.com/recipes/complexSearch?number=${num}&apiKey=${process.env.REACT_APP_API_KEY}&query=${queryName}`
		);
		return response["data"]["results"];
	}
);
export { searchByFoodThunk };
