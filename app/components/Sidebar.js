import { Element3, Activity, DirectRight } from "iconsax-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    
<aside className=" isolate bg-slate-900/60  ring-1 ring-black/5 fixed left-5 top-1/2  h-[95vh]  -translate-y-1/2 w-20 bg-slate-900 rounded-3xl shadow-lg flex flex-col items-center py-6 space-y-20 z-10">
      {/* Logo */}
      <Link href={`/`} className="flex items-center justify-center w-12 h-12 mb-4">
        <div className="flex items-center justify-center rounded-sm">
          <DirectRight size="32" color="#ffffff" variant="Bold" />
        </div>
      </Link>

      {/* Navigation Icons */}
      <nav className="flex flex-col items-center space-y-16">
        <a href="#" className="bg-blue-500 p-2.5 rounded-full">
          <Element3 size="22" color="black" variant="Bold" />
        </a>
        {/* <a href="#" className="text-gray-400 hover:text-blue-500">
          <Activity size="22" color="#d9e3f0" variant="Bold" />
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-500">
          <Activity size="22" color="#d9e3f0" variant="Bold" />
        </a>
         */}
      </nav>
    </aside>
  );
}
