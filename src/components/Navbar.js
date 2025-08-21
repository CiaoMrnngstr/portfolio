import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gray-800 text-white h-16 flex items-center justify-between px-6 shadow-md z-50">
        <h1 className="text-xl font-bold">My Portfolio</h1>

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex space-x-8 text-lg">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/project" className="hover:text-gray-400">Projects</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </nav>

        {/* Mobile Hamburger (hidden on desktop) */}
        <button
          className="md:hidden p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 md:hidden`}
      >
        <div className="p-6 mt-16">
          <ul className="space-y-6 text-lg">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-gray-400">Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-400">About</Link>
            </li>
            <li>
              <Link to="/project" onClick={() => setIsOpen(false)} className="hover:text-gray-400">Projects</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-gray-400">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
