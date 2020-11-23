import React from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.css";

const button = (props) => (
	<button
		disabled={props.disabled}
		className={[classes.Button, classes[props.btnType]].join(" ")}
		onClick={props.clicked}
	>
		{props.children}
	</button>
);

export default button;

button.propTypes = {
	disabled: PropTypes.bool,
	btnType: PropTypes.oneOf(["GoTo", "Success", "Danger"]),
	clicked: PropTypes.func,
	children: PropTypes.string,
};
