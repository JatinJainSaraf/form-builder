'use client';

import {SessionProvider} from 'next-auth/react';
import React from 'react';
import PropTypes from 'prop-types'; 

const Provider = ({children, session}) => {
	return (
		<SessionProvider session={session}>
			{children}
		</SessionProvider>
	);
};

Provider.propTypes = {
	children: PropTypes.node.isRequired,
	session: PropTypes.object, 
};

export default Provider;