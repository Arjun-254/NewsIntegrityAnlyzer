import React from "react";
import Threemodel from "./Threemodel";

export default function Statement() {
  const token = localStorage.getItem("jwt");
  return (
    <div className="overflow-hidden py-12 sm:py-18">
      <div className="mx-auto max-w-7xl px-10 lg:px-14">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pl-12 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="md:text-xl text-lg font-bold leading-7 mt-6 text-white text-center">
                Your very own
              </h2>
              <p className="mt-2 text-4xl sm:text-4xl md:text-6xl font-bold flex justify-center text-center tracking-tight bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent ">
                News Integrity Analyzer
              </p>
              <p className="mt-4 text-md sm:text-md md:text-2xl text-gray-300 text-center">
                Your comprehensive solution for discerning fact from fiction in today's news landscape. With our News Integrity Analyzer, you can be assured of the news you are consuming in this sea of misinformation. Our cutting-edge platform utilizes advanced algorithms and AI to help you seperate reliable reporting from sensationalized or misleading stories. 
              </p>
              <div className="flex items-center justify-center ">
                {!token && (
                  <a
                    href="/signup"
                    className="mt-5 rounded-md border border-transparent bg-indigo-600 py-3 px-6 font-medium text-white hover:bg-blue-700"
                  >
                    Get Started <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
                {token && (
                  <a
                    href="/dashboard"
                    className="mt-5 rounded-md border border-transparent bg-indigo-600 py-3 px-6 font-medium text-white hover:bg-blue-700"
                  >
                    Dashboard <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <Threemodel />
        </div>
      </div>
    </div>
  );
}