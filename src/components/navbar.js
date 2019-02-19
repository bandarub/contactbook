import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark">
			<NavLink className="navbar-brand" to="/">
				ContactsList
			</NavLink>
			<NavLink className="nav-link addContact" to="/newContact">
				Add Contact <span className="sr-only" />
			</NavLink>
		</nav>
	);
};

export default NavBar;
