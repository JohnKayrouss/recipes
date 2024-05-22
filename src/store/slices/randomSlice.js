import { createSlice } from "@reduxjs/toolkit";
import { randomRecipesThunk } from "../thunks/randomRecipesThunk";

const getRandom = createSlice({
	name: "random",
	initialState: {
		data: [],
		isLoading: false,
		error: null,
	},
	extraReducers(builder) {
		builder.addCase(randomRecipesThunk.pending, (state, { payload }) => {
			state.isLoading = true;
		});
		builder.addCase(randomRecipesThunk.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.data = payload;
		});
		builder.addCase(randomRecipesThunk.rejected, (state, { error }) => {
			state.isLoading = false;
			state.error = error;
		});
	},
});

export const randomReducer = getRandom.reducer;
