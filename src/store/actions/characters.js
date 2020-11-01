import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchCharactersSuccess = (characters) => {
	return {
		type: actionTypes.FETCH_CHARACTERS_SUCCESS,
		characters: characters,
	};
};

export const fetchCharactersFail = (error) => {
	return {
		type: actionTypes.FETCH_CHARACTERS_FAIL,
		error: error,
	};
};

export const fetchCharactersStart = () => {
	return {
		type: actionTypes.FETCH_CHARACTERS_START,
	};
};

export const fetchCharacters = () => {
	return (dispatch) => {
		dispatch(fetchCharactersStart());
		const queryParams = "?apikey=" + process.env.REACT_API_PUBLIC_KEY;
		axios
			.get("https://gateway.marvel.com/v1/public/characters" + queryParams)
			.then((res) => {
				const fetchedCharacters = [];
				for (let key in res.data) {
					fetchedCharacters.push({
						...res.data[key],
						id: key,
					});
				}
				dispatch(fetchCharactersSuccess(fetchedCharacters));
			})
			.catch((err) => {
				dispatch(fetchCharactersFail(err));
			});
	};
};
