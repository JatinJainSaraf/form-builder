import Form from '@models/form';
import User from '@models/user';
import { connectToDB } from '@utils/database';

export const POST = async (request) => {
	const { jsonSchema, formConfigs: { formName, selectedUsers } } = await request.json();
	const email = await request.headers.get('x-user');
  
	if (!email) {
		return new Response('User not found', { status: 404 });
	}

	try {
		await connectToDB();
		const users = await User.find({ _id: { $in: selectedUsers } });

		const formData = {
			formJson: jsonSchema,
			formName: formName,
			email: email,
		};

		const newForm = await Form.create(formData);

		await Promise.all(users.map(async (user) => {
			user.forms.push(newForm._id);
			await user.save();
		}));

		return new Response(formData, { status: 201 });
	} catch (error) {
		console.error(error);
		return new Response('Failed to create a new Form', { status: 500 });
	}
};
