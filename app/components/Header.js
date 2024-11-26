"use client";

import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { HambergerMenu } from "iconsax-react";
import { useState } from "react";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the categories menu

  const names = [
    { name: "headlines", url: "#headlines" },
    { name: "categories", url: "#categories" },
    { name: "Most commented", url: "#mostcommented" },
    { name: "Most view", url: "#mostview" }
  ];

  const categories = [
    "Economy", "Social", "Politics", "Technology", "Health", "Culture", "Sports"
  ];

  // Fonction pour gérer l'affichage du menu déroulant des catégories
  const handleCategoriesClick = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the categories menu visibility
  };

  return (
    <header className="flex items-center justify-between p-4 text-gray-400 relative">
      {/* Menu */}
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 rounded-full hover:text-blue-500">
          <HambergerMenu size="32" color="#3b82f6" />
        </button>

        <ul className="flex space-x-5 text-lg">
          {names.map((name, index) => (
            <li key={index} className={name.name === "categories" ? "cursor-pointer" : ""}>
              <a
                href={name.url}
                className="text-gray-300 hover:text-blue-500 transition"
                onClick={name.name === "categories" ? handleCategoriesClick : null} // On click, toggle categories menu
              >
                {name.name.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Search */}
      <div className="isolate bg-slate-900/60 ring-1 ring-black/5 flex items-center bg-gray-900 px-12 py-2 rounded-full space-x-2 mr-24 sm:px-6 sm:mr-12">
        <FaSearch />
        <input
          type="text"
          placeholder="Search here..."
          className="bg-transparent focus:outline-none focus:text-time-500"
        />
      </div>

      {/* Dropdown Menu for Categories */}
      {isMenuOpen && (
  <div
    className="absolute top-16 left-0 right-0 bg-gray-800 text-white p-4 max-h-60 overflow-x-scroll z-10 transition-all duration-1000 ease-in-out"
    style={{
      maxHeight: isMenuOpen ? '300px' : '0', // Animating max-height for smooth expansion
      opacity: isMenuOpen ? 1 : 0, // Fading in effect
    }}
  >
    <ul className="space-x-5 flex justify-start transition-all duration-1000 ease-in-out">
      {categories.map((category, index) => (
        <li key={index} className="flex-shrink-0">
          <a
            href={`#${category.toLowerCase()}`}
            className="hover:text-blue-500 transition duration-200 ease-in-out whitespace-nowrap px-4 py-2 rounded-full"
          >
            {category}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}



    </header>
  );
}
