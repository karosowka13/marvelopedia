import React from "react";
import classes from "./MiniCard.module.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
const miniCard = (props) => (
	<React.Fragment>
		<li key={props.character.id}>
			<div className={classes.Character}>
				<Link to={"/" + props.character.name}>
					<img src={props.character.imgPath} alt="character_image" />
					<div className={classes.BackgroundText}>
						<p>{props.character.name}</p>{" "}
					</div>
				</Link>
				<Button
					btnType={props.btnType}
					clicked={props.clicked}
					disabled={props.isDisabled}
				>
					{props.buttonLabel}
				</Button>
			</div>
		</li>
	</React.Fragment>
);

export default miniCard;
