import heroPortrait from "../assets/hero_portrait.jpg";
import projectTouristSafety from "../assets/project_tourist_safety.png";
import projectMedihelp from "../assets/project_medihelp.png";

// Portfolio configuration details
// Change this file to customize the content of the website

export const portfolioConfig = {
  personal: {
    name: "Jaydeep Mallick",
    title: "B.Tech CSE (Generative AI) Student at NIAT",
    subtitle: "Building intelligent frontend experiences, programming with Python/SQL, and exploring Generative AI solutions.",
    bio: "I am a B.Tech Computer Science student specializing in Generative AI at NIAT (NxtWave of Innovation in Advanced Technologies). I love coding in Python, managing databases with SQL, and building high-performance frontend interfaces with React and Tailwind CSS. I enjoy bridging the gap between traditional software design and artificial intelligence.",
    avatar: heroPortrait,
    location: "Hyderabad, India",
    email: "jaydeepmallick40@gmail.com",
    resumeUrl: "#",
    socials: [
      { name: "GitHub", url: "https://github.com/Jaydeep-Mallick", icon: "Github" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/jaydeep-mallick/", icon: "Linkedin" },
      { name: "Instagram", url: "https://www.instagram.com/aka_ronak_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", icon: "Instagram" }
    ]
  },
  stats: [
    { value: "NIAT", label: "B.Tech CSE Student" },
    { value: "05+", label: "Completed Projects" },
    { value: "100%", label: "Learning Dedication" },
    { value: "GenAI", label: "Specialization Focus" }
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React.js / Vite", level: "Intermediate", color: "from-cyan-400 to-blue-500" },
        { name: "JavaScript (ES6+)", level: "Advanced", color: "from-yellow-400 to-orange-500" },
        { name: "Tailwind CSS", level: "Expert", color: "from-teal-400 to-emerald-500" },
        { name: "HTML5 / CSS3", level: "Expert", color: "from-orange-400 to-red-500" }
      ]
    },
    {
      category: "Languages & Databases",
      items: [
        { name: "Python", level: "Intermediate", color: "from-blue-400 to-yellow-500" },
        { name: "SQL", level: "Intermediate", color: "from-indigo-400 to-cyan-500" },
        { name: "Node.js", level: "Intermediate", color: "from-green-500 to-emerald-600" },
        { name: "Generative AI (LLMs)", level: "Intermediate", color: "from-purple-500 to-pink-500" }
      ]
    },
    {
      category: "Design & Tools",
      items: [
        { name: "Figma (UI/UX)", level: "Advanced", color: "from-purple-400 to-indigo-500" },
        { name: "Design Systems", level: "Intermediate", color: "from-pink-500 to-rose-500" },
        { name: "Git / GitHub", level: "Advanced", color: "from-gray-500 to-gray-700" }
      ]
    }
  ],
  projects: [
    {
      id: "tourist-safety",
      title: "Tourist Safety",
      subtitle: "Smart Safety Portal & Travel Companion",
      category: "Web Application & Frontend",
      thumbnail: projectTouristSafety,
      gridClass: "md:col-span-2 md:row-span-2", // Large 2x2 card
      color: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.4)",
      tags: ["React", "Vite", "Tailwind CSS", "Leaflet Maps", "Geocoding API"],
      description: "Tourist Safety is an interactive, real-time safety companion for travelers. It helps tourists check localized security ratings, find emergency facilities, map route risks, and trigger distress alerts.",
      features: [
        "Interactive map detailing localized safe zones and police stations",
        "Quick-response SOS distress notification panel",
        "Geocoded risk-score calculation for travel routes",
        "Responsive UI dashboard optimization for mobile viewports"
      ],
      liveUrl: "https://jaydeep-mallick.github.io/tourist-safetyyy/",
      githubUrl: "https://github.com/jaydeep-mallick/tourist-safetyyy"
    },
    {
      id: "medihelp",
      title: "MediHelp",
      subtitle: "Health Awareness Hub & Symptom Companion",
      category: "Web Design & Public Health",
      thumbnail: projectMedihelp,
      gridClass: "md:col-span-1 md:row-span-2", // Tall 1x2 card
      color: "from-cyan-500 via-blue-600 to-indigo-700",
      glowColor: "rgba(6, 182, 212, 0.4)",
      tags: ["HTML5", "CSS3", "Bootstrap", "Health APIs", "Interactive UI"],
      description: "MediHelp is a wellness portal designed to empower individuals with expert medical tips, action-oriented nutrition advice, healthy lifestyle guidelines, and interactive diagnostic tools.",
      features: [
        "Custom interactive widgets for expert advice on nutrition and wellness",
        "Dynamic symptom evaluation diagnostic wizard",
        "Responsive visual interface built with Bootstrap grid rules",
        "Detailed medical tip navigation and wellness calculators"
      ],
      liveUrl: "https://jaydeep-mallick.github.io/MediHelp2k25/",
      githubUrl: "https://github.com/jaydeep-mallick/MediHelp2k25"
    }
  ],
  emailjs: {
    serviceId: "service_2a5y38e",
    templateId: "template_7hfqqw8",
    publicKey: "YOUR_PUBLIC_KEY"
  }
};
