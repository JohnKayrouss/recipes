import React, { useState } from "react";
import css from "./recipeMoreInfo.module.css";
import { nanoid } from "@reduxjs/toolkit";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const RecipeMoreInfo = ({
	cardContent,
	data,
	ingredients,
	isLoading,
	isLoadingIngredients,
}) => {
	const [getIndex, setGetIndex] = useState(0);

	const itemIndex = (index) => {
		setGetIndex(index);
	};

	if (isLoading && isLoadingIngredients) {
		return (
			<div className={css.SpinnerMoreInfoContainer}>
				<Segment style={{ width: "100%", height: "100%", border: "none" }}>
					<Dimmer active inverted>
						<Loader size='large'>Loading</Loader>
					</Dimmer>
					<div className={css.recipeTitle}>
						<h1>see more info:</h1>
					</div>
				</Segment>
			</div>
		);
	}
	if (data && ingredients) {
		return (
			<div className={css.recipeCard}>
				<div className={css.header}>
					<h1>see more info:</h1>
				</div>
				<div className={css.infoContainer}>
					<div className={css.tabs}>
						{cardContent.map((item, idx) => (
							<div
								key={nanoid()}
								onClick={() => itemIndex(idx)}
								className={`${
									getIndex === idx
										? `${css.tab} ${css.activeTab}`
										: `${css.tab}`
								}`}>
								<p>{item.header}</p>
							</div>
						))}
					</div>
					<div className={css.contents}>
						{cardContent.map((item, idx) => (
							<div
								key={nanoid()}
								className={`${
									getIndex === idx
										? `${css.content} ${css.activeContent}`
										: `${css.content}`
								}`}>
								<div>
									{!Array.isArray(cardContent[idx].content) ? (
										<p>{item.content}</p>
									) : (
										<ul>
											{item.content.map((nested) => (
												<li key={nanoid()}>{nested}</li>
											))}
										</ul>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
};

export default RecipeMoreInfo;
