let reduceFunction = (contacts, type) => {
	let groupedContacts = contacts.reduce((r, e) => {
		let key;
		if (type === 'lastName') {
			key = e.lastName[0];
		} else {
			key = e.firstName[0];
		}
		if (!r[key]) r[key] = [];
		r[key].push(e);
		return r;
	}, {});
	return groupedContacts;
};

export default reduceFunction;
