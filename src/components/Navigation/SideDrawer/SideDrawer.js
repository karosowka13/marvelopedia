import React from "react";
import PropTypes from "prop-types";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = ({ open, closed, isAuth }) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}
	return (
		<React.Fragment>
			<Backdrop show={open} clicked={closed} />
			<div className={attachedClasses.join(" ")} onClick={closed}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuthenticated={isAuth} />
				</nav>
			</div>
		</React.Fragment>
	);
};

export default sideDrawer;

sideDrawer.propTypes = {
	open: PropTypes.bool,
	closed: PropTypes.func,
	isAuth: PropTypes.bool,
};
