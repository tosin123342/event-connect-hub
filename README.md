# Event Connect Hub

Importance:

For clients: Right now, finding an event planner usually means Google searches, Instagram DMs, and a lot of back-and-forth just to check availability and pricing. A booking marketplace collapses that into one place — compare planners side by side, see real pricing, book instantly instead of waiting days for a reply.

For planners: Most independent event planners don't have their own booking system — they're juggling DMs, spreadsheets, and calendars manually. A platform gives them a storefront, handles their calendar/payments for them, and brings them new clients they wouldn't otherwise reach (discovery/marketing built in).

For me: Marketplaces are valuable businesses because you sit in the middle of every transaction — commission on every booking, recurring revenue, and the more planners + clients you have, the stronger the network effect (more planners attracts more clients, more clients attracts more planners).

Page structure

1. Landing page (public homepage)

Hero section — headline + search box front and center ("Find the perfect planner for your event")

Search box — event type, date, location, budget filters

Featured/top-rated planners carousel

Categories (weddings, birthdays, corporate, etc.)

How it works (3-step explainer: search → compare → book)

Testimonials/reviews

CTA to sign up (both client and planner sign-up links)

Pricing/subscription teaser (if you're charging planners to list)

2. Sign up page

Toggle/tabs: "Sign up as a client" vs "Sign up as a planner"

Fields: name, email, password (or Google/Apple sign-in)

Planner sign-up adds: business name, category/specialty, location

Terms & conditions checkbox

Link to login for existing users

3. Login page

Email + password fields

Social login options

"Forgot password" link

Link to sign up for new users

Redirects based on role (client → dashboard, planner → dashboard, admin → admin panel)

4. Search / browse page

Search box carried over from landing page (persistent at top)

Filters sidebar: location, price range, event type, date availability, rating

Sort options: price, rating, most booked

Results grid — planner cards (photo, name, rating, starting price, "View profile")

5. Planner profile page

Photo gallery/portfolio

Bio & specialties

Services & pricing packages

Reviews & ratings

Availability calendar (visual — shows open/booked dates)

"Book now" or "Request booking" button

Message planner button

6. Client dashboard (after login)

Upcoming & past bookings

Saved/favorited planners

Messages

Account settings

7. Planner dashboard (after login)

Booking requests (accept/decline)

Calendar management

Profile/portfolio editor

Earnings/payout history

Messages

8. Subscription / pricing page

Plan tiers for planners (e.g. Free/Basic/Pro — listing limits, featured placement, lower commission)

Payment info for subscription

If charging clients instead/also: any premium features (priority booking, concierge matching, etc.)

9. Checkout / payment page

Booking summary (planner, date, package, price)

Deposit vs full payment option

Payment form (Stripe)

Confirmation screen

10. Admin panel (internal only)

Approve new planner sign-ups

Manage subscriptions & billing

View all bookings/disputes

give me options of how it should look add react and javascript with every neccessity
make sure the currences are in naira and the pictures are black people not white

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/855d10fb-373f-498d-bc23-b2e17d95ea7b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
