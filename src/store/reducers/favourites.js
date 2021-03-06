import * as actionTypes from "../actions/actionTypes";
import { updateObject, withPropTypes } from "../../shared/utility";
import { FavouritesReducerSchema } from "../../shared/constants";

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
	const updatedFav = state.charactersFav.filter(
		(fav) => fav.id !== action.deletedFav.id
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

export default withPropTypes(
	"FavouritesReducer",
	FavouritesReducerSchema
)(reducer);
