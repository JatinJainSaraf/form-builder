'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormBuilder } from '@formio/react';
import Form from '@components/Form';

function EditForm({ params: { id } }) {
	const [jsonSchema, setJsonSchema] = useState({ components: [] });
	const [formConfigs, setFormConfigs] = useState({
		formName: '',
		selectedUsers: [],
	});
	const [usersOptions, setUsersOptions] = useState([]);
	const fetchUsers = async () => {
		try {
			const response = await fetch('api/fetch-users');
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
		<div>
			<Form title={'Edit Form '}/>

		</div>
	);
}

EditForm.propTypes = {
	params: PropTypes.object.isRequired
};

export default EditForm;

