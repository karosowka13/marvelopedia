import * as actionTypes from "./actionTypes";

export const addCharacter = (character) => {
	return {
		type: actionTypes.ADD_CHARACTER,
		newFav: character,
	};
};

export const removeCharacter = (character) => {
	return {
		type: actionTypes.REMOVE_CHARACTER,
		deletedFav: character,
	};
};
