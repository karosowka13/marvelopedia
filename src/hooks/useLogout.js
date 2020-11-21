import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as actions from "../store/actions/index";

function useLogout() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.logout());
	}, []);
	return <Redirect to="/" />;
}
export default useLogout;
