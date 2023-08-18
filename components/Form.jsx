import React from 'react';
import PropTypes from 'prop-types';

const Form = ({params}) => {
	console.log(params);
	return (
		<div>
			<h1 className="text-2xl font-semibold mb-4">{params}</h1>
		</div>
	);
};

Form.propTypes = {
	params: PropTypes.object.isRequired,
};

export default Form;