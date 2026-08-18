import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { clientBookings, messages, naira, planners } from "@/lib/marketplace-data";

const title = "Client Dashboard — Obi & Co.";
const description = "Track upcoming and past bookings, saved planners, messages and account settings.";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ClientDashboard,
});

function ClientDashboard() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-clay">
          Client dashboard
        </span>
        <h1 className="mb-12 font-display text-4xl font-medium">Good morning, Amaka</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Panel title="Bookings">
              <div className="divide-y divide-border">
                {clientBookings.map((b) => (
                  <div key={b.planner} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <p className="font-medium">{b.event}</p>
                      <p className="text-sm text-muted-foreground">
                        {b.planner} · {b.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg">{naira(b.amount)}</p>
                      <p className="text-[10px] uppercase tracking-widest text-clay">{b.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Saved planners">
              <div className="grid gap-4 sm:grid-cols-3">
                {planners.slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    to="/planners/$plannerId"
                    params={{ plannerId: p.id }}
                    className="group"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={600}
                      height={750}
                      className="mb-2 aspect-square w-full rounded-[12px] object-cover"
                    />
                    <p className="text-sm font-medium group-hover:text-clay">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{naira(p.startingPrice)}</p>
                  </Link>
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-8">
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

            <Panel title="Account settings">
              <div className="space-y-3 text-sm">
                <Row label="Name" value="Amaka Eze" />
                <Row label="Email" value="amaka@email.com" />
                <Row label="Phone" value="+234 802 000 1122" />
                <Row label="City" value="Lekki, Lagos" />
              </div>
            </Panel>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] bg-muted/40 p-8 ring-1 ring-foreground/5">
      <h2 className="mb-4 font-display text-2xl font-medium">{title}</h2>
      {children}
    </div>
  );
}

export function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
