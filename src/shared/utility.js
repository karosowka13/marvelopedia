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
