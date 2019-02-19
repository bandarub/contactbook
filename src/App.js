import React, { Component } from 'react';
import { connect } from 'react-redux';

import Routing from './components/routes';

import './styles/App.css';

class App extends Component {

	getSelectedContact = (id) => {
		const { contacts } = this.props;
		let foundContact;
		for (let contact of contacts) {
			if (contact.id === id) {
				foundContact = contact;
			}
		}
		console.log(foundContact)
		return foundContact;
	}
	render() {
		const { contacts } = this.props;
		return (
			<div className="App">
				<Routing contacts={contacts} getSelectedContact={this.getSelectedContact} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		contacts: state
	};
};

export default connect(mapStateToProps, null)(App);
