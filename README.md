# Retro Blog Website

A retro-themed blog website built with the MERN stack that allows users to create, read, update, and delete blogs and comments. The website also features user authentication using JWT.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Token (JWT)

## Environment Variables

Create an `.env` file in the backend folder and add the following variables:
<pre><code>
PORT=your_port_number
MONGO_URI=your_mongodb_uri
SECRETE=your_jwt_secret_code
</code></pre>

## Installation

To install all the necessary dependencies, navigate to the backend folder and run:

<pre><code>
npm install
</code></pre>

## API Routes

### Blog Routes

- **GET** `/api/blog/` - Fetch all blogs
- **GET** `/api/blog/:id` - Fetch a single blog by ID
- **POST** `/api/blog/` - Create a new blog
- **PUT** `/api/blog/:id` - Update a blog by ID
- **DELETE** `/api/blog/:id` - Delete a blog by ID

### Comment Routes

- **GET** `/api/comment/:Blog_id` - Fetch all comments for a specific blog
- **GET** `/api/comment/post/:id` - Fetch a single comment by ID
- **POST** `/api/comment/` - Create a new comment
- **PUT** `/api/comment/:id` - Update a comment by ID
- **DELETE** `/api/comment/:id` - Delete a comment by ID

### User Routes

- **POST** `/api/post/login` - Login the user
- **POST** `/api/post/signup` - Sign up the user

## Usage

1. Clone the repository:
    <pre><code>
     https://github.com/ArunM037/Retro_Blog-Using-Mern-Stack.git
    </code></pre>

2. Navigate to the project directory:
    <pre><code>
    cd retro-blog
    </code></pre>

3. Create the `.env` file in the backend folder with the necessary environment variables.

4. Install dependencies:
    <pre><code>
    npm install
    </code></pre>

5. Start the backend server:
    <pre><code>
    nodemon dev
    </code></pre>

6. Navigate to the frontend folder and install dependencies:
    <pre><code>
    cd frontend
    npm install
    </code></pre>

7. Start the frontend development server:
    <pre><code>
    npm start
    </code></pre>

8. Open your browser and go to `http://localhost:your_port_number` to view the application.

## Features

- **User Authentication:** Users can sign up and log in using JWT authentication.
- **CRUD Operations:** Users can create, read, update, and delete blogs and comments.
