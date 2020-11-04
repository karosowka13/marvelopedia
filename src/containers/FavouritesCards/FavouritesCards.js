import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../store/actions/index";
import classes from "./FavouritesCards.module.css";

import MiniCard from "../../components/MiniCard/MiniCard";

class FavouritesCards extends Component {
	render() {
		let charactersDisplay = null;
		let header = null;
		if (this.props.favouritesChar.length) {
			header = <h2>Your favourites characters:</h2>;
			charactersDisplay = this.props.favouritesChar.map((character) => (
				<MiniCard
					key={character.name}
					character={character}
					btnType="Danger"
					buttonLabel="Remove"
					clicked={() => this.props.removeFromFav(character)}
				/>
			));
		} else header = <h2>You don't have any saved characters.</h2>;
		return (
			<div className={classes.Container}>
				{header}
				<ul className={classes.CartList}>{charactersDisplay}</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		favouritesChar: state.favourites.charactersFav,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeFromFav: (character) => dispatch(actions.removeCharacter(character)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(FavouritesCards)
);

FavouritesCards.propTypes = {
	favouritesChar: PropTypes.array,
	removeFromFav: PropTypes.func,
};
