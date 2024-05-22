import React from "react";
import css from "./homeHowItWorks.module.css";
import icon_1 from "../../assets/icons/Icon_1.png";
import icon_2 from "../../assets/icons/Icon_2.png";
import icon_3 from "../../assets/icons/Icon_3.png";
import icon_4 from "../../assets/icons/Icon_4.png";
import { nanoid } from "@reduxjs/toolkit";

const HomeHowItWorks = () => {
	const content = [
		{
			img: icon_1,
			header: "From all over the world",
			txt: "Recipes based on popular kitchens ",
		},
		{
			img: icon_2,
			header: "Choose recipes ",
			txt: "Select your preference",
		},
		{
			img: icon_3,
			header: "Calculate your budget",
			txt: "Some ingredients can be substituted with less expensive components",
		},
		{
			img: icon_4,
			header: "Enjoy meals",
			txt: "Travel the world from your kitchen",
		},
	];
	return (
		<div className={css.howItWorksContainer}>
			<div className={css.header}>
				<h1>How does it work</h1>
			</div>
			<div className={css.content}>
				{content.map((item) => (
					<div className={css.card} key={nanoid()}>
						<img src={item.img} />
						<div className={css.cardContent}>
							<h3>{item.header}</h3>
							<p>{item.txt}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default HomeHowItWorks;
