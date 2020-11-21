import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../../store/actions/index";

function Logout() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.logout());
	}, [dispatch]);
	return <Redirect to="/" />;
}
export default Logout;

Logout.propTypes = {
	onLogout: PropTypes.func,
};
