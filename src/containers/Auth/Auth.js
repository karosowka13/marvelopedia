import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Mail Address",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password",
				},
				value: "",
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		},
		isSignup: false,
	};

	inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			}),
		});
		this.setState({ controls: updatedControls });
	};

	submitHandler = (event) => {
		event.preventDefault();
		if (this.state.controls.password.valid && this.state.controls.email.valid) {
			this.props.onAuth(
				this.state.controls.email.value,
				this.state.controls.password.value,
				this.state.isSignup
			);
		} else alert("Password and email not valid");
	};

	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return { isSignup: !prevState.isSignup };
		});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		let form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to="/" />;
		}
		let title = null;
		if (this.state.isSignup) {
			title = <h2>SIGN UP</h2>;
		} else title = <h2>SIGN IN</h2>;

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{title}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button clicked={this.switchAuthModeHandler} btnType="GoTo">
					SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

Auth.propTypes = {
	email: PropTypes.string,
	password: PropTypes.string,
	isSignup: PropTypes.bool,
};
