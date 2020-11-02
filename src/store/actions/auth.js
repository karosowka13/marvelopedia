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

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const auth = (email, password) => {
	return (dispatch) => {
		dispatch(authStart());
		const token = Math.random().toString(36).substring(2, 20);
		const authData = {
			email: email,
			password: password,
			idToken: token,
			expiresIn: new Date(),
		};
		authData.expiresIn.setHours(authData.expiresIn.getHours() + 1);
		localStorage.setItem("token", authData.idToken);
		localStorage.setItem("userId", authData.email);
		dispatch(authSuccess(authData.idToken, authData.email));
		dispatch(checkAuthTimeout(authData.expiresIn.getTime()));
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
		}, 3600000);
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
