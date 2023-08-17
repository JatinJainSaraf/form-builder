'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { FormBuilder } from '@formio/react';
import { useSession } from 'next-auth/react';
import '@styles/FormBuilder.module.css';

const CreateForm = () => {
	const { data: session } = useSession();
	const [jsonSchema, setJsonSchema] = useState({ components: [] });
	const [formConfigs, setFormConfigs] = useState({
		formName: '',
		selectedUsers: []
	});
	const [users, setUsers] = useState([]);

	const handleFormChange = useCallback((schema) => {
		setJsonSchema({ ...schema, components: [...schema.components] });
	}, []);

	const handleSave = async () => {
		try {
			const response = await fetch('/api/form-builder', {
				method: 'POST',
				headers: {
					'x-user': session?.user?.email,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					jsonSchema,
					formConfigs,
				}),
			});

			if (response.ok) {
				console.log('Form Saved Successfully');
			}
		} catch (error) {
			console.error('Error saving form:', error);
		}
	};

	const handleInput = (e) => {
		const { id, value } = e.target;
		setFormConfigs((prevConfigs) => ({
			...prevConfigs,
			[id]: value,
		}));
	};
	const fetchUsers = async () => {
		try {
			const response = fetch('api/fetch-users', {
				headers: {
					'Content-Type': 'application/json',
				}
			});
			if (response.ok) {
				const users = await response.json();
				setUsers(users);
			}
		} catch (e) {
			console.error('Error fetching users:', e);
		}
	};

	const handleSelectChange = (field, event) => {
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

	useEffect(() => {
		fetchUsers();
		return () => {
		};
	}, [session]);

	return (
		<div className='bg-body-secondary p-8 shadow-md'>
			<h1>Form Builder</h1>
			<div className='bg-white p-2 shadow-lg mb-5'>
				<h5>Form Configs</h5>
				<br />
				<div className='flex gap-28'>
					<div>
						<label htmlFor='formName' className='mx-5'>
							Form Name
						</label>
						<input
							className='border-2'
							type='text'
							placeholder='Form Name'
							id='formName'
							onChange={handleInput}
							value={formConfigs.formName}
						/>
					</div>
					<div className='flex'>
						<label htmlFor='usersDropdown' className='mx-5'>
							Users
						</label>
						<select
							id='usersDropdown'
							multiple
							onChange={(event) => handleSelectChange('selectedUsers', event)}
							value={formConfigs.selectedUsers}
						>
							<option value=''>Select a user</option>
							{users.map((user) => (
								<option key={user.id} value={user.id}>
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
			<button onClick={handleSave} className='btn btn-primary'>
				Save
			</button>
		</div>
	);
};

export default CreateForm;
