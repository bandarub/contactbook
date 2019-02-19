export const SAVE_CONTACT = 'SAVE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const SELECT_CONTACT = 'SELECT_CONTACT';

export const saveContact = (contact) => {
    return {
        type: SAVE_CONTACT,
        contact
    }
}

export const deleteContact = (deletedId) => {
    return {
        type: DELETE_CONTACT,
        deletedId
    }
}

