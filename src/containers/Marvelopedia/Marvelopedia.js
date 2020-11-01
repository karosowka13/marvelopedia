import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";

import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";
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
		return (
			<React.Fragment>
				<p>Hello</p>
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
