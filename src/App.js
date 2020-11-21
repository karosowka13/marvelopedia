import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import Marvelopedia from "./containers/Marvelopedia/Marvelopedia";
import FavouritesCards from "./containers/FavouritesCards/FavouritesCards";
import Card from "./containers/Card/Card";
import PrivateRoute from "./hoc/PrivateRoute/PrivateRoute";

const App = () => {
	const isAuthenticated = useSelector((state) => state.auth.token !== null);

	return (
		<div>
			<Layout>
				<Switch>
					<Route path="/login" component={Auth} />
					<PrivateRoute
						path="/favorite"
						component={FavouritesCards}
						isAuthenticated={isAuthenticated}
					/>
					<Route path="/logout" component={Logout} />
					<Route path="/:id" component={Card} />
					<Route path="/" exact component={Marvelopedia} />
					<Redirect to="/" />
				</Switch>
			</Layout>
		</div>
	);
};

export default withRouter(App);
