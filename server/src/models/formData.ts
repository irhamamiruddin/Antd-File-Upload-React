import mongoose from 'mongoose';

// Define the schema for the Form collection
const formData = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    attachments: [
        {
            upload_date: { type: Date },
            file_name: { type: String },
            file_path: { type: String },
        }
    ],
}, { collection: 'form' });

// Create the Form model using the defined schema
const Form = mongoose.model('form', formData);

export default Form;