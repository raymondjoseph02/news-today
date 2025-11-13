"use client";
import { useStore } from "@tanstack/react-store";
import SearchBar from "../ui/SearchBar";
import Tab from "../ui/Tab";
import { activeTab, handleSearch, search, updateActiveTab } from "@/app/store";
import { useNews } from "@/app/hooks/useNews";
import ArticleSkeleton from "../ui/skeleton/ArticleSkeleton"; // reuse skeleton if you have

function Hero() {
  const { data: news, isLoading, error } = useNews();
  const tabs = [
    { name: "All", abbreviation: "all" },
    { name: "Top", abbreviation: "top stories" },
    { name: "World", abbreviation: "world" },
    { name: "Politics", abbreviation: "politics" },
    { name: "Business", abbreviation: "business" },
    { name: "Tech", abbreviation: "technology" },
  ];
  const currentTab = useStore(activeTab);
  const currentSearch = useStore(search);

  console.log(news);

  return (
    <section className="bg-gray-50 pt-25 pb-10 sm:pt-27.5 sm:pb-16">
      <div className="container-wrapper space-y-12">
        <div className="space-y-9">
          <SearchBar
            value={currentSearch ?? ""}
            setValue={(val) => handleSearch(val)}
            custom_class="!border-gray-100/20 !border"
            placeHolder="search for news, topics..."
          />
          <div className="hidden sm:flex">
            <Tab
              tabs={tabs}
              activeTab={currentTab}
              SetActiveTab={(tab) => updateActiveTab(tab)}
            />
          </div>
        </div>

        <div>
          {isLoading ? (
            // Show skeleton loading state
            <div className="w-full h-full flex items-center justify-center">
              <ArticleSkeleton />
            </div>
          ) : error ? (
            // Show error state
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
              <p className="text-2xl font-semibold text-gray-800">
                Failed to load news 😕
              </p>
              <p className="text-gray-500">{error}</p>
            </div>
          ) : news?.articles?.length ? (
            news.articles.slice(0, 1).map((item, idx) => (
              <div
                style={{
                  backgroundImage: `url(${item.urlToImage})`,
                }}
                className="p-6 sm:px-8 sm:py-5 h-120 sm:h-147 md:px-10 md:py-6.5 bg-gray-400  rounded-xl flex items-start justify-end flex-col"
                key={item.title + idx}
              >
                <h3 className="text-white font-bold text-4xl md:text-6xl line-clamp-3 text-pretty mb-4">
                  {item.title}
                </h3>
                <p className="sm:text-lg font-medium text-gray-200 max-w-3xl line-clamp-3 mb-2">
                  {item.description ?? "No description available"}
                </p>
                <div>
                  <button className="bg-blue-300 rounded-lg px-6 py-3 font-semibold text-white cursor-pointer hover:bg-blue-300/80 transition ease-in-out duration-300">
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No news found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
