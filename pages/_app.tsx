import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CodUserProvider } from "../context/appContext";
import bg from "../public/bgLogin.jpg";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CodUserProvider>
      <section
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 100%), url(${bg.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Component {...pageProps} />
      </section>
    </CodUserProvider>
  );
}

export default MyApp;
