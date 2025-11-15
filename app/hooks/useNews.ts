// app/hooks/useNews.ts
"use client";

import { useEffect, useState, useMemo, useTransition } from "react";
import { useStore } from "@tanstack/react-store";
import { activeTab, search } from "@/app/store";
import { debounce } from "@/app/utili/debounce";
import { fetchNews, NewsParams } from "@/app/lib/news";

// Types
export type ArticleProps = {
  title: string;
  description: string;
  published_at: string;
  image_url: string;
  url: string;
  category?: string;
};

export type DataProps = {
  status: string;
  totalResults: number;
  articles: ArticleProps[];
};

// Hook for client-side news fetching with initial SSR data
export function useNews(initialData?: DataProps | null) {
  const [data, setData] = useState<DataProps | null>(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const currentTab = useStore(activeTab);
  const currentSearch = useStore(search);
  const searchQuery = currentSearch || "";

  // Map tab names to valid API categories
  const mapTabToCategory = (tabName: string) => {
    const mapping: { [key: string]: string } = {
      all: "general",
      top: "top stories",
      world: "world",
      politics: "politics", // Politics not supported by API, fallback to general
      business: "business",
      tech: "technology",
    };
    return mapping[tabName.toLowerCase()];
  };
  const category = mapTabToCategory(currentTab);

  console.log(category);

  const fetchNewsData = async (params: NewsParams) => {
    try {
      setError(null);
      setIsLoading(true);
      const newsData = await fetchNews(params);
      setData(newsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch news");
      console.error("Error fetching news:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetch = useMemo(
    () =>
      debounce(() => {
        startTransition(() => {
          fetchNewsData({
            category,
            search: searchQuery || undefined,
            pageSize: 20,
          });
        });
      }, 900),
    [category, searchQuery]
  );

  const refetch = () => {
    startTransition(() => {
      fetchNewsData({
        category,
        search: searchQuery || undefined,
        pageSize: 20,
      });
    });
  };

  useEffect(() => {
    // Always fetch when category or search changes
    debouncedFetch();
  }, [category, searchQuery, debouncedFetch]);

  return {
    data,
    isLoading: isLoading || isPending,
    error,
    refetch,
  };
}

// Hook for server-side rendering
export function useNewsSSR(initialData: DataProps) {
  return {
    data: initialData,
    isLoading: false,
    error: null,
    refetch: () => {},
  };
}
