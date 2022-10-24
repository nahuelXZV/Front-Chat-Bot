import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";

export default function Usuario() {
  return (
    <Layout title="Home">
      <div className={styles.container}>
        <h1 className={styles.title}>Usuarios</h1>
      </div>
    </Layout>
  );
}
