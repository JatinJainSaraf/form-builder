import Form from '@models/form';
import User from '@models/user';

import {connectToDB} from '@utils/database';
import { ObjectId } from 'mongodb';

export const GET = async (request)=> {
	try {
		const userId = request.headers.get('x-user');
		await connectToDB();
		let forms;
		const user = await User.findOne({email: request.headers.get('x-user')}).select({_id:1, role:1,email:1});
		if(user.role==='Admin'){
			forms = await Form.find({_id: ObjectId(userId)}).select({_id: 1, formName: 1});
		} else {
			forms = await Form.find({user});
		}
	
		return new Response(JSON.stringify(forms), {status: 200});
	} catch (error) {
		return new Response('Failed to load forms', {status: 500});
	}
};