'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from '@components/Form';

function EditForm({ params: { id } }) {
	const [jsonSchema, setJsonSchema] = useState({ components: [] });

	const [usersOptions, setUsersOptions] = useState([]);
	const [formConfigs, setFormConfigs] = useState({
		formName: '',
		selectedUsers: [],
	});
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
	const fetchForm = async (formId) => {
		try {
			const response = await fetch(`/api/form/get-form/${formId}`, {
				headers: {
					'x-form-id': formId
				}
			});
			if(response.ok) {
				const formData = await response.json();
				console.log(formData);
				setJsonSchema({...formData.fromJson});
			} else {
				console.error('Failed to fetch form data. Status:', response.status);
			}
		} catch (e) {
			console.error('Error in fetching form:', e);
		}
	};
	const handleSave = async () => {
		try {
			const response = await fetch(`/api/form/edit-form/${id}`, {
				method: 'POST',
				headers: {
					'x-form-id': id,
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
	useEffect(() => {
		fetchUsers();
		if (id) {
			fetchForm(id);
		}
	}, [id]);


	return (
		<div className='bg-body-secondary p-8 shadow-md'>
			<Form
				formTitle={'Edit Form '}
				formConfigs={formConfigs}
				setFormConfigs={setFormConfigs}
				usersOptions={usersOptions}
				jsonSchema = {jsonSchema}
				setJsonSchema={setJsonSchema}
				handleSave={handleSave}
			/>

		</div>
	);
}

EditForm.propTypes = {
	params: PropTypes.object.isRequired
};

export default EditForm;

