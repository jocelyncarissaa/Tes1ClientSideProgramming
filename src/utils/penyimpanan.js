export const KUNCI_KERANJANG = "kantinkita-keranjang";
export const KUNCI_MENU = "kantinkita-menu-tambahan";

function bacaArray(kunci) {
  try {
    const data = JSON.parse(localStorage.getItem(kunci) ?? "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function menuValid(menu) {
  return menu !== null && typeof menu === "object"
    && ((Number.isSafeInteger(menu.id) && menu.id > 0) || (typeof menu.id === "string" && menu.id.length > 0))
    && typeof menu.nama === "string" && menu.nama.trim().length >= 3
    && typeof menu.kategori === "string" && menu.kategori.trim().length > 0
    && Number.isSafeInteger(menu.harga) && menu.harga > 0
    && Number.isSafeInteger(menu.stok) && menu.stok >= 0;
}

export function bacaMenuTambahan() {
  return bacaArray(KUNCI_MENU)
    .filter((menu) => menuValid(menu) && typeof menu.id === "string")
    .filter((menu, index, daftar) => daftar.findIndex((item) => item.id === menu.id) === index);
}

export function bacaKeranjang() {
  return bacaArray(KUNCI_KERANJANG)
    .filter((item) => menuValid(item) && Number.isSafeInteger(item.qty) && item.qty > 0 && item.stok > 0)
    .filter((item, index, daftar) => daftar.findIndex((menu) => menu.id === item.id) === index)
    .map((item) => ({ ...item, qty: Math.min(item.qty, item.stok) }));
}
