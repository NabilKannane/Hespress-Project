"use client";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { useState } from "react";

export default function DashboardLayout() {
  const [categoryStats, setCategoryStats] = useState(false);

  const handleCategoriesClick = () => {
    setCategoryStats(!categoryStats); // Toggle the categories menu visibility
  };

  return (
    <div className="flex h-screen">

        {/* Main Content */}
        <MainContent
          marginTop={categoryStats ? "ml-28" : ""} // Add margin-top when categoryStats is true
        />
      
    </div>
  );
}
