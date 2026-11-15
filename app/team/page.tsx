export default function TeamPage() {
  // We will use a larger array here for the full team
  const fullTeam = [
    {
      name: "Isabella",
      role: "Editor-in-Chief",
      bio: "A senior communications major who loves a good story and an iced latte. She oversees all content and keeps the team on track.",
    },
    {
      name: "Michael",
      role: "Podcast Director",
      bio: "The voice behind the mic. You can find him editing audio at 2 AM. He handles all interview bookings and sound design.",
    },
    {
      name: "Freddy",
      role: "Creative Lead",
      bio: "Capturing campus life one photo at a time. Usually carrying three cameras. He leads the visual direction of Campus Diaries.",
    },
    {
      name: "Deron",
      role: "Head of Writing",
      bio: "A literature enthusiast who believes every student has a story worth telling. He manages the writing team and edits all articles.",
    },
    {
      name: "Stephen",
      role: "Social Media Manager",
      bio: "The one behind the Instagram posts and TikTok trends. He makes sure Campus Diaries stays connected with the student body.",
    },
    {
      name: "Gabby",
      role: "Events Coordinator",
      bio: "The mastermind behind our live campus events and pop-up interviews. If there's a microphone on campus, he's probably nearby.",
    },
    {
      name: "Jephthah",
      role: "Video Producer",
      bio: "The mastermind behind our live campus events and pop-up interviews. And also very good with a video camera, can capture anything.",
    }
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mb-16 border-b border-line pb-8 text-center">
        <h1 className="text-5xl font-serif text-ink">Meet the Team</h1>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
          The students behind Campus Diaries. We are a diverse group of writers, creators, and storytellers dedicated to capturing the essence of campus life.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3">
        {fullTeam.map((member) => (
          <div key={member.name} className="flex flex-col items-center text-center">
            {/* Placeholder for future photo */}
            <div className="mb-6 flex h-56 w-56 items-center justify-center rounded-full border border-line bg-paper-deep">
              <span className="text-7xl font-serif text-ink/20">
                {member.name.charAt(0)}
              </span>
            </div>
            <h3 className="text-2xl font-serif text-ink">{member.name}</h3>
            <p className="text-sm font-bold uppercase tracking-widest text-accent mt-1 mb-3">
              {member.role}
            </p>
            <p className="text-muted leading-relaxed text-sm">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}