"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArticleProps, DataProps } from "@/app/hooks/useNews";
import { fetchNews } from "@/app/lib/news";
import fallBackImage from "@/public/images/freepik__adjust__20029.jpeg";
import { Archive, Heart, MessageSquare, Share2 } from "lucide-react";
import RelatedArticleCard from "@/app/components/new-feeds/RelatedArticleCard";

function Page() {
  const params = useParams();
  const { slug } = params;
  const [article, setArticle] = useState<ArticleProps | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRelatedArticles = useCallback(
    async (category: string, currentArticleTitle: string) => {
      try {
        // Ensure we're using a valid API category
        const validCategories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
        const apiCategory = validCategories.includes(category.toLowerCase()) 
          ? category.toLowerCase() 
          : "general";
          
        const relatedData = await fetchNews({
          category: apiCategory,
          pageSize: 6,
        });
        // Filter out the current article and get first 2 different articles
        const related = relatedData.articles
          .filter((article) => article.title !== currentArticleTitle)
          .slice(0, 2);
        setRelatedArticles(related);
      } catch (err) {
        console.error("Error fetching related articles:", err);
      }
    },
    []
  );

  const fetchArticle = useCallback(async () => {
    if (!slug) return;

    setIsLoading(true);
    setError(null);

    try {
      // First, try to get article data from sessionStorage
      const storedArticle = sessionStorage.getItem(`article-${slug}`);

      if (storedArticle) {
        // Use stored article data
        const articleData = JSON.parse(storedArticle);
        setArticle(articleData);

        // Fetch related articles if category is available
        if (articleData.category) {
          await fetchRelatedArticles(articleData.category, articleData.title);
        }

        setIsLoading(false);
        return;
      } else setError("Article not found");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [slug, fetchRelatedArticles]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (isLoading) {
    return (
      <div className="container-wrapper pt-40 pb-10 min-h-screen ">
        <div
          role="status"
          className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8  text-blue-300 animate-spin fill-brand"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-wrapper pt-20 pb-10 min-h-dvh">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link
            href="/"
            className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/80 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container-wrapper pt-20 pb-10 min-h-dvh">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Article Not Found
          </h1>
          <Link
            href="/"
            className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-300/80 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="container-wrapper pt-20 sm:pt-40 pb-10 min-h-dvh">
      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <header className="mb-8">
          <p className="text-gray-500 capitalize mb-2">
            news / {article?.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center text-gray-500 text-sm mb-6 gap-3">
            <div>
              <p className="capitalize">by Raymond Joseph</p>
            </div>

            <div className="size-1 rounded-full bg-gray-500" />
            <div className="flex  gap-1 items-center">
              <p className="capitalize">published on </p>
              <time>
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>

        {/* Article Image */}
        {article.urlToImage && (
          <div className="mb-8">
            <Image
              src={article.urlToImage || fallBackImage}
              alt={article.title}
              width={800}
              height={563}
              className="w-full h-64 md:h-144 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {article.description}
          </p>
        </div>

        {/* Articles statics */}

        <div className="flex items-center justify-center gap-10 border-y border-y-gray-200 py-4">
          <div className="flex items-center gap-2">
            <Heart className="text-gray-500" />
            <p>1.3k</p>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="text-gray-500" />
            <p>3</p>
          </div>
          <div className="flex items-center gap-2">
            <Archive className="text-gray-500" />
            <p>save</p>
          </div>
          <div className="flex items-center gap-2">
            <Share2 className="text-gray-500" />
            <p>share</p>
          </div>
        </div>

        <div className="my-6">
          <p className="font-semibold text-lg sm:text-2xl">Related Articles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.length > 0 ? (
              relatedArticles.map((relatedArticle, index) => (
                <RelatedArticleCard
                  key={`related-${index}-${relatedArticle.title}`}
                  title={relatedArticle.title}
                  category={article?.category || "general"}
                  description={
                    relatedArticle.description || "No description available"
                  }
                  thumbNail={relatedArticle.urlToImage || ""}
                  publishedAt={relatedArticle.publishedAt}
                  url={relatedArticle.url}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-2">
                No related articles available
              </p>
            )}
          </div>
        </div>
        <div className="my-6">
          <p className="font-semibold text-lg sm:text-2xl">Comments (2)</p>
          <div></div>
        </div>
      </div>
    </article>
  );
}

export default Page;
