import Link from "next/link";

export default function Beranda() {
  return (
    <section className="py-12 text-center">
      <h1 className="text-4xl font-fold"> Temukan event seru di sekolahmu</h1>
      <p className="mt-3 text-slate-600">
        Workshop, lomba, musik, dan bazar. Pesan tiketnya disii.
      </p>
      <Link
        href="/event"
        className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          Lihat semua event
        </Link>
    </section>
  );
}