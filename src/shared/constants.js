import PropTypes from "prop-types";
export const GOTO = "GoTO";
export const SUCCESS = "Success";
export const DANGER = "Danger";
export const BUTTON_TYPES = {
	GOTO,
	SUCCESS,
	DANGER,
};

export const INPUT = "input";
export const SELECT = "select";

export const INPUT_TYPES = {
	INPUT,
	SELECT,
};

export const CharacterSchema = {
	id: PropTypes.number,
	name: PropTypes.string,
	description: PropTypes.string,
	imgPath: PropTypes.string,
	comics: PropTypes.array,
};

export const AuthReducerSchema = PropTypes.shape({
	token: PropTypes.string,
	userId: PropTypes.string,
	error: PropTypes.bool,
	loading: PropTypes.bool,
});
export const CharactersReducerSchema = PropTypes.shape({
	characters: PropTypes.arrayOf(PropTypes.shape(CharacterSchema)),
	loading: PropTypes.bool,
	error: PropTypes.bool,
	success: PropTypes.bool,
	inputed: PropTypes.string,
	selected: PropTypes.string,
	pageSize: PropTypes.oneOf(["10", "20", "40", "60", "80", "100"]),
});
export const FavouritesReducerSchema = PropTypes.shape({
	charactersFav: PropTypes.arrayOf(PropTypes.shape(CharacterSchema)),
});
