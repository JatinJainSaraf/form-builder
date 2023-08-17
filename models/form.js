import {model, models, Schema} from 'mongoose';

const FormSchema = new Schema({
	formJson: {
		type:Object,
		required: true,
	}, 
	email: {
		type: String,
		require: true,
	},
	formName: {
		type: String,
		required: true,
	},
},{
	collection: 'forms',
	versionKey: false,
	timestamps: {createdAt: 'createdAt', updatedAt: 'updateAt'}
});

const Form= models.Form || model('Form', FormSchema);

export default Form;
