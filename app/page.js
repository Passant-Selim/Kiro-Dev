import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.header}>Welcome to Our Chat App!</h1>
        <p className={styles.subtitle}>Choose an option:</p>
        <div className={styles.links}>
          <Link href="/signup" className={styles.link}>
            Sign Up
          </Link>
          <br />
          <Link href="/login" className={styles.link}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
