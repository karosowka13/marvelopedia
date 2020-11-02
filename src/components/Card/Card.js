import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import classes from "./Card.module.css";

class Card extends Component {
	componentDidMount() {
		if (!this.props.successFetchCharacter) {
			this.props.fetchCharacters();
		}
	}

	render() {
		const { match } = this.props;
		let characterOnCard = null;
		let isReadyCard = null;
		let comicsList = null;
		if (this.props.successFetchCharacter) {
			this.props.charactersData.forEach((character) => {
				if (character.name === match.params.characterName)
					characterOnCard = character;
			});

			if (characterOnCard.comics) {
				comicsList = characterOnCard.comics.map((name, i) => (
					<li key={i}>{name}</li>
				));
			}

			isReadyCard = (
				<React.Fragment>
					<img
						className={classes.Image}
						src={characterOnCard.imgPath}
						alt="character_image"
					/>
					<h2 className={classes.Title}>{characterOnCard.name}</h2>
					<div className={classes.Description}>
						<h3>Description</h3>
						<p>{characterOnCard.description}</p>
					</div>
					<h3>Appears in:</h3>
					<div className={classes.Comics}>
						<ul className={classes.ComicsList}>{comicsList}</ul>
					</div>
				</React.Fragment>
			);
		} else isReadyCard = <Spinner />;
		return (
			<div className={classes.Background}>
				<div className={classes.Container}>{isReadyCard}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		charactersData: state.characters.characters,
		successFetchCharacter: state.characters.success,
		loading: state.characters.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return { fetchCharacters: () => dispatch(actions.fetchCharacters()) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Card));

Card.propTypes = {
	match: PropTypes.object.isRequired,
};
