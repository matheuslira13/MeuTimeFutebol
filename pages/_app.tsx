import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CodUserProvider } from "../context/appContext";
import bg from "../public/bgLogin.jpg";
import NProgress from "nprogress";
import Router from "next/router";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

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
