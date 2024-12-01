"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Importation de Link
import { HambergerMenu } from "iconsax-react";

export default function Header({ mymargin, handleCategoriesClick }) {
  const [currentPath, setCurrentPath] = useState("");

  // useEffect(() => {
  //   // Mettre à jour l'URL active lors du montage du composant
  //   setCurrentPath(window.location.pathname);
  //   console.log(currentPath)
  // }, [currentPath]);


  const categories = [
    { name: "Home", url: "/" },
    { name: "Scrapping with category", url: "/scrapcategory" },
    { name: "Scrapping with URL", url: "/scrapurl" },
    { name: "Scrapping with Tags", url: "/scraptag" },
  ];

  String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  };

  const headers = () => {
    setCurrentPath(window.location.pathname);
    console.log(currentPath) // Toggle the categories menu visibility
  };


  return (
    <header
      className={`flex items-center justify-between p-4 text-gray-400 relative transform duration-1000 ease-in-out ${mymargin}`}
    >
      {/* Menu */}
      <div className="flex items-center space-x-4">
        <button
          className="px-4 py-2 rounded-full hover:text-blue-500"
          onClick={() => handleCategoriesClick()}
        >
          <HambergerMenu size="32" color="#3b82f6" />
        </button>

        <div className="text-white p-2 max-h-60 overflow-x-scroll transition-all duration-1000 ease-in-out rounded-3xl flex">
          <ul className="space-x-5 flex justify-start transition-all duration-1000 ease-in-out">
            {categories.map((category, index) => (
              <li key={index} className="flex-shrink-0">
                <Link
                  href={category.url}
                  className={"whitespace-nowrap px-2 py-2 rounded-full transition duration-200 ease-in-out"}
                  onClick={headers}
                >
                  {category.name.capitalizeFirstLetter()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
