import Image from 'next/image';
import React from 'react';

export const AdminLandingPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold">Welcome to the Admin Panel</h1>
			</div>
			<div className="mb-8">
				<Image src="/assets/images/admin.png" width={500} height={500} alt="Admin Image" />
			</div>
			<div className="text-center">
				<p className="text-lg mb-4">This is the landing page for the Form Builder admin panel. You can manage users, settings, and more.</p>
			</div>
		</div>
	);
};
