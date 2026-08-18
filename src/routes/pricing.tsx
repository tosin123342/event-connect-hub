import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { naira, plans } from "@/lib/marketplace-data";

const title = "Plans & Pricing for Planners — Obi & Co.";
const description =
  "Free, Basic and Pro plans for Nigerian event planners: listing limits, featured placement and lower commission per booking.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <section className="border-b border-foreground/5 bg-sand py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="max-w-2xl text-balance font-display text-5xl font-medium leading-none">
            Plans that pay for themselves in one booking.
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Billed monthly in Naira. Cancel any time — your storefront stays live on the Free tier.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-[20px] p-8 ${
                  p.featured
                    ? "bg-ink text-ink-foreground"
                    : "bg-background ring-1 ring-foreground/5"
                }`}
              >
                <p className="text-[10px] uppercase tracking-widest opacity-60">{p.name}</p>
                <p className="mt-4 font-display text-4xl font-medium">
                  {p.price === 0 ? "Free" : naira(p.price)}
                  {p.price !== 0 && <span className="text-base opacity-60">/mo</span>}
                </p>
                <p className="mt-2 text-sm text-clay">{p.commission}</p>
                <ul className="mt-8 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="text-clay">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`mt-8 block rounded-[14px] py-3.5 text-center text-sm font-medium ${
                    p.featured
                      ? "bg-background text-foreground"
                      : "bg-clay text-clay-foreground ring-1 ring-clay"
                  }`}
                >
                  Choose {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-medium">Subscription payment</h2>
            <p className="mt-2 text-muted-foreground">
              Cards, bank transfer and USSD are accepted. Charged in Naira on the same day each
              month.
            </p>
            <div className="mt-8 space-y-4 rounded-[20px] bg-muted/40 p-8 ring-1 ring-foreground/5">
              <Field label="Card number" placeholder="0000 0000 0000 0000" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry" placeholder="09 / 28" />
                <Field label="CVV" placeholder="123" />
              </div>
              <button className="w-full rounded-[14px] bg-clay py-4 font-medium text-clay-foreground ring-1 ring-clay">
                Start Basic — {naira(15000)}/mo
              </button>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-medium">Client premium</h2>
            <p className="mt-2 text-muted-foreground">
              Optional add-ons for clients planning large events.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="rounded-[20px] bg-muted/40 p-6 ring-1 ring-foreground/5">
                <p className="font-medium">Priority booking — {naira(10000)}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your request goes to the top of a planner's queue with a 12-hour response
                  guarantee.
                </p>
              </li>
              <li className="rounded-[20px] bg-muted/40 p-6 ring-1 ring-foreground/5">
                <p className="font-medium">Concierge matching — {naira(35000)}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We shortlist three planners for your brief, budget and date, and set up the calls.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
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
