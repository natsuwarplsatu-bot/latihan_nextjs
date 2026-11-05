import Link from "next/link"; // BARU
import { notFound } from "next/navigation";
import { events, rupiah } from "@/data/events";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";

export default async function Detail({ params }: PageProps<"/event/[id]">) {
  const { id } = await params;
  const event = events.find((e) => e.id === Number(id));
  if (!event) notFound();

  const sisa = event.kuota - event.terisi;

  // BARU: kategori sama, tapi bukan event ini sendiri
  const terkait = events.filter(
    (e) => e.kategori === event.kategori && e.id !== event.id
  );

  return (
    <article className="rounded-xl border bg-white p-6">
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {event.kategori}
      </span>
      <h1 className="mt-2 text-3xl font-bold">{event.judul}</h1>
      <p className="mt-1 text-slate-500">
        {event.tanggal} · {event.lokasi}
      </p>
      <p className="mt-4 text-xl font-semibold">{rupiah(event.harga)}</p>
      <p className="text-slate-600">Sisa {sisa} dari {event.kuota} tiket</p>
      <TombolFavorit id={event.id} />
      <FormPesan event={event} />

      {/* BARU: Event terkait, di bawah formulir */}
      <section className="mt-8 border-t pt-4">
        <h2 className="text-lg font-semibold">Event terkait</h2>
        {terkait.length === 0 ? (
          <p className="mt-2 text-slate-500">Belum ada event terkait.</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {terkait.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/event/${e.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {e.judul}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}