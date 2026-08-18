import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SearchBar } from "@/components/site/SearchBar";
import { PlannerCard } from "@/components/site/PlannerCard";
import { eventTypes, locations, naira, planners } from "@/lib/marketplace-data";

const title = "Browse Event Planners — Obi & Co.";
const description =
  "Filter Nigerian event planners by city, Naira budget, event type and rating. Compare portfolios and book instantly.";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Browse,
});

const sorts = ["Rating", "Price: low to high", "Most booked"] as const;

function Browse() {
  const [maxPrice, setMaxPrice] = useState(4000000);
  const [city, setCity] = useState("All locations");
  const [specialty, setSpecialty] = useState("All events");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Rating");

  const results = useMemo(() => {
    const filtered = planners.filter(
      (p) =>
        p.startingPrice <= maxPrice &&
        (city === "All locations" || p.location === city) &&
        (specialty === "All events" || p.specialties.includes(specialty)) &&
        p.rating >= minRating,
    );
    return [...filtered].sort((a, b) => {
      if (sort === "Price: low to high") return a.startingPrice - b.startingPrice;
      if (sort === "Most booked") return b.bookings - a.bookings;
      return b.rating - a.rating;
    });
  }, [maxPrice, city, specialty, minRating, sort]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />

      <section className="border-b border-foreground/5 bg-sand py-10">
        <div className="mx-auto max-w-7xl px-6">
          <SearchBar compact />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          <aside className="w-full shrink-0 space-y-8 lg:w-64">
            <div>
              <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Refine selection
              </h2>
              <label className="mb-2 block text-sm font-medium">Max starting price</label>
              <input
                type="range"
                min={250000}
                max={4000000}
                step={50000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-clay"
              />
              <p className="mt-1 text-sm text-clay">{naira(maxPrice)}</p>
            </div>

            <Select
              label="Location"
              value={city}
              onChange={setCity}
              options={["All locations", ...locations]}
            />
            <Select
              label="Event type"
              value={specialty}
              onChange={setSpecialty}
              options={["All events", ...eventTypes]}
            />

            <div>
              <label className="mb-2 block text-sm font-medium">Minimum rating</label>
              <div className="flex gap-2">
                {[0, 4.5, 4.8, 4.9].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`rounded-full px-3 py-1 text-xs ${
                      minRating === r
                        ? "bg-clay text-clay-foreground"
                        : "border border-border hover:border-clay"
                    }`}
                  >
                    {r === 0 ? "Any" : `${r}+`}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                {results.length} planner{results.length === 1 ? "" : "s"} available
              </p>
              <div className="flex gap-2">
                {sorts.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`rounded-full px-4 py-1.5 text-xs ${
                      sort === s
                        ? "bg-clay text-clay-foreground"
                        : "border border-border hover:border-clay"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <PlannerCard key={p.id} planner={p} />
              ))}
            </div>
            {results.length === 0 && (
              <p className="rounded-[20px] bg-muted/40 p-12 text-center text-muted-foreground">
                No planners match these filters yet. Try widening your budget.
              </p>
            )}
          </main>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[12px] border border-border bg-background px-3 py-2 text-sm focus:outline-none"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
