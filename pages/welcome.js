import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import socket from "./api/socket";

export default function Welcome() {
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    setFullName(storedFullName);

    socket.on("chat-message", (msg) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat-message", handleIncomingMessage);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const msg = { fullName, content: message };
      socket.emit("send-message", msg);
      setMessage("");
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.header}>Welcome, {fullName}</h1>
        <p className={styles.subtitle}>This is your chat application.</p>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
        {/* Chat Boxxxxxxxxxxxxx */}
        <div className={styles.chatBox}>
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.fullName}:</strong> {msg.content}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
