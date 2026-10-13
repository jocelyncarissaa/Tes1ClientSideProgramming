import { useState } from "react";
import styles from "../App.module.css";

const formKosong = { nama: "", kategori: "", harga: "", stok: "" };

export default function FormTambahMenu({ kategori, onTambahMenu }) {
  const [form, setForm] = useState(formKosong);
  const [errors, setErrors] = useState({});
  const [pesanSukses, setPesanSukses] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((sebelumnya) => ({ ...sebelumnya, [name]: value }));
    setErrors((sebelumnya) => ({ ...sebelumnya, [name]: "" }));
    setPesanSukses("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nama = form.nama.trim();
    const harga = Number(form.harga);
    const stok = Number(form.stok);
    const errorBaru = {
      nama: nama.length < 3 ? "Nama minimal 3 karakter." : "",
      kategori: !kategori.includes(form.kategori) ? "Kategori wajib dipilih." : "",
      harga: form.harga.trim() === "" || !Number.isSafeInteger(harga) || harga <= 0
        ? "Harga harus berupa bilangan bulat lebih dari 0." : "",
      stok: form.stok.trim() === "" || !Number.isSafeInteger(stok) || stok < 0
        ? "Stok harus berupa bilangan bulat 0 atau lebih." : "",
    };
    setErrors(errorBaru);
    setPesanSukses("");
    if (Object.values(errorBaru).some(Boolean)) return;

    onTambahMenu({ nama, kategori: form.kategori, harga, stok });
    setForm(formKosong);
    setErrors({});
    setPesanSukses(`Menu "${nama}" berhasil ditambahkan.`);
  }

  return (
    <section aria-labelledby="judul-form" className={`${styles.panel} ${styles.formPanel}`}>
      <h2 id="judul-form">Tambah Menu</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label htmlFor="nama-menu">Nama menu</label>
            <input id="nama-menu" name="nama" value={form.nama} onChange={handleChange} required
              aria-invalid={Boolean(errors.nama)} aria-describedby={errors.nama ? "error-nama" : undefined} />
            {errors.nama && <p id="error-nama" role="alert" className={styles.error}>{errors.nama}</p>}
          </div>
          <div className={styles.field}>
            <label htmlFor="kategori-menu">Kategori</label>
            <select id="kategori-menu" name="kategori" value={form.kategori} onChange={handleChange} required
              aria-invalid={Boolean(errors.kategori)} aria-describedby={errors.kategori ? "error-kategori" : undefined}>
              <option value="">Pilih kategori</option>
              {kategori.map((namaKategori) => <option key={namaKategori} value={namaKategori}>{namaKategori}</option>)}
            </select>
            {errors.kategori && <p id="error-kategori" role="alert" className={styles.error}>{errors.kategori}</p>}
          </div>
          <div className={styles.field}>
            <label htmlFor="harga-menu">Harga (Rp)</label>
            <input id="harga-menu" name="harga" type="number" min="1" step="1" value={form.harga}
              onChange={handleChange} required aria-invalid={Boolean(errors.harga)}
              aria-describedby={errors.harga ? "error-harga" : undefined} />
            {errors.harga && <p id="error-harga" role="alert" className={styles.error}>{errors.harga}</p>}
          </div>
          <div className={styles.field}>
            <label htmlFor="stok-menu">Stok</label>
            <input id="stok-menu" name="stok" type="number" min="0" step="1" value={form.stok}
              onChange={handleChange} required aria-invalid={Boolean(errors.stok)}
              aria-describedby={errors.stok ? "error-stok" : undefined} />
            {errors.stok && <p id="error-stok" role="alert" className={styles.error}>{errors.stok}</p>}
          </div>
        </div>
        <button type="submit" className={styles.tombolUtama}>Simpan menu</button>
        {pesanSukses && <p role="status" className={styles.sukses}>{pesanSukses}</p>}
      </form>
    </section>
  );
}
