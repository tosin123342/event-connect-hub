import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <nav className="sticky top-0 z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-clay">
          Obi &amp; Co.
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link to="/browse" className="hidden transition-colors hover:text-clay sm:block">
            Browse Planners
          </Link>
          <Link to="/pricing" className="hidden transition-colors hover:text-clay sm:block">
            Become a Planner
          </Link>
          <Link
            to="/login"
            className="rounded-full bg-clay px-5 py-2 text-sm font-medium text-clay-foreground ring-1 ring-clay transition-colors hover:bg-clay-dark"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
