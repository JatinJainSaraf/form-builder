import Form from '@models/form';
import {connectToDB} from '@utils/database';

export const POST = async (request) => {
	const {jsonSchema, formConfigs: {formName}} = await request.json();
	const email = await request.headers.get('x-user');
	try {
		await connectToDB();
		let formData={};
		formData.formJson = jsonSchema;
		formData.formName = formName;
		formData.email = email;
		await Form.create(formData);
		return new Response(formData, {status: 201});
	} catch (error) {
		return new Response('Failed to create a new Form', {status: 500});
	}
};