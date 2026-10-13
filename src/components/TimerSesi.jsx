import { useEffect, useState } from "react";
import styles from "../App.module.css";

export default function TimerSesi() {
  const [detik, setDetik] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setDetik((sebelumnya) => sebelumnya + 1), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const menit = String(Math.floor(detik / 60)).padStart(2, "0");
  const sisaDetik = String(detik % 60).padStart(2, "0");
  return <p className={styles.timer}>Lama sesi: <time>{menit}:{sisaDetik}</time></p>;
}
