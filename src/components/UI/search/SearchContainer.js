import React, { useEffect, useState } from "react";
import css from "./searchContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { searchRecipesThunk } from "../../../store/thunks/searchRecipesThunk";
import SearchResultsList from "./SearchResultsList";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchContainer = ({
	getNutritions,
	searchContainerStyles,
	searchListStyles,
	searchItemStyles,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [value, setValue] = useState("");
	useEffect(() => {
		if (value.length !== 0) {
			const timeoutId = setTimeout(() => {
				dispatch(searchRecipesThunk(value));
			}, 500);

			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [value]);

	const handleInputChange = (e) => {
		setValue(e.target.value);
	};

	const btnStyles = {
		background: "linear-gradient(95.71deg, #FF7A7A -39.64%, #F75900 135.31%)",
		color: "#fff",
	};
	const findFoodHandler = () => {
		if (value) {
			navigate(`/popular`);
		}
	};
	return (
		<React.Fragment>
			<div className={css.searchContainer} style={searchContainerStyles || {}}>
				<input
					className={css.homeInput}
					type='text'
					value={value}
					placeholder='Search recipes'
					onChange={handleInputChange}
				/>
				<div className={css.btnContainer}>
					<button className={css.btn} onClick={findFoodHandler}>
						<FaSearch className={css.btnIcon} />
						<span>Find Food</span>
					</button>
				</div>
			</div>
			<SearchResultsList
				value={value}
				searchListStyles={searchListStyles}
				searchItemStyles={searchItemStyles}
				getNutritions={getNutritions}
			/>
		</React.Fragment>
	);
};

export default SearchContainer;
