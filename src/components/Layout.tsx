import Head from "next/head";
import { FC, ReactNode, Fragment } from "react";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <Fragment key="changer-layout">
    <Head>
      <meta charSet="UTF-8" />
      <title>ChanGer</title>
      <link rel="icon" href="http://localhost:3000/icon/icon.PNG" />
    </Head>
    <main>
      <div className="flex flex-col">
        <div className="h-20 w-screen">
          <Header />
        </div>
        <div className="h-[calc(100vh_-_5rem)] w-screen">{children}</div>
      </div>
    </main>
  </Fragment>
);

export default Layout;
