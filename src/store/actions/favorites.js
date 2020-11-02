import * as actionTypes from "./actionTypes";

export const addCharacter = (name) => {
	return {
		type: actionTypes.ADD_CHARACTER,
		CharacterName: name,
	};
};

export const removeCharacter = (name) => {
	return {
		type: actionTypes.REMOVE_CHARACTER,
		CharacterName: name,
	};
};
