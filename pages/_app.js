import "../styles/globals.css";
import LayoutContext from "../context/LayoutContext";
import { useAppContext } from "../context/LayoutContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  // obtener si estamos en movil
  const layotContext = useAppContext();

  useEffect(() => () => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      window.location.href = "/login";
    }
  }, [])

  return (
    <LayoutContext>
      <Component {...pageProps} />
    </LayoutContext>
  );
}

export default MyApp;
