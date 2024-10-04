import Head from "next/head";
import "@/styles/globals.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "@/styles/custom.scss";
import "@/styles/custom-swiper.scss";
import "@/styles/responsive.scss";
import "@/styles/home.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../../client";
import Footer from "@/components/Footer";
import MITNavbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MIT</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="MIT description" />
      </Head>

      <ApolloProvider client={client}>
        <MITNavbar></MITNavbar>
        <Component {...pageProps} />
        <Footer></Footer>
      </ApolloProvider>
    </>
  );
}
