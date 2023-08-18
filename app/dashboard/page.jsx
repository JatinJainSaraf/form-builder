'use client';
import React, { useState, useEffect } from 'react';
import FormList from '@components/FormList';
import { useSession } from 'next-auth/react';
import { ROLE } from '@constant/constant';

const Dashboard = () => {
	const { data: session } = useSession();
	const [forms, setForms] = useState([]);

	const fetchAdminForms = async (userId) => {
		const response = await fetch('api/admin-form-list', {
			headers: {
				'Content-Type': 'application/json',
				'x-user': userId,
			},
		});
		if (response.ok) {
			const forms = await response.json();
			setForms(forms);
		} else {
			console.error('Failed to fetch form data. Status:', response.status);
		}
	};
	const fetchUserForms = async (userId) => {
		const response = await fetch('api/user-form-list', {
			headers: {
				'Content-Type': 'application/json',
				'x-user':userId,
			},
		});
		if (response.ok) {
			const forms = await response.json();
			setForms(forms);
		} else {
			console.error('Failed to fetch form data. Status:', response.status);
		}
	};
	useEffect(() => {
		if (session && session.user.role === ROLE.ADMIN) {
			fetchAdminForms(session.user.id);
		} else if (session && session.user.role === ROLE.USER) {
			fetchUserForms(session.user.id);
		}
	}, [session]);
	return (
		<div className="flex flex-col">
			<div className="bg-white p-8 shadow-md">
				<FormList forms={forms}/>
			</div>
		</div>
	);
};

export default Dashboard;
