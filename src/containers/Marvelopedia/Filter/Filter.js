import React, { useCallback, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actions from "../../../store/actions/index";
import classes from "./Filter.module.css";
import PropTypes from "prop-types";
import _ from "lodash";

import Input from "../../../components/UI/Input/Input";
const Filter = () => {
	const { inputed, selected } = useSelector(
		(state) => ({
			inputed: state.characters.inputed,
			selected: state.characters.selected,
		}),
		shallowEqual
	);
	const [search, setSearch] = useState(inputed);

	const yearsOfModifcation = _.range(
		new Date().getFullYear() - 50,
		new Date().getFullYear() + 5,
		5
	);
	const dispatch = useDispatch();

	// eslint-disable-next-line
	const debouncedSearch = useCallback(
		_.debounce(
			(nextSearch) =>
				dispatch(actions.inputSearchHandler(nextSearch, selected)),
			700
		),
		[]
	);

	const inputSearchHandler = (event) => {
		const nextSearch = event.target.value;
		setSearch(nextSearch);
		debouncedSearch(nextSearch);
	};
	return (
		<div className={classes.Filter}>
			<div className={classes.FilterSearch}>
				<Input
					elementType="input"
					changed={inputSearchHandler}
					placeholder="Find character"
					value={search}
					label="Search by name"
				/>
			</div>
			<div className={classes.filterComics}>
				<Input
					label="Modification since"
					elementType="select"
					changed={(event) =>
						dispatch(actions.selectSearchHandler(event, inputed))
					}
					value={selected}
					elementConfig={{ options: yearsOfModifcation }}
				></Input>
			</div>
		</div>
	);
};

export default Filter;

Filter.propTypes = {
	inputed: PropTypes.string,
	selected: PropTypes.string,
};
