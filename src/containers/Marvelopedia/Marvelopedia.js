import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Marvelopedia.module.css";

class Marvelopedia extends Component {
	componentDidMount() {
		this.props.fetchCharacters();
	}
	render() {
		let charactersDisplay = null;
		if (this.props.loading) {
			charactersDisplay = <Spinner />;
		} else if (this.props.charactersList) {
			charactersDisplay = this.props.charactersList.map((character) => (
				<li key={character.id}>
					<div className={classes.Character}>
						<Link to={"/" + character.name}>
							<img src={character.imgPath} alt="character_image" />
							<div className={classes.BackgroundText}>
								<p>{character.name}</p>
								<Button btnType="Success">Add to favorites</Button>
							</div>
						</Link>
					</div>
				</li>
			));
		} else charactersDisplay = <p>We are facing some problems, sorry.</p>;

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
