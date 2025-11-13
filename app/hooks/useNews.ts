// app/hooks/useNews.ts
"use client";

import { useEffect, useState, useMemo } from "react";
import { useAxios } from "@/app/api";
import { useStore } from "@tanstack/react-store";
import { activeTab, search } from "@/app/store";
import { debounce } from "@/app/utili/debounce";

// Types
export type ArticleProps = {
  title: string;
  description: string;
  publishedAt: string;
  urlToImage: string;
};

export type DataProps = {
  status: string;
  totalResults: number;
  articles: ArticleProps[];
};

export function useNews() {
  const [data, setData] = useState<DataProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL; // top-headlines URL
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  const currentTab = useStore(activeTab);
  const currentSearch = useStore(search);

  const category = [
    "top stories",
    "politics",
    "business",
    "tech",
    "world",
    "general",
  ].includes(currentTab.toLowerCase())
    ? currentTab.toLowerCase()
    : "general";

  const searchQuery =
    currentSearch && currentSearch.trim() !== "" ? currentSearch : "";

  const { sendRequest } = useAxios({
    setIsLoading,
    setResponse: setData,
    setErrorMessage: setError,
  });

  const debouncedFetch = useMemo(
    () =>
      debounce(() => {
        if (!apiUrl || !apiKey) return;
        const url = `${apiUrl}&category=${category}${
          searchQuery ? `&q=${searchQuery}` : ""
        }&apiKey=${apiKey}`;
        sendRequest({ url, method: "GET" });
      }, 900),
    [apiUrl, apiKey, category, searchQuery, sendRequest]
  );

  useEffect(() => {
    debouncedFetch();
  }, [category, searchQuery, debouncedFetch]);

  return { data, isLoading, error, refetch: debouncedFetch };
}
