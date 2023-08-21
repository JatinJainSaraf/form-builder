'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { FormBuilder } from '@formio/react';
import { useSession } from 'next-auth/react';
import '@styles/FormBuilder.module.css';
import Form from '@components/Form';

const CreateForm = () => {
	const { data: session } = useSession();
	const [jsonSchema, setJsonSchema] = useState({ components: [] });
	const [formConfigs, setFormConfigs] = useState({
		formName: '',
		selectedUsers: [],
	});
	const [usersOptions, setUsersOptions] = useState([]);

	// const handleFormChange = useCallback((schema) => {
	// 	setJsonSchema({ ...schema, components: [...schema.components] });
	// }, []);

	const handleSave = async () => {
		try {
			const response = await fetch('/api/form/create-form', {
				method: 'POST',
				headers: {
					'x-user': session?.user?.id,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					jsonSchema,
					formConfigs,
				}),
			});

			if (response.ok) {
				console.info('Form Saved Successfully');
			}
		} catch (error) {
			console.error('Error saving form:', error);
		}
	};

	// const handleInput = (e) => {
	// 	const { id, value } = e.target;
	// 	setFormConfigs((prevConfigs) => ({
	// 		...prevConfigs,
	// 		[id]: value,
	// 	}));
	// };
	// const handleMultiSelectChange = (field, event) => {
	// 	const selectedOptions = event.target.options;
	// 	const selectedUsers = [];

	// 	for (let i = 0; i < selectedOptions.length; i++) {
	// 		if (selectedOptions[i].selected) {
	// 			selectedUsers.push(selectedOptions[i].value);
	// 		}
	// 	}

	// 	setFormConfigs((prevConfigs) => ({
	// 		...prevConfigs,
	// 		[field]: selectedUsers,
	// 	}));
	// };
	const fetchUsers = async () => {
		try {
			const response = await fetch('/api/fetch-users');
			if (response.ok) {
				const users = await response.json();
				setUsersOptions(users);
			}
		} catch (e) {
			console.error('Error fetching users:', e);
		}
	};
	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className="bg-body-secondary p-8 shadow-md">
			<Form
				formTitle={'Edit Form '}
				formConfigs={formConfigs}
				setFormConfigs={setFormConfigs}
				usersOptions={usersOptions}
				jsonSchema = {jsonSchema}
				setJsonSchema={setJsonSchema}
				handleSave={handleSave}
			/>
			{/* <h1 className="text-2xl font-semibold mb-4">Form Builder</h1>
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
			</div>
			<div>
				<FormBuilder form={jsonSchema} onChange={handleFormChange} />
			</div>
			<button
				onClick={handleSave}
				className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
			>
				Save
			</button> */}
		</div>
	);
};

export default CreateForm;