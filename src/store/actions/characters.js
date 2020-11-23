import * as actionTypes from "./actionTypes";
import axios from "axios";

import { getCharactersData } from "../../shared/utility";

export const fetchCharactersSuccess = (characters) => {
	return {
		type: actionTypes.FETCH_CHARACTERS_SUCCESS,
		characters: characters,
	};
};

export const fetchCharactersFail = () => {
	return {
		type: actionTypes.FETCH_CHARACTERS_FAIL,
	};
};

export const fetchCharactersStart = () => {
	return {
		type: actionTypes.FETCH_CHARACTERS_START,
	};
};

export const fetchCharacters = (inputed, selected, pageSize) => {
	return async (dispatch) => {
		function onSucces(res) {
			const results = res.data.data.results;
			const fetchedCharacters = getCharactersData(results);
			dispatch(fetchCharactersSuccess(fetchedCharacters));
		}
		const formatYear = selected ? new Date(selected) : "";
		const modificationDate = selected ? formatYear.toISOString() : "";

		const params = {
			modifiedSince: modificationDate,
			limit: pageSize,
			apikey: process.env.REACT_APP_API_PUBLIC_KEY,
		};

		//nameStartsWith cannot be null
		if (inputed) {
			Object.assign(params, { nameStartsWith: inputed });
		}
		dispatch(fetchCharactersStart());

		try {
			const res = await axios.get(process.env.REACT_APP_API_URL, { params });
			return onSucces(res);
		} catch (error) {
			return dispatch(fetchCharactersFail());
		}
	};
};

export const inputSearchHandler = (value, selected, pageSize) => {
	return (dispatch) => {
		dispatch(inputChangeHandler(value));
		dispatch(fetchCharacters(value, selected, pageSize));
	};
};

export const selectSearchHandler = (selected, inputed, pageSize) => {
	return (dispatch) => {
		dispatch(selectChangeHandler(selected));
		dispatch(fetchCharacters(inputed, selected, pageSize));
	};
};

export const inputChangeHandler = (value) => {
	return { type: actionTypes.SEARCH_CHARACTER, inputedValue: value };
};

export const selectChangeHandler = (value) => {
	return { type: actionTypes.SELECT_CHARACTER, selectedValue: value };
};

export const changePageSize = (pageSize) => {
	const value = pageSize;
	return { type: actionTypes.PAGE_SIZE, pageSize: value };
};

export const selectPageSize = (pageSize, inputed, selected) => {
	return (dispatch) => {
		dispatch(changePageSize(pageSize));
		dispatch(fetchCharacters(inputed, selected, pageSize));
	};
};
