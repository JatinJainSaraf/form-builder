'use client';
import React, { useState, useCallback } from 'react';
import { FormBuilder } from '@formio/react';
import { useSession } from 'next-auth/react';
import '@styles/FormBuilder.module.css';

const CreateForm = () => {
	const { data: session } = useSession();
	const [jsonSchema, setJsonSchema] = useState({ components: [] });
	const [formConfigs, setFormConfigs] = useState({
		formName: '',
	});
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

	return (
		<div className='bg-body-secondary p-8 shadow-md'>
			<h1>Form Builder</h1>
			<div className='bg-white p-2 shadow-lg mb-5'>
				<h5>Form Configs</h5>
				<br />
				<div>
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
