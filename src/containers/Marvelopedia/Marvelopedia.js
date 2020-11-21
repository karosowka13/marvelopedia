import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import * as actions from "../../store/actions/index";

import MiniCard from "../../components/MiniCard/MiniCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import Filter from "./Filter/Filter";
import classes from "./Marvelopedia.module.css";

class Marvelopedia extends Component {
	componentDidMount() {
		this.props.fetchCharacters();
	}
	render() {
		let charactersDisplay = null;
		if (this.props.loading) {
			charactersDisplay = <Spinner />;
		} else if (this.props.charactersList) {
			charactersDisplay = this.props.charactersList.map((character) => (
				<MiniCard
					key={character.name}
					character={character}
					btnType="Success"
					clicked={() => this.props.addToFav(character)}
					isDisabled={
						this.props.favourites.filter((fav) => fav.id === character.id)
							.length > 0
							? true
							: false
					}
					buttonLabel="Add to favorites"
				/>
			));
		} else
			charactersDisplay = (
				<p>We are facing some problems, sorry. Go back later.</p>
			);

		return (
			<React.Fragment>
				<Filter />
				<ul className={classes.CartList}>{charactersDisplay}</ul>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		charactersList: state.characters.characters,
		loading: state.characters.loading,
		error: state.characters.error,
		favourites: state.favourites.charactersFav,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCharacters: () => dispatch(actions.fetchCharacters()),
		addToFav: (character) => dispatch(actions.addCharacter(character)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Marvelopedia)
);

Marvelopedia.propTypes = {
	fetchCharacters: PropTypes.func,
	addToFav: PropTypes.func,
	charactersList: PropTypes.array,
	loading: PropTypes.bool,
	favourites: PropTypes.array,
};
