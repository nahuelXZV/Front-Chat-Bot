import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

export default function Pedidos() {
  return (
    <Layout title="Home">
      <div className={styles.container}>
        <h1 className={styles.title}>Lista de Pedidos</h1>
      </div>
    </Layout>
  );
}
