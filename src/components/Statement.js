import React from "react";
import Threemodel from "./Threemodel";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

export default function Statement() {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden py-6 sm:py-18 ">
      <div className="mx-auto px-10 lg:px-14">
        <div className="mx-auto grid w-2xl grid-cols-1 gap-y-16 sm:gap-y-20 lg:mx-0  lg:grid-cols-2 ">
          <div className="lg:pl-12 h-screen flex items-center justify-center pb-44 ">
            <div className="">
              <h2 className="md:text-xl text-2xl font-bold leading-7 text-gray-700">
                AI-based clinical documentation
              </h2>
              <p className="md:text-9xl pb-5 w-full font-bold flex tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-9xl">
              ClinicalSage

              </p>
              <dl className="mt-4 max-w-9xl space-y-8 text-base leading-7 text-slate-200 lg:max-w-none">
                <p className="md:text-xl font-bold flex  tracking-tight bg-gradient-to-r from-gray-500 to-gray-900 bg-clip-text text-transparent text-xl">
                  <Typewriter
                    words={["ClinicalSage offers efficient medical documentation with advanced AI models, ensuring security and accessibility while enhancing user understanding, making it a valuable tool for healthcare professionals worldwide."]}
                    cursor
                    cursorStyle="."
                    loop={1}
                    typeSpeed={5}
                  />
                </p>
              </dl>
              <div className="flex mt-6 gap-x-4">
                <button
                  className=" flex justify-center items-center text-sm font-semibold leading-6 text-gray-200 py-3 px-12 bg-gradient-to-r bg-cover bg-center from-emerald-600 to-cyan-600 hover:bg-blue-700 rounded-md transition-all duration-150 ease-in-out border-2  border-emerald-600 w-1/2"
                  onClick={() => {
                    navigate("/Assistant");
                  }}
                >
                  Try our AI Assistant
                </button>
                {/* <button
                  className=" flex justify-center items-center text-sm font-semibold leading-6 text-gray-200 py-3 px-12 bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-150 ease-in-out border-2  border-blue-600"
                  onClick={() => {
                    navigate("/Dashboard");
                  }}
                >
                  Open Admin Dashboard
                </button> */}
                <button
                  className=" flex justify-center items-center text-sm font-semibold leading-6 text-gray-200 py-3 px-12 bg-gradient-to-r bg-cover bg-center from-cyan-600 to-emerald-600 hover:bg-blue-900 hover:animate-pulse rounded-md transition-all duration-150 ease-in-out border-2  border-emerald-600 w-1/2"
                  onClick={() => {
                    navigate("/Translate");
                  }}
                >
                  Translator <span> &rarr;</span>
                </button>
              </div>
            </div>
          </div>
          <Threemodel />
        </div>
      </div>
    </div>
  );
}