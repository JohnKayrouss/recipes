import React from "react";
import css from "./orangeBtn.module.css";

const OrangeBtn = ({ btnContent, clickHandler }) => {
	const defaultClick = () => {
		return null;
	};

	return (
		<div className={css.btnContainer}>
			<button
				className={css.btn}
				onClick={clickHandler ? clickHandler : defaultClick}>
				<span>{btnContent ? btnContent : "Submit"}</span>
			</button>
		</div>
	);
};

export default OrangeBtn;
