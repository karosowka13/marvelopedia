import React, { useCallback, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actions from "../../../store/actions/index";
import classes from "./Filter.module.css";
import PropTypes from "prop-types";
import _ from "lodash";

import Input from "../../../components/UI/Input/Input";
const Filter = () => {
	const pageSizeOptions = [10, 20, 40, 60, 80, 100, 150];
	const { inputed, selected, pageSize } = useSelector(
		(state) => ({
			inputed: state.characters.inputed,
			selected: state.characters.selected,
			pageSize: state.characters.pageSize,
		}),
		shallowEqual
	);
	const [search, setSearch] = useState(inputed);

	const yearsOfModifcation = _.range(
		new Date().getFullYear() - 15,
		new Date().getFullYear() + 1,
		1
	);
	const allYearsOption = Array.prototype.concat("", yearsOfModifcation);
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
			<div className={classes.FilterSelect}>
				<Input
					label="Since"
					elementType="select"
					changed={(event) =>
						dispatch(actions.selectSearchHandler(event, inputed, pageSize))
					}
					value={selected}
					elementConfig={{ options: allYearsOption }}
				/>{" "}
				<Input
					label="Display"
					elementType="select"
					value={pageSize}
					changed={(event) =>
						dispatch(actions.selectPageSize(event, inputed, selected, pageSize))
					}
					elementConfig={{ options: pageSizeOptions }}
				/>
			</div>
		</div>
	);
};

export default React.memo(Filter);

Filter.propTypes = {
	inputed: PropTypes.string,
	selected: PropTypes.string,
};
