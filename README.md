#Form Submission App

This project is a form submission application built with React and Node.js. Users can submit forms with personal information. The backend processes the data, validates it, and saves it to a MongoDB database. The uploaded files are stored in a server directory.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone url
   ```

2. Navigate to the project directory:

   ```bash
   cd Form Submission
   ```

3. Install the dependencies for both the frontend and backend:

   For the backend:

   ```bash
   cd Backend
   npm install
   ```

   For the frontend:

   ```bash
   cd Frontend
   npm install
   ```

4. Set up the environment variables in a `.env` file for the backend (if applicable). Example:

   ```
   MONGODB_URL=mongodb://localhost:27017/form_submission
   PORT=3000
   ```

5. Start both the frontend and backend servers:
   - Backend: `npm start` (inside the backend folder)
   - Frontend: `npm run dev` (inside the frontend folder)

## Usage

1. Open the app in your browser at `http://localhost:3000`.
2. Fill out the form with required details, including uploading your resume file.
3. Submit the form, and the data will be validated and saved to the MongoDB database.
4. Check the database to see the stored form data, including the uploaded file's path.

## Features

- User can submit a form with personal details.
- Resume file upload functionality.
- Data validation using Zod.
- Data stored in MongoDB database.
- Resume files are stored in the server directory.
- Error handling and validation feedback for the user.

## Technologies Used

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express, Multer (for file upload), Zod (for validation), MongoDB
- **Database**: MongoDB
- **File Storage**: Local file storage (for resumes)
