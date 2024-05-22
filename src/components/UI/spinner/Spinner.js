import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const Spinner = ({ updatedSpinnerStyles, title }) => {
	return (
		<Segment
			style={
				updatedSpinnerStyles || {
					width: "100%",
					height: "100%",
					border: "none",
				}
			}>
			<Dimmer active inverted>
				<Loader size='large'>Loading</Loader>
			</Dimmer>
			<div>
				<h1>{title || ""}</h1>
			</div>
		</Segment>
	);
};

export default Spinner;
