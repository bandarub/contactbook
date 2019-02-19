import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Form from './form';
import Home from './home';

const Routing = props => {
	const { contacts, getSelectedContact } = props;
	return (
		<div>
			<HashRouter>
				<div>
					<Route exact path="/" render={props => <Home {...props} contacts={contacts} />} />
					<Route exact path="/newContact" render={props => <Form {...props} contacts={contacts} getSelectedContact={getSelectedContact} action="add"/>} />
					<Route exact path="/:id/edit" render={props => <Form {...props} getSelectedContact={getSelectedContact} action="edit"/>} />
				</div>
			</HashRouter>
		</div>
	);
};

export default Routing;
