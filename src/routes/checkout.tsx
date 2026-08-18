import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { naira, planners } from "@/lib/marketplace-data";

const title = "Checkout — Obi & Co.";
const description =
  "Confirm your booking summary, choose a deposit or full payment in Naira, and secure your event date.";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const planner = planners[0]!;
  const pkg = planner.packages[1]!;
  const [mode, setMode] = useState<"deposit" | "full">("deposit");
  const [done, setDone] = useState(false);

  const serviceFee = Math.round(pkg.price * 0.05);
  const vat = Math.round((pkg.price + serviceFee) * 0.075);
  const total = pkg.price + serviceFee + vat;
  const dueNow = mode === "deposit" ? Math.round(total * 0.3) : total;

  if (done) {
    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Header />
        <section className="mx-auto max-w-xl px-6 py-32 text-center">
          <div className="mx-auto mb-8 flex size-14 items-center justify-center rounded-full bg-clay/10 text-clay">
            ✓
          </div>
          <h1 className="font-display text-4xl font-medium">Your date is secured</h1>
          <p className="mt-4 text-muted-foreground">
            {planner.name} has been notified. We charged {naira(dueNow)} and receipt BK-77412 is on
            its way to your email.
          </p>
          <Link
            to="/dashboard"
            className="mt-10 inline-block rounded-[14px] bg-clay px-8 py-4 font-medium text-clay-foreground ring-1 ring-clay"
          >
            Go to dashboard
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="mb-12 font-display text-4xl font-medium">Complete your booking</h1>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <div className="rounded-[20px] bg-muted/40 p-8 ring-1 ring-foreground/5">
              <h2 className="mb-6 font-display text-2xl font-medium">Payment option</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    { key: "deposit", label: "30% deposit today", note: "Balance due 7 days before" },
                    { key: "full", label: "Pay in full", note: "No balance to track" },
                  ] as const
                ).map((o) => (
                  <button
                    key={o.key}
                    onClick={() => setMode(o.key)}
                    className={`rounded-[16px] p-6 text-left ring-1 transition-colors ${
                      mode === o.key
                        ? "bg-background ring-clay"
                        : "bg-background/60 ring-foreground/5 hover:ring-clay/40"
                    }`}
                  >
                    <p className="font-medium">{o.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{o.note}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] bg-muted/40 p-8 ring-1 ring-foreground/5">
              <h2 className="mb-6 font-display text-2xl font-medium">Card details</h2>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
              >
                <Field label="Name on card" placeholder="Amaka Eze" />
                <Field label="Card number" placeholder="0000 0000 0000 0000" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry" placeholder="09 / 28" />
                  <Field label="CVV" placeholder="123" />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-[14px] bg-clay py-4 font-medium text-clay-foreground ring-1 ring-clay transition-transform hover:scale-[1.01]"
                >
                  Pay {naira(dueNow)}
                </button>
                <p className="text-center text-[11px] text-muted-foreground">
                  Payments are processed securely. Funds are released to the planner after your
                  event.
                </p>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-[20px] bg-background p-8 shadow-sm ring-1 ring-foreground/5">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={planner.image}
                  alt={planner.name}
                  loading="lazy"
                  width={600}
                  height={750}
                  className="size-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{planner.name}</p>
                  <p className="text-sm text-muted-foreground">{planner.location}</p>
                </div>
              </div>
              <div className="space-y-3 border-t border-border pt-6 text-sm">
                <Line label="Package" value={pkg.name} />
                <Line label="Event date" value="17 Oct 2026" />
                <Line label="Package price" value={naira(pkg.price)} />
                <Line label="Service fee (5%)" value={naira(serviceFee)} />
                <Line label="VAT (7.5%)" value={naira(vat)} />
              </div>
              <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Due today
                </span>
                <span className="font-display text-3xl font-medium">{naira(dueNow)}</span>
              </div>
              {mode === "deposit" && (
                <p className="mt-2 text-right text-xs text-muted-foreground">
                  Total {naira(total)} · balance {naira(total - dueNow)}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm focus:border-clay focus:outline-none"
      />
    </div>
  );
}
