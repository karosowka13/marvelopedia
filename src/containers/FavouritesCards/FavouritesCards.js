import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../store/actions/index";
import classes from "./FavouritesCards.module.css";

import Button from "../../components/UI/Button/Button";

class FavouritesCards extends Component {
	render() {
		let charactersDisplay = null;
		let header = null;
		if (this.props.favouritesChar.length) {
			header = <h2>Your favourites characters:</h2>;
			charactersDisplay = this.props.favouritesChar.map((character) => (
				<li key={character.id}>
					<div className={classes.Character}>
						<Link to={"/" + character.name}>
							<img src={character.imgPath} alt="character_image" />
							<div className={classes.BackgroundText}>
								<p>{character.name}</p>{" "}
							</div>
						</Link>
						<Button
							btnType="Danger"
							clicked={() => this.props.removeFromFav(character)}
						>
							Remove
						</Button>
					</div>
				</li>
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
