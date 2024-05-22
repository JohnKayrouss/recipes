import { createSlice } from "@reduxjs/toolkit";
import { favoriteRecipesThunk } from "../thunks/favoriteRecipesThunk";

const isUserSlice = createSlice({
	name: "isUser",
	initialState: {
		isUser: false,
		isLoading: false,
		favList: [],
		userInformation: {
			username: "",
			userId: "",
			favRecipes: [],
		},
	},
	reducers: {
		userSignedUp(state, { payload }) {
			state.isUser = true;
			state.userInformation = {
				username: payload.username.replace(/\@.*/g, "$'"),
				userId: payload.userId,
				favRecipes: [],
			};
			localStorage.setItem(
				`${payload.userId}`,
				JSON.stringify(state.userInformation)
			);
		},
		userLoggedIn(state, { payload }) {
			state.isUser = true;
			state.userInformation = {
				username: payload.username.replace(/\@.*/g, "$'"),
				userId: payload.userId,
				favRecipes: payload.favRecipes,
			};

			const storedUserData = JSON.parse(localStorage.getItem(payload.userId));
			if (!storedUserData) {
				localStorage.setItem(
					payload.userId,
					JSON.stringify(state.userInformation)
				);
			} else {
				localStorage.setItem(
					payload.userId,
					JSON.stringify({
						...storedUserData,
						favRecipes: payload.favRecipes,
					})
				);
			}
		},
		userLoggedOut(state) {
			state.isUser = false;
			state.userInformation = {
				username: "",
				userId: "",
				favRecipes: [],
			};
		},
	},
	extraReducers(builder) {
		builder.addCase(favoriteRecipesThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(favoriteRecipesThunk.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.favList = payload;
		});
		builder.addCase(favoriteRecipesThunk.rejected, (state, { error }) => {
			state.isLoading = false;
			state.error = error;
		});
	},
});
export const { userSignedUp, userLoggedIn, userLoggedOut } =
	isUserSlice.actions;
export const isUserReducer = isUserSlice.reducer;
