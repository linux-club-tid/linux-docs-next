import Link from "next/link";

import { articles } from "@/lib/articleList";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.root}>
      <div>
        <p>
          このサイトは「Linuxを始めたいけど何から始めればいいのか分からない！」というあなたをお手伝いするサイトです。
          Linuxに関する様々な情報を随時公開していく予定です。
        </p>
      </div>
      <br />
      <br />
      <br />
      <div>
        <h2>記事一覧</h2>
        <ul>
          {articles.map((a) => (
            <li key={a?.slug}>
              <Link href={`/article/${a?.slug}`}>{a?.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
