import planner1 from "@/assets/planner-1.jpg";
import planner2 from "@/assets/planner-2.jpg";
import planner3 from "@/assets/planner-3.jpg";
import planner4 from "@/assets/planner-4.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";

export const naira = (amount: number) =>
  "\u20a6" + amount.toLocaleString("en-NG", { maximumFractionDigits: 0 });

export const eventTypes = [
  "Traditional Wedding",
  "White Wedding",
  "Corporate Gala",
  "Private Birthday",
  "Naming Ceremony",
  "Product Launch",
];

export const locations = [
  "Lekki, Lagos",
  "Victoria Island, Lagos",
  "Ikeja, Lagos",
  "Maitama, Abuja",
  "Port Harcourt",
  "Ibadan",
];

export const budgetRanges = [
  "\u20a6250,000 - \u20a61,000,000",
  "\u20a61,000,000 - \u20a65,000,000",
  "\u20a65,000,000+",
];

export type Package = { name: string; price: number; includes: string[] };

export type Planner = {
  id: string;
  name: string;
  business: string;
  location: string;
  specialties: string[];
  rating: number;
  reviews: number;
  bookings: number;
  startingPrice: number;
  image: string;
  gallery: string[];
  bio: string;
  highlights: string[];
  packages: Package[];
  bookedDates: number[];
};

export const planners: Planner[] = [
  {
    id: "chinelo-adedeji",
    name: "Chinelo Adedeji",
    business: "Chinelo Adedeji Events",
    location: "Lekki Phase 1, Lagos",
    specialties: ["Traditional Wedding", "White Wedding"],
    rating: 4.9,
    reviews: 128,
    bookings: 214,
    startingPrice: 750000,
    image: planner1,
    gallery: [portfolio1, portfolio2],
    bio: "With over a decade of experience in Lagos's most prestigious venues, Chinelo specialises in high-concept traditional weddings where heritage meets modern luxury. Her approach is grounded in meticulous logistics and a deep respect for cultural nuances.",
    highlights: [
      "Full-service coordination for up to 1,500 guests",
      "Vendor sourcing from Nigeria's top florists and caterers",
    ],
    packages: [
      {
        name: "Day-of Coordination",
        price: 750000,
        includes: ["Run-of-day timeline", "Vendor management", "2 assistants"],
      },
      {
        name: "Full Production",
        price: 2500000,
        includes: ["Concept & design", "Vendor sourcing", "Guest logistics", "6 assistants"],
      },
    ],
    bookedDates: [14, 15, 16, 22, 29],
  },
  {
    id: "folake-and-david",
    name: "Folake & David",
    business: "Folake & David Atelier",
    location: "Maitama, Abuja",
    specialties: ["Corporate Gala", "Product Launch"],
    rating: 5,
    reviews: 86,
    bookings: 141,
    startingPrice: 1200000,
    image: planner2,
    gallery: [portfolio2, portfolio1],
    bio: "A husband-and-wife studio producing corporate galas, summits and launches across Abuja. Known for precise stage management and immaculate brand execution.",
    highlights: ["Technical production and AV direction", "Executive protocol and guest handling"],
    packages: [
      {
        name: "Corporate Gala",
        price: 1200000,
        includes: ["Stage design", "AV production", "Protocol team"],
      },
      {
        name: "Summit Production",
        price: 3800000,
        includes: ["Multi-day programme", "Speaker management", "Brand build-out"],
      },
    ],
    bookedDates: [3, 4, 18, 19, 27],
  },
  {
    id: "eko-luxe-events",
    name: "Eko Luxe Events",
    business: "Eko Luxe Events",
    location: "Victoria Island, Lagos",
    specialties: ["White Wedding", "Private Birthday"],
    rating: 4.8,
    reviews: 203,
    bookings: 312,
    startingPrice: 950000,
    image: planner3,
    gallery: [portfolio1, portfolio2],
    bio: "A twelve-person collective delivering large-format weddings and milestone celebrations on the island. Every event ships with a dedicated production manager.",
    highlights: ["Dedicated production manager per event", "In-house decor and rentals inventory"],
    packages: [
      {
        name: "Signature Celebration",
        price: 950000,
        includes: ["Design concept", "Decor styling", "Day-of team"],
      },
      {
        name: "Grand Wedding",
        price: 3200000,
        includes: ["Venue transformation", "Full vendor suite", "Guest concierge"],
      },
    ],
    bookedDates: [8, 9, 10, 21, 25],
  },
  {
    id: "tolu-ogundimu",
    name: "Tolu Ogundimu",
    business: "Tolu Ogundimu for Grand Weddings",
    location: "Ikeja, Lagos",
    specialties: ["Traditional Wedding", "Naming Ceremony"],
    rating: 4.9,
    reviews: 128,
    bookings: 187,
    startingPrice: 850000,
    image: planner4,
    gallery: [portfolio1, portfolio2],
    bio: "Tolu builds modern interpretations of traditional Nigerian ceremonies, from engagement rites through the final send-off, with logistics handled end to end.",
    highlights: [
      "Full-service coordination for up to 1,500 guests",
      "Vendor sourcing from Nigeria's top florists and caterers",
    ],
    packages: [
      {
        name: "Engagement Rites",
        price: 850000,
        includes: ["Traditional programme", "Family liaison", "Decor styling"],
      },
      {
        name: "Two-Day Ceremony",
        price: 2900000,
        includes: ["Traditional + white wedding", "Full vendor suite", "Guest logistics"],
      },
    ],
    bookedDates: [14, 15, 16, 23, 30],
  },
];

export const categories = [
  { label: "Weddings", count: 184, blurb: "Traditional, white and destination" },
  { label: "Birthdays", count: 96, blurb: "Milestone and intimate dinners" },
  { label: "Corporate", count: 72, blurb: "Galas, summits and launches" },
  { label: "Naming Ceremonies", count: 41, blurb: "Family rites and receptions" },
];

export const steps = [
  {
    title: "Search",
    body: "Filter by event type, city, date and Naira budget to see only planners who can take your date.",
  },
  {
    title: "Compare",
    body: "Read verified reviews, browse portfolios and put real package prices side by side.",
  },
  {
    title: "Book",
    body: "Reserve your date with a deposit or full payment. Contracts and payouts are handled for you.",
  },
];

export const testimonials = [
  {
    quote:
      "We compared four planners in an evening and booked our traditional wedding the same night. No DMs, no waiting.",
    name: "Amaka & Ikenna",
    detail: "Traditional wedding, Lekki",
  },
  {
    quote:
      "The deposit flow made our finance team comfortable. Everything was documented and the gala ran to the minute.",
    name: "Bisi Afolabi",
    detail: "Corporate gala, Abuja",
  },
  {
    quote:
      "As a planner, my bookings doubled in one quarter and I stopped chasing payments entirely.",
    name: "Chinelo Adedeji",
    detail: "Planner, Lagos",
  },
];

export const plans = [
  {
    name: "Free",
    price: 0,
    commission: "12% commission",
    features: ["1 active listing", "Booking requests", "Standard search placement"],
  },
  {
    name: "Basic",
    price: 15000,
    commission: "8% commission",
    features: ["5 active listings", "Calendar sync", "Portfolio gallery", "Email support"],
    featured: true,
  },
  {
    name: "Pro",
    price: 45000,
    commission: "5% commission",
    features: [
      "Unlimited listings",
      "Featured placement on homepage",
      "Priority booking requests",
      "Payout analytics",
    ],
  },
];

export const clientBookings = [
  {
    planner: "Chinelo Adedeji",
    event: "Traditional Wedding",
    date: "17 Oct 2026",
    amount: 2500000,
    status: "Confirmed",
  },
  {
    planner: "Eko Luxe Events",
    event: "40th Birthday Dinner",
    date: "02 Dec 2026",
    amount: 950000,
    status: "Awaiting planner",
  },
  {
    planner: "Folake & David",
    event: "Company Retreat",
    date: "11 Mar 2026",
    amount: 1200000,
    status: "Completed",
  },
];

export const plannerRequests = [
  { client: "Amaka Eze", event: "Traditional Wedding", date: "17 Oct 2026", amount: 2500000 },
  { client: "Dele Ogunbiyi", event: "Corporate Gala", date: "28 Nov 2026", amount: 1800000 },
];

export const payouts = [
  { ref: "PO-10241", date: "12 Aug 2026", amount: 2100000, status: "Paid" },
  { ref: "PO-10228", date: "29 Jul 2026", amount: 875000, status: "Paid" },
  { ref: "PO-10219", date: "14 Jul 2026", amount: 1450000, status: "Processing" },
];

export const messages = [
  { from: "Chinelo Adedeji", preview: "I've held 17 October for you \u2014 sending the deck tonight.", time: "2h" },
  { from: "Eko Luxe Events", preview: "Can we move the tasting to Saturday?", time: "1d" },
  { from: "Folake & David", preview: "Stage plan attached for review.", time: "3d" },
];

export const pendingPlanners = [
  { name: "Zainab Bello", business: "Zainab & Co.", location: "Kano", submitted: "16 Aug 2026" },
  { name: "Ehi Osagie", business: "Ehi & Co. Design", location: "Port Harcourt", submitted: "15 Aug 2026" },
];

export const disputes = [
  { ref: "DP-3391", parties: "Amaka Eze vs Eko Luxe", amount: 450000, status: "Under review" },
  { ref: "DP-3388", parties: "Dele Ogunbiyi vs Tolu Ogundimu", amount: 120000, status: "Resolved" },
];
