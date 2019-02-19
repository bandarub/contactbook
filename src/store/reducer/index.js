import * as Types from '../actions/index';
import contacts from '../../data.js';

const ContactsReducer = (state = contacts, action) => {
	switch (action.type) {
		case Types.SAVE_CONTACT:
			if (action.contact.action === 'edit') {
				return state.map(contact => {
					if (contact.id === action.contact.id) {
						return {
							...contact,
							firstName: action.contact.firstName,
							lastName: action.contact.lastName,
							numbers: action.contact.numbers
						};
					} else return contact;
				});
			} else return [...state.concat(action.contact)];
		case Types.DELETE_CONTACT:
			const filterdContacts = state.filter(contact => contact.id !== action.deletedId);
			return filterdContacts;
		default:
			return state;
	}
};

export default ContactsReducer;
