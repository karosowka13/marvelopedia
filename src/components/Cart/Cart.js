import React from "react";

import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";

const cart = (props) => {
	<Modal show={props.show} clicked={props.modalClosed}></Modal>;
};

export default cart;
