'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { ROLE } from '@constant/constant';
import { AdminLandingPage } from '@components/AdminLandingPage';
import {UserLandingPage} from '@components/UserLandingPage';

const Welcome = () => {
	const { data: session, status } = useSession();

	const renderLandingPage = () => {
		if (status === 'authenticated') {
			return session.user.role === ROLE.ADMIN ? <AdminLandingPage /> : <UserLandingPage />;
		}
		return null;
	};

	return <div>{renderLandingPage()}</div>;
};

export default Welcome;
