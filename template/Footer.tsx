import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <h3 className={styles.footer_text}>Copyright © 2026 linux-club-tid</h3>
      <br />
      <div className={styles.footer_content_wrap}>
        <div className={styles.footer_content}>
          <h3 className={styles.footer_text}>about us</h3>
          <p className={styles.footer_text}>
            このサークルはLinuxをデスクトップOSとして普及させる、
            学内のLinuxコミュニティになることを目標に活動しています。
            <br />
            <a
              href="https://linux-club-tid.github.io/Club/"
              target="_blank"
              rel="noopener noreferrer"
            >
              公式サイト
            </a>
          </p>
        </div>
        <div className={styles.footer_content}>
          <h3 className={styles.footer_text}>Developer/Writer</h3>
          <ul className={styles.footer_ul}>
            <li>
              <a
                href="https://github.com/Uliboooo"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Uliboooo
              </a>
            </li>
            <li>
              <a
                href="https://github.com/liar2357"
                target="_blank"
                rel="noopener noreferrer"
              >
                @liar2357
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.footer_content}>
          <h3 className={styles.footer_text}>about site</h3>
          <p className={styles.footer_text}>
            このサイトは仕組みを0から100まで理解することより実践的にLinuxを使えるようになるための文書を目指しています。
            随時記事は追加されていく予定です。
          </p>
        </div>
      </div>
      <br />
    </footer>
  );
}
