import React from "react";
import PropTypes from "prop-types";
import { INPUT_TYPES } from "../../../shared/constants";
import classes from "./Input.module.css";

const input = (props) => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];

	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
					placeholder={props.placeholder}
				/>
			);
			break;

		case "select":
			inputElement = (
				<select
					className={inputClasses.join(" ")}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map((option) => {
						return (
							<option type="number" key={option} value={option}>
								{option}
							</option>
						);
					})}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(" ")}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default input;

input.propTypes = {
	elementType: PropTypes.oneOf(Object.values(INPUT_TYPES)),
	elementConfig: PropTypes.object,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	changed: PropTypes.func,
	placeholder: PropTypes.string,
};
