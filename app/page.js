"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Message from "./components/Message";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
    {
      role: "user",
      content: "Hello World",
    },
  ]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  const sendMessage = () => {
    console.log("THIS IS THE MESSAGE: " + message);
    const newMessage = {
      role: "user",
      content: message,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.img_container}>
            <Image
              alt="chatbot"
              src="/chatbot.png"
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.header_content}>
            <h1 className={styles.title}>Chatbot</h1>
          </div>
        </div>
        <div className={styles.body}>
          {messages.map((message, i) => {
            return (
              <Message content={message.content} role={message.role} key={i} />
            );
          })}
        </div>
        <div className={styles.input}>
          <input
            value={message}
            onChange={handleChange}
            className={styles.inputField}
          />
          <div className={styles.btn} onClick={sendMessage}>
            <BsFillSendFill
              className={styles.btnIcon}
              style={{ color: "#c14545" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
