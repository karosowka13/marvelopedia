import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

class Marvelopedia extends Component {
	render() {
		return (
			<React.Fragment>
				<Modal>
					<Spinner />
				</Modal>
			</React.Fragment>
		);
	}
}

export default Marvelopedia;
