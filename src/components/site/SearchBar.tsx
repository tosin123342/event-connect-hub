import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { budgetRanges, eventTypes, locations } from "@/lib/marketplace-data";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState(eventTypes[0]);
  const [location, setLocation] = useState(locations[0]);
  const [budget, setBudget] = useState(budgetRanges[1]);

  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-[20px] bg-background p-2 shadow-sm ring-1 ring-foreground/5 md:flex-row ${
        compact ? "" : "mt-12"
      }`}
    >
      <div className="grid w-full flex-1 grid-cols-1 gap-2 md:grid-cols-3">
        <Field label="Event Type" value={eventType} onChange={setEventType} options={eventTypes} />
        <Field
          label="Location"
          value={location}
          onChange={setLocation}
          options={locations}
          bordered
        />
        <Field label="Budget Range" value={budget} onChange={setBudget} options={budgetRanges} />
      </div>
      <button
        onClick={() =>
          navigate({ to: "/browse", search: { event: eventType, place: location, budget } })
        }
        className="w-full rounded-[14px] bg-clay px-8 py-4 font-medium text-clay-foreground transition-transform hover:scale-[1.02] md:w-auto"
      >
        Find Planners
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  options,
  bordered,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  bordered?: boolean;
}) {
  return (
    <div
      className={`px-6 py-3 ${bordered ? "border-y border-foreground/5 md:border-x md:border-y-0" : ""}`}
    >
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm focus:outline-none"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
