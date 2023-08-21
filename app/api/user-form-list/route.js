import Form from '@models/form';
import User from '@models/user';
import {connectToDB} from '@utils/database';

export const GET = async (request)=> {
	try{
		const userId = request.headers.get('x-user');
		await connectToDB();
		const associatedFormIds = await User.findOne({_id: userId}).select({forms:1});
		if(!associatedFormIds.forms || !associatedFormIds.forms.length) throw new Error('No Form Found');
		const forms = await Form.find({_id: {$in: associatedFormIds.forms}});
		const modifiedForms = forms.map((form) => {
			const formId = form._id;
			delete form._doc.formJson;
			delete form._doc.createdBy;
			delete form._doc._id;
			return { ...form._doc, formId };
		});
		return new Response(JSON.stringify(modifiedForms), {status: 200});
	} catch (e) {
		console.error(e);
		return new Response(e, {status: 500});
	}
};