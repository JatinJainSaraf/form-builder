import User from '@models/user';
import {connectToDB} from '@utils/database';

export const GET = async ()=> {
	try {
		await connectToDB();
		const users = await User.find({role: 'User'}).select({_id:1, name:1}).lean();
	
		return new Response(JSON.stringify(users), {status: 200});
	} catch (error) {
		return new Response('Failed to load forms', {status: 500});
	}
};