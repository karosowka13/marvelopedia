import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";
import Card from "../../components/Card/Card";
import classes from "./Marvelopedia.module.css";

class Marvelopedia extends Component {
	constructor(props) {
		super(props);
		this.state = { modalShow: true };
	}
	componentDidMount() {
		this.props.fetchCharacters();
	}
	render() {
		let imgSrc = null;
		const charactersDisplay = this.props.charactersList.map(
			(character) => (
				(imgSrc =
					character.thumbnail.path +
					"/" +
					"portrait_xlarge." +
					character.thumbnail.extension),
				(
					<li key={character.id}>
						<div className={classes.Character}>
							<Link to={"/" + character.name}>
								<img src={imgSrc} alt="character_image" />
								<div className={classes.BackgroundText}>
									<p>{character.name}</p>
									<Button btnType="Success">Add to favorites</Button>
								</div>
							</Link>
						</div>
					</li>
				)
			)
		);
		return (
			<React.Fragment>
				<ul className={classes.CartList}>{charactersDisplay}</ul>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		charactersList: state.characters.characters,
		loading: state.characters.loading,
		error: state.characters.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return { fetchCharacters: () => dispatch(actions.fetchCharacters()) };
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Marvelopedia)
);
