import React from "react";
import styles from "../styles/Message.module.css";

function Message({ content, author }) {
  return (
    <div className={styles.body}>
      <p>{content}</p>
    </div>
  );
}

export default Message;
