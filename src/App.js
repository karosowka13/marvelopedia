import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Marvelopedia from "./containers/Marvelopedia/Marvelopedia";
import FavouritesCards from "./containers/FavouritesCards/FavouritesCards";
import Card from "./containers/Card/Card";
import PrivateRoute from "./hoc/PrivateRoute/PrivateRoute";

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path="/login" component={Auth} />
						<PrivateRoute
							path="/favorite"
							component={FavouritesCards}
							isAuthenticated={this.props.isAuthenticated}
						/>
						<Route path="/logout" component={Logout} />
						<Route path="/:characterName" component={Card} />
						<Route path="/" exact component={Marvelopedia} />
						<Redirect to="/" />
					</Switch>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
