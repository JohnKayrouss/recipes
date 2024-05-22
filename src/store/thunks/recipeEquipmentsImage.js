import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const recipeEquipmentsImageThunk = createAsyncThunk(
	"equipmentsImage/fetch",
	async (id) => {
		const response = await axios.get(
			`https://api.spoonacular.com/recipes/${id}/equipmentWidget.png?apiKey=${process.env.REACT_APP_API_KEY}`
		);
		return response.config.url;
		// return response.data;
	}
);

export { recipeEquipmentsImageThunk };
