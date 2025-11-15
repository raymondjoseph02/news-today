"use client";
import { useStore } from "@tanstack/react-store";
import { useRouter } from "next/navigation";
import SearchBar from "../ui/SearchBar";
import Tab from "../ui/Tab";
import { activeTab, handleSearch, search, updateActiveTab } from "@/app/store";
import { useNews, ArticleProps, DataProps } from "@/app/hooks/useNews";
import ArticleSkeleton from "../ui/skeleton/ArticleSkeleton";

interface HeroProps {
  initialData?: DataProps;
}

function Hero({ initialData }: HeroProps) {
  const { data: news, isLoading, error } = useNews(initialData);
  const router = useRouter();
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

  // Create URL-safe slug from title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Map tab names to valid API categories
  const mapTabToCategory = (tabName: string) => {
    const mapping: { [key: string]: string } = {
      All: "general",
      Top: "general",
      World: "general",
      Politics: "general", // Politics not supported by API, fallback to general
      Business: "business",
      Tech: "technology",
    };
    return mapping[tabName] || "general";
  };

  const handleHeroNavigate = (item: ArticleProps) => {
    const slug = createSlug(item.title);

    // Store article data in sessionStorage with current category
    const articleData = {
      title: item.title,
      description: item.description,
      urlToImage: item.urlToImage,
      publishedAt: item.publishedAt,
      url: item.url,
      category: mapTabToCategory(currentTab),
    };

    sessionStorage.setItem(`article-${slug}`, JSON.stringify(articleData));

    // Navigate to the article page
    router.push(`/pages/news/${slug}`);
  };

  return (
    <section className="bg-gray-50 pt-24 pb-10 sm:pt-28 sm:pb-16">
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
            news.articles.slice(0, 1).map((item) => (
              <div
                style={{
                  backgroundImage: `url(${item.urlToImage})`,
                }}
                className="p-6 sm:px-8 sm:py-5 h-80 sm:h-151 md:px-10 md:py-8 bg-gray-400 rounded-xl flex items-start justify-end flex-col bg-cover bg-center relative overflow-hidden"
                key={`hero-${item.title}-${item.publishedAt}`}
              >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="relative z-20">
                  <h3 className="text-white font-bold text-4xl md:text-6xl line-clamp-3 text-pretty mb-4">
                    {item.title}
                  </h3>
                  <p className="sm:text-lg font-medium text-gray-200 max-w-3xl line-clamp-3 mb-2">
                    {item.description ?? "No description available"}
                  </p>
                  <div>
                    <button
                      onClick={() => handleHeroNavigate(item)}
                      className="bg-blue-300 rounded-lg px-6 py-3 font-semibold text-white cursor-pointer hover:bg-blue-300/80 transition ease-in-out duration-300 inline-block"
                    >
                      Read More
                    </button>
                  </div>
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
