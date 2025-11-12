"use client";
import { useState } from "react";
import SearchBar from "../ui/SearchBar";
import Tab from "../ui/Tab";

function Hero() {
  const tabs = ["all", "top stories", "world", "politics", "business", "tech"];
  const [activeTab, SetActiveTab] = useState("all");
  return (
    <section className="bg-gray-50 pt-25 pb-10 sm:py-27.5 ">
      <div className="container-wrapper space-y-12">
        <div className="space-y-9">
          <SearchBar
            custom_class="!border-gray-100/20 !border"
            placeHolder="search for news, topics..."
          />
          <div className="hidden sm:flex">
            <Tab
              tabs={tabs}
              activeTab={activeTab}
              SetActiveTab={SetActiveTab}
            />
          </div>
        </div>
        <div className="p-6 sm:px-8 sm:py-5 sm:h-147 md:px-10 md:py-6.5 bg-gray-100 rounded-xl flex items-end ">
          <div className="space-y-8">
            <h3 className="text-white font-bold text-4xl md:text-6xl">
              Breaking:Major Political Event Unfolds
            </h3>
            <p className="sm:text-lg font-medium text-gray-200 max-w-3xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              repudiandae eligendi ipsa esse sint dignissimos voluptates enim
              quos, sed voluptas voluptatum nihil maiores dolores vero dolore
              magnam veritatis, dolorum blanditiis.
            </p>
            <div>
              <button className="bg-blue-300 rounded-lg px-6 py-3 font-semibold text-white cursor-pointer hover:bg-blue-300/80 transition ease-in-out duration-300">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
