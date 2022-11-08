import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout2";
import Lista from "../../components/ListaUsuarios";
export default function Usuario() {
  return (
    <Layout title="Home">
      <div className={styles.container}>
        <h1 className={styles.title}>Usuarios</h1>
      </div>
      <Lista/>
    </Layout>    
  );
}
