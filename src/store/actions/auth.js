import * as actionTypes from "./actionTypes";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userId: userId,
	};
};

export const authFail = () => {
	return {
		type: actionTypes.AUTH_FAIL,
	};
};

export const auth = (data) => {
	return (dispatch) => {
		dispatch(authStart());
		if (data) {
			const token = Math.random().toString(36).substring(2, 20);
			const authData = {
				email: data.email,
				password: data.password,
				idToken: token,
			};
			localStorage.setItem("token", authData.idToken);
			localStorage.setItem("userId", authData.email);
			dispatch(authSuccess(authData.idToken, authData.email));
		} else dispatch(authFail());
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

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const userId = localStorage.getItem("userId");
			dispatch(authSuccess(token, userId));
		}
	};
};
