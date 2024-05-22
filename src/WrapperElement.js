import React from "react";

import { Outlet, useLocation } from "react-router-dom";
import HeaderContainer from "./components/homeHeader/HeaderContainer";

const WrapperElement = () => {
	let location = useLocation();
	return (
		<React.Fragment>
			{location.pathname !== "/sign-in" && location.pathname !== "/sign-up" && (
				<HeaderContainer />
			)}

			<Outlet />
		</React.Fragment>
	);
};

export default WrapperElement;
