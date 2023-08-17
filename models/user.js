import {model, models, Schema} from 'mongoose';

const UserSchema = new Schema({
	email: {
		type: String,
		unique: [true, 'Email already exists!'],
		required: [true, 'Email is required!'],
	},
	username: {
		type: String,
		required: [true, 'Username is required!'],
	},
	role: {
		type: String,
		required: [true, 'Role is required'],
	},
	forms: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Form'
		},
	],
	password: {
		type: String,
		required: [true, 'Password is required!'],
	},
	name: {
		type: String,
		required: true,
	}
}, {
	collection: 'users',
	versionKey: false,
	timestamps: {createdAt: 'createdAt', updatedAt: 'updateAt'}
});

const User = models.User || model('User', UserSchema);

export default User;