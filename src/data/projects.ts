export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  snapshots: string[]; // Array of screenshot images for the project
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "University RFID Management System",
    description:
      "A connected digital ecosystem powered by a student's ID card, tailored for the day-to-day operations at universities. Features include attendance tracking, library management, cafeteria payments, and access control - all integrated through a single RFID-enabled student card.",
    image: "/1.png",
    snapshots: ["/1.png", "/2.webp", "/3.jpg"],
    technologies: ["React", "Next.js", "PostgreSQL", "TypeScript", "SocketIO"],
    githubUrl: "https://github.com/viduwaa/uni-rfid",
    liveUrl: "https://uni-rfid-demo.viduwa.tech/",
  },
  {
    id: 2,
    title: "AI Content Generator",
    description:
      "AI-powered content generation platform with GPT-4 API integration and brand voice customization. Enables businesses to create consistent, high-quality content at scale while maintaining their unique brand identity and tone.",
    image: "/2.webp",
    snapshots: ["/2.webp", "/1.png", "/3.jpg"],
    technologies: ["Python", "OpenAI", "FastAPI"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 3,
    title: "Collaboration Tool",
    description:
      "Real-time collaborative workspace featuring integrated video calls, live document editing, and comprehensive project management tools. Built for remote teams to communicate seamlessly and manage projects efficiently.",
    image: "/3.jpg",
    snapshots: ["/3.jpg", "/1.png", "/2.webp"],
    technologies: ["WebRTC", "Socket.io", "React"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description:
      "Interactive data visualization platform with real-time metrics, custom reporting, and advanced analytics. Transforms complex data into actionable insights through intuitive charts and dashboards.",
    image: "/1.jpeg",
    snapshots: ["/1.jpeg", "/2.webp", "/3.jpg"],
    technologies: ["React", "D3.js", "Node.js"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    id: 5,
    title: "Mobile Banking App",
    description:
      "Secure mobile banking application featuring biometric authentication, instant transfers, bill payments, and investment tracking. Designed with a focus on security and user experience for modern digital banking.",
    image: "/2.webp",
    snapshots: ["/2.webp", "/1.jpeg", "/1.png"],
    technologies: ["React Native", "Firebase", "Plaid"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];
