import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../store/actions/index";
import classes from "./Card.module.css";

class Card extends Component {
	render() {
		const { match } = this.props;
		let characterOnCard = null;
		this.props.charactersData.forEach((character) => {
			if (character.name === match.params.characterName)
				characterOnCard = character;
		});
		const imgSrc =
			characterOnCard.thumbnail.path +
			"/" +
			"portrait_xlarge." +
			characterOnCard.thumbnail.extension;
		return (
			<div className={classes.Container}>
				<img src={imgSrc} alt="character_image" />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		charactersData: state.characters.characters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return { fetchCharacters: () => dispatch(actions.fetchCharacters()) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Card));

Card.propTypes = {
	match: PropTypes.object.isRequired,
};
