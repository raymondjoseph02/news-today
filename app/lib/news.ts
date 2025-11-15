import { DataProps } from "@/app/hooks/useNews";

export interface NewsParams {
  category?: string;
  search?: string;
  pageSize?: number;
  country?: string;
}

export async function fetchNews(params: NewsParams = {}): Promise<DataProps> {
  const {
    category = "general",
    search = "",
    pageSize = 20,
    country = "us",
  } = params;

  const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error("News API configuration missing");
  }

  // Build the API URLhttps://api.thenewsapi.com/v1/news/top?api_token=t9wXYTKlsKa2EyXKPb2J4a6BZUB9eC6LZHqvNkBc&locale=us&limit=3
  let url = `${apiUrl}/all?api_token=${apiKey}&locale=${country}&language=en&page=5`;

  // Add category if it's not "all"
  if (category && category !== "all") {
    const validCategory = [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ].includes(category.toLowerCase())
      ? category.toLowerCase()
      : "general";

    url += `&category=${validCategory}`;
  }

  // Add search query if provided
  if (search && search.trim() !== "") {
    url += `&search=${encodeURIComponent(search.trim())}`;
  }

  try {
    const response = await fetch(url, {
      // Enable ISR (Incremental Static Regeneration)
      next: {
        revalidate: 300, // Revalidate every 5 minutes
      },
      headers: {
        "User-Agent": "NewsToday/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.message || "News API error");
    }

    return {
      status: data.status,
      totalResults: data.totalResults || 0,
      articles: data.data || [],
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

// Utility function to get cached or fresh news data
export async function getNewsData(params: NewsParams = {}) {
  try {
    return await fetchNews(params);
  } catch {
    // Return empty data structure on error
    return {
      status: "error",
      totalResults: 0,
      articles: [],
    } as DataProps;
  }
}
