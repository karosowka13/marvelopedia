import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
//import Auth from "./containers/Auth/Auth";
//import Logout from "./containers/Auth/Logout/Logout";
import Cart from "./components/Cart/Cart";
import Marvelopedia from "./containers/Marvelopedia/Marvelopedia";
import SavedCards from "./containers/SavedCards/SavedCards";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { isAuthenticated: false };
	}
	render() {
		let routes = (
			<Switch>
				{/* <Route path="/auth" component={Auth} /> */}
				<Route path="/:name" component={Cart} />
				<Route path="/" exact>
					<Marvelopedia />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/favorite" component={SavedCards} />
					{/* <Route path="/logout" component={Logout} /> */}
					<Route path="/:name" component={Cart} />
					<Route path="/" component={Marvelopedia} exact />
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
export default withRouter(App);
