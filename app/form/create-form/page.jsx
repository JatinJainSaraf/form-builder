'use client';
import React, { useState, useCallback, useEffect } from 'react';
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

	useEffect(() => {
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
		fetchUsers();
	}, []);

	return (
		<div className="bg-body-secondary p-8 shadow-md">
			<Form
				formTitle={'Create Form '}
				formConfigs={formConfigs}
				setFormConfigs={setFormConfigs}
				usersOptions={usersOptions}
				jsonSchema={jsonSchema}
				setJsonSchema={setJsonSchema}
				handleSave={handleSave}
			/>
		</div>
	);
};

export default CreateForm;