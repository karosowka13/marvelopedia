import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import classes from "./Filter.module.css";

import Input from "../../../components/UI/Input/Input";
class Filter extends Component {
	inputChangedHandler = (event) => {
		event.preventDfault();
	};
	selectChangedHandler = (event) => {
		event.preventDfault();
	};

	render() {
		let comicsList = [];
		this.props.charactersList.forEach((character) =>
			comicsList.push(...character.comics)
		);

		let uniqueComicsList = [...new Set(comicsList)];
		console.log(uniqueComicsList);
		let selectComicsName = null;
		selectComicsName = uniqueComicsList.map((comics) => (
			<option value={comics}>{comics}</option>
		));
		return (
			<div className={classes.Filter}>
				<div className={classes.filterResult}>{this.props.count}</div>
				<div className={classes.filterSearch}>
					<Input
						elementType="input"
						changed={(event) => this.inputChangedHandler(event)}
						placeholder="Find character"
					/>
				</div>
				<div className={classes.filterComics}>
					Appears in comics:
					<select onChange={(event) => this.selectChangeHandler(event)}>
						<option value="">All</option>
						{selectComicsName}
					</select>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		charactersList: state.characters.characters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return { fetchCharacters: () => dispatch(actions.fetchCharacters()) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
