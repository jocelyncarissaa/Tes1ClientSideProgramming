import { useEffect, useState } from "react";
import { semuaMenu } from "./data/menu";
import FilterBar from "./components/FilterBar";
import MenuList from "./components/MenuList";
import Keranjang from "./components/Keranjang";
import TimerSesi from "./components/TimerSesi";
import FormTambahMenu from "./components/FormTambahMenu";
import { bacaKeranjang, bacaMenuTambahan, KUNCI_KERANJANG, KUNCI_MENU } from "./utils/penyimpanan";
import styles from "./App.module.css";

export default function App() {
  const [menuTambahan, setMenuTambahan] = useState(bacaMenuTambahan);
  const [keranjang, setKeranjang] = useState(bacaKeranjang);
  const [keyword, setKeyword] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("");
  const [timerTerlihat, setTimerTerlihat] = useState(true);
  const [errorPenyimpanan, setErrorPenyimpanan] = useState("");

  const daftarMenu = [...semuaMenu, ...menuTambahan];
  const kategori = [...new Set(daftarMenu.map((menu) => menu.kategori))];
  const menuTampil = daftarMenu.filter((menu) => {
    const cocokNama = menu.nama.toLocaleLowerCase("id-ID").includes(keyword.trim().toLocaleLowerCase("id-ID"));
    return cocokNama && (kategoriAktif === "" || menu.kategori === kategoriAktif);
  });
  const jumlahItem = keranjang.reduce((jumlah, item) => jumlah + item.qty, 0);
  const totalHarga = keranjang.reduce((total, item) => total + item.harga * item.qty, 0);

  useEffect(() => {
    try {
      localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(keranjang));
      localStorage.setItem(KUNCI_MENU, JSON.stringify(menuTambahan));
      setErrorPenyimpanan("");
    } catch {
      setErrorPenyimpanan("Penyimpanan browser tidak tersedia atau penuh. Perubahan saat ini belum tersimpan untuk refresh.");
    }
  }, [keranjang, menuTambahan]);

  useEffect(() => {
    document.title = jumlahItem > 0 ? `(${jumlahItem}) KantinKita` : "KantinKita";
  }, [jumlahItem]);

  function tambahKeKeranjang(menu) {
    if (menu.stok === 0) return;
    setKeranjang((sebelumnya) => {
      const sudahAda = sebelumnya.find((item) => item.id === menu.id);
      if (sudahAda) {
        return sebelumnya.map((item) => item.id === menu.id
          ? { ...item, qty: Math.min(item.qty + 1, item.stok) }
          : item);
      }
      return [...sebelumnya, { ...menu, qty: 1 }];
    });
  }

  function ubahQty(id, perubahan) {
    setKeranjang((sebelumnya) => sebelumnya
      .map((item) => item.id === id
        ? { ...item, qty: Math.min(item.qty + perubahan, item.stok) }
        : item)
      .filter((item) => item.qty > 0));
  }

  function hapusItem(id) {
    setKeranjang((sebelumnya) => sebelumnya.filter((item) => item.id !== id));
  }

  function tambahMenu(menu) {
    const menuBaru = { ...menu, id: crypto.randomUUID() };
    setMenuTambahan((sebelumnya) => [...sebelumnya, menuBaru]);
  }

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <h1>KantinKita</h1>
        <div className={styles.sesi}>
          {timerTerlihat && <TimerSesi />}
          <button type="button" aria-expanded={timerTerlihat} onClick={() => setTimerTerlihat((terlihat) => !terlihat)}>
            {timerTerlihat ? "Sembunyikan timer" : "Tampilkan timer"}
          </button>
        </div>
      </header>
      {errorPenyimpanan && <p role="alert" className={styles.error}>{errorPenyimpanan}</p>}
      <div className={styles.layout}>
        <section aria-labelledby="judul-menu" className={`${styles.panel} ${styles.menuPanel}`}>
          <h2 id="judul-menu">Daftar Menu</h2>
          <FilterBar keyword={keyword} onKeywordChange={setKeyword} kategoriAktif={kategoriAktif}
            onKategoriChange={setKategoriAktif} kategori={kategori} daftarMenu={daftarMenu} />
          <p className={styles.keterangan}>{menuTampil.length} dari {daftarMenu.length} menu</p>
          <MenuList menu={menuTampil} keyword={keyword} kategoriAktif={kategoriAktif}
            keranjang={keranjang} onTambah={tambahKeKeranjang} />
        </section>
        <Keranjang items={keranjang} jumlahItem={jumlahItem} totalHarga={totalHarga}
          onUbahQty={ubahQty} onHapus={hapusItem} />
        <FormTambahMenu kategori={kategori} onTambahMenu={tambahMenu} />
      </div>
    </main>
  );
}
