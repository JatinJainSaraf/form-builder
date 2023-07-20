import mongoose from 'mongoose';

let FormModel;

function getFormModel() {
  if (!FormModel) {
    const formSchema = new mongoose.Schema({
      formJson: {
        type: Object,
        required: true,
      },
    });

    FormModel = mongoose.models.Form || mongoose.model('Form', formSchema);
  }

  return FormModel;
}

export default getFormModel();
