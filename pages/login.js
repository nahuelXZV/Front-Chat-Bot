import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

export default function Login() {
  return (
    <Layout title="Login">
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
      </div>
    </Layout>
  );
}
