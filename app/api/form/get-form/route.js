import Form from '@models/form';
import { connectToDB } from '@utils/database';

export const GET = async (request) => {
	try{
		const formId = await request.headers.get('x-form-id');
		console.log("🚀 ~ file: route.js:7 ~ GET ~ formId:", formId)
		await connectToDB();
		const formDetails = await Form.findOne({_id: formId});
		console.log("🚀 ~ file: route.js:9 ~ GET ~ formDetails:", formDetails)
		
		return new Response(JSON.stringify(formDetails), {status: 200});
	} catch(error) {
		return new Response('Failed to fetch form data', {status: 500});
	}
};