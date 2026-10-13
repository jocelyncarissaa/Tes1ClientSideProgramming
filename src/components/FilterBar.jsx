import { useRef } from "react";
import styles from "../App.module.css";

export default function FilterBar({ keyword, onKeywordChange, kategoriAktif, onKategoriChange, kategori, daftarMenu }) {
  const inputRef = useRef(null);

  function bersihkan() {
    onKeywordChange("");
    inputRef.current?.focus();
  }

  return (
    <div className={styles.filterBar}>
      <label htmlFor="pencarian">Cari nama menu</label>
      <div className={styles.pencarian}>
        <input id="pencarian" type="search" ref={inputRef} value={keyword}
          placeholder="Contoh: nasi goreng" onChange={(event) => onKeywordChange(event.target.value)} />
        <button type="button" onClick={bersihkan}>Bersihkan</button>
      </div>
      <div className={styles.filterKategori} role="group" aria-label="Filter kategori">
        <button type="button" aria-pressed={kategoriAktif === ""}
          className={kategoriAktif === "" ? styles.filterAktif : ""} onClick={() => onKategoriChange("")}>
          Semua ({daftarMenu.length})
        </button>
        {kategori.map((namaKategori) => (
          <button key={namaKategori} type="button" aria-pressed={kategoriAktif === namaKategori}
            className={kategoriAktif === namaKategori ? styles.filterAktif : ""}
            onClick={() => onKategoriChange(namaKategori)}>
            {namaKategori} ({daftarMenu.filter((menu) => menu.kategori === namaKategori).length})
          </button>
        ))}
      </div>
    </div>
  );
}
