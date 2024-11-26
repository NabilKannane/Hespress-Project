import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { HambergerMenu } from "iconsax-react";

export default function Header() {
  const names = [
    { name: "headlines ", url: "#headlines" },
    { name: "categories", url: "#categories" },
    { name: "Most commented", url: "#mostcommented" },
    { name: "Most view", url: "#mostview" }
  ];

  return (
    <header className="flex items-center justify-between p-4 text-gray-400">
      {/* Menu */}
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 rounded-full hover:text-lime-500">
          <HambergerMenu size="32" color="#84cc16" />
        </button>

        <ul className="flex space-x-5 text-lg ">
          {names.map((name, index) => (
            <li key={index}>
              <a
                href={name.url}
                className="text-gray-300 hover:text-lime-500 transition"
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
    </header>
  );
}
