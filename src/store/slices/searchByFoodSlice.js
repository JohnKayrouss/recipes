import { createSlice } from "@reduxjs/toolkit";
import { searchByFoodThunk } from "../thunks/searchByFoodThunk";

const searchByfoodSlice = createSlice({
	name: "searchByFood",
	initialState: {
		data: [],
		isLoading: false,
		error: null,
	},
	extraReducers(builder) {
		builder.addCase(searchByFoodThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(searchByFoodThunk.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.data = payload;
		});
		builder.addCase(searchByFoodThunk.rejected, (state, { error }) => {
			state.isLoading = false;
			state.error = error;
		});
	},
});

export const searchByFoodReducer = searchByfoodSlice.reducer;
