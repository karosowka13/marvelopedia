import React, { Component } from "react";
//import { connect } from "react-redux";

import classes from "./Layout.modules.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		const isAuthenticated = false;
		return (
			<React.Fragment>
				<Toolbar
					isAuth={isAuthenticated}
					drawerToggleClicked={this.sideDrawerToggleHandler}
				/>
				<SideDrawer
					isAuth={isAuthenticated}
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>{this.children}</main>
			</React.Fragment>
		);
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		isAuthenticated: state.auth.token !== null,
// 	};
// };

// export default connect(mapStateToProps)(Layout);
export default Layout;
