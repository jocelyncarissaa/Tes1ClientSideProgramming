import MenuCard from "./MenuCard";
import styles from "../App.module.css";

export default function MenuList({ menu, keyword, kategoriAktif, keranjang, onTambah }) {
  if (menu.length === 0) {
    return <p role="status" className={styles.kosong}>Tidak ada menu untuk kata kunci "{keyword.trim()}" pada kategori "{kategoriAktif || "Semua"}".</p>;
  }

  return (
    <div className={styles.menuGrid}>
      {menu.map((item) => (
        <MenuCard key={item.id} menu={item}
          qty={keranjang.find((pesanan) => pesanan.id === item.id)?.qty ?? 0} onTambah={onTambah} />
      ))}
    </div>
  );
}
