import React from "react";
import PropTypes from "prop-types";

import classes from "./Backdrop.module.css";

const backdrop = ({ show, clicked }) =>
	show ? <div className={classes.Backdrop} onClick={clicked}></div> : null;

export default backdrop;

backdrop.propTypes = {
	clicked: PropTypes.func,
	show: PropTypes.bool,
};
