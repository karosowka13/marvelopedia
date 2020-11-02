import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Marvelopedia from "./containers/Marvelopedia/Marvelopedia";
import SavedCards from "./containers/SavedCards/SavedCards";
import Card from "./components/Card/Card";

class App extends Component {
	render() {
		let routes = (
			<Switch>
				<Route exact path="/auth" component={Auth} />
				<Route exact path="/logout" component={Logout} />
				<Route exact path="/:characterName" component={Card} />
				<Route path="/" exact component={Marvelopedia} />
				<Redirect to="/" />
			</Switch>
		);
		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route exact path="/auth" component={Auth} />
					<Route exact path="/favorite" component={SavedCards} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/:characterName" component={Card} />
					<Route path="/" exact component={Marvelopedia} />
					<Redirect to="/" />
				</Switch>
			);
		}
		return (
			<div>
				<Layout>{routes}</Layout>
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
