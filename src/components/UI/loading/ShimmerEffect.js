import React from "react";
import { PlaceholderImage, Placeholder } from "semantic-ui-react";
import css from "./shimmerImage.module.css";
import { nanoid } from "@reduxjs/toolkit";

const ShimmerEffect = ({
	updatedShimmerCard,
	updatedShimmerBox,
	numOfCards,
}) => {
	const shimmerCard = {
		width: 150,
		height: 150,
	};

	const shimmerBox = {
		width: "50%",
		height: "30em",
	};

	return (
		<div
			style={updatedShimmerBox ? updatedShimmerBox : shimmerBox}
			className={css.shimmerContainer}>
			{[...Array(numOfCards ? numOfCards : 3)].map(() => (
				<Placeholder
					style={updatedShimmerCard ? updatedShimmerCard : shimmerCard}
					className={css.card}
					key={nanoid()}>
					<PlaceholderImage />
				</Placeholder>
			))}
		</div>
	);
};

export default ShimmerEffect;
