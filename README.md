# Vedic Padham Calculator Application

## Overview

The Vedic Padham Calculator is a comprehensive application designed to perform calculations related to Vedic astrology. It features a React frontend and an Express backend, utilizing a variety of libraries to enhance functionality and user experience.

## Frontend Dependencies

The frontend of the application is built using React and includes the following dependencies:

- **`@reduxjs/toolkit`**: ^2.2.7 - For state management using Redux.
- **`bootstrap`**: ^5.3.3 - For responsive design and styling.
- **`bootstrap-icons`**: ^1.11.3 - For additional icons.
- **`formik`**: ^2.4.6 - For handling form state and validation.
- **`jspdf`**: ^2.5.1 - For generating PDF documents.
- **`jspdf-autotable`**: ^3.8.3 - For creating tables in PDFs.
- **`react`**: ^18.3.1 - Core library for building user interfaces.
- **`react-dom`**: ^18.3.1 - For DOM-related rendering.
- **`react-redux`**: ^9.1.2 - For integrating Redux with React.
- **`react-router-dom`**: ^6.26.1 - For routing and navigation.
- **`yup`**: ^1.4.0 - For schema validation with Formik.

## Backend Dependencies

The backend of the application is developed with Node.js and Express, and includes the following dependencies:

- **`body-parser`**: ^1.20.2 - Middleware for parsing request bodies.
- **`bootstrap`**: ^5.3.3 - For styling (if used in server-side rendered views).
- **`cors`**: ^2.8.5 - Middleware for enabling Cross-Origin Resource Sharing.
- **`express`**: ^4.19.2 - Web framework for Node.js.
- **`mongoose`**: ^8.6.1 - MongoDB object modeling tool.
- **`nodemon`**: ^3.1.4 - Utility for auto-restarting the server during development.

## Installation

To set up and run the application, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   ```

2. **Navigate to the backend directory and install dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Navigate to the frontend directory and install dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server:**
   ```bash
   cd ../backend
   npm start
   ```

5. **Start the frontend development server:**
   ```bash
   cd ../frontend
   npm start
   ```

## Usage

- The backend server will be accessible at `http://localhost:5000`.
- The frontend application will be accessible at `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.