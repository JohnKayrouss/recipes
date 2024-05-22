import { createSlice } from "@reduxjs/toolkit";
import { filteredRecipesThunk } from "../thunks/filteredRecipesThunk";

const filteredRecipesSlice = createSlice({
	name: "filteredRecipes",
	initialState: {
		filterBtnClicked: false,
		filteredData: [],
		isLoading: false,
		error: null,
	},
	reducers: {
		filterBtnActive: (state) => {
			state.filterBtnClicked = true;
		},
		filterBtnInactive: (state) => {
			state.filterBtnClicked = false;
		},
	},
	extraReducers(builder) {
		builder.addCase(filteredRecipesThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(filteredRecipesThunk.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.filteredData = payload;
		});
		builder.addCase(filteredRecipesThunk.rejected, (state, { error }) => {
			state.isLoading = false;
			state.error = error;
		});
	},
});

export const { filterBtnActive, filterBtnInactive } =
	filteredRecipesSlice.actions;

export const filteredRecipesReducer = filteredRecipesSlice.reducer;
