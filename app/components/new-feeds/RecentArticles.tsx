"use client";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { useAxios } from "@/app/api";
import ArticleSkeleton from "../ui/skeleton/ArticleSkeleton";
import { activeTab, search } from "@/app/store";
import { useStore } from "@tanstack/react-store";
type ArticleProps = {
  title: string;
  description: string;
  publishedAt: string;
  urlImageTo: string;
};
function RecentArticles() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const currentTab = useStore(activeTab);
  const currentSearch = useStore(search);
  const { sendRequest } = useAxios({
    setIsLoading,
    setResponse: setData,
    setErrorMessage: setError,
  });

  const fetchData = () => {
    sendRequest({
      url: `${apiUrl?.replace("search", currentSearch ?? "all")}${apiKey}`,
      method: "GET",
    });
  };

  useEffect(() => {
    fetchData();
  }, [currentSearch]);

  useEffect(() => {
    if (data) {
      console.log("Articles:", data.articles);
    }
    console.log(error);
  }, [data, error]);
  return (
    <section className="bg-gray-50 pb-10">
      <div className="container-wrapper space-y-6 sm:space-y-8">
        <h2 className="text-gray-100 text-4xl md:text-5xl font-medium">
          Recent Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && !error ? (
            //Show skeletons while loading
            Array.from({ length: 6 }).map((_, idx) => (
              <ArticleSkeleton key={idx} />
            ))
          ) : error ? (
            // Show error message if request failed
            <div className="py-11 flex flex-col items-center justify-center space-y-4 text-center w-full">
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-gray-800">
                  Oops! Something went wrong 😕
                </p>
                <p className="text-gray-500">
                  Failed to get feeds. Please try again.
                </p>
              </div>
              <button
                onClick={fetchData}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 capitalize"
              >
                Reload
              </button>
            </div>
          ) : data?.articles?.length === 0 ? (
            // Show “no result” message when no articles
            <div className="col-span-full flex flex-col items-center justify-center py-10 text-center space-y-2">
              <p className="text-lg font-semibold text-gray-700">
                No articles found 😔
              </p>
              <p className="text-gray-500">Try changing your search</p>
            </div>
          ) : (
            // Show articles when data is available
            data?.articles?.map((article: ArticleProps, idx: number) => (
              <ArticleCard
                key={idx}
                title={article?.title}
                description={article?.description}
                date={article?.publishedAt}
                imageUrl={article?.urlImageTo}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default RecentArticles;
