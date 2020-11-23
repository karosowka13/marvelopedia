import React from "react";
import classes from "./MiniCard.module.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import { BUTTON_TYPES, CharacterSchema } from "../../shared/constants";
import PropTypes from "prop-types";

const miniCard = ({ character, btnType, clicked, isDisabled, buttonLabel }) => (
	<React.Fragment>
		<li key={character.id}>
			<div className={classes.Character}>
				<Link to={"/" + character.name}>
					<img src={character.imgPath} alt="character_image" />
					<div className={classes.BackgroundText}>
						<p>{character.name}</p>
					</div>
				</Link>
				<Button btnType={btnType} clicked={clicked} disabled={isDisabled}>
					{buttonLabel}
				</Button>
			</div>
		</li>
	</React.Fragment>
);

export default miniCard;

miniCard.propTypes = {
	character: PropTypes.exact(CharacterSchema),
	btnType: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
	clicked: PropTypes.func,
	isDisabled: PropTypes.bool,
	buttonLabel: PropTypes.string,
};
