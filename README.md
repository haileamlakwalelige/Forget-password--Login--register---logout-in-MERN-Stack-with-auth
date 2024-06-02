----

# Forget Password, Login, Register and Logout with auth MERN Stack Project

This is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Project Structure

The project is structured into two main folders:

- **client**: Contains the front-end React application.
- **server**: Contains the back-end Node.js server.

## Getting Started

To run the project locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git [clone <repository-url>](https://github.com/haileamlakwalelige/Forget-password--Login--register---logout-in-MERN-Stack-with-auth)
   cd <repository-name>
   ```

2. **Install Dependencies**

   Install dependencies for both client and server:

   ```bash
   # Install dependencies for server
   cd server
   npm install

   # Install dependencies for client
   cd ../client
   npm install
   ```

3. **Run the Development Server**

   You can use `npm run dev` to concurrently run both the server and client:

   ```bash
   # From the root of the project
   npm run dev
   ```

   This command will start the Node.js server on port 5000 and the React development server on a different port.

4. **Accessing the Application**

   Open your browser and go to `http://localhost:3000` to view the client-side React application.

## Functionality

- **Authentication**: The application uses cookies for authentication. Logging out clears the authentication token stored in the cookie.
  
- **Home Page**: Users are redirected to the home page after successful login. Access to the home page requires a valid authentication token.

## Technologies Used

- **Front-End**:
  - React.js
  - Axios
  
- **Back-End**:
  - Node.js
  - Express.js

- **Database**:
  - MongoDB atlas

## Folder Structure

- **client/**: Contains the front-end React application code.
- **server/**: Contains the back-end Node.js server code.

## Additional Notes

- Make sure MongoDB is installed and running locally or configured properly if using a cloud database.
- Adjust configurations and environment variables as per your specific requirements (e.g., database connection strings, API endpoints).

---


