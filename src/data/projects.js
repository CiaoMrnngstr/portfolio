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

// Add projects here. Leave unknown links null; the UI labels them as unavailable.
export const projects = [
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
    links: [
      {
        id: "admin",
        label: "Admin Dashboard",
        type: "web",
        url: "https://bitulok-express-6aba0.web.app",
      },
      {
        id: "restaurant",
        label: "Restaurant Dashboard",
        type: "web",
        url: "https://bitulok-express-restaurant.web.app",
      },
      // These verified v1.0.5 (6) APKs exceed the 90 MB repository limit.
      // Supply public release-asset URLs after uploading the existing builds.
      {
        id: "customer",
        label: "Customer App",
        type: "apk",
        url: null,
        sizeBytes: 111908343,
        downloadName: "bitulok-customer.apk",
      },
      {
        id: "rider",
        label: "Rider App",
        type: "apk",
        url: null,
        sizeBytes: 120813080,
        downloadName: "bitulok-rider.apk",
      },
    ],
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
    githubUrl: null,
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
    categories: ["Mobile", "Web"],
    description:
      "Student credential submissions, made accessible online. An Android WebView app that keeps student files and images in one place.",
    story:
      "This system is a web-based project for our integrated projects in 3 subjects we had last semester. It handles student credential records by keeping submitted files and images safe. Instead of going to the physical registrar’s office, students can now pass their credentials online. This app was built with Android Studio using WebView, while the backend was deployed in Awardspace.",
    tech: ["Android Studio", "WebView", "Awardspace"],
    liveUrl: null,
    githubUrl: null,
    downloadUrl: "/myapp.apk",
    downloadLabel: "Download Android App",
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
