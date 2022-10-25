import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Modal from "../components/ModalSimple";
import ModalTail from "../components/ModalTail";

export default function Login() {
  return (
    <Layout title="Login">
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <Modal />
        <ModalTail />
      </div>
    </Layout>
  );
}
