import styles from "../App.module.css";

export default function Badge({ children, habis = false }) {
  return <span className={`${styles.badge} ${habis ? styles.badgeHabis : styles.badgeTersedia}`}>{children}</span>;
}
