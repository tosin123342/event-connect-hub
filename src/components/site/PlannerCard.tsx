import { Link } from "@tanstack/react-router";
import { naira, type Planner } from "@/lib/marketplace-data";

export function PlannerCard({ planner, className = "" }: { planner: Planner; className?: string }) {
  return (
    <Link
      to="/planners/$plannerId"
      params={{ plannerId: planner.id }}
      className={`group block ${className}`}
    >
      <img
        src={planner.image}
        alt={`${planner.name}, event planner in ${planner.location}`}
        loading="lazy"
        width={600}
        height={750}
        className="mb-4 aspect-[4/5] w-full rounded-[12px] object-cover outline-1 -outline-offset-1 outline-foreground/5 transition-transform group-hover:-translate-y-1"
      />
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium">{planner.name}</h3>
          <p className="text-sm text-muted-foreground">{planner.location}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-clay underline underline-offset-2">
            {naira(planner.startingPrice)}
          </p>
          <p className="text-[10px] uppercase tracking-tighter text-muted-foreground/70">
            Starting fee
          </p>
        </div>
      </div>
    </Link>
  );
}
