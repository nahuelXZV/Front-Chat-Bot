import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Image from "next/image";
export default function Home() {
  return (
    <Layout title="Home">
      {/* <div className={styles.container}> */}
      <Image
        src="https://es.sendinblue.com/wp-content/uploads/sites/6/2020/08/herramientas-de-marketing-digital.png"
        alt="Picture of the author"
        width={1120}
        height={587}
        className="w-full h-auto"
      />
      {/* </div> */}
    </Layout>
  );
}
