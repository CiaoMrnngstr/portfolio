import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Project from './pages/Project';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>My Portfolio</h1>
          <Navbar />
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project" element={<Project />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 My Simple Portfolio. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
