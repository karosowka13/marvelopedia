export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export const getCharactersData = (results) => {
	let fetchedCharacters = results.map((i) => {
		const comics = i.comics.items.map((comic) => comic.name);
		return {
			id: i.id,
			name: i.name,
			description: i.description,
			imgPath: i.thumbnail.path + "/portrait_xlarge." + i.thumbnail.extension,
			comics: comics,
		};
	});
	return fetchedCharacters;
};
export const checkValidity = (value, rules) => {
	let isValid = true;
	if (!rules) {
		return true;
	}

	if (rules.required) {
		isValid = value.trim() !== "" && isValid;
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}

	if (rules.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(value) && isValid;
	}

	if (rules.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(value) && isValid;
	}

	return isValid;
};
