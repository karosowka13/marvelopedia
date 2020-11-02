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
		const queryParams = "?apikey=" + process.env.REACT_APP_API_PUBLIC_KEY;
		axios
			.get("https://gateway.marvel.com/v1/public/characters" + queryParams)
			.then((res) => {
				const fetchedCharacters = [];
				const results = res.data.data.results;
				for (let i in results) {
					let comics = [];
					for (let n = 0; n < results[i].comics.items.length; n++) {
						comics.push(results[i].comics.items[n].name);
					}

					fetchedCharacters.push({
						id: results[i].id,
						name: results[i].name,
						description: results[i].description,
						imgPath:
							results[i].thumbnail.path +
							"/" +
							"portrait_xlarge." +
							results[i].thumbnail.extension,
						comics: comics,
					});
				}
				dispatch(fetchCharactersSuccess(fetchedCharacters));
			})
			.catch((err) => {
				dispatch(fetchCharactersFail(err));
			});
	};
};
