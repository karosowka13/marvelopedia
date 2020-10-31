import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";
//import Auth from "./containers/Auth/Auth";
//import Logout from "./containers/Auth/Logout/Logout";
import Card from "./components/Card/Card";
import Marvelopedia from "./containers/Marvelopedia/Marvelopedia";
import SavedCards from "./containers/SavedCards/SavedCards";

class App extends Component {
	render() {
		const isAuthenticated = false;
		let routes = (
			<Switch>
				{/* <Route path="/auth" component={Auth} /> */}
				<Route path="/card:id" component={Card} />
				<Route path="/" exact component={Marvelopedia} />
				<Redirect to="/" />
			</Switch>
		);
		if (isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/favorite" component={SavedCards} />
					{/* <Route path="/logout" component={Logout} /> */}
					<Route path="/card:id" component={Card} />
					<Route path="/" exact component={Marvelopedia} />
					<Redirect to="/" />
				</Switch>
			);
		}
		return <Layout>{routes}</Layout>;
	}
}
export default App;
