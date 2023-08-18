
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faNewspaper, faFile } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

export const HeroSection = () => {
	return (
		<div className="container mx-auto text-center">
			<h1 className="text-4xl font-bold mb-4">Welcome to UserLandingPage</h1>
			<p className="text-lg">Your one-stop destination for amazing experiences!</p>
		</div>
	);
};

const Feature = ({ icon, title, description }) => {
	return (
		<div className="flex flex-col items-center p-4">
			<FontAwesomeIcon icon={icon} />
			<h3 className="text-xl font-semibold mb-2">{title}</h3>
			<p className="text-gray-700">{description}</p>
		</div>
	);
};

Feature.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export const FeatureSection = () => {
	return (
		<section className="features bg-gray-100 py-16">
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				<Feature
					icon={faNewspaper}
					title="Assigned Forms"
				/>
				<Feature
					icon={faFile}
					title="Filled Forms"
				/>
				<Feature
					icon={faAdd}
					title="Request New Form"
				/>
			</div>
		</section>
	);
};

export const UserLandingPage = () => {
	return (
		<div className="landing-page">
			<HeroSection />
			<FeatureSection />
		</div>
	);
};
