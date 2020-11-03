import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import classes from "./Card.module.css";
import Button from "../../components/UI/Button/Button";

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
					<div>
						<img
							className={classes.Image}
							src={characterOnCard.imgPath}
							alt="character_image"
						/>
						<h2>{characterOnCard.name}</h2>
						<div className={classes.Description}>
							<h3>Description</h3>
							<p>{characterOnCard.description}</p>
						</div>
					</div>

					<div className={classes.Comics}>
						<h3>Appears in:</h3>
						<ul className={classes.ComicsList}>{comicsList}</ul>
					</div>
					<Button
						btnType="Success"
						clicked={() => this.props.addToFav(characterOnCard)}
						disabled={
							this.props.favourites.filter(
								(fav) => fav.id === characterOnCard.id
							).length > 0
								? true
								: false
						}
					>
						Add to favorite
					</Button>
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
		favourites: state.favourites.charactersFav,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCharacters: () => dispatch(actions.fetchCharacters()),
		addToFav: (character) => dispatch(actions.addCharacter(character)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Card));

Card.propTypes = {
	match: PropTypes.object.isRequired,
	charactersData: PropTypes.array,
	successFetchCharacter: PropTypes.bool,
	loading: PropTypes.bool,
	favourites: PropTypes.array,
	fetchCharacters: PropTypes.func,
	addToFav: PropTypes.func,
};
