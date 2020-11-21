import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../store/actions/index";
import classes from "./FavouritesCards.module.css";

import MiniCard from "../../components/MiniCard/MiniCard";

const FavouritesCards = () => {
	const dispatch = useDispatch();
	const favouritesChar = useSelector((state) => state.favourites.charactersFav);
	let charactersDisplay = null;
	let header = null;
	if (favouritesChar.length) {
		header = <h2>Your favourites characters:</h2>;
		charactersDisplay = favouritesChar.map((character) => (
			<MiniCard
				key={character.name}
				character={character}
				btnType="Danger"
				buttonLabel="Remove"
				clicked={() => dispatch(actions.removeCharacter(character))}
			/>
		));
	} else header = <h2>You don't have any saved characters.</h2>;
	return (
		<div className={classes.Container}>
			{header}
			<ul className={classes.CartList}>{charactersDisplay}</ul>
		</div>
	);
};

export default FavouritesCards;

FavouritesCards.propTypes = {
	favouritesChar: PropTypes.array,
	removeFromFav: PropTypes.func,
};
