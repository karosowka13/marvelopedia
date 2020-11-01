import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "Marvelopedia.module.css";

class Marvelopedia extends Component {
	render() {
		return (
			<React.Fragment>
				<ul className={classes.cartList}>
					{this.props.charactersList.map((character) => (
						<li key={character.id}>
							<div className={classes.character}>
								<a href={"#" + character.name}>
									<img src={character.thumbnail} alt="character_image" />
									<p>{character.name}</p>
									<button>Add to favorites</button>
								</a>
							</div>
						</li>
					))}
				</ul>
			</React.Fragment>
		);
	}
}

export default Marvelopedia;
