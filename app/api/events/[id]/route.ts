import { events } from "@/data/events";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/events/[id]">
) {
  const { id } = await ctx.params;
  const event = events.find((e) => e.id === Number(id));
  if (!event) {
    return Response.json({ pesan: "Event tidak ditemukan" }, { status: 404 });
  }
  return Response.json(event);
}