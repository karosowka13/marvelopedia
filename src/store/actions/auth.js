import * as actionTypes from "./actionTypes";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const auth = (email, password) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			token: Math.random().toString(36).substring(2, 20),
			expiresIn: new Date().getTime(),
		};
		const expirationDate = new Date(
			new Date().getTime() + authData.expiresIn * 1000
		);
		localStorage.setItem("token", authData.idToken);
		localStorage.setItem("expirationDate", expirationDate);
		localStorage.setItem("userId", authData.localId);
		dispatch(authSuccess(authData.idToken, authData.localId));
		dispatch(checkAuthTimeout(authData.expiresIn));
		//dispatch(authFail(err.authData.error));
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token, userId));
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};
