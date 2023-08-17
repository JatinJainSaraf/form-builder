'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

const FormList = () => {
	const { data: session } = useSession();
	const [forms, setForms] = useState([]);

	const fetchForms = async () => {
		const response = await fetch('api/form-list', {
			headers: {
				'Content-Type': 'application/json',
				'x-user': session?.user?.email,
			},
		});
		if (response.ok) {
			const forms = await response.json();
			setForms(forms);
		} else {
			console.error('Failed to fetch form data. Status:', response.status);
		}
	};

	const handleEdit = ()=>{

	};

	useEffect(() => {
		if (session) {
			fetchForms();
		}
	}, [session]);

	return (
		<>
			<h2 className="text-2xl font-semibold mb-4">List of Forms</h2>

			<div className="bg-gray-100 p-8">
				<table className="table-auto w-full border-collapse">
					<thead>
						<tr className="bg-gray-200">
							<th className="px-4 py-2">Form Id</th>
							<th className="px-4 py-2">Form Name</th>
							<th className="px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{forms?.map((form) => (
							<tr key={form._id} className="border-b">
								<td className="px-4 py-2">{form._id}</td>
								<td className="px-4 py-2">{form.formName}</td>
								<td className="px-4 py-2">
									<div className='flex justify-between'>
										<button className="text-body" onClick={handleEdit}>
											<FontAwesomeIcon icon={faEdit} /> 
										</button>
										<button className="text-danger">
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</div>
									
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default FormList;
