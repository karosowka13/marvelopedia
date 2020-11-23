import React, { useCallback, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actions from "../../../store/actions/index";
import classes from "./Filter.module.css";

import _ from "lodash";
import { INPUT, SELECT } from "../../../shared/constants";

import Input from "../../../components/UI/Input/Input";

const Filter = () => {
	const pageSizeOptions = [10, 20, 40, 60, 80, 100];
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
					elementType={INPUT}
					changed={inputSearchHandler}
					placeholder="Find character"
					value={search}
					label="Search by name"
				/>
			</div>
			<div className={classes.FilterSelect}>
				<Input
					label="Since"
					elementType={SELECT}
					changed={(event) =>
						dispatch(
							actions.selectSearchHandler(event.target.value, inputed, pageSize)
						)
					}
					value={selected}
					elementConfig={{ options: allYearsOption }}
				/>{" "}
				<Input
					label="Display"
					elementType={SELECT}
					value={pageSize}
					changed={(event) =>
						dispatch(
							actions.selectPageSize(event.target.value, inputed, selected)
						)
					}
					elementConfig={{ options: pageSizeOptions }}
				/>
			</div>
		</div>
	);
};

export default React.memo(Filter);
