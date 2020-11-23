import React from "react";
import PropTypes from "prop-types";

import classes from "./DrawerToggle.module.css";

const drawerToggle = ({ clicked }) => (
	<div className={classes.DrawerToggle} onClick={clicked}>
		<div></div>
		<div></div>
		<div></div>
	</div>
);

export default drawerToggle;

drawerToggle.propTypes = {
	clicked: PropTypes.func,
};
