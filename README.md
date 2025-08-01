Encrypted Chat App

This project is a simple encrypted chat application built with React, Firebase, and AES encryption using CryptoJS. It demonstrates secure message exchange between users, with messages encrypted before being stored in Firestore and decrypted on display.

Features

- User Authentication: Users can log in and select other users to chat with.
- Encrypted Messaging: Messages are encrypted using AES before being sent and stored in Firestore.
- Decryption on Display: Messages are decrypted in the chat window for display.
- Real-time Updates: Uses Firestore's real-time capabilities to update chat messages instantly.
- User Selection: Chat with any user from the dropdown list.

How Encryption Works

- The shared secret key (`my_super_secret_key_123!`) is used for AES encryption and decryption (see `ChatWindow.jsx`).
- The `encryptMessage` function encrypts outgoing messages.
- The `decryptMessage` function decrypts incoming messages for display.

File Structure

- `src/ChatWindow.jsx`: Main chat logic, encryption/decryption helpers.
- `src/LoginScreen.jsx`: User login interface.
- `src/UserDropdown.jsx`: User selection dropdown.
- `firebase.js`: Firebase configuration.
- `index.html`, `main.jsx`, `App.jsx`: App entry and layout.

Getting Started

1. Clone the repository.
2. Install dependencies:

   npm install

3. Set up Firebase in `firebase.js` with your project credentials.
4. Start the app:

   npm run dev

live demo: https://cs-security-c-app.vercel.app/
