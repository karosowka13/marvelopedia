import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => {
	let navLinkClass = null;
	if (props.disabled) {
		navLinkClass = [classes.NavigationItem, classes.Disabled].join(" ");
	} else navLinkClass = classes.NavigationItem;
	return (
		<li className={navLinkClass}>
			{props.elementId ? (
				<div id={props.elementId}>{props.children}</div>
			) : (
				<NavLink
					to={props.link}
					exact={props.exact}
					activeClassName={classes.active}
				>
					{props.children}
				</NavLink>
			)}
		</li>
	);
};

export default navigationItem;

navigationItem.propTypes = {
	disabled: PropTypes.bool,
	elementId: PropTypes.string,
	link: PropTypes.string,
	exact: PropTypes.bool,
	children: PropTypes.string,
};
