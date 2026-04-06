import "./globals.css";
import "../styles/fonts.css";
import "../styles/lp.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster position="top-center" />
      <Component {...pageProps} />;
    </>
  );
}
