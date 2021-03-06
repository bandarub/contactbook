import React from 'react';
import { BrowserRouter as Router, HashRouter, Route } from 'react-router-dom';

import NavBar from './navbar';
import Form from './form';
import Home from './home';

const Routing = props => {
	const { contacts, getSelectedContact } = props;
	return (
		<div>
			<Router>
				<div>
					<NavBar />

					<Route exact path="/" render={props => <Home {...props} contacts={contacts} />} />
					<Route
						exact
						path="/newContact"
						render={props => (
							<Form {...props} contacts={contacts} getSelectedContact={getSelectedContact} action="add" />
						)}
					/>
					<Route
						exact
						path="/:id/edit"
						render={props => <Form {...props} getSelectedContact={getSelectedContact} action="edit" />}
					/>
				</div>
			</Router>
		</div>
	);
};

export default Routing;
