import "../styles/globals.css";
import LayoutContext from "../context/LayoutContext";
import { useAppContext } from "../context/LayoutContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  // obtener si estamos en movil
  const layotContext = useAppContext();

  return (
    <LayoutContext>
      <Component {...pageProps} />
    </LayoutContext>
  );
}

export default MyApp;
