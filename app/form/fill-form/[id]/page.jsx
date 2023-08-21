'use client';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Form} from '@formio/react';

function EditFillForm({params: {id}}) {
	const [form, setForm] = useState();
	const getForm = async (formId) => {
		try {
			const response = await fetch(`/api/form/fill-form/get-fill-form/${formId}`, {
				headers: {
					'x-form-id': formId
				}
			});
			if (response.ok) {
				const formData = await response.json();
				setForm({...formData.formJson});
			} else {
				console.error('Failed to fetch form data. Status:', response.status);
			}
		} catch (error) {
			console.error('Error fetching form data:', error);
		}
	};
	useEffect(() => {
		if(id){
			getForm(id);
		}
	}, [id]);
	return (
		<div className="max-w-md mx-auto mt-8 p-4 shadow-md rounded">
			{form ? (
				<>
					<h2 className="text-2xl font-bold mb-4">Fill the Form</h2>
					<Form form={form}/>
				</>
			) : (
				<p>Loading form...</p>
			)}
		</div>
	);
}

EditFillForm.propTypes = {
	params: PropTypes.object.isRequired
};

export const dynamic = 'force-dynamic'

export default EditFillForm;

