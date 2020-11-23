import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
	const [showSideDrawer, setShowSideDrawer] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.token !== null);

	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false);
	};

	const sideDrawerToggleHandler = () => {
		setShowSideDrawer(!showSideDrawer);
	};
	return (
		<React.Fragment>
			<Toolbar
				isAuth={isAuthenticated}
				drawerToggleClicked={sideDrawerToggleHandler}
			/>
			<SideDrawer
				isAuth={isAuthenticated}
				open={showSideDrawer}
				closed={sideDrawerClosedHandler}
			/>
			<main className={classes.Content}>{children}</main>
		</React.Fragment>
	);
};

export default Layout;

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};
