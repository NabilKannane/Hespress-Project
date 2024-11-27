"use client";

import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { HambergerMenu } from "iconsax-react";

export default function Header({ mymargin, handleCategoriesClick }) {

  const categories = [
    { name: "headlines", url: "#headlines" },
    // { name: "categories", url: "#categories" },
    { name: "Most commented", url: "#mostcommented" },
    { name: "Most view", url: "#mostview" },
    { name: "Politics", url: "#Politics" },
    { name: "economy", url: "#economy" },
    { name: "society", url: "#society" },
    { name: "culture", url: "#culture" },
    { name: "sports", url: "#sports" },
    { name: "mena", url: "#mena" },
    { name: "international", url: "#international" },
    { name: "media", url: "#media" },
  ];

  String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  };

  return (
    <header className={`flex items-center justify-between p-4 text-gray-400 relative  transform duration-1000 ease-in-out  ${mymargin}`}>
      {/* Menu */}
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 rounded-full hover:text-blue-500" onClick={()=>handleCategoriesClick()}>
          <HambergerMenu size="32" color="#3b82f6" />
        </button>

        <div
          className=" text-white p-2 max-h-60 overflow-x-scroll transition-all duration-1000 ease-in-out rounded-3xl  flex"
          
        >
          <ul className="space-x-5 flex justify-start transition-all duration-1000 ease-in-out">
            {categories.map((category, index) => (
              <li key={index} className="flex-shrink-0">
                <a
                  href={`#${category.url.toLowerCase()}`}
                  className="hover:text-blue-500 transition duration-200 ease-in-out whitespace-nowrap px-2 py-2 rounded-full"
                >
                  {category.name.capitalizeFirstLetter()}
                </a>
              </li>
            ))}
          </ul>
        </div>
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


 

     
    </header>
  );
}
