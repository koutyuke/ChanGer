import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="ja">
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@500&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body className="bg-[#83C5BE] font-ubuntu">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
