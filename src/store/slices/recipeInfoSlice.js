import { createSlice } from "@reduxjs/toolkit";

import { recipeInfoThunk } from "../thunks/recipeInfoThunk";
import { recipeIngredientsThunk } from "../thunks/recipeIngredientsThunk";
import { recipeEquipmentsImageThunk } from "../thunks/recipeEquipmentsImage";
import { recipeIngredientsImageThunk } from "../thunks/recipeIngredientsImageThunk";

const getRecipeInformation = createSlice({
	name: "info",
	initialState: {
		data: [],
		isLoading: false,
		error: null,
		ingredients: [],
		isLoadingIngredients: false,
		ingredientsImage: "",
		isLoadingIngredientsImage: false,
		EquipmentsImage: "",
		isLoadingEquipmentsImage: false,
	},
	extraReducers(builder) {
		// =getting all data
		builder.addCase(recipeInfoThunk.pending, (state, { payload }) => {
			state.isLoading = true;
		});
		builder.addCase(recipeInfoThunk.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.data = payload;
		});
		builder.addCase(recipeInfoThunk.rejected, (state, { error }) => {
			state.isLoading = false;
			state.error = error;
		});
		//= getting ingredients array
		builder.addCase(recipeIngredientsThunk.pending, (state, { payload }) => {
			state.isLoadingIngredients = true;
		});
		builder.addCase(recipeIngredientsThunk.fulfilled, (state, { payload }) => {
			state.isLoadingIngredients = false;
			state.ingredients = payload;
		});
		builder.addCase(recipeIngredientsThunk.rejected, (state, { error }) => {
			state.isLoadingIngredients = false;
			state.error = error;
		});
		//= getting ingredients image
		builder.addCase(
			recipeIngredientsImageThunk.pending,
			(state, { payload }) => {
				state.isLoadingIngredientsImage = true;
			}
		);
		builder.addCase(
			recipeIngredientsImageThunk.fulfilled,
			(state, { payload }) => {
				state.isLoadingIngredientsImage = false;
				state.ingredientsImage = payload;
			}
		);
		builder.addCase(
			recipeIngredientsImageThunk.rejected,
			(state, { error }) => {
				state.isLoadingIngredientsImage = false;
				state.error = error;
			}
		);
		//= getting equipments image

		builder.addCase(
			recipeEquipmentsImageThunk.pending,
			(state, { payload }) => {
				state.isLoadingEquipmentsImage = true;
			}
		);
		builder.addCase(
			recipeEquipmentsImageThunk.fulfilled,
			(state, { payload }) => {
				state.isLoadingEquipmentsImage = false;
				state.EquipmentsImage = payload;
			}
		);
		builder.addCase(recipeEquipmentsImageThunk.rejected, (state, { error }) => {
			state.isLoadingEquipmentsImage = false;
			state.error = error;
		});
	},
});
export const recipeInfoReducer = getRecipeInformation.reducer;
