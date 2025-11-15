import Hero from "./components/new-feeds/Hero";
import RecentArticles from "./components/new-feeds/RecentArticles";
import { getNewsData } from "./lib/news";
import { Metadata } from "next";

// Dynamic metadata generation
export async function generateMetadata(): Promise<Metadata> {
  try {
    const newsData = await getNewsData({ pageSize: 1 });
    const latestArticle = newsData.articles[0];

    return {
      title: "News Today - Latest Headlines & Breaking News",
      description: latestArticle
        ? `Latest: ${latestArticle.title.slice(0, 120)}...`
        : "Stay updated with the latest news, breaking stories, and headlines from around the world.",
      keywords: [
        "news",
        "headlines",
        "breaking news",
        "latest news",
        "world news",
      ],
      openGraph: {
        title: "News Today - Latest Headlines",
        description: "Your source for breaking news and latest headlines",
        type: "website",
        images: latestArticle?.urlToImage ? [latestArticle.urlToImage] : [],
      },
    };
  } catch {
    return {
      title: "News Today - Latest Headlines & Breaking News",
      description:
        "Stay updated with the latest news, breaking stories, and headlines from around the world.",
    };
  }
}

// Server-side rendering with ISR (Incremental Static Regeneration)
export default async function Home() {
  // Fetch initial news data on the server
  const initialNewsData = await getNewsData({
    category: "general",
    pageSize: 20,
  });

  return (
    <>
      <div className="min-h-[calc(100vh-100px)] bg-gray-50">
        <Hero initialData={initialNewsData} />
        <RecentArticles initialData={initialNewsData} />
      </div>
    </>
  );
}

// Revalidate the page every 5 minutes
export const revalidate = 300;
