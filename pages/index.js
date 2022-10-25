import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Card from "../components/Card";
export default function Home() {
  return (
    <Layout title="Home">
      <div className={styles.container}>
        <h1 className={styles.title}>Home</h1>
        <Card />

      </div>
    </Layout>
  );
}
