import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	charactersFav: [],
};

const addCharacter = (state, action) => {
	const updatedFav = [...state.charactersFav, action.newFav];
	return updateObject(state, {
		charactersFav: updatedFav,
	});
};

const removeCharacter = (state, action) => {
	const oldCharactersFav = [...state.charactersFav];
	console.log(action.deletedFav);
	let updatedFav = oldCharactersFav.filter(
		(fav) => fav.id === action.deletedFav.id
	);
	return updateObject(state, { charactersFav: updatedFav });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_CHARACTER:
			return addCharacter(state, action);
		case actionTypes.REMOVE_CHARACTER:
			return removeCharacter(state, action);
		default:
			return state;
	}
};

export default reducer;
