export default function TeamPage() {
  const fullTeam = [
    {
      name: "Isabella",
      role: "Co-Founder & Creative Director / Executive Producer",
      bio: "Leading the creative vision for Campus Diaries, Isabella ensures every story we tell is authentic, engaging, and beautifully presented. She keeps the team inspired and on track.",
    },
    {
      name: "Freddy",
      role: "Co-Founder & Creative Lead",
      bio: "As the visual mastermind, Freddy directs the aesthetic of our photography and media projects. He is usually seen around campus with multiple cameras, capturing the moments that define student life.",
    },
    {
      name: "Michael",
      role: "Director of Creative Production",
      bio: "Michael oversees the technical side of our podcast and media production. From booking guests to mastering the audio, he ensures every episode sounds professional and polished.",
    },
    {
      name: "Jephthah",
      role: "Media & Production Team, Senior Developer",
      bio: "The architect behind our digital presence. Jephthah builds and maintains the Campus Diaries website, ensuring our stories reach the world seamlessly through code.",
    },
    {
      name: "Derron",
      role: "Media & Production Team, Junior Developer",
      bio: "Supporting the digital experience, Derron works on the technical foundations of our platform. He is passionate about bringing creative ideas to life through clean and efficient code.",
    },
    {
      name: "Gabby",
      role: "Media & Production Team",
      bio: "Whether it's running live campus events or managing behind-the-scenes production, Gabby is always right in the middle of the action, making sure everything runs smoothly.",
    },
    {
      name: "Stephen",
      role: "Community Engagement & Partnerships Coordinator",
      bio: "Stephen is the bridge between Campus Diaries and the student body. He manages our social media channels and builds partnerships with other campus organizations to grow our community.",
    },
    {
      name: "Lordina",
      role: "Podcast Host & Producer",
      bio: "With a natural curiosity and a welcoming voice, Lordina guides our podcast conversations. She loves diving deep into the stories and issues that matter most to students.",
    },
    {
      name: "Davis",
      role: "Podcast Host & Producer",
      bio: "Davis brings energy and insight to the microphone. As a host and producer, he helps shape the direction of our episodes and finds the most interesting guests on campus.",
    },
    {
      name: "Valentine",
      role: "Podcast Host & Editor",
      bio: "Valentine is the person who makes the magic happen in post-production. As an editor, he polishes every episode to perfection, while also stepping up to the mic to host when needed.",
    },
    {
      name: "Precious",
      role: "Creative Production Assistant",
      bio: "The unsung hero of our production process. Precious provides vital support to the creative team, coordinating schedules, organizing assets, and helping bring big ideas to life.",
    },
    {
      name: "Michelle",
      role: "Theatre & Performance Lead",
      bio: "Bringing a dramatic flair to the team, Michelle leads our performance-based content. She helps students express themselves creatively through acting, spoken word, and live storytelling.",
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
