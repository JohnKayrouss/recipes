import { createSlice } from "@reduxjs/toolkit";
import { searchRecipesThunk } from "../thunks/searchRecipesThunk";
const searchRecipesSlice = createSlice({
	name: "search",
	initialState: {
		data: [],
		isLoading: false,
		error: null,
	},
	extraReducers(builder) {
		builder.addCase(searchRecipesThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(searchRecipesThunk.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.data = payload;
		});
		builder.addCase(searchRecipesThunk.rejected, (state, { error }) => {
			state.isLoading = false;
			state.error = error;
		});
	},
});
export const searchRecipesReducer = searchRecipesSlice.reducer;
