import Link from "next/link";
import styles from "./Header.module.css";

import Progress from "./Progress";

export default function Header({ isArticle }: { isArticle: boolean }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Linuxを始める前に読むと良いかもしれないドキュメント
      </h1>
      <div className={styles.header_content_wrap}>
        <div className={`${styles.nav_wrap} ${styles.header_content}`}>
          <nav className={styles.nav}>
            <Link href="/" className={styles.link}>
              Topに戻る
            </Link>
          </nav>
          {isArticle && (
            <nav className={styles.nav}>
              <a className={styles.a} href="#index-list">
                目次に戻る
              </a>
            </nav>
          )}
        </div>
      </div>
      <Progress />
    </header>
  );
}
