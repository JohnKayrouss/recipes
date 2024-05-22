import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import "./style.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import WrapperElement from "./WrapperElement";
import FoodListPage from "./pages/FoodListPage";
import PopularPage from "./pages/PopularPage";
import NutritionsPage from "./pages/NutritionsPage";
import NutritionsSearchRecipesPage from "./pages/NutritionsSearchRecipesPage";
import FindFilteredRecipesPage from "./pages/FindFilteredRecipesPage";
import SignUpPage from "./pages/SignUpPage";
import { userLoggedIn } from "./store/slices/isUserSlice";
import FavoirtePage from "./pages/FavoirtePage";

function App() {
	const location = useLocation();
	const navigation = [
		{ path: "/sign-in", element: <LoginPage /> },
		{ path: "/sign-up", element: <SignUpPage /> },
		{ path: "/recipe/info/:id", element: <RecipePage /> },
		{ path: "/", element: <HomePage /> },
		{ path: "/food/:name", element: <FoodListPage /> },
		{ path: "/food", element: <FindFilteredRecipesPage /> },
		{ path: "/popular", element: <PopularPage /> },
		{ path: "/nutritions", element: <NutritionsSearchRecipesPage /> },
		{ path: "/recipe/nutritions/:id", element: <NutritionsPage /> },
		{ path: "/user/favorite", element: <FavoirtePage /> },
	];
	const dispatch = useDispatch();

	useEffect(() => {
		const checkIfUser = onAuthStateChanged(auth, async (user) => {
			try {
				if (user) {
					const userData = localStorage.getItem(user.uid);
					if (userData) {
						const convertToObj = JSON.parse(userData);
						dispatch(userLoggedIn(convertToObj));
					}
				}
			} catch (error) {
				return error;
			}
		});

		return () => {
			checkIfUser();
		};
	}, [dispatch, location]);

	return (
		<React.Fragment>
			<Routes>
				{navigation.map((page) => (
					<Route
						exact
						key={page.path}
						path={page.path}
						element={<WrapperElement />}>
						<Route
							path={page.path}
							element={page.element}
							key={page.path}
							exact
						/>
					</Route>
				))}
			</Routes>
		</React.Fragment>
	);
}

export default App;
