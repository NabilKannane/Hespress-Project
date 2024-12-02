"use client";

import { useState } from "react";
import CategorySelector from "./components/CategorySelector";
import UrlInput from "./components/UrlInput"
import BtnScrappingTag from "./components/BtnScrappingTag"

export default function DashboardLayout() {
  const [categoryStats, setCategoryStats] = useState(false);

  return (
    <div className="flex h-screen m-auto">
 <section className="text-center w-full mt-48 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold ">
          The most efficient way to scrap data from<br /> 
          <span className="text-blue-500 text-9xl mt-24 mb-16">Hespress</span>
        </h1>
        <p className="mt-4 text-lg text-white">
          Start your journey with easy-to-use, high-quality, and affordable infrastructure.
        </p>
        {/* <div className="mt-8 flex flex-col md:flex-row justify-center gap-8 text-black ">
          <CategorySelector/>
          <UrlInput/>
          <BtnScrappingTag/>
        </div> */}
      </section>

      <section>


        
      </section>
      
    </div>
  );
}
