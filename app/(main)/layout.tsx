import styles from "./layout.module.css";

import Header from "@/template/Header";
import Footer from "@/template/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={styles.root}>
      <Header isArticle={false} />
      <main className={styles.main}>{children}</main>
      <Footer />
    </body>
  );
}
