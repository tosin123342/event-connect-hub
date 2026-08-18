import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { eventTypes, locations } from "@/lib/marketplace-data";

const title = "Create an Account — Obi & Co.";
const description =
  "Sign up as a client to book event planners, or as a planner to get a storefront, calendar and payouts.";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"client" | "planner">("client");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <section className="border-b border-foreground/5 bg-sand py-24">
        <div className="mx-auto max-w-xl px-6">
          <h1 className="mb-8 text-balance font-display text-4xl font-medium leading-tight">
            Create your account
          </h1>

          <div className="rounded-[20px] bg-background p-8 shadow-sm ring-1 ring-foreground/5">
            <div className="mb-8 grid grid-cols-2 gap-2 rounded-[14px] bg-muted p-1">
              {(["client", "planner"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`rounded-[10px] py-2.5 text-sm font-medium capitalize transition-colors ${
                    role === r ? "bg-clay text-clay-foreground" : "text-muted-foreground"
                  }`}
                >
                  Sign up as a {r}
                </button>
              ))}
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: role === "client" ? "/dashboard" : "/planner-dashboard" });
              }}
            >
              <Input label="Full name" placeholder="Amaka Eze" />
              <Input label="Email" type="email" placeholder="amaka@email.com" />
              <Input label="Password" type="password" placeholder="••••••••" />

              {role === "planner" && (
                <>
                  <Input label="Business name" placeholder="Eko Luxe Events" />
                  <Select label="Category / specialty" options={eventTypes} />
                  <Select label="Location" options={locations} />
                </>
              )}

              <label className="flex items-start gap-3 pt-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-clay"
                />
                I agree to the terms of service and privacy policy.
              </label>

              <button
                type="submit"
                disabled={!agreed}
                className="w-full rounded-[14px] bg-clay py-4 font-medium text-clay-foreground ring-1 ring-clay transition-transform hover:scale-[1.01] disabled:opacity-40"
              >
                Create account
              </button>
            </form>

            <div className="my-6 flex items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <SocialButton label="Continue with Google" />
              <SocialButton label="Continue with Apple" />
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-clay underline underline-offset-4">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export function Input({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm focus:border-clay focus:outline-none"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <select className="w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm focus:border-clay focus:outline-none">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-[12px] border border-border py-3 text-sm font-medium transition-colors hover:border-clay"
    >
      {label}
    </button>
  );
}
