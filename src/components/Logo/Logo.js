import React from "react";

import marvelLogo from "../../assets/logo-marvel.png";
import classes from "./Logo.module.css";

const logo = (props) => (
	<div className={classes.Logo} style={{ height: props.height }}>
		<img src={marvelLogo} alt="Mymarvel" />
	</div>
);

export default logo;
