import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as actions from "../store/actions/index";

function useLogout(id) {
	const history = useHistory();
	const dispatch = useDispatch();
	const element = document.getElementById(id);
	const isSupported = element && element.addEventListener;
	useEffect(() => {
		console.log("heloo");
		if (!isSupported) return;
		element.addEventListener("click", () => {
			dispatch(actions.logout());
			history.push("/");
		});
		return () =>
			element.removeEventListener("click", () => {
				dispatch(actions.logout());
				history.push("/");
			});
	}, [element, isSupported, dispatch, history]);
	return <Redirect to="/" />;
}
export default useLogout;
