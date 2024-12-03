const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  gender: { type: String, required: true },
  subjects: { type: [String], required: true }, // Array of strings
  url: { type: String, required: true },
  selectedOption: { type: String, required: true },
  about: { type: String, required: true },
  resume: { type: String, default: null }, // File path for the resume
}, { timestamps: true });

const FormModel = mongoose.model('Form', formSchema);
module.exports = FormModel;
