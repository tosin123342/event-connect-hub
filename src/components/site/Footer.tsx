import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-foreground/5 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          <span className="font-display text-2xl font-semibold tracking-tight text-clay">
            Obi &amp; Co.
          </span>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link to="/browse" className="transition-colors hover:text-foreground">
              Browse
            </Link>
            <Link to="/pricing" className="transition-colors hover:text-foreground">
              Plans
            </Link>
            <Link to="/admin" className="transition-colors hover:text-foreground">
              Admin
            </Link>
            <Link to="/signup" className="transition-colors hover:text-foreground">
              Sign up
            </Link>
          </div>
          <p className="text-sm text-muted-foreground/70">© 2026 Obi &amp; Co. Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
