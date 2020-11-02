import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
	characters: [],
	loading: false,
	error: null,
	success: false,
	filteredCharacters: [],
};

const fetchCharactersStart = (state, action) => {
	return updateObject(state, { loading: true });
};

const fetchCharactersSuccess = (state, action) => {
	return updateObject(state, {
		characters: action.characters,
		loading: false,
		success: true,
	});
};

const fetchCharactersFail = (state, action) => {
	return updateObject(state, { loading: false });
};

const selectCharacter = (state, action) => {
	const filteredCharactersNew = state.filteredCharacters.filter(
		(character) => character.comics.indexOf(action.selectValue) >= 0
	);
	return updateObject(state, { filteredCharacters: filteredCharactersNew });
};
const searchCharacter = (state, action) => {};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CHARACTERS_START:
			return fetchCharactersStart(state, action);
		case actionTypes.FETCH_CHARACTERS_SUCCESS:
			return fetchCharactersSuccess(state, action);
		case actionTypes.FETCH_CHARACTERS_FAIL:
			return fetchCharactersFail(state, action);
		case actionTypes.SELECT_CHARACTER:
			return selectCharacter(state, action);
		case actionTypes.SEARCH_CHARACTER:
			return searchCharacter(state, action);
		default:
			return state;
	}
};

export default reducer;
