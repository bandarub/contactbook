let sortFunction = (contacts, type) => {
	let sorted = contacts.sort(function(a, b) {
		if (type === 'firstName') {
			if (a.firstName < b.firstName) {
				return -1;
			}
			if (a.firstName > b.firstName) {
				return 1;
			}
			return 0;
		} else {
			if (a.lastName < b.lastName) {
				return -1;
			}
			if (a.lastName > b.lastName) {
				return 1;
			}
			return 0;
		}
	});
	return sorted;
};

export default sortFunction;
