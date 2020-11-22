import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";

const Auth = () => {
	const [isSignup, setIsSignup] = useState(false);
	const { loading, error, isAuthenticated } = useSelector((state) => ({
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
	}));
	const dispatch = useDispatch();
	const { register, errors, handleSubmit } = useForm();

	const onSubmit = (data) => dispatch(actions.auth(data));
	const switchAuthModeHandler = () => {
		setIsSignup(!isSignup);
	};

	let form = null;

	if (loading) {
		form = <Spinner />;
	} else {
		form = (
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className={classes.Label}>Email</label>
				<input
					name="email"
					ref={register({
						required: true,
						pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
					})}
				/>
				{errors.email && <p>Input valid email</p>}
				<label className={classes.Label}>Password </label>{" "}
				<input
					type="password"
					name="password"
					ref={register({
						required: true,
						minLength: 8,
					})}
				/>
				{errors.password && (
					<p>Password needs to have at least 8 characters.</p>
				)}
				<Button btnType="Success">SUBMIT</Button>
			</form>
		);
	}

	let errorMessage = null;

	if (error) {
		errorMessage = <p>{error.message}</p>;
	}

	let authRedirect = null;
	if (isAuthenticated) {
		authRedirect = <Redirect to="/" />;
	}
	let title = null;
	if (isSignup) {
		title = <h2>SIGN UP</h2>;
	} else title = <h2>SIGN IN</h2>;

	return (
		<div className={classes.Auth}>
			{authRedirect}
			{title}
			{errorMessage}
			{form}
			<Button clicked={switchAuthModeHandler} btnType="GoTo">
				SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}
			</Button>
		</div>
	);
};

export default Auth;

Auth.propTypes = {
	email: PropTypes.string,
	password: PropTypes.string,
	isSignup: PropTypes.bool,
};
