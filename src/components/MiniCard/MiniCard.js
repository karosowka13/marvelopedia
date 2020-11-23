import React from "react";
import classes from "./MiniCard.module.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
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
	character: PropTypes.exact({
		id: PropTypes.number,
		name: PropTypes.string,
		description: PropTypes.string,
		imgPath: PropTypes.string,
		comics: PropTypes.array,
	}),
};
