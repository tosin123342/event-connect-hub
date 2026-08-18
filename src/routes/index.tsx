import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SearchBar } from "@/components/site/SearchBar";
import { PlannerCard } from "@/components/site/PlannerCard";
import { categories, planners, steps, testimonials, plans, naira } from "@/lib/marketplace-data";

const title = "Obi & Co. — Book Nigeria's Best Event Planners";
const description =
  "Compare verified event planners in Lagos, Abuja and Port Harcourt. Real Naira pricing, live availability, instant booking.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <section className="border-b border-foreground/5 bg-sand pb-16 pt-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h1 className="mb-8 text-balance font-display text-5xl font-medium leading-none md:text-6xl">
              Signature celebrations, expertly curated.
            </h1>
          </div>
          <SearchBar />
        </div>
      </section>

      <section className="overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-balance font-display text-3xl font-medium">
              Top-rated planners in Lagos
            </h2>
            <Link
              to="/browse"
              className="text-sm font-medium text-clay underline-offset-4 hover:underline"
            >
              View all results
            </Link>
          </div>
          <div className="flex snap-x gap-6 overflow-x-auto pb-8">
            {planners.map((p) => (
              <PlannerCard key={p.id} planner={p} className="min-w-[320px] snap-start" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-foreground/5 bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 font-display text-3xl font-medium">Browse by occasion</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.label}
                to="/browse"
                className="rounded-[20px] bg-background p-8 ring-1 ring-foreground/5 transition-transform hover:-translate-y-1"
              >
                <p className="font-display text-2xl font-medium">{c.label}</p>
                <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
                <p className="mt-6 text-[10px] uppercase tracking-widest text-clay">
                  {c.count} planners
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 font-display text-3xl font-medium">How it works</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title}>
                <span className="font-display text-5xl font-medium text-clay/25">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-medium">{s.title}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-foreground/5 bg-sand py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 font-display text-3xl font-medium">What clients and planners say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-[20px] bg-background p-8 ring-1 ring-foreground/5"
              >
                <p className="text-pretty leading-relaxed">“{t.quote}”</p>
                <footer className="mt-6">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.detail}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-8 rounded-[20px] bg-muted/40 p-12 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-3xl font-medium">Plans for planners</h2>
              <p className="mt-2 text-muted-foreground">
                From free listings to featured placement — commission drops as you grow.
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              {plans.map((p) => (
                <div key={p.name}>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {p.name}
                  </p>
                  <p className="font-display text-2xl font-medium">
                    {p.price === 0 ? "Free" : `${naira(p.price)}/mo`}
                  </p>
                  <p className="text-xs text-clay">{p.commission}</p>
                </div>
              ))}
            </div>
            <Link
              to="/pricing"
              className="shrink-0 rounded-full bg-clay px-8 py-4 font-medium text-clay-foreground transition-colors hover:bg-clay-dark"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-[32px] bg-ink p-12 text-ink-foreground md:p-24">
            <div className="relative z-10 max-w-xl">
              <h2 className="mb-8 font-display text-4xl font-medium leading-tight md:text-5xl">
                Join the elite circle of Nigerian planners.
              </h2>
              <p className="mb-10 text-lg text-ink-foreground/60">
                Scale your event business with our integrated booking and payment infrastructure.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/signup"
                  className="rounded-full bg-background px-8 py-4 font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Sign up as a client
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full border border-ink-foreground/25 px-8 py-4 font-medium transition-colors hover:bg-ink-foreground/5"
                >
                  Sign up as a planner
                </Link>
              </div>
            </div>
            <div className="absolute right-0 top-0 hidden h-full w-1/3 opacity-20 md:block">
              <div className="absolute inset-0 translate-x-1/2 rotate-12 bg-clay" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
