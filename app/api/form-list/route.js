import Form from '@models/form';
import {connectToDB} from '@utils/database';

export const GET = async (request)=> {
	try {
		await connectToDB();
		const forms = await Form.find({email: request.headers.get('x-user')}).select({_id: 1, formName: 1});
		return new Response(JSON.stringify(forms), {status: 200});
	} catch (error) {
		return new Response('Failed to load forms', {status: 500});
	}
};