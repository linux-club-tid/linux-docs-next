"use client";

import styles from "./Progress.module.css";

import { useScrollProgress } from "../lib/helper";

export default function Progress() {
  const progress = useScrollProgress();

  return (
    <div className={styles.header_hr}>
      <hr className={styles.bg_hr} />
      <hr
        className={styles.progress_hr}
        style={{
          width: `${progress * 100}%`,
        }}
      />
    </div>
  );
}
