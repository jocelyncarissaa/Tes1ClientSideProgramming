import { useState } from "react";
import Badge from "./Badge";
import { formatRupiah } from "../utils/formatRupiah";
import styles from "../App.module.css";

export default function Keranjang({ items, jumlahItem, totalHarga, onUbahQty, onHapus }) {
  const [idKonfirmasi, setIdKonfirmasi] = useState(null);

  function hapus(id) {
    onHapus(id);
    setIdKonfirmasi(null);
  }

  return (
    <section aria-labelledby="judul-keranjang" className={`${styles.panel} ${styles.keranjang}`}>
      <div className={styles.judulKeranjang}>
        <h2 id="judul-keranjang">Keranjang</h2>
        <Badge>{jumlahItem} item</Badge>
      </div>
      {items.length > 0 && (
        <ul className={styles.daftarPesanan}>
          {items.map((item) => (
            <li key={item.id} className={styles.itemPesanan}>
              <h3>{item.nama}</h3>
              <p className={styles.keterangan}>{formatRupiah(item.harga)} per item</p>
              <div className={styles.kontrolQty}>
                <button type="button" aria-label={`Kurangi ${item.nama}`} onClick={() => {
                  setIdKonfirmasi(null);
                  onUbahQty(item.id, -1);
                }}>−</button>
                <span aria-label={`Jumlah ${item.nama}`} aria-live="polite">{item.qty}</span>
                <button type="button" aria-label={`Tambah jumlah ${item.nama}`} disabled={item.qty >= item.stok}
                  onClick={() => onUbahQty(item.id, 1)}>+</button>
                <strong className={styles.subtotal}>{formatRupiah(item.harga * item.qty)}</strong>
              </div>
              {idKonfirmasi === item.id ? (
                <div className={styles.konfirmasi}>
                  <p>Hapus {item.nama} dari keranjang?</p>
                  <div className={styles.aksiKonfirmasi}>
                    <button type="button" className={styles.tombolBahaya} onClick={() => hapus(item.id)}>Ya, hapus</button>
                    <button type="button" onClick={() => setIdKonfirmasi(null)}>Batal</button>
                  </div>
                </div>
              ) : (
                <button type="button" className={styles.tombolHapus} aria-label={`Hapus ${item.nama}`}
                  onClick={() => setIdKonfirmasi(item.id)}>Hapus</button>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.ringkasan} aria-live="polite">
        <span>Total ({jumlahItem} item)</span>
        <strong>{formatRupiah(totalHarga)}</strong>
      </div>
    </section>
  );
}
