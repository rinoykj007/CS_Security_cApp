import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
  collection,
} from "firebase/firestore";

import "./App.css";
import { auth, app } from "../firebase";
const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      message: newMessage,
      timestamp: serverTimestamp(),
    });
    setNewMessage("");
  };

  const handelGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handelSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      {user ? (
        <>
          <div>
            <span>Logged in as {user.displayName}</span>
            <button className="sign-out-button" onClick={handelSignOut}>
              Sign Out
            </button>
          </div>

          <div className="message-container">
            {messages.map((message) => (
              <div className="message-item" key={message.id}>
                <img
                  src={message.data.photoURL}
                  alt={message.data.displayName}
                />
                <div className="message-content">
                  <p>{message.data.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="send-button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="login-screen">
          <h1>Welcome to Chat App</h1>
          <p style={{ margin: "20px 0" }}>Sign in to start chatting</p>
          <button onClick={handelGoogleSignIn}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}

export default App;
