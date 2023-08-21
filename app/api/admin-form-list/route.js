import Form from '@models/form';
import {connectToDB} from '@utils/database';

export const GET = async (request)=> {
	try {
		const userId= request.headers.get('x-user');
		await connectToDB();
		const forms = await Form.find({createdBy: userId }).populate('createdBy', 'name').select({formJson: 0});
		const modifiedForms = forms.map((form) => {
			const { createdBy } = form;
			const createdByUser = createdBy.name;
			const formId = form._id;
			delete form._doc.isFormFilled;
			delete form._doc.createdBy;
			delete form._doc._id;
			return { ...form._doc, createdByUser, formId };
		});
		return new Response(JSON.stringify(modifiedForms), {status: 200});
	} catch (error) {
		console.log(error);
		return new Response('Failed to load forms', {status: 500});
	}
};