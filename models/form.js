import {model, models, Schema} from 'mongoose';

const FormSchema = new Schema({
	formJson: {
		type:Object,
		required: true,
	}, 
	formName: {
		type: String,
		required: true,
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	isFormFilled: {
		type: Boolean,
		default : false,
	},
},{
	collection: 'forms',
	versionKey: false,
	timestamps: {createdAt: 'createdAt', updatedAt: 'updateAt'}
});

const Form= models.Form || model('Form', FormSchema);

export default Form;
