import Image from "next/image";
import styles from "./page.module.css";
import Message from "./components/Message";

export default function Home() {
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
          <Message content="Hello" />
          <Message content="Hello" />
          <Message content="Hello" />
          <Message content="Hello" />
        </div>
        <div className={styles.input}>asdsad</div>
      </div>
    </main>
  );
}
