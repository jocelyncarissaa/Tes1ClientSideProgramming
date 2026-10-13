import Badge from "./Badge";
import { formatRupiah } from "../utils/formatRupiah";
import styles from "../App.module.css";

export default function MenuCard({ menu, qty, onTambah }) {
  const habis = menu.stok === 0;
  const batasStok = qty >= menu.stok;

  return (
    <article className={`${styles.menuCard} ${habis ? styles.menuHabis : ""}`}>
      <div className={styles.infoMenu}>
        <p className={styles.kategori}>{menu.kategori}</p>
        <h3>{menu.nama}</h3>
        <Badge habis={habis}>{habis ? "Habis" : `Stok: ${menu.stok}`}</Badge>
      </div>
      <div className={styles.aksiMenu}>
        <p className={styles.harga}>{formatRupiah(menu.harga)}</p>
        <button type="button" disabled={habis || batasStok} className={styles.tombolUtama}
          aria-label={`Tambah ${menu.nama}`} onClick={() => onTambah(menu)}>
          {habis ? "Habis" : batasStok ? "Batas stok" : "Tambah"}
        </button>
      </div>
    </article>
  );
}
