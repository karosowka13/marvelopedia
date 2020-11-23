import React, { useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { SUCCESS } from "../../shared/constants";
import classes from "./Card.module.css";
import Button from "../../components/UI/Button/Button";
import { getCharactersData } from "../../shared/utility";
import axios from "axios";

const Card = () => {
	const { id } = useParams();
	const [character, setCharacter] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const favourites = useSelector((state) => state.favourites.charactersFav);

	const dispatch = useDispatch();
	useEffect(() => {
		const loadCharacter = async () => {
			let params = {
				name: id,
				apikey: process.env.REACT_APP_API_PUBLIC_KEY,
			};
			setLoading(true);
			await axios
				.get(process.env.REACT_APP_API_URL, { params })
				.then((res) => {
					const characterFetched = getCharactersData(res.data.data.results);
					setCharacter(characterFetched[0]);
					setLoading(false);
				})
				.catch((err) => setError(true));
		};
		loadCharacter();
	}, [id]);
	let isReadyCard = null;
	let comicsList = null;
	let spinner = null;
	if (character) {
		comicsList = character.comics.map((name, i) => <li key={i}>{name}</li>);
		isReadyCard = (
			<div className={classes.Container}>
				<div>
					<img
						className={classes.Image}
						src={character.imgPath}
						alt="character_image"
					/>
					<h2>{character.name}</h2>
					<div className={classes.Description}>
						<h3>Description</h3>
						<p>{character.description}</p>
					</div>
				</div>

				<div className={classes.Comics}>
					<h3>Appears in:</h3>
					<ul className={classes.ComicsList}>{comicsList}</ul>
				</div>
				<Button
					btnType={SUCCESS}
					clicked={() => dispatch(actions.addCharacter(character))}
					disabled={
						favourites.filter((fav) => fav.id === character.id).length > 0
							? true
							: false
					}
				>
					Add to favorite
				</Button>
			</div>
		);
	} else if (loading) {
		spinner = <Spinner />;
	} else if (error) {
		isReadyCard = <h2>We are facing some problems. Try again.</h2>;
	} else isReadyCard = <h2>Character not found</h2>;

	return (
		<div className={classes.Background}>
			{spinner}
			{isReadyCard}
		</div>
	);
};

export default withRouter(Card);
