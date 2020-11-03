import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";

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
				<li key={character.id}>
					<div className={classes.Character}>
						<Link to={"/" + character.name}>
							<img src={character.imgPath} alt="character_image" />
							<div className={classes.BackgroundText}>
								<p>{character.name}</p>{" "}
							</div>
						</Link>
						<Button
							btnType="Success"
							clicked={() => this.props.addToFav(character)}
							disabled={
								this.props.favourites.filter((fav) => fav.id === character.id)
									.length > 0
									? true
									: false
							}
						>
							Add to favorites
						</Button>
					</div>
				</li>
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
		charactersList: state.characters.filteredCharacters,
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
