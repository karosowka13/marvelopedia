import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { DANGER } from "../../shared/constants";
import * as actions from "../../store/actions/index";
import classes from "./FavouritesCards.module.css";

import MiniCard from "../../components/MiniCard/MiniCard";

const FavouritesCards = () => {
	const dispatch = useDispatch();
	const favouritesChar = useSelector((state) => state.favourites.charactersFav);
	return (
		<div className={classes.Container}>
			<ul className={classes.CartList}>
				{favouritesChar.length ? (
					((<h2>Your favourites characters:</h2>),
					favouritesChar.map((character) => (
						<MiniCard
							key={character.name}
							character={character}
							btnType={DANGER}
							buttonLabel="Remove"
							clicked={() => dispatch(actions.removeCharacter(character))}
						/>
					)))
				) : (
					<h2>You don't have any saved characters.</h2>
				)}
			</ul>
		</div>
	);
};

export default FavouritesCards;
