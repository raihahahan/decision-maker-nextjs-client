import Head from "next/head";
import Image from "next/image";
import FeatureButton from "../common/components/buttons";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <FeatureButton text="Hello" onClick={() => alert("Hello World")} />
      </main>
    </div>
  );
}
