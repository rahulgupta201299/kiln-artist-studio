// ─────────────────────────────────────────────────────────────
//  All brand copy lives here. Swap the placeholder brand for the
//  client's real one by editing this file only.
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: "KILN",
  full: "KILN Collective",
  tagline: "A studio space and artist collective",
  city: "Mumbai",
  address: "Unit 4, Mill Compound, Lower Parel, Mumbai 400013",
  email: "hello@kilncollective.in",
  phone: "+91 98200 00000",
  instagram: "@kiln.collective",
  hours: "Open 8am – midnight, 7 days",
};

export const nav = [
  { href: "/studio", label: "The Studio" },
  { href: "/artists", label: "Artists" },
  { href: "/collective", label: "Collective" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: 120, suffix: "+", label: "Artists on the roster" },
  { value: 6000, suffix: " sq ft", label: "Of working studio floor" },
  { value: 340, suffix: "+", label: "Brand projects delivered" },
  { value: 9, suffix: " yrs", label: "Of making things together" },
];

export const doors = [
  {
    key: "space",
    kicker: "Door 01",
    title: "Use the space",
    body:
      "Five rooms built by working artists, for working artists. Shoot, paint, record, rehearse or throw a launch — by the hour, the day or the month.",
    points: ["Cyclorama photo bay", "Treated sound room", "Wet & dry workshops", "Gallery hall for 180"],
    cta: { href: "/studio", label: "Walk the studio" },
  },
  {
    key: "artists",
    kicker: "Door 02",
    title: "Work with our artists",
    body:
      "We manage 120+ painters, illustrators, musicians, photographers and 3D makers. Tell us the brief once — we find the right hands and hold the rest.",
    points: ["Brand commissions", "Live art & performance", "Murals & installations", "Talent management"],
    cta: { href: "/artists", label: "Meet the roster" },
  },
];

export type Space = {
  id: string;
  name: string;
  size: string;
  capacity: string;
  rate: string;
  day: string;
  color: string;
  pos: [number, number, number];
  dims: [number, number, number];
  blurb: string;
  gear: string[];
};

export const spaces: Space[] = [
  {
    id: "hall",
    name: "The Gallery Hall",
    size: "2,200 sq ft",
    capacity: "180 standing",
    rate: "₹4,500 / hr",
    day: "₹32,000 / day",
    color: "#E2683C",
    pos: [-1.6, 0, -0.9],
    dims: [3.0, 0.9, 2.2],
    blurb: "Double-height white walls, track lighting and a polished concrete floor. Exhibitions, launches, screenings, supper clubs.",
    gear: ["Gallery track lighting", "4K projector + 5m screen", "PA for 200", "Bar counter"],
  },
  {
    id: "photo",
    name: "Cyc Photo Bay",
    size: "1,100 sq ft",
    capacity: "25 crew",
    rate: "₹2,800 / hr",
    day: "₹19,000 / day",
    color: "#F0A35E",
    pos: [1.55, 0, -1.25],
    dims: [2.0, 0.75, 1.5],
    blurb: "A 6m infinity cove, natural north light and blackout on demand. Fashion, product and motion shoots.",
    gear: ["6m infinity cyc", "Profoto + Aputure kit", "Hair & makeup room", "Loading bay access"],
  },
  {
    id: "sound",
    name: "The Sound Room",
    size: "450 sq ft",
    capacity: "8 musicians",
    rate: "₹1,600 / hr",
    day: "₹11,000 / day",
    color: "#C9B8A6",
    pos: [1.85, 0, 0.75],
    dims: [1.4, 0.65, 1.3],
    blurb: "Acoustically treated live room with an isolated control booth. Tracking, podcasts, rehearsals and live sessions.",
    gear: ["Neve-style console", "Drum kit + backline", "Vocal booth", "Session engineer on call"],
  },
  {
    id: "workshop",
    name: "Wet Workshop",
    size: "900 sq ft",
    capacity: "20 makers",
    rate: "₹1,200 / hr",
    day: "₹8,500 / day",
    color: "#8E5B43",
    pos: [-1.95, 0, 1.25],
    dims: [2.2, 0.55, 1.4],
    blurb: "Sinks, easels, a ceramics wheel and a small kiln (yes, the real one). Workshops, painting residencies, messy ideas.",
    gear: ["2 pottery wheels + kiln", "20 easels", "Screen-print bed", "Ventilated spray corner"],
  },
  {
    id: "lounge",
    name: "Members' Lounge",
    size: "700 sq ft",
    capacity: "30 seated",
    rate: "Members only",
    day: "From ₹6,000 / month",
    color: "#5E6B5A",
    pos: [-0.05, 0, 1.15],
    dims: [1.5, 0.45, 1.5],
    blurb: "Hot desks, a library of art books, good coffee and the best gossip in the city. Where the collective actually lives.",
    gear: ["24 hot desks", "Art & design library", "Espresso bar", "Locker storage"],
  },
];

export const plans = [
  {
    name: "By the hour",
    price: "₹1,200",
    unit: "/ hr onwards",
    note: "For one-off shoots, rehearsals and sessions.",
    features: ["Any room, 2 hr minimum", "Basic gear included", "Free Wi-Fi & coffee", "Book online in 2 minutes"],
    highlight: false,
  },
  {
    name: "Day pass",
    price: "₹8,500",
    unit: "/ day onwards",
    note: "Full-day productions, launches and workshops.",
    features: ["10 hours of access", "Full gear list", "Studio manager on site", "Load-in from 7am"],
    highlight: true,
  },
  {
    name: "Membership",
    price: "₹6,000",
    unit: "/ month",
    note: "For artists who want a home base.",
    features: ["Lounge + hot desk", "20 studio hours / month", "Member shows & crits", "Priority for brand work"],
    highlight: false,
  },
];

export type Artist = {
  slug: string;
  name: string;
  discipline: string;
  city: string;
  seed: number;
  palette: string[];
  bio: string;
  tags: string[];
  clients: string[];
};

export const disciplines = ["All", "Painting", "Illustration", "Music", "Photography", "3D & Digital", "Performance"];

export const artists: Artist[] = [
  { slug: "aanya-kapoor", name: "Aanya Kapoor", discipline: "Painting", city: "Mumbai", seed: 11, palette: ["#E2683C", "#F2EBE3", "#1C1512"],
    bio: "Large-format oil painter working with monsoon light and the textures of old mill walls. Her murals live on three of the city's best-loved buildings.",
    tags: ["Murals", "Oil", "Live painting"], clients: ["Fabindia", "Soho House", "Kala Ghoda Festival"] },
  { slug: "rehan-mistry", name: "Rehan Mistry", discipline: "3D & Digital", city: "Bengaluru", seed: 23, palette: ["#7E8CFF", "#F0A35E", "#0E0B0A"],
    bio: "Real-time 3D artist building surreal product worlds for brands. Former game environment lead, now our resident digital sculptor.",
    tags: ["CGI", "Product worlds", "AR filters"], clients: ["Nykaa", "boAt", "Spotify India"] },
  { slug: "meher-sethi", name: "Meher Sethi", discipline: "Illustration", city: "Delhi", seed: 37, palette: ["#F0A35E", "#5E6B5A", "#F2EBE3"],
    bio: "Ink-and-gouache illustrator whose packaging work has sold out limited editions twice. Loves botanical detail and loud colour.",
    tags: ["Packaging", "Editorial", "Botanical"], clients: ["Blue Tokai", "The Hindu", "Forest Essentials"] },
  { slug: "kabir-dsouza", name: "Kabir D'Souza", discipline: "Music", city: "Goa", seed: 41, palette: ["#C9B8A6", "#E2683C", "#140F0D"],
    bio: "Producer and live act blending field recordings from the Konkan coast with melodic techno. Plays rooms that go quiet when he starts.",
    tags: ["Live act", "Melodic techno", "Scoring"], clients: ["Magnetic Fields", "Sunburn Arena", "Netflix India"] },
  { slug: "ira-banerjee", name: "Ira Banerjee", discipline: "Photography", city: "Kolkata", seed: 53, palette: ["#F2EBE3", "#8E5B43", "#1C1512"],
    bio: "Fashion and portrait photographer with a documentary eye. Shoots exclusively on our cyc when she's in Mumbai.",
    tags: ["Fashion", "Portraits", "Campaigns"], clients: ["Vogue India", "Nicobar", "H&M"] },
  { slug: "arjun-pillai", name: "Arjun Pillai", discipline: "Performance", city: "Kochi", seed: 67, palette: ["#E2683C", "#7E8CFF", "#0E0B0A"],
    bio: "Contemporary dancer and choreographer staging site-specific pieces in warehouses, stairwells and, once, a swimming pool.",
    tags: ["Choreography", "Site-specific", "Brand films"], clients: ["NCPA", "Serendipity Arts", "Adidas"] },
  { slug: "zoya-merchant", name: "Zoya Merchant", discipline: "Painting", city: "Mumbai", seed: 79, palette: ["#5E6B5A", "#F0A35E", "#F2EBE3"],
    bio: "Abstract colourist and our longest-standing member. Runs the Sunday painting residency in the wet workshop.",
    tags: ["Abstract", "Residencies", "Commissions"], clients: ["Taj Hotels", "Jio World Centre", "Private collectors"] },
  { slug: "dev-malhotra", name: "Dev Malhotra", discipline: "3D & Digital", city: "Pune", seed: 89, palette: ["#F0A35E", "#E2683C", "#140F0D"],
    bio: "Motion designer and generative artist. Builds installations that react to sound, crowds and the weather outside.",
    tags: ["Generative", "Installations", "Motion"], clients: ["Lollapalooza India", "Google", "Absolut"] },
  { slug: "tara-nair", name: "Tara Nair", discipline: "Illustration", city: "Mumbai", seed: 97, palette: ["#7E8CFF", "#F2EBE3", "#1C1512"],
    bio: "Comic artist and storyteller. Her long-form work maps the city's hidden lanes; her brand work makes people stop scrolling.",
    tags: ["Comics", "Storyboards", "Social"], clients: ["Swiggy", "Penguin India", "CRED"] },
  { slug: "nikhil-rao", name: "Nikhil Rao", discipline: "Music", city: "Hyderabad", seed: 103, palette: ["#C9B8A6", "#5E6B5A", "#0E0B0A"],
    bio: "Jazz pianist and composer for film and brand. Records most of his scores in our sound room after midnight.",
    tags: ["Jazz", "Composition", "Sound design"], clients: ["Prime Video", "Royal Enfield", "Mahindra Blues"] },
  { slug: "sana-qureshi", name: "Sana Qureshi", discipline: "Photography", city: "Mumbai", seed: 113, palette: ["#E2683C", "#C9B8A6", "#140F0D"],
    bio: "Still-life and food photographer with a sculptor's sense of light. Makes ordinary objects look like they belong in a museum.",
    tags: ["Still life", "Food", "Product"], clients: ["Bombay Canteen", "Sula", "Amazon"] },
  { slug: "vikram-shah", name: "Vikram Shah", discipline: "Performance", city: "Ahmedabad", seed: 127, palette: ["#F0A35E", "#5E6B5A", "#1C1512"],
    bio: "Theatre-maker and host. Turns product launches into evenings people talk about for months.",
    tags: ["Hosting", "Immersive theatre", "Events"], clients: ["Prithvi Theatre", "Bacardi", "Tata CLiQ"] },
];

export const testimonials = [
  {
    quote: "We briefed KILN on a Tuesday. By Friday we had three artists, a room, and a launch that felt like it had been planned for months.",
    name: "Priya Menon",
    role: "Brand Lead, a D2C beauty label",
  },
  {
    quote: "The only studio in the city where the people running it actually make things. You can feel it in every corner of the space.",
    name: "Aditya Rane",
    role: "Creative Director, independent agency",
  },
  {
    quote: "Joining the collective tripled my commissioned work in a year — and I finally have somewhere to paint that isn't my bedroom.",
    name: "Zoya Merchant",
    role: "Painter, member since 2018",
  },
];

export const process = [
  { n: "01", title: "Tell us the brief once", body: "A space, an artist, or both. Ten minutes on a call is usually enough." },
  { n: "02", title: "We shortlist in 48 hours", body: "Rooms, dates, and two or three artists who fit the work — with reasons." },
  { n: "03", title: "We hold the production", body: "Contracts, gear, crew, catering, permissions. One point of contact throughout." },
  { n: "04", title: "You show up to the good part", body: "The shoot, the session, the opening night. We stay until the last light is off." },
];

export const brands = ["Spotify", "Nykaa", "Vogue India", "Netflix", "Soho House", "Absolut", "CRED", "Royal Enfield", "Swiggy", "Taj Hotels"];
