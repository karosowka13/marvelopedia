import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import * as actions from "../../store/actions/index";
import { SUCCESS } from "../../shared/constants";
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
		pageSize,
	} = useSelector(
		(state) => ({
			charactersList: state.characters.characters,
			loading: state.characters.loading,
			error: state.characters.error,
			favourites: state.favourites.charactersFav,
			inputed: state.characters.inputed,
			selected: state.characters.selected,
			pageSize: state.characters.pageSize,
		}),
		shallowEqual
	);

	useEffect(() => {
		const loadCharacters = async () =>
			dispatch(actions.fetchCharacters(inputed, selected, pageSize));
		loadCharacters();
		// eslint-disable-next-line
	}, []);

	let charactersDisplay = null;
	if (loading) {
		charactersDisplay = <Spinner />;
	} else if (error) {
		charactersDisplay = (
			<p>We are facing some problems, sorry. Come back later.</p>
		);
	} else if (charactersList.length) {
		charactersDisplay = charactersList.map((character) => (
			<MiniCard
				key={character.name}
				character={character}
				btnType={SUCCESS}
				clicked={() => dispatch(actions.addCharacter(character))}
				isDisabled={
					favourites.filter((fav) => fav.id === character.id).length > 0
						? true
						: false
				}
				buttonLabel="Add to favorites"
			/>
		));
	} else charactersDisplay = <p>No data avaliable</p>;

	return (
		<React.Fragment>
			<Filter />
			<ul className={classes.CartList}>{charactersDisplay}</ul>{" "}
		</React.Fragment>
	);
};

export default React.memo(Marvelopedia);
