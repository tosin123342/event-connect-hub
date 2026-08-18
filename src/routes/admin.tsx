import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  clientBookings,
  disputes,
  naira,
  pendingPlanners,
  plans,
} from "@/lib/marketplace-data";
import { Panel } from "./dashboard";

const title = "Admin Panel — Obi & Co.";
const description = "Internal tools: approve planner sign-ups, manage subscriptions, review bookings and disputes.";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [decided, setDecided] = useState<Record<string, string>>({});

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-clay">
          Internal only
        </span>
        <h1 className="mb-12 font-display text-4xl font-medium">Admin panel</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          <Panel title="Pending planner sign-ups">
            <div className="divide-y divide-border">
              {pendingPlanners.map((p) => (
                <div key={p.name} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">{p.business}</p>
                    <p className="text-sm text-muted-foreground">
                      {p.name} · {p.location} · {p.submitted}
                    </p>
                  </div>
                  {decided[p.name] ? (
                    <span className="text-[10px] uppercase tracking-widest text-clay">
                      {decided[p.name]}
                    </span>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDecided((d) => ({ ...d, [p.name]: "Approved" }))}
                        className="rounded-full bg-clay px-4 py-1.5 text-xs font-medium text-clay-foreground"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setDecided((d) => ({ ...d, [p.name]: "Rejected" }))}
                        className="rounded-full border border-border px-4 py-1.5 text-xs font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Subscriptions &amp; billing">
            <div className="divide-y divide-border text-sm">
              {plans.map((p) => (
                <div key={p.name} className="flex justify-between py-3">
                  <span className="text-muted-foreground">
                    {p.name} · {p.commission}
                  </span>
                  <span className="font-medium">
                    {p.price === 0 ? "Free" : `${naira(p.price)}/mo`}
                  </span>
                </div>
              ))}
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">MRR from planner plans</span>
                <span className="font-medium">{naira(1875000)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Commission this month</span>
                <span className="font-medium">{naira(3410000)}</span>
              </div>
            </div>
          </Panel>

          <Panel title="All bookings">
            <div className="divide-y divide-border text-sm">
              {clientBookings.map((b) => (
                <div key={b.planner} className="flex justify-between py-3">
                  <span className="text-muted-foreground">
                    {b.planner} · {b.date}
                  </span>
                  <span className="font-medium">
                    {naira(b.amount)}{" "}
                    <span className="text-[10px] uppercase tracking-widest text-clay">
                      {b.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Disputes">
            <div className="divide-y divide-border text-sm">
              {disputes.map((d) => (
                <div key={d.ref} className="flex justify-between py-3">
                  <span className="text-muted-foreground">
                    {d.ref} · {d.parties}
                  </span>
                  <span className="font-medium">
                    {naira(d.amount)}{" "}
                    <span className="text-[10px] uppercase tracking-widest text-clay">
                      {d.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>
      <Footer />
    </div>
  );
}
