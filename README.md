# Movie Hub

Movie Hub is a web application built with Vue.js, Node.js, and MongoDB that allows users to manage and explore movies. It features user authentication, a movie database, and a user management system.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)

## Features
- **User Authentication**: Secure sign-up and login process with JWT for session management.
- **User Management**: View, edit (excluding email), and delete registered users.
- **Movie Database**: Filter movies by genre and language.
- **Responsive UI**: Built using Vue components styled with Tailwind CSS.
- **Notifications**: Toast messages for successful actions and error handling.
- **Access Control**: Users cannot access the main page without logging in.

## Technologies
- **Frontend**: Vue.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation
1. Clone the repository:
   
bash
   git clone https://github.com/hereitskamal/squadra.git
   cd movie-hub
2. Install dependencies:
   npm install
3. Set up the backend:
   Navigate to the backend directory:
   cd backend
   Install backend dependencies:
   npm install

##Configure environment variables:
  Create a .env file in the backend directory and set up your MongoDB connection string and JWT secret.

##Run the application:
  For the frontend:
  npm run dev
  For the backend:
  npm run start

  ## Usage
-**Access the application at [http://localhost:3000](http://localhost:3000)]
- **Users can register, log in, and manage their profiles. Explore the movie database and apply filters to find specific movies.

## API
### Endpoints
- **GET /api/movies**: Retrieve a list of movies.
- **POST /api/movies**: Add a new movie (requires authentication).
- **PUT /api/movies/**: Update a movie's details (requires authentication).
- **DELETE /api/movies/**: Delete a movie (requires authentication).
