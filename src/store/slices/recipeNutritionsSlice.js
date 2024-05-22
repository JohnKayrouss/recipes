import { createSlice } from "@reduxjs/toolkit";
import { nutritionalInfoThunk } from "../thunks/nutritionalInfoThunk";
import { nutritionsLabelThunk } from "../thunks/nutritionsLabelThunk";
import { recipeTasteThunk } from "../thunks/recipeTasteThunk";

const recipeNutritionsSlice = createSlice({
	name: "nutritions",
	initialState: {
		nutritionalInfoImg: "",
		isLoadingNutritionalInfoImg: false,
		nutritionsLabelImg: "",
		isLoadingNutritionsLabelImg: false,
		recipeTaste: "",
		isLoadingRecipeTaste: false,
		error: null,
	},
	extraReducers(builder) {
		//= get nutritional info image
		builder.addCase(nutritionalInfoThunk.pending, (state) => {
			state.isLoadingNutritionalInfoImg = true;
		});
		builder.addCase(nutritionalInfoThunk.fulfilled, (state, { payload }) => {
			state.isLoadingNutritionalInfoImg = false;
			state.nutritionalInfoImg = payload;
		});
		builder.addCase(nutritionalInfoThunk.rejected, (state, { error }) => {
			state.isLoadingNutritionalInfoImg = false;
			state.error = error;
		});
		//= get nutrition label  image
		builder.addCase(nutritionsLabelThunk.pending, (state) => {
			state.isLoadingNutritionsLabelImg = true;
		});
		builder.addCase(nutritionsLabelThunk.fulfilled, (state, { payload }) => {
			state.isLoadingNutritionsLabelImg = false;
			state.nutritionsLabelImg = payload;
		});
		builder.addCase(nutritionsLabelThunk.rejected, (state, { error }) => {
			state.isLoadingNutritionsLabelImg = false;
			state.error = error;
		});
		//= get recipe taste image
		builder.addCase(recipeTasteThunk.pending, (state) => {
			state.isLoadingRecipeTaste = true;
		});
		builder.addCase(recipeTasteThunk.fulfilled, (state, { payload }) => {
			state.isLoadingRecipeTaste = false;
			state.recipeTaste = payload;
		});
		builder.addCase(recipeTasteThunk.rejected, (state, { error }) => {
			state.isLoadingRecipeTaste = false;
			state.error = error;
		});
	},
});

export const recipeNutritionsReducer = recipeNutritionsSlice.reducer;
