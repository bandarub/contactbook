import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditableLabel from 'react-inline-editing';

import uuid from 'uuid';
import * as Types from '../store/actions';

class Form extends Component {
	state = {
		firstName: '',
		lastName: '',
		numbers: [],
		number: '',
		addNumber: false
	};

	componentDidMount() {
		const id = this.props.action === 'edit' ? this.props.match.params.id : null;
		const foundContact = id ? this.props.getSelectedContact(id) : { firstName: '', lastName: '', numbers: [] };
		this.setState({
			firstName: foundContact.firstName,
			lastName: foundContact.lastName,
			numbers: foundContact.numbers
		});
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleEditNumber = text => {
		const numbersArray = [...this.state.numbers];
		const index = numbersArray.findIndex(number => number === text);
		numbersArray.splice(index, 1, text);
		this.setState({ numbers: numbersArray, addNumber: false });
	};

	handleNumber = e => {
		this.setState({ number: e.target.value });
	};

	handleSaveNumber = e => {
		const { number, numbers } = this.state;
		this.setState({ numbers: [...numbers, number], number: '', addNumber: false });
	};

	handleAddNumberState = e => {
		e.preventDefault();
		this.setState({ addNumber: true });
	};

	handleDeleteNumber = e => {
		e.preventDefault();
		var { numbers } = this.state;
		var index = numbers.indexOf(e.target.id);
		if (index > -1) {
			numbers.splice(index, 1);
		}
		this.setState({ numbers });
	};
	handleCancel = () => {
		this.setState({ addNumber: false });
	};

	handleSaveContact = e => {
		e.preventDefault();
		const { action } = this.props;
		const id = action === 'edit' ? this.props.match.params.id : uuid();
		const newContact = { ...this.state, id, action }; // Object
		this.props.getContactSave(newContact); // Dispatch action
		this.props.history.push('/');
	};

	handleDeleteContact = e => {
		const id = this.props.match.params.id;
		this.props.getContactDelete(id);
		this.props.history.push('/');
	};

	render() {
		const { firstName, lastName, numbers, addNumber } = this.state;
		return (
			<form onSubmit={this.handleSaveContact}>
				<div className="firstName">
					<input name="firstName" type="text" value={firstName} onChange={this.handleChange} />
				</div>
				<div className="lastName">
					<input name="lastName" type="text" value={lastName} onChange={this.handleChange} />
				</div>
				{numbers.map((number, index) => {
					return (
						<div key={number} className="phoneNumber">
							{console.log(number)}

							<EditableLabel
								text={number}
								labelClassName="myLabelClass"
								inputClassName="myInputClass"
								inputWidth="200px"
								inputHeight="25px"
								inputMaxLength="50"
								labelFontWeight="bold"
								inputFontWeight="bold"
								onFocusOut={this.handleEditNumber}
							/>
							<button type="button" id={number} onClick={this.handleDeleteNumber}>
								Delete
							</button>
						</div>
					);
				})}
				{addNumber && (
					<div>
						<input name="numbers" type="text" onChange={this.handleNumber} validate={this.handleValidate} />
						<button type="button" onClick={this.handleSaveNumber}>
							Save
						</button>
						<button type="button" onClick={this.handleCancel}>
							Cancel
						</button>
					</div>
				)}
				<button onClick={this.handleAddNumberState}>Add Number</button>

				{/* type submit is default */}
				<button type="submit">Save</button>
				<button type="button" onClick={this.handleDeleteContact}>
					DeleteContact
				</button>
				{/* <button type="button" onClick={this.onCancel}>
					Cancel
				</button> */}
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getContactSave: savedContact => dispatch(Types.saveContact(savedContact)),
		getContactDelete: deletedId => {
			dispatch(Types.deleteContact(deletedId));
		}
	};
};

Form = connect(null, mapDispatchToProps)(Form);
export default Form;
