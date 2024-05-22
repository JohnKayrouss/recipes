import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import css from "./sidebarFoodList.module.css";
import {
	MenuMenu,
	MenuItem,
	Menu,
	Checkbox,
	FormInput,
} from "semantic-ui-react";
import OrangeBtn from "../UI/buttons/OrangeBtn";
import { filteredRecipesThunk } from "../../store/thunks/filteredRecipesThunk";
import {
	filterBtnActive,
	filterBtnInactive,
} from "../../store/slices/filteredRecipesSlice";
const SidebarFoodList = ({ name, isSearchFood }) => {
	const initialFoodTypesState = {
		dessert: false,
		seafood: false,
		Appetizers: false,
		pasta: false,
		soup: false,
		steak: false,
		chicken: false,
		salads: false,
		Casseroles: false,
		burger: false,
		pizza: false,
		noodles: false,
	};
	const initialCuisineState = {
		American: false,
		Asian: false,
		Italian: false,
		French: false,
		Mexican: false,
		African: false,
	};
	const initialDietsState = {
		"Gluten Free": false,
		Vegetarian: false,
		Vegan: false,
		Ketogenic: false,
	};
	const initialCaloriesState = 4000;
	const dispatch = useDispatch();
	const [calories, setCalories] = useState(initialCaloriesState);
	const [activeItem, setActiveItem] = useState("");
	const [foodType, setFoodType] = useState(initialFoodTypesState);
	const [cuisineName, setCuisineName] = useState(initialCuisineState);
	const [dietName, setdietsName] = useState(initialDietsState);
	const [isClearAllClicked, setIsClearAllClicked] = useState(false);

	const filterBtnClicked = useSelector(
		(store) => store.filteredRecipes.filterBtnClicked
	);
	const { isUser, userInformation } = useSelector((store) => store.user);

	const handleItemClick = (name) => {
		setActiveItem(name);
	};
	const handleCaloriesChange = (e) => {
		setCalories(e.target.value);
	};
	const handleFoodTypeChange = (item, value) => {
		setFoodType((prevValue) => {
			const x = { ...prevValue };
			x[item] = value;
			return x;
		});
	};
	const handleCuisineChange = (item, value) => {
		setCuisineName((prevValue) => {
			const x = { ...prevValue };
			x[item] = value;
			return x;
		});
	};
	const handleDietChange = (item, value) => {
		setdietsName((prevValue) => {
			const x = { ...prevValue };
			x[item] = value;
			return x;
		});
	};
	const cuisineHasChanged =
		JSON.stringify(cuisineName) !== JSON.stringify(initialCuisineState);
	const foodTypesHasChanged =
		JSON.stringify(foodType) !== JSON.stringify(initialFoodTypesState);
	const DietsHasChanged =
		JSON.stringify(dietName) !== JSON.stringify(initialDietsState);
	const CaloriesHasChanged = String(calories) !== String(initialCaloriesState);
	const handleApplyFilters = () => {
		const foodTypeList = Object.keys(foodType)
			.filter((item) => foodType[item] === true)
			.join(", ");
		const cuisineList = Object.keys(cuisineName)
			.filter((item) => cuisineName[item] === true)
			.join(", ");

		const dietsList = Object.keys(dietName)
			.filter((item) => dietName[item] === true)
			.join(", ");

		dispatch(
			filteredRecipesThunk({
				queryName: isSearchFood ? foodTypeList : name,
				cuisineName: cuisineList,
				maxCaloriesAmount: calories,
				dietName: dietsList,
			})
		);
		dispatch(filterBtnActive());
	};
	const handleClearAllBtn = () => {
		dispatch(filterBtnInactive());

		setIsClearAllClicked(false);
		setCalories(initialCaloriesState);
		setActiveItem("");
		setCuisineName(initialCuisineState);
		setdietsName(initialDietsState);
		setFoodType(initialFoodTypesState);
	};

	return (
		<div className={css.sideMenuContainer}>
			<Menu vertical className={css.sidebar}>
				{isSearchFood && (
					<MenuItem className={css.foodTypesContainer}>
						<h1>Food Types</h1>
						<MenuMenu>
							<MenuItem
								className={css.checkboxesContainer}
								name='foodType'
								active={activeItem === "foodType"}
								onClick={() => handleItemClick("foodType")}>
								{Object.keys(foodType).map((item) => (
									<Checkbox
										className={css.checkbox}
										label={item}
										checked={foodType[item]}
										key={item}
										onChange={(e, data) =>
											handleFoodTypeChange(item, data.checked)
										}
									/>
								))}
							</MenuItem>
						</MenuMenu>
					</MenuItem>
				)}
				<MenuItem className={css.cuisineContainer}>
					<h1>Cuisine</h1>
					<MenuMenu>
						<MenuItem
							className={css.checkboxesContainer}
							name='cuisine'
							active={activeItem === "cuisine"}
							onClick={() => handleItemClick("cuisine")}>
							{Object.keys(cuisineName).map((item) => (
								<Checkbox
									className={css.checkbox}
									label={item}
									checked={cuisineName[item]}
									key={item}
									onChange={(e, data) =>
										handleCuisineChange(item, data.checked)
									}
								/>
							))}
						</MenuItem>
					</MenuMenu>
				</MenuItem>
				<MenuItem className={css.dietsContainer}>
					<h1>Diets</h1>
					<MenuMenu>
						<MenuItem
							className={css.checkboxesContainer}
							name='diets'
							active={activeItem === "diets"}
							onClick={() => handleItemClick("diets")}>
							{Object.keys(dietName).map((item) => (
								<Checkbox
									className={css.checkbox}
									label={item}
									checked={dietName[item]}
									key={item}
									onChange={(e, data) => handleDietChange(item, data.checked)}
								/>
							))}
						</MenuItem>
					</MenuMenu>
				</MenuItem>

				<MenuItem className={css.caloriesContainer}>
					<h1>Calories</h1>
					<MenuMenu>
						<MenuItem
							className={css.caloriesRadioContainer}
							name='calories'
							active={activeItem === "calories"}
							onClick={() => handleItemClick("calories")}>
							<FormInput
								className={css.caloriesRadioBtn}
								label={`per serving: ${calories} kcal `}
								min={100}
								max={5000}
								name='calories'
								onChange={handleCaloriesChange}
								step={10}
								type='range'
								value={calories}
							/>
						</MenuItem>
					</MenuMenu>
				</MenuItem>
				<div className={css.btnsContainer}>
					{(cuisineHasChanged ||
						foodTypesHasChanged ||
						DietsHasChanged ||
						CaloriesHasChanged ||
						filterBtnClicked ||
						isClearAllClicked) && (
						<div className={css.seeFiltersBtn}>
							<OrangeBtn
								btnContent={"see filters"}
								clickHandler={handleApplyFilters}
							/>
						</div>
					)}

					{(cuisineHasChanged ||
						foodTypesHasChanged ||
						DietsHasChanged ||
						CaloriesHasChanged ||
						isClearAllClicked ||
						filterBtnClicked) && (
						<div className={css.clearAllBtn}>
							<OrangeBtn
								btnContent={"clear all"}
								clickHandler={handleClearAllBtn}
							/>
						</div>
					)}
				</div>
			</Menu>
		</div>
	);
};

export default SidebarFoodList;
