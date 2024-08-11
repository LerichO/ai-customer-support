import React from "react";
import styles from "../styles/Message.module.css";

function Message({ content, role }) {
  return (
    <div
      className={[styles.body]}
      style={{
        backgroundColor:
          role == "assistant"
            ? "rgba(196, 196, 196, 0.46)"
            : "rgba(144, 89, 89, 0.39)",
        alignSelf: role == "assistant" ? "flex-start" : "flex-end",
      }}
    >
      <p>{content}</p>
    </div>
  );
}

export default Message;
