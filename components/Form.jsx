import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormBuilder } from '@formio/react';
const Form = ({ formTitle, formConfigs, setFormConfigs, usersOptions, jsonSchema, setJsonSchema, handleSave }) => {
	const handleInput = (e) => {
		const { id, value } = e.target;
		setFormConfigs((prevConfigs) => ({
			...prevConfigs,
			[id]: value,
		}));
	};
	const handleFormChange = useCallback((schema) => {
		setJsonSchema({ ...schema, components: [...schema.components] });
	}, [setJsonSchema]);
	
	const handleMultiSelectChange = (field, event) => {
		const selectedOptions = event.target.options;
		const selectedUsers = [];

		for (let i = 0; i < selectedOptions.length; i++) {
			if (selectedOptions[i].selected) {
				selectedUsers.push(selectedOptions[i].value);
			}
		}

		setFormConfigs((prevConfigs) => ({
			...prevConfigs,
			[field]: selectedUsers,
		}));
	};
	console.log(formConfigs);
	return (
		<div>
			<h1 className="text-2xl font-semibold mb-4">{formTitle}</h1>
			<div className="bg-white p-4 shadow-lg mb-6">
				<h2 className="text-lg font-semibold mb-2">Form Configs</h2>
				<div className="flex flex-col md:flex-row gap-8">
					<div className="w-full md:w-1/2">
						<label htmlFor="formName" className="block text-sm font-medium text-gray-700">
							Form Name
						</label>
						<input
							className="border border-gray-300 mt-1 px-3 py-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
							type="text"
							placeholder="Form Name"
							id="formName"
							onChange={handleInput}
							value={formConfigs.formName}
						/>
					</div>
				</div>
				<div className="w-full md:w-1/2">
					<label htmlFor="usersDropdown" className="block text-sm font-medium text-gray-700">
						Users
					</label>
					<select
						id="usersDropdown"
						multiple
						className="border border-gray-300 mt-1 px-3 py-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
						value={formConfigs.selectedUsers}
						onChange={(event) => handleMultiSelectChange('selectedUsers', event)}
					>
						<option value={''}>Select User</option>
						{usersOptions?.map((user) => (
							<option key={user._id} value={user._id}>
								{user.name}
							</option>
						))}
					</select>
				</div>
			</div>
			<div>
				<FormBuilder form={jsonSchema} onChange={handleFormChange} />
			</div>
			<button
				onClick={handleSave}
				className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
			>
				Save
			</button>
		</div>
	);
};

Form.propTypes = {
	formTitle: PropTypes.string.isRequired,
	formConfigs: PropTypes.object.isRequired,
	setFormConfigs: PropTypes.func.isRequired,
	usersOptions: PropTypes.array.isRequired,
	jsonSchema: PropTypes.object.isRequired,
	setJsonSchema: PropTypes.func.isRequired,
	handleSave: PropTypes.func.isRequired,

};

export default Form;