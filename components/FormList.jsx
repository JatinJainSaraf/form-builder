'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ROLE } from '@constant/constant';

const FormList = ({ forms }) => {
	const {data: session} = useSession();
	const router = useRouter();
	const handleDelete = () => {
	};
	return (
		<>
			<div className='flex items-center justify-between'>
				<h2 className="text-2xl font-semibold mb-4">List of Forms</h2>
				<button className='btn border-black' onClick={()=>router.push('/form/create-form')}> 
					<FontAwesomeIcon 
						icon={faAdd}
						className='text-danger mx-2'
					/>
				Add Form</button>
			</div>
			
			<div className="bg-gray-100 p-8">
				<table className="table-auto w-full border-collapse">
					<thead>
						<tr className="bg-gray-200 items-center">
							{forms && forms.length > 0 && Object.keys(forms[0]).map((key, index) => {
								return (<th key={index}>{key}</th>);
							})}
							{forms && forms.length > 0 ? <th>Actions</th> : <th>No Form Found</th>}
						</tr>
					</thead>
					<tbody>
						{forms.map((form, rowIndex) => (
							<tr key={rowIndex}>
								{Object.values(form).map((value, colIndex) => (
									<td key={colIndex} className="border px-4 py-2">
										{value === true || value === false ? value.toString() : value}
									</td>
								))}
								<td key={'Action'} className="border px-4 py-2">
									{!form.isFormFilled &&
										(<button onClick={() => {
											if(session?.user?.role === ROLE.ADMIN) router.push(`/form/edit-form/${form.formId}`);
											if(session?.user?.role === ROLE.USER) router.push(`/form/fill-form/${form.formId}`);
										}
										}>
											<FontAwesomeIcon
												icon={faEdit}
												className="text-blue-500 cursor-pointer"
											/></button>)

									}
									<FontAwesomeIcon
										icon={faTrash}
										className="text-danger-500 cursor-pointer"
										onClick={() => handleDelete(form.formId)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
FormList.propTypes = {
	forms: PropTypes.array.isRequired,
};
export default FormList;