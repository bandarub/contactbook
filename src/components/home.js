import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import sortFunction from '../functions/sortFunction';
import reduceFunction from '../functions/reduceFunction';
import printAlphabets from '../functions/printingAlpabets';

class Home extends Component {
	state = {
		groupedList: [],
		sortaction: 'firstName',
		loaded: false
	};

	componentDidMount = async () => {
		const { contacts } = this.props;
		let sortedData = sortFunction(contacts, this.state.sortaction);
        let groupedContacts = reduceFunction(sortedData, null);
		this.setState({ loaded: true, groupedList: groupedContacts, sortaction: 'lastName' });
	};

	sortBy = type => {
		const { contacts } = this.props;
		const sortAction = this.state.sortaction;
		if (sortAction === 'firstName') {
			this.setState({ sortaction: 'lastName' });
		} else {
			this.setState({ sortaction: 'firstName' });
		}
		let sortedContacts = sortFunction(contacts, type);
		let groupedContacts = reduceFunction(sortedContacts, type);
		this.setState({ groupedList: groupedContacts });
	};

	render() {
		const { loaded, groupedList, sortaction } = this.state;
		let array;
		if (loaded === true) {
			array = printAlphabets();
		} else
			return (
				<div className="loader">
					<i className="fa fa-spinner fa-spin fa-3x fa-fw" />
					<span className="sr-only">Loading...</span>
				</div>
			);
		return (
			<div>
                <NavLink to ="/newcontact">AddContact</NavLink>
				<div className="alphaNavBar">
					{array.map(char => (
						<a key={char} className="homeAlpha" href={`#${char}`}>
							{char}
						</a>
					))}
				</div>
				<div className="homeBody">
					<div className="homeSort">
						<button onClick={() => this.sortBy(sortaction)} className="btn btn-dark">
							Sort by {sortaction}
						</button>
					</div>
					<p>Contacts lists sorted by {sortaction === 'lastName' ? 'firstName' : 'lastName'}</p>
					{Object.entries(groupedList).map(([key, value], i) => {
						return (
							<div key={key} className="list-group">
								<p className="list-group-item-dark list-group-item-action active homeGrpKey" id={key}>
									{key}{' '}
								</p>
								{value.map(contact => (
									<ul key={contact.id} className="list-group list-group-flush">
										<NavLink className="list-group-item" id={contact.id} to={`/${contact.id}/edit`}>
											{contact.firstName} {contact.lastName}
										</NavLink>
									</ul>
								))}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Home;
