import Form from '@models/form';
import { connectToDB } from '@utils/database';

export const GET = async (request) => {
	try{
		const formId = await request.headers.get('x-form-id');
		await connectToDB();
		const formDetails = await Form.findOne({_id: formId});
		return new Response(JSON.stringify(formDetails), {status: 200});
	} catch(error) {
		return new Response('Failed to fetch form data', {status: 500});
	}
};