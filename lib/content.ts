export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  content: string;
};

export type Podcast = {
  slug: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  videoUrl: string;
};

export type Photo = {
  id: string;
  url: string;
  alt: string;
  caption: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

// --- SAMPLE DATA ---

export const articles: Article[] = [
  {
    slug: "the-first-edition",
    title: "The First Edition: Why We Started Campus Diaries",
    excerpt: "Every campus has a story. We decided it was time someone wrote it down.",
    date: "November 13, 2026",
    author: "The Editorial Team",
    category: "Introduction",
    content: "Welcome to Campus Diaries. We started this club because we realized the best parts of campus life were slipping away the moment we graduated. The late-night study sessions, the spontaneous debates in the dining hall, the quiet moments in the library... these are the things that shape us. This site is our attempt to capture them. We're starting with articles and podcasts, but we want this to be a living archive. If you have a story, we want to hear it."
  },
  {
    slug: "hangout-spots-on-campus",
    title: "The 5 Best Spots to hangout on Campus (Ranked)",
    excerpt: "We spent three weeks procrastinating in different locations to bring you this definitive list.",
    date: "November 13, 2026",
    author: "Isabella",
    category: "Campus Life",
    content: "It's that time of the semester again. The library is full, the coffee shop is loud, and you need a place to focus. We've ranked the top 5 spots based on wifi speed, noise level, and the quality of the vending machines."
  }
];

export const podcasts: Podcast[] = [
  {
    slug: "episode-1-welcome",
    title: "Episode 1: Welcome to Campus Diaries",
    description: "In our first episode, we introduce the club, talk about our goals for the semester, and share our favorite coffee spots on campus.",
    date: "October 15, 2024",
    duration: "34 min",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    slug: "episode-2-student-life",
    title: "Episode 2: The Reality of Student Life",
    description: "We sit down with three seniors to talk about balancing academics, social life, and mental health.",
    date: "November 1, 2024",
    duration: "45 min",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  }
];

export const photos: Photo[] = [
  { id: "p1", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop", alt: "Students walking on campus", caption: "Fall semester on the main quad." },
  { id: "p2", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop", alt: "Students in a lecture hall", caption: "The 9 AM lecture." },
  { id: "p3", url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop", alt: "Library shelves", caption: "Quiet hours in the library." },
];

export const team: TeamMember[] = [
  {
    name: "Isabella",
    role: "Editor-in-Chief",
    bio: "A senior communications major who loves a good story and an iced latte.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Michael",
    role: "Podcast Director",
    bio: "The voice behind the mic. You can find him editing audio at 2 AM.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Freddy",
    role: "Creative Lead",
    bio: "Capturing campus life one photo at a time. Usually carrying three cameras.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop"
  }
];

export const socials = [
  { name: "Instagram", url: "https://instagram.com" },
  { name: "TikTok", url: "https://tiktok.com" },
  { name: "YouTube", url: "https://youtube.com" },
  { name: "X", url: "https://x.com" },
];