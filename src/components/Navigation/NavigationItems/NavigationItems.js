import React from "react";
import PropTypes from "prop-types";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import useLogout from "../../../hooks/useLogout";

const NavigationItems = ({ isAuthenticated }) => {
	const elementId = "logout";
	useLogout(elementId);
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact>
				Marvelopedia
			</NavigationItem>

			<NavigationItem link="/favorite">Favourites</NavigationItem>

			{!isAuthenticated ? (
				<NavigationItem link="/login">Sign in</NavigationItem>
			) : (
				<NavigationItem elementId={elementId} link="/logout">
					Logout
				</NavigationItem>
			)}
		</ul>
	);
};

export default NavigationItems;

NavigationItems.propTypes = {
	isAutheniticated: PropTypes.bool,
};
