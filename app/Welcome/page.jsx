'use client';

import { AdminLandingPage } from '@components/AdminLandingPage';
import { UserLandingPage } from '@components/UserLandingPage';
import { ROLE } from '@constant/constant';
import { useSession } from 'next-auth/react';
import React from 'react';
const Welcome = () => {
	const {data: session, status} = useSession();

	return (
		<div>{status==='authenticate' && session.user.role === ROLE.ADMIN ?<AdminLandingPage />: <UserLandingPage />}</div>
	);
};

export default Welcome;