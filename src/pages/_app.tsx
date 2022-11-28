import { AppProps } from "next/app";
import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import Layout from "components/Layout";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>
);

export default MyApp;
