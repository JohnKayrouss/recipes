import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const filteredRecipesThunk = createAsyncThunk(
	"filteredRecipes/fetch",
	async ({ queryName, cuisineName, maxCaloriesAmount, dietName }) => {
		const response = await axios.get(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${
				process.env.REACT_APP_API_KEY
			}${queryName ? `&query=${queryName}` : ""}${
				cuisineName ? `&cuisine=${cuisineName}` : ""
			}${maxCaloriesAmount ? `&maxCalories=${maxCaloriesAmount}` : ""}${
				dietName ? `&diet=${dietName}` : ""
			}`
		);
		return response["data"]["results"];
	}
);

export { filteredRecipesThunk };
