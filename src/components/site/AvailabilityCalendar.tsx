const days = Array.from({ length: 31 }, (_, i) => i + 1);

export function AvailabilityCalendar({
  bookedDates,
  selected,
  onSelect,
}: {
  bookedDates: number[];
  selected: number;
  onSelect?: (day: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-muted-foreground">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-sm">
        {days.map((day) => {
          const booked = bookedDates.includes(day);
          const isSelected = day === selected;
          return (
            <button
              key={day}
              disabled={booked}
              onClick={() => onSelect?.(day)}
              className={`flex aspect-square items-center justify-center rounded-md ${
                isSelected
                  ? "bg-clay text-clay-foreground ring-1 ring-clay"
                  : booked
                    ? "bg-muted text-muted-foreground/60 line-through"
                    : "border border-border hover:border-clay"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Struck-through dates are already booked. October 2026.
      </p>
    </div>
  );
}
