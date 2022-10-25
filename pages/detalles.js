import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

export default function Detalles() {
  return (
    <Layout title="Home">
      <div className={styles.container}>
        <h1 className={styles.title}>Detalles de contactos</h1>
      </div>
    </Layout>
  );
}
