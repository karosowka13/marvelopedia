import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{ pathname: "/login", state: { from: props.location } }}
				/>
			)
		}
	/>
);
export default PrivateRoute;

PrivateRoute.propTypes = {
	component: PropTypes.func,
	isAuthenticated: PropTypes.bool,
};
