"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [aside, setAside] = useState(false);

  const handleCategoriesClick = () => {
    setAside(!aside); // Toggle the categories menu visibility
  };

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      {aside && <Sidebar />}

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          mymargin={aside ? "ml-28" : ""}
          handleCategoriesClick={handleCategoriesClick}
        />

        {/* Main Content */}
        <main className={`flex-1  transform duration-1000 ease-in-out  ${aside ? "ml-28 " : ""}`}>
          {children} {/* Renders the page's content */}
        </main>
      </div>
    </div>
  );
}
