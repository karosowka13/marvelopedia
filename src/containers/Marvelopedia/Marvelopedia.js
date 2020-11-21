import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import * as actions from "../../store/actions/index";

import MiniCard from "../../components/MiniCard/MiniCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import Filter from "./Filter/Filter";
import classes from "./Marvelopedia.module.css";

const Marvelopedia = () => {
	const dispatch = useDispatch();
	const {
		charactersList,
		loading,
		error,
		favourites,
		inputed,
		selected,
	} = useSelector(
		(state) => ({
			charactersList: state.characters.characters,
			loading: state.characters.loading,
			error: state.characters.error,
			favourites: state.favourites.charactersFav,
			inputed: state.characters.inputed,
			selected: state.characters.selected,
		}),
		shallowEqual
	);

	useEffect(() => {
		const loadCharacters = async () =>
			dispatch(actions.fetchCharacters(inputed, selected));
		loadCharacters();
	}, []);

	let charactersDisplay = null;
	if (loading) {
		charactersDisplay = <Spinner />;
	} else if (charactersList) {
		charactersDisplay = charactersList.map((character) => (
			<MiniCard
				key={character.name}
				character={character}
				btnType="Success"
				clicked={() => dispatch(actions.addCharacter(character))}
				isDisabled={
					favourites.filter((fav) => fav.id === character.id).length > 0
						? true
						: false
				}
				buttonLabel="Add to favorites"
			/>
		));
	} else
		charactersDisplay = (
			<p>We are facing some problems, sorry. Come back later.</p>
		);

	return (
		<React.Fragment>
			<Filter />
			<ul className={classes.CartList}>{charactersDisplay}</ul>
		</React.Fragment>
	);
};

export default withRouter(Marvelopedia);

Marvelopedia.propTypes = {
	fetchCharacters: PropTypes.func,
	addToFav: PropTypes.func,
	charactersList: PropTypes.array,
	loading: PropTypes.bool,
	favourites: PropTypes.array,
};
