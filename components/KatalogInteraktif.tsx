"use client";
import { useEffect, useState } from "react";
import { rupiah, type Event } from "@/data/events";
import KartuEvent from "./KartuEvent";
import KontrolKatalog from "./kontrolKatalog"; // BARU

const LANGKAH = 4;

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [tampil, setTampil] = useState(LANGKAH);
  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [hargaMaks, setHargaMaks] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrut(localStorage.getItem("urut") ?? "tanggal");
  }, []);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];
  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === "Semua" || e.kategori === kategori) &&
      (!hanyaTersedia || e.kuota - e.terisi > 0) &&
      (hargaMaks === "" || e.harga <= Number(hargaMaks))
  );

  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  const totalHarga = tersusun.reduce((t, e) => t + e.harga, 0);
  const rataHarga =
    tersusun.length === 0 ? 0 : Math.round(totalHarga / tersusun.length);
  const totalSisa = tersusun.reduce((t, e) => t + (e.kuota - e.terisi), 0);

  const terlihat = tersusun.slice(0, tampil);
  const sisaKartu = tersusun.length - terlihat.length;

  return (
    <div>
      {/* BARU: semua kontrol dipindah ke KontrolKatalog */}
      <KontrolKatalog
        cari={cari}
        onCari={(v) => {
          setCari(v);
          setTampil(LANGKAH);
        }}
        kategori={kategori}
        onKategori={(v) => {
          setKategori(v);
          setTampil(LANGKAH);
        }}
        daftarKategori={daftarKategori}
        urut={urut}
        onUrut={(v) => {
          setUrut(v);
          localStorage.setItem("urut", v);
          setTampil(LANGKAH);
        }}
        hanyaTersedia={hanyaTersedia}
        onHanyaTersedia={(v) => {
          setHanyaTersedia(v);
          setTampil(LANGKAH);
        }}
        hargaMaks={hargaMaks}
        onHargaMaks={(v) => {
          setHargaMaks(v);
          setTampil(LANGKAH);
        }}
      />

      <p className="mb-1 text-sm text-slate-500">
        {tersusun.length} event ditemukan
      </p>
      <p className="mb-3 text-sm text-slate-500">
        Rata-rata harga {rupiah(rataHarga)} · Total sisa tiket {totalSisa}
      </p>

      {tersusun.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {terlihat.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>
          {sisaKartu > 0 && (
            <button
              onClick={() => setTampil(tampil + LANGKAH)}
              className="mt-4 rounded border px-4 py-2 hover:bg-slate-100"
            >
              Tampilkan lagi ({sisaKartu} lagi)
            </button>
          )}
        </>
      )}
    </div>
  );
}