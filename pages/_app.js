import { useEffect } from "react";
import '../styles/globals.css'; 

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') { // Проверяем, что код выполняется на клиенте
      const threeScript = document.createElement("script");
      threeScript.setAttribute("id", "threeScript");
      threeScript.setAttribute(
        "src",
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
      );
      document.getElementsByTagName("head")[0].appendChild(threeScript);
      return () => {
        if (threeScript) {
          threeScript.remove();
        }
      };
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
