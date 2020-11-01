import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import * as actions from "../../store/actions/index";

import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "Marvelopedia.module.css";

class Marvelopedia extends Component {
	componentDidMount() {
		this.props.fetchProducts();
	}
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

const mapStateToProps = (state) => {
	return {
		loading: state.loadTraininglog.loading,
		error: state.loadTraininglog.error,
		userId: state.auth.userId,
		month: state.date.month,
		trainings: state.loadTraininglog.trainings,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		traininglogData: (trainingLog, userId) =>
			dispatch(actions.loadTraininglog(trainingLog, userId)),
		nextMonth: (month) => dispatch(actions.nextMonth(month)),
		prevMonth: (month) => dispatch(actions.prevMonth(month)),
		onDayClick: (day) => dispatch(actions.onDateClick(day)),
	};
};

export default withRouter(
	connect(mapStateToprops, mapDispatchToprops)(Marvelopedia)
);
