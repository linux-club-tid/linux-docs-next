import "./globals.css";

import styles from "./layout.module.css";

import Header from "../template/Header";
import Footer from "../template/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={styles.root}>
        <Header isArticle={false} />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
