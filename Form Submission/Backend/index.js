const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const { z } = require('zod');
const path = require('path');
const Form = require('./model/form.model.js')

const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Include cookies if needed
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage });

//ZOD schema for validation
const formValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().regex(/^\d{10,15}$/, "Invalid contact number"),
  gender: z.enum(["male", "female", "other"]),
  subjects: z.array(z.string()).nonempty("Subjects must include at least one item"),
  url: z.string().url("Invalid URL"), // Change to .email() if URL isn't needed
  selectedOption: z.string().min(1, "Please select an option"),
  about: z.string().optional(),
});

app.post('/submit', upload.single('resume'), async (req, res) => {
  console.log("Received POST request to /submit");

  try {
    console.log("Request body:", req.body);
    console.log("File:", req.file);


    // Validate incoming data
    const validatedData = formValidationSchema.safeParse({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
      gender: req.body.gender,
      subjects: JSON.parse(req.body.subjects),
      url: req.body.url,
      selectedOption: req.body.selectedOption,
      about: req.body.about,
    });

    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      return res.status(400).json({ success: false, error: validatedData.error.errors });
    }
    const resumeUrl = req.file ? `uploads/${req.file.filename}` : null;

    const formData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
      gender: req.body.gender,
      subjects: JSON.parse(req.body.subjects),
      url: req.body.url,
      selectedOption: req.body.selectedOption,
      about: req.body.about,
      resume: resumeUrl,  // Save the resume file path
    };

    // Save the data to the database
    const savedData = await Form.create(formData);

    // Respond with the saved data
    res.status(200).json({ success: true, data: savedData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, (() => {
  console.log("Server Started successfully...");
}))



