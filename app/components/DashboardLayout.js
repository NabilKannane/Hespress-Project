"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [categoryStats, setCategoryStats] = useState(false);

  const handleCategoriesClick = () => {
    setCategoryStats(!categoryStats); // Toggle the categories menu visibility
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {categoryStats && <Sidebar />}

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          marginTop={categoryStats ? "ml-28" : ""}
          handleCategoriesClick={handleCategoriesClick}
        />

        {/* Main Content */}
        <main className={`flex-1 ${categoryStats ? "ml-28" : ""}`}>
          {children} {/* Renders the page's content */}
        </main>
      </div>
    </div>
  );
}
