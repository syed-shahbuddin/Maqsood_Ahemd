export const site = {
  name: "Maqsood Ahmed",
  firstName: "Maqsood",
  initials: "MA",
  location: "Bengaluru",
  tagline: "BBA Strategic Finance Student · US CMA Candidate",
  email: "maqsoodahmed.0912@gmail.com",
  phone: "+91 91483 37778",
  phoneHref: "tel:+919148337778",
  whatsapp: "https://wa.me/919148337778?text=Hi",
  linkedin: "https://www.linkedin.com/", // TODO: replace with your profile URL
  roles: ["Finance Student", "US CMA Candidate", "Strategist", "Analyst"],
  description:
    "Studying how businesses turn financial and market insight into growth — and building the Excel, research and analysis skills to do it myself.",
  heroVideo:
    "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8",
  marquee: "OPEN TO FINANCE INTERNSHIPS",
};

export type Project = {
  title: string;
  italic: string;
  tag: string;
  status: string;
  summary: string;
  bullets: string[];
  image: string;
  span: string;
  aspect: string;
};

export const projects: Project[] = [
  {
    title: "Financial Ratio",
    italic: "Analysis",
    tag: "Personal Project",
    status: "In progress",
    summary: "Asian Paints vs Berger Paints — three years of annual-report data.",
    bullets: [
      "Analysing 3 years of annual report data for both companies.",
      "Calculating liquidity, profitability and leverage ratios in Excel.",
      "Comparing financial strength in a 2-page summary report.",
    ],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    title: "Budget vs Actual",
    italic: "Variance Model",
    tag: "Personal Project",
    status: "In progress",
    summary: "A monthly budget & actuals tracker for a small-business scenario.",
    bullets: [
      "Monthly budget and actuals tracker built in Excel.",
      "Calculates favourable and unfavourable variances automatically.",
      "Applies US CMA Part 1 planning, budgeting and forecasting concepts.",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-[4/5]",
  },
  {
    title: "US CMA",
    italic: "Part 1",
    tag: "Certification · IMA",
    status: "In progress",
    summary: "Financial planning, performance and analytics — studied alongside my BBA.",
    bullets: [
      "External financial reporting decisions.",
      "Planning, budgeting and forecasting; performance management.",
      "Cost management, internal controls and technology & analytics.",
    ],
    image:
      "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-[4/5]",
  },
  {
    title: "Market &",
    italic: "Digital Research",
    tag: "Skill Area",
    status: "Ongoing",
    summary: "Internet-based market research, digital marketing and social platforms.",
    bullets: [
      "Market and internet-based research to support business decisions.",
      "Digital marketing fundamentals and social media platforms.",
      "Sales techniques and clear, structured communication.",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
];

export type JournalEntry = {
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
};

export const journal: JournalEntry[] = [
  {
    title: "What three years of ratios reveal about two paint giants",
    excerpt: "Notes from comparing Asian Paints and Berger Paints on liquidity, profitability and leverage.",
    readTime: "4 min read",
    date: "Oct 2026",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Favourable vs unfavourable: reading a variance report",
    excerpt: "How a simple budget-vs-actual tracker turns into a management conversation.",
    readTime: "3 min read",
    date: "Sep 2026",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Studying for the US CMA alongside a BBA",
    excerpt: "A realistic weekly plan for balancing Part 1 prep with university coursework.",
    readTime: "5 min read",
    date: "Aug 2026",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Why finance students should learn digital marketing",
    excerpt: "Market insight and financial insight are two halves of the same decision.",
    readTime: "3 min read",
    date: "Jul 2026",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
];

export type Exploration = {
  title: string;
  caption: string;
  image: string;
};

export const explorations: Exploration[] = [
  {
    title: "Excel Modelling",
    caption: "Ratios, variance tables and clean, auditable workbooks.",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Annual Reports",
    caption: "Reading statements line by line to find the story behind the numbers.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Markets",
    caption: "Following how market sentiment and fundamentals drift apart and back.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Research",
    caption: "Market and internet-based research that supports real decisions.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Digital Marketing",
    caption: "Social platforms, campaigns and the metrics that matter.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Strategy",
    caption: "Turning financial and market insight into growth decisions.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
  },
];

export const stats = [
  { value: "3", suffix: "yrs", label: "Annual-report data analysed" },
  { value: "2", suffix: "", label: "Finance projects in progress" },
  { value: "9", suffix: "+", label: "Core skills across finance & marketing" },
];

export const skills = [
  "Data Analysis",
  "Market & Internet Research",
  "Financial & Business Insight",
  "Digital Marketing",
  "Sales Techniques",
  "Social Media & Digital Platforms",
  "Time Management",
  "Communication",
  "Self-Directed Learning",
];

export const education = [
  {
    degree: "BBA in Strategic Finance",
    school: "CMS Jain University",
    period: "2026 – 2029",
    note: "Pursuing",
  },
  {
    degree: "Pre-University Course (1st & 2nd PU)",
    school: "RV PU South",
    period: "2024 – 2026",
    note: "",
  },
  {
    degree: "10th Standard",
    school: "Delhi Public School",
    period: "2024",
    note: "",
  },
];

export const certifications = [{ name: "US CMA (IMA)", status: "In progress" }];
export const languages = ["English", "Hindi"];
