
#  About TeamConnect

TeamConnect is a powerful team collaboration platform that allows you to communicate and collaborate with your team members in real-time. Whether you're working remotely or in the same office, our application provides a seamless and efficient way to stay connected.

### Explore our plateform
  - <a href="https://teamconnect-algorithm-whisperer.netlify.app/">Live Link</a>


## Project Type 
Fullstack

## Deployed App
- Frontend : <a href="https://teamconnect-algorithm-whisperer.netlify.app/">Link</a>
- Backend : <a href="https://teamconnect.onrender.com/">Link</a>
- Database : [link]

## Directory Structure
- TeamConnect/
- ├─ backend/
- │  ├─ middlewares/
- │  │  ├─ auth.middlewarer.js
- │  │  ├─ uploadfile.middle.js
- │  ├─ models/
- │  │  ├─ user.model.js
- │  │  ├─ workspace.model.js
- │  ├─ routes/
- │  │  ├─ message.routes.js
- │  │  ├─ user.routes.js
- │  │  └─ workspace.routes.js
- │  ├─ db.js
- │  ├─ index.js
- ├─ frontend/
- │  ├─ assets
- │  ├─ images
- │  ├─ scripts/
- │  │  ├─ loginAndRegister.js
- │  │  ├─ main.js
- │  │  ├─ videopagescript.js
- │  ├─ styles/
- │  │  ├─ chatbox.css
- │  │  ├─ contact.css
- │  │  ├─ contactfooter.css
- │  │  ├─ loginAndRegister.css
- │  │  ├─ popup.css
- │  │  ├─ style.css
- │  │  ├─ svideopagestyle.css
- │  ├─ view/
- │  │  ├─ chatbox.html
- │  │  ├─ contact.html
- │  │  ├─ loginAndRegister.html
- │  │  ├─ videopage.html
- │  ├─ index.html


## Features
- Real-time Messaging
- Direct messaging between users
- User Authentication
- Channels and Direct Messages (DMs)
- File and media sharing
- Video Calling

## Design Decisions or Assumptions

- **Real-time Messaging:** Implemented using WebSocket technology for instant message delivery and updates.
- **User Authentication:** Utilized JWT (JSON Web Tokens) for secure user authentication and authorization.
- **Database Schema:** Designed MongoDB schema with collections for users, messages, and other relevant data.
- **Scalability:** Chose a microservices architecture for the backend to ensure scalability and modularity.

## Installation & Getting Started
1. Clone the repository:
   ```bash
    git clone https://github.com/SreeHarsha-Kamisetty/TeamConnect.git 
3. Navigate to the project directory:
    ```bash
     cd your-project
5. Install dependencies:
   ```bash
    npm install
6. Configure environment variables:
      - Create a .env file in the backend directory.<br>
      - Add necessary environment variables such as database connection URI, JWT secret key, etc.
7. Start the backend server:
    ```bash
    cd backend
    npm start
9. Start the frontend application:
     ```bash
     cd frontend
     npm start
11. Access the application at `http://localhost:3000`.


## Usage
### User Registration
- Visit the application's URL.
- Click on the "Sign Up" button to create a new user account.
- Fill out the registration form .
- Once registered, you can log in with your credentials.

![Screenshot 2024-02-25 101300](https://github.com/SreeHarsha-Kamisetty/TeamConnect/assets/102248292/a4fff7f8-f07a-42d0-ab56-65bf28ac5e60)


### Sending Messages
- To send a message in a channel, click on the user's name in the left sidebar.
- Type your message in the input field at the bottom of the chat window and press Enter to send.
- You can also send direct messages to other users by clicking on their name in the user list.

### File and Media Sharing
- To share files or media, click on the file/media sharing icon within the messaging interface.
- Select the file or media you want to share from your device and click "Send."
- Other users in the conversation will be able to view/download the shared files or media.

### Video Calling
- To initiate a video call, go to the user's profile or existing conversation.
- Click on the "Video Call" button to start a video call with the selected user(s).
- Ensure that your device has a camera and microphone enabled for video and audio communication.
  
## Tech Stack

- **HTML**
- **CSS**
- **JavaScript**
- **Node.js**
- **Express**
- **MongoDB**

## Contribution Guidelines

We welcome contributions from the community! If you'd like to contribute to TeamConnect, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.


## License

This app is licensed under the [MIT License](LICENSE).
