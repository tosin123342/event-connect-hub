import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Input, SocialButton } from "./signup";

const title = "Log In — Obi & Co.";
const description =
  "Log in to manage bookings, messages and payouts on Nigeria's event planner marketplace.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Login,
});

const roles = [
  { key: "client", to: "/dashboard" },
  { key: "planner", to: "/planner-dashboard" },
  { key: "admin", to: "/admin" },
] as const;

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<(typeof roles)[number]>(roles[0]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <section className="border-b border-foreground/5 bg-sand py-24">
        <div className="mx-auto max-w-md px-6">
          <h1 className="mb-8 font-display text-4xl font-medium leading-tight">Welcome back</h1>
          <div className="rounded-[20px] bg-background p-8 shadow-sm ring-1 ring-foreground/5">
            <div className="mb-8 grid grid-cols-3 gap-1 rounded-[14px] bg-muted p-1">
              {roles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRole(r)}
                  className={`rounded-[10px] py-2 text-xs font-medium capitalize transition-colors ${
                    role.key === r.key ? "bg-clay text-clay-foreground" : "text-muted-foreground"
                  }`}
                >
                  {r.key}
                </button>
              ))}
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: role.to });
              }}
            >
              <Input label="Email" type="email" placeholder="amaka@email.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
              <div className="text-right">
                <button type="button" className="text-xs text-clay underline underline-offset-4">
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full rounded-[14px] bg-clay py-4 font-medium text-clay-foreground ring-1 ring-clay transition-transform hover:scale-[1.01]"
              >
                Log in
              </button>
            </form>

            <div className="my-6 flex items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-3">
              <SocialButton label="Continue with Google" />
              <SocialButton label="Continue with Apple" />
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link to="/signup" className="text-clay underline underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
