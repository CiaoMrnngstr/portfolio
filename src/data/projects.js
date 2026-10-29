import kicksHome from "../assets/optimized/kicks-home.webp";
import kicksBody from "../assets/optimized/kicks-body.webp";
import kicksShop from "../assets/optimized/kicks-shop.webp";
import kicksFooter from "../assets/optimized/kicks-footer.webp";
import phinmaOne from "../assets/optimized/phinma-one.webp";
import phinmaTwo from "../assets/optimized/phinma-two.webp";
import phinmaThree from "../assets/optimized/phinma-three.webp";
import phinmaFour from "../assets/optimized/phinma-four.webp";
import pmccaLogin from "../assets/optimized/pmcca-login.webp";
import pmccaSignup from "../assets/optimized/pmcca-signup.webp";
import pmccaList from "../assets/optimized/pmcca-list.webp";
import pmccaRecords from "../assets/optimized/pmcca-records.webp";

// Preserve original project stories, screenshots, and links. Unknown links stay hidden.
const originalProjects = [
  {
    id: "bitulok-express",
    title: "Bitulok Express",
    subtitle: "Four roles. One connected delivery experience.",
    featured: true,
    categories: ["Web", "Mobile", "Full-Stack"],
    description:
      "A delivery platform connecting Admin, Restaurant, Customer, and Rider in one ecosystem. My capstone project brings web and mobile together, powered by Firebase.",
    story:
      "Admin and Restaurant web apps are built with Vite; Customer and Rider mobile apps are built with Expo. The backend uses Firebase: Firestore, Cloud Functions, and Hosting.",
    tech: ["Vite", "Expo", "Firebase", "Firestore", "Cloud Functions"],
    liveUrl: null,
    githubUrl: null,
    images: [],
  },
  {
    id: "kicks",
    title: "Kicks Simple Responsive Website",
    categories: ["Web"],
    description:
      "A responsive shoe e-commerce frontend. My first-year project, built entirely on an iPad with HTML, CSS, and JavaScript.",
    story:
      "This is my first project on my first year journey, I built this website using my iPad. I used GitHub for my development software. It is a bit challenging since the screen is too small. This website is all about a shoe company that gives comfortable wearable shoes to customers. A clean and modern shoe e-commerce frontend design built using HTML, CSS, and JavaScript.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://ciaomrnngstr.github.io/SampleWeb/",
    liveLabel: "View Live Website",
    githubUrl: "https://github.com/CiaoMrnngstr/SampleWeb",
    images: [
      { src: kicksHome, alt: "Kicks Home" },
      { src: kicksBody, alt: "Kicks Body" },
      { src: kicksShop, alt: "Kicks Shop" },
      { src: kicksFooter, alt: "Kicks Footer" },
    ],
  },
  {
    id: "phinma",
    title: "PHINMA AU Student Credential App",
    badge: "Android App",
    categories: ["Mobile", "Web"],
    description:
      "Student credential submissions, made accessible online. An Android WebView app that keeps student files and images in one place.",
    story:
      "This system is a web-based project for our integrated projects in 3 subjects we had last semester. It handles student credential records by keeping submitted files and images safe. Instead of going to the physical registrar’s office, students can now pass their credentials online. This app was built with Android Studio using WebView, while the backend was deployed in Awardspace.",
    tech: ["Android Studio", "WebView", "Awardspace"],
    liveUrl: null,
    githubUrl: null,
    downloadUrl: "/myapp.apk",
    downloadLabel: "Download APK",
    images: [
      { src: phinmaOne, alt: "PHINMA Screen 1" },
      { src: phinmaTwo, alt: "PHINMA Screen 2" },
      { src: phinmaThree, alt: "PHINMA Screen 3" },
      { src: phinmaFour, alt: "PHINMA Screen 4" },
    ],
  },
  {
    id: "pmcca",
    title: "PMCCA Hospital Management System",
    categories: ["Web", "Full-Stack"],
    description:
      "A digital patient-record management system that helps hospital staff move from paper records to a more efficient workflow.",
    story:
      "PMCCA is a system that allows hospital staff to manage patients' records digitally instead of paper-based. It improves functionality, reliability, authentication, and efficiency for staff. I developed this using HTML, CSS, JS for the frontend and PHP + phpMyAdmin for the backend and database.",
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "phpMyAdmin"],
    liveUrl: "http://pmccahospital.mywebcommunity.org/login.php",
    liveLabel: "Visit Hospital Management System",
    githubUrl: null,
    images: [
      { src: pmccaLogin, alt: "PMCCA Login" },
      { src: pmccaSignup, alt: "PMCCA Sign up" },
      { src: pmccaList, alt: "PMCCA List" },
      { src: pmccaRecords, alt: "PMCCA Record" },
    ],
  },
];

const fitness = {
  id: "fitness-tracker",
  title: "Fitness Tracker App",
  subtitle: "Build a routine. See your progress.",
  badge: "Personal project",
  date: "October 2025",
  role: "Mobile App Developer",
  categories: ["Mobile"],
  description: "A mobile fitness app that brings exercise discovery, guided workout challenges, and personal progress into one place. Built to make a daily routine easier to follow.",
  story: "I developed this personal project in October 2025 using React Native, Node.js, and Firebase Firestore. The app combines an exercise library with custom challenges and progress tracking, so users can plan a workout, follow it, and review their activity.",
  tech: ["React Native", "Node.js", "Firebase", "Firestore"],
  liveUrl: null,
  githubUrl: null,
  features: [
    "Upper body, core, lower body, cardio, and full body exercises, with demonstrations and equipment labels.",
    "Custom challenges by difficulty and body focus, with guided workouts and a live counter.",
    "Weight history and goals, calories burned, workout totals, streaks, recent workouts, and a BMI calculator.",
    "Notifications, profile avatars, and light and dark themes.",
  ],
  images: [
    { src: "/images/fitness/home.webp", alt: "Fitness Tracker home dashboard with weekly activity and quick actions", label: "Home", width: 720, height: 1561 },
    { src: "/images/fitness/exercises.webp", alt: "Fitness Tracker exercise library organized by body area", label: "Exercise library", width: 720, height: 1561 },
    { src: "/images/fitness/challenge.webp", alt: "Fitness Tracker challenge generator with difficulty and body focus choices", label: "Custom challenges", width: 720, height: 1561 },
    { src: "/images/fitness/progress.webp", alt: "Fitness Tracker progress screen showing calories, streaks, and weight goals", label: "Progress", width: 720, height: 1561 },
  ],
};

const projectDetails = {
  "bitulok-express": {
    date: "2026–2027 · In development",
    role: "Sole Full-Stack Developer",
    context: "Built for food and goods delivery in Gabaldon, Nueva Ecija, with accounts, menus, checkout, order processing, rider assignment, delivery tracking, and administration. The platform includes cash on delivery and QR Ph payment workflows, with Google Maps, Sender, and Hostinger integrations.",
    additionalTech: ["React", "React Native", "Node.js", "Firebase Hosting"],
  },
  phinma: { date: "2024–2025", role: "Contributor", additionalTech: ["Java", "MySQL"] },
  pmcca: { date: "2024", role: "Backend & Database Developer", additionalTech: ["MySQL"] },
  kicks: { date: "First-year project", role: "Frontend Developer" },
};
const enriched = originalProjects.map((project) => {
  const { additionalTech = [], ...details } = projectDetails[project.id];
  return { ...project, ...details, tech: [...project.tech, ...additionalTech] };
});
// Featured capstone first; the remaining dated projects run newest to oldest.
export const projects = [enriched[0], fitness, enriched[2], enriched[3], enriched[1]];
