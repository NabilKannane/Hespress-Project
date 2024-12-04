import { useState } from "react";
import { Element3, Graph, DirectRight, Chart, Global } from "iconsax-react";
import Link from "next/link";

export default function Sidebar() {
  const [currentPath, setCurrentPath] = useState("/");

  // Fonction pour mettre à jour le chemin lors du clic sur l'icône
  const handleClick = (path) => {
    setCurrentPath(path);
  };

  // Vérifie si le lien est actif
  const isActive = (path) => currentPath === path;

  return (
    <div className="isolate bg-slate-900/60 ring-1 ring-black/5 fixed left-5 top-1/2 h-[95vh] -translate-y-1/2 w-20 bg-slate-900 rounded-full shadow-lg flex flex-col items-center py-6 space-y-20 z-10">
      {/* Logo */}
      <Link href={`/`} className="flex items-center justify-center w-12 h-12 mb-4">
        <div className="flex items-center justify-center rounded-sm">
          <DirectRight size="32" color="#ffffff" variant="Bold" />
        </div>
      </Link>

      {/* Navigation Icons */}
      <nav className="flex flex-col items-center space-y-16">
        <Link
          href="/"
          onClick={() => handleClick("/")}
          className={`p-2.5 rounded-full ${
            isActive("/") ? "bg-blue-500" : "text-gray-400 hover:text-blue-500"
          }`}
        >
          <Element3 size="22" color={isActive("/") ? "black" : "#d9e3f0"} variant="Bold" />
        </Link>
       
        
      </nav>
    </div>
  );
}
