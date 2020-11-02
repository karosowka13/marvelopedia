import React from "react";
import { Link } from "react-router-dom";
import marvelLogo from "../../assets/logo-marvel.png";
import classes from "./Logo.module.css";

const logo = (props) => (
	<div className={classes.Logo} style={{ height: props.height }}>
		<Link to="/">
			<img src={marvelLogo} alt="marvel_logo" />
		</Link>
	</div>
);

export default logo;
