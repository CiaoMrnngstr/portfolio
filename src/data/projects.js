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

export const projects = [
  {
    id: "bitulok-express", title: "Bitulok Express", category: "Full-stack · Capstone",
    date: "2026–2027 · In development", role: "Solo full-stack developer",
    description: "From a local order to the last mile. A food and goods delivery platform for Gabaldon, Nueva Ecija.",
    problem: "A delivery order passes through different hands. Customers, restaurants, riders, and administrators each need a clear view of the same order without losing the thread.",
    responsibility: "I build the full system: React dashboards for Admin and Restaurant, React Native apps for Customer and Rider, and the Node.js and Firebase services connecting them.",
    outcome: "Implemented a connected ordering and delivery workflow across four roles. This capstone is in development; no adoption or performance figures are claimed.",
    tech: ["React", "React Native", "Node.js", "Firebase", "Firestore", "Cloud Functions", "Firebase Hosting"],
    features: ["Account management, restaurant menus, and checkout.", "Order processing, rider assignment, and delivery tracking.", "Admin monitoring, cash on delivery, and QR Ph payments.", "Google Maps API, Sender, and a Hostinger custom domain."],
    links: [
      { label: "Admin dashboard", href: "https://bitulok-express-6aba0.web.app/login" },
      { label: "Restaurant dashboard", href: "https://bitulok-express-restaurant.web.app/login" },
      { label: "Customer app", href: null, download: true },
      { label: "Rider app", href: null, download: true },
    ],
    images: [],
    screenshotTodo: "TODO — add approved Admin, Restaurant, Customer, and Rider screenshots.",
  },
  {
    id: "fitness-tracker", title: "Fitness Tracker App", category: "Mobile · Personal project",
    date: "October 2025", role: "Mobile app developer",
    description: "A workout plan, a guided session, and a record of progress. All in your pocket.",
    problem: "Planning a workout and keeping track of it should feel like one activity. This project brings exercise discovery, guided challenges, and progress into the same app.",
    responsibility: "I developed the mobile experience with React Native and connected it to Node.js, Firebase, and Firestore.",
    outcome: "Built a personal fitness app covering the journey from choosing an exercise to reviewing workout history, with light and dark interfaces.",
    tech: ["React Native", "Node.js", "Firebase", "Firestore"],
    features: ["Exercise library by upper body, core, lower body, cardio, and full body, with demos and equipment labels.", "Challenge generator by difficulty and body focus; guided workouts with a live counter.", "Weight history and goals, calories, workout totals, streaks, and a BMI calculator.", "Notifications, profile avatars, and light and dark themes."],
    links: [],
    images: [
      { src: "/images/fitness/home.webp", alt: "Fitness Tracker home dashboard with weekly activity and quick actions", label: "Daily overview", width: 720, height: 1561 },
      { src: "/images/fitness/exercises.webp", alt: "Fitness Tracker exercise library organized by body area", label: "Exercise library", width: 720, height: 1561 },
      { src: "/images/fitness/challenge.webp", alt: "Fitness Tracker challenge generator with difficulty and body focus choices", label: "Your challenge", width: 720, height: 1561 },
      { src: "/images/fitness/progress.webp", alt: "Fitness Tracker progress screen with calories, streaks, and weight goals", label: "Progress journal", width: 720, height: 1561 },
    ],
  },
  {
    id: "phinma", title: "PHINMA AU Student Credential System", category: "Academic · Web & Android",
    date: "2024–2025", role: "Project contributor",
    description: "A shared place for student credential submissions and records.",
    problem: "Submitting credentials at a physical registrar's office adds a trip for students. The project explored an online route for submitting files and images.",
    responsibility: "I contributed to the team's design and implementation of the student credential system. The existing Android app provides WebView access to the web experience.",
    outcome: "Delivered a student credential application with online submissions and an Android package. The original app download is available below.",
    tech: ["Java", "MySQL", "Android Studio", "WebView", "Awardspace"],
    features: ["Online submission of student credential files and images.", "Student record management and an Android WebView entry point."],
    links: [{ label: "Download Android APK", href: "/myapp.apk", download: true }],
    images: [
      { src: phinmaOne, alt: "Student credential system application screen, first view", label: "Application · 01", width: 960, height: 600 },
      { src: phinmaTwo, alt: "Student credential system application screen, second view", label: "Application · 02", width: 960, height: 600 },
      { src: phinmaThree, alt: "Student credential system application screen, third view", label: "Application · 03", width: 960, height: 600 },
      { src: phinmaFour, alt: "Student credential system application screen, fourth view", label: "Application · 04", width: 960, height: 600 },
    ],
  },
  {
    id: "pmcca", title: "PMCCA Hospital Management System", category: "Academic · Web",
    date: "2024", role: "Backend & database developer",
    description: "Moving patient records from paper to a structured digital workflow.",
    problem: "Hospital staff need to find and manage patient records reliably. This project replaces a paper-based process with a digital records interface.",
    responsibility: "I developed the backend and database components supporting hospital records and data management.",
    outcome: "Implemented record management and authentication as part of a hospital management system, with the original project interface and link preserved.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "phpMyAdmin"],
    features: ["Patient record lists and record details.", "Account registration and authentication."],
    links: [{ label: "Open hospital system", href: "http://pmccahospital.mywebcommunity.org/login.php" }],
    images: [
      { src: pmccaLogin, alt: "PMCCA hospital management system login page", label: "Login", width: 960, height: 540 },
      { src: pmccaSignup, alt: "PMCCA hospital management system registration page", label: "Registration", width: 960, height: 540 },
      { src: pmccaList, alt: "PMCCA hospital management system patient list", label: "Patient list", width: 960, height: 540 },
      { src: pmccaRecords, alt: "PMCCA hospital management system patient record view", label: "Patient records", width: 960, height: 540 },
    ],
  },
  {
    id: "kicks", title: "Kicks Simple Responsive Website", category: "Web · First-year project",
    date: "First year", role: "Frontend developer",
    description: "My first website. A shoe storefront, built entirely on an iPad.",
    problem: "This first-year project was an opportunity to learn responsive web development with the device I had: an iPad.",
    responsibility: "I built the storefront in HTML, CSS, and JavaScript, using GitHub as part of my development workflow.",
    outcome: "Published a responsive shoe storefront and established the starting point for my later web and mobile projects.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["Responsive storefront, product presentation, and shop layout.", "A complete frontend built and published from an iPad."],
    links: [
      { label: "Visit Kicks", href: "https://ciaomrnngstr.github.io/SampleWeb/" },
      { label: "View source", href: "https://github.com/CiaoMrnngstr/SampleWeb" },
    ],
    images: [
      { src: kicksHome, alt: "Kicks shoe storefront home page", label: "Home", width: 960, height: 548 },
      { src: kicksBody, alt: "Kicks shoe storefront product introduction", label: "Products", width: 960, height: 558 },
      { src: kicksShop, alt: "Kicks shoe storefront shopping section", label: "Shop", width: 960, height: 558 },
      { src: kicksFooter, alt: "Kicks shoe storefront footer and contact section", label: "Footer", width: 960, height: 558 },
    ],
  },
];
