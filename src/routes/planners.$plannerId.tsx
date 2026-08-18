import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AvailabilityCalendar } from "@/components/site/AvailabilityCalendar";
import { naira, planners } from "@/lib/marketplace-data";

export const Route = createFileRoute("/planners/$plannerId")({
  loader: ({ params }) => {
    const planner = planners.find((p) => p.id === params.plannerId);
    if (!planner) throw notFound();
    return { planner };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Planner unavailable — Obi & Co." }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.planner.name} — Event Planner in ${loaderData.planner.location}`;
    const d = `${loaderData.planner.business}: packages from ${naira(loaderData.planner.startingPrice)}, ${loaderData.planner.reviews} verified reviews and live availability.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  component: PlannerProfile,
});

function PlannerProfile() {
  const { planner } = Route.useLoaderData();
  const [pkgIndex, setPkgIndex] = useState(0);
  const [day, setDay] = useState(17);
  const pkg = planner.packages[pkgIndex]!;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <section className="border-y border-foreground/5 bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                Planner Spotlight
              </span>
              <h1 className="mb-8 text-balance font-display text-4xl font-medium leading-tight">
                {planner.name} <span className="italic text-muted-foreground">for</span>{" "}
                {planner.specialties[0]}
              </h1>

              <div className="mb-12 grid grid-cols-2 gap-4">
                {planner.gallery.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${planner.business} portfolio ${i + 1}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full rounded-[12px] object-cover outline-1 -outline-offset-1 outline-foreground/5"
                  />
                ))}
              </div>

              <div className="max-w-prose">
                <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
                  {planner.bio}
                </p>
                <ul className="mb-12 space-y-4">
                  {planner.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-4">
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-clay/10 text-clay">
                        <span className="text-[10px]">✓</span>
                      </div>
                      <p className="text-sm font-medium">{h}</p>
                    </li>
                  ))}
                </ul>

                <h2 className="mb-4 font-display text-2xl font-medium">Services &amp; packages</h2>
                <div className="mb-12 space-y-3">
                  {planner.packages.map((p, i) => (
                    <button
                      key={p.name}
                      onClick={() => setPkgIndex(i)}
                      className={`block w-full rounded-[16px] p-6 text-left ring-1 transition-colors ${
                        i === pkgIndex
                          ? "bg-background ring-clay"
                          : "bg-background/60 ring-foreground/5 hover:ring-clay/40"
                      }`}
                    >
                      <div className="flex items-baseline justify-between">
                        <p className="font-medium">{p.name}</p>
                        <p className="font-display text-lg">{naira(p.price)}</p>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{p.includes.join(" · ")}</p>
                    </button>
                  ))}
                </div>

                <h2 className="mb-4 font-display text-2xl font-medium">Reviews</h2>
                <div className="space-y-4">
                  <Review
                    name="Amaka & Ikenna"
                    body="Every vendor arrived on time and the room turned over in 40 minutes. Worth every naira."
                  />
                  <Review
                    name="Dele Ogunbiyi"
                    body="Clear pricing, clear contract, no surprises on the day. We'll book again."
                  />
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div className="sticky top-24 rounded-[20px] bg-background p-8 shadow-sm ring-1 ring-foreground/5">
                <div className="mb-8 flex items-center justify-between border-b border-foreground/5 pb-8">
                  <div>
                    <p className="text-sm text-muted-foreground">{pkg.name}</p>
                    <p className="font-display text-3xl font-medium">{naira(pkg.price)}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-clay">{planner.rating}</span>{" "}
                    <span className="text-xs text-muted-foreground">
                      ({planner.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="mb-4 text-sm font-semibold">Availability calendar</p>
                  <AvailabilityCalendar
                    bookedDates={planner.bookedDates}
                    selected={day}
                    onSelect={setDay}
                  />
                </div>

                <Link
                  to="/checkout"
                  className="mb-4 block w-full rounded-[14px] bg-clay py-4 text-center font-medium text-clay-foreground shadow-sm ring-1 ring-clay transition-transform hover:scale-[1.01]"
                >
                  Request booking inquiry
                </Link>
                <Link
                  to="/dashboard"
                  className="block w-full rounded-[14px] border border-border py-4 text-center font-medium transition-colors hover:border-clay"
                >
                  Message planner
                </Link>
                <p className="mt-4 text-center text-[11px] text-muted-foreground">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Review({ name, body }: { name: string; body: string }) {
  return (
    <div className="rounded-[16px] bg-background p-6 ring-1 ring-foreground/5">
      <p className="text-sm leading-relaxed text-muted-foreground">“{body}”</p>
      <p className="mt-3 text-sm font-medium">{name}</p>
    </div>
  );
}
