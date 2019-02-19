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
		this.setState({
			[e.target.name]: e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1, e.target.value.length)
		});
	};

	handleEditNumber = text => {
		const numbersArray = [...this.state.numbers];
		const index = numbersArray.findIndex(number => number === text);
		numbersArray.splice(index, 1, text);
		const validate = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(text);
		validate ? this.setState({ numbers: numbersArray, addNumber: false }) : alert('enter valid phone number');
		this.setState({ numbers: numbersArray, addNumber: false });
	};

	handleNumber = e => {
		this.setState({ number: e.target.value });
	};

	handleSaveNumber = e => {
		const { number, numbers } = this.state;
		const validate = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(number);
		validate
			? this.setState({ numbers: [...numbers, number], newPhone: '', addNumber: false })
			: alert('please enter valid number');
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
		const fields = [
			{
				value: firstName,
				id: 'firstName',
				name: 'firstName',
				label: 'First Name',
				placeholder: 'FirstName'
			},
			{
				value: lastName,
				id: 'lastName',
				name: 'lastName',
				label: 'Last Name',
				placeholder: 'LastName'
			}
		];
		return (
			<form onSubmit={this.handleSaveContact} className="form">
				{fields.map((field, index) => {
					return (
						<div key={index} className="form-group name">
							<label className="col-6 col-md-4" htmlFor={field.label}>
								{field.label}
							</label>
							<input
								type="text"
								className="col-12 col-sm-6 col-md-8"
								value={field.value}
								id={field.id}
								required
								name={field.name}
								placeholder={field.placeholder}
								onChange={this.handleChange}
							/>{' '}
						</div>
					);
				})}

				<div className="form-group numbers">
					<label className="col-6 col-md-8 ">Phone Number</label>
					{numbers.map((number, index) => {
						return (
							<div key={number} className="phoneNumber">
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
									X
								</button>
							</div>
						);
					})}
				</div>
				{addNumber && (
					<div className="newNumbers">
						<input name="numbers" type="text" onChange={this.handleNumber} validate={this.handleValidate} />
						<button type="button" onClick={this.handleSaveNumber}>
							Save
						</button>
						<button type="button" onClick={this.handleCancel}>
							Cancel
						</button>
					</div>
				)}
				<button onClick={this.handleAddNumberState} className="btn btn-dark add" title="Add Number">
					<i className="fa fa-plus" aria-hidden="true" />
				</button>
				<div className="btngrp">
					<button className="btn btn-link float-right" type="submit" title="Savew Contact">
						<i className="fa fa-save" aria-hidden="true" />
					</button>
					{this.props.action === 'edit' && (
						<button
							type="button"
							className="btn btn-link float-left"
							title="DeleteContact"
							onClick={this.handleDeleteContact}
						>
							<i className="fa fa-trash" aria-hidden="true" />
						</button>
					)}
				</div>
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
