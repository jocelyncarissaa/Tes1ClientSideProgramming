# Jawaban Bagian A - Teori Singkat

NRP: C14230185  
Nama: Jocelyn Carissa Johandy

## A1

Penulisan di atas melanggar aturan Hook karena memanggil `useState` di dalam `if`. Saat nilai `sudahLogin` berubah, jumlah Hook yang dipanggil juga dapat berubah. React mengenali setiap state berdasarkan urutan pemanggilan Hook, sehingga urutannya harus tetap sama pada setiap render. Oleh karena itu, `useState` harus dituliskan di bagian awal fungsi komponen, sebelum percabangan atau `return` bersyarat.

Perbaikan:

```jsx
import { useState } from "react";

function Profil({ sudahLogin }) {
  const [nama, setNama] = useState("");
  if (!sudahLogin) return <p>Silakan login.</p>;
  //...
}
```

## A2

`items.push(baru)` mengubah isi array lama secara langsung. Ketika `setItems(items)` dipanggil, React menerima array yang sama, bukan array yang baru. React membandingkan state lama dan baru dengan `Object.is`, sehingga perubahan tersebut dapat diabaikan meskipun isi array sudah berubah. Oleh karena itu, solusinya adalah menggunakan spread untuk membuat array baru yang berisi item lama dan item baru.

Perbaikan:

```jsx
const tambah = (baru) => {
  setItems((sebelumnya) => [...sebelumnya, baru]);
};
```

## A3

- (a) Tanpa daftar dependensi, React menjalankan effect setelah setiap render yang selesai diterapkan.
- (b) Dengan `[]`, React menjalankan effect saat komponen pertama kali dipasang tanpa mengulangnya akibat perubahan props atau state.
- (c) Dengan `[kota]`, React menjalankan effect saat komponen pertama kali dipasang dan setiap kali nilai `kota` berubah berdasarkan perbandingan `Object.is`.

React menjalankan fungsi cleanup sebelum mengulang effect dan saat komponen unmount.
Dalam mode pengembangan dengan `StrictMode`, React menjalankan satu siklus tambahan effect dan cleanup saat pemasangan awal untuk memeriksa apakah pembersihannya bekerja dengan benar.

## A4

Simpan state `keyword` pada komponen induk terdekat yang menaungi `FilterBar` dan `DaftarMenu`, misalnya `App`, agar keduanya menggunakan data yang sama. Komponen induk mengirimkan nilai `keyword` melalui props dan memberikan fungsi untuk memperbaruinya kepada `FilterBar`.
Saat pengguna mengubah input, `FilterBar` memanggil fungsi tersebut dengan nilai terbaru, lalu induk memperbarui state dan tampilan kedua komponen. Dengan ini, komponen anak meminta perubahan melalui fungsi dari induk, tanpa mengubah state induk secara langsung.

## A5

Controlled component adalah input yang nilainya mengikuti state React melalui `value` dan diperbarui melalui `onChange`. Satu fungsi `handleChange` dapat menangani beberapa input jika setiap input memiliki atribut `name` yang sesuai dengan nama data dalam objek state.
Fungsi tersebut membaca `name` dan `value` dari `event.target`, lalu menggunakan `[name]` untuk menentukan data yang perlu diperbarui.
Spread menyalin data lainnya agar nilainya tetap tersimpan tanpa mengubah objek state lama secara langsung.
Untuk checkbox, gunakan `checked` sebagai pengganti `value` agar state menyimpan status centangnya.
