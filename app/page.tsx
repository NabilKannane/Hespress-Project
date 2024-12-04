"use client";

import { Flash , Profile2User , Driver} from "iconsax-react";

export default function DashboardLayout() {

  return (
    <div className="flex flex-col h-screen text-white">
      {/* Header Section */}
      <section className="text-center w-full mt-36 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-snug">
          The Most Efficient Way to Scrap Data From<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400 text-9xl mt-6 mb-6 inline-block">
            Hespress
          </span>
        </h1>
        <p className="mt-4 text-lg text-white0 max-w-2xl mx-auto">
          Start your journey with cutting-edge, intuitive, and high-performance infrastructure designed to make data scraping seamless.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-3xl font-extrabold text-white mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="backdrop-blur-md bg-slate-900/30    from-blue-500 to-blue-700 hover:bg-red-400/30 rounded-lg p-8 shadow-xl duration-1000 transform transition hover:-translate-y-3 hover:shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-slate-900/60 rounded-full flex items-center justify-center">
                  <Driver size="32" color="#f87171"/>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">High Efficiency</h3>
              <p className="text-gray-200">
                Extract data with blazing speed and unmatched precision, streamlining your workflows.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="backdrop-blur-md bg-slate-900/30 rounded-xl shadow-lg from-slate-500 to-blue-700 hover:bg-yellow-600/30 duration-1000 p-8  transform transition hover:-translate-y-3 hover:shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-slate-900/60 rounded-full flex items-center justify-center">
         
                  <Flash size="32" color="#ca8a04"/>
                  
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Fast</h3>
              <p className="text-gray-200">
                Built with security in mind, ensuring your data is handled with the utmost care and privacy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="backdrop-blur-md bg-slate-900/30 rounded-xl  shadow-lg from-blue-500 to-slate-800  hover:bg-blue-600/30 duration-1000  p-8 transform transition hover:-translate-y-3 hover:shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-slate-900/60 rounded-full flex items-center justify-center">
                <Profile2User size="32" color="#3b82f6"/>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">User-Friendly</h3>
              <p className="text-gray-200">
                A clean, intuitive interface that’s perfect for both beginners and professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-8 backdrop-blur-md bg-slate-900/30 rounded-xl mx-8 shadow-xl from-blue-500 to-indigo-500 text-white text-center ">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Start Scraping?
        </h2>
        <p className="text-lg mb-8">
          Take control of your data scraping needs with our powerful tools.
        </p>
        <div className="flex justify-center gap-6">
          <button className="bg-white text-blue-500 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100">
            Get Started
          </button>
          <button className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-white hover:text-blue-500">
            Learn More
          </button>
        </div>
      </section>

      

<footer className="bg-transparent rounded-lg shadow m-10 ">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Created by : <span className="font-bold">Nabil Kannane - Adil Alami - Anas Ethabity </span>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

    </div>
  );
}
