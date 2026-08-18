import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AvailabilityCalendar } from "@/components/site/AvailabilityCalendar";
import { messages, naira, payouts, planners, plannerRequests } from "@/lib/marketplace-data";
import { Panel } from "./dashboard";

const title = "Planner Dashboard — Obi & Co.";
const description =
  "Accept booking requests, manage your calendar, edit your portfolio and track Naira payouts.";

export const Route = createFileRoute("/planner-dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PlannerDashboard,
});

function PlannerDashboard() {
  const planner = planners[0]!;
  const [day, setDay] = useState(17);
  const [decisions, setDecisions] = useState<Record<string, string>>({});

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-clay">
          Planner dashboard
        </span>
        <h1 className="mb-12 font-display text-4xl font-medium">{planner.business}</h1>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Earnings this quarter" value={naira(4425000)} />
          <Stat label="Bookings completed" value={String(planner.bookings)} />
          <Stat label="Rating" value={`${planner.rating} (${planner.reviews})`} />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Panel title="Booking requests">
              <div className="divide-y divide-border">
                {plannerRequests.map((r) => (
                  <div
                    key={r.client}
                    className="flex flex-wrap items-center justify-between gap-4 py-4"
                  >
                    <div>
                      <p className="font-medium">{r.client}</p>
                      <p className="text-sm text-muted-foreground">
                        {r.event} · {r.date} · {naira(r.amount)}
                      </p>
                    </div>
                    {decisions[r.client] ? (
                      <span className="text-[10px] uppercase tracking-widest text-clay">
                        {decisions[r.client]}
                      </span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setDecisions((d) => ({ ...d, [r.client]: "Accepted" }))}
                          className="rounded-full bg-clay px-4 py-1.5 text-xs font-medium text-clay-foreground"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => setDecisions((d) => ({ ...d, [r.client]: "Declined" }))}
                          className="rounded-full border border-border px-4 py-1.5 text-xs font-medium"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Profile &amp; portfolio editor">
              <div className="grid gap-4 sm:grid-cols-2">
                {planner.gallery.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Portfolio item ${i + 1}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full rounded-[12px] object-cover"
                  />
                ))}
              </div>
              <textarea
                defaultValue={planner.bio}
                rows={4}
                className="mt-4 w-full rounded-[12px] border border-border bg-background p-4 text-sm focus:border-clay focus:outline-none"
              />
              <button className="mt-4 rounded-[14px] bg-clay px-6 py-3 text-sm font-medium text-clay-foreground">
                Save profile
              </button>
            </Panel>

            <Panel title="Earnings &amp; payouts">
              <div className="divide-y divide-border text-sm">
                {payouts.map((p) => (
                  <div key={p.ref} className="flex justify-between py-3">
                    <span className="text-muted-foreground">
                      {p.ref} · {p.date}
                    </span>
                    <span className="font-medium">
                      {naira(p.amount)}{" "}
                      <span className="text-[10px] uppercase tracking-widest text-clay">
                        {p.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-8">
            <Panel title="Calendar">
              <AvailabilityCalendar
                bookedDates={planner.bookedDates}
                selected={day}
                onSelect={setDay}
              />
              <button className="mt-4 w-full rounded-[14px] border border-border py-3 text-sm font-medium hover:border-clay">
                Block selected date
              </button>
            </Panel>

            <Panel title="Messages">
              <div className="divide-y divide-border">
                {messages.map((m) => (
                  <div key={m.from} className="py-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{m.from}</p>
                      <span className="text-xs text-muted-foreground">{m.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{m.preview}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] bg-sand p-6 ring-1 ring-foreground/5">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-medium">{value}</p>
    </div>
  );
}
