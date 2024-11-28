# Spotigit

**Spotigit** is a web application that provides version control for Spotify playlists, allowing users to manage and track changes to their playlists similarly to how Git tracks changes in software development. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and TypeScript, Spotigit integrates with the Spotify Web API using OAuth 2.0 Authorization Code Flow to securely interact with user data.

## Features

- **Version Control for Playlists**: Save, update, and restore previous versions of Spotify playlists.
- **OAuth 2.0 Authorization**: Securely authenticate users and access their Spotify data.
- **CRUD Operations**: Create, read, update, and delete playlist versions, similar to Git operations like `git init`, `git checkout`, `git commit`, and `git rm`.
- **Session Management**: Efficient session storage using Redis, supporting horizontal scaling.
- **Custom Middleware Logger**: Tracks user interactions and provides insights into typical usage patterns.

## Technologies Used

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Session Storage**: Redis
- **Authentication**: OAuth 2.0 Authorization Code Flow with the Spotify Web API
- **API Integration**: Spotify Web API
- **Middleware**: Custom logger for user interaction tracking

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aadityathukral/SpotiGit.git
   cd SpotiGit
   ```

2. **Install dependencies:**

   ```bash
   cd client
   npm install
   cd ..
   cd server
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory and add your Spotify API credentials and other environment variables:
     ```
     CLIENT_ID=your_spotify_client_id
     CLIENT_SECRET=your_spotify_client_secret
     REDIRECT_URI=http://localhost:8000/callback
     REDIRECT_CLIENT_URI=http://localhost:3000/
     SESSION_SECRET=your_session_secret
     MONGO_URI=your_mongodb_connection_string
     REDIS_URL=your_redis_url
     ```

4. **Start the development server on both the client and server directories:**

   ```bash
   cd client
   npm run dev
   cd server
   npm run dev
   ```

5. **Access the application:**
   - Visit `http://localhost:5173` in your web browser.

## Usage

1. **Login with Spotify:**

   - Click the "Login with Spotify" button to authenticate and authorize Spotigit to access your playlists.

2. **Version Control Operations:**

   - Use the interface to create, view, update, and delete versions of your playlists.
   - Track changes and restore previous playlist versions as needed.

3. **Session Management:**
   - Your session data is securely stored using Redis, ensuring efficient and scalable session handling.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact:

- **Aaditya Thukral** - aadi.thukral.work@gmail.com
- [GitHub](https://github.com/aadityathukral)
- [LinkedIn](https://www.linkedin.com/in/aaditya-thukral/)
