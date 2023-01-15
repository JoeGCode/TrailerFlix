import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="relative min-h-screen">
      <div className="pb-10">
        <Navbar />
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
