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
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>
);

export default MyApp;
