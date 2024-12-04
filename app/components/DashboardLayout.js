"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import { motion } from "motion/react";

export default function DashboardLayout({ children }) {
  const [aside, setAside] = useState(false);

  const handleCategoriesClick = () => {
    setAside(!aside); // Toggle the categories menu visibility
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: aside ? 1 : 0, x: aside ? 15 : 0 }}
        transition={{ duration: 0.5 }}
        className="sidebar"
      >
        <Sidebar />
      </motion.div>

      {/* Main Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col"
      >
        {/* Header */}
        <Header
          mymargin={aside ? "ml-28" : ""}
          handleCategoriesClick={handleCategoriesClick}
        />

        {/* Main Content */}
        <main
          className={`flex-1 transform duration-1000 ease-in-out ${
            aside ? "ml-28" : ""
          }`}
        >
          {children} {/* Renders the page's content */}
        </main>
      </motion.div>
    </div>
  );
}
