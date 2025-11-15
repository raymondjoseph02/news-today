import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import fallBackImage from "@/public/images/freepik__adjust__20029.jpeg";
interface RelatedArticleCardProps {
  title: string;
  category: string;
  description: string;
  image_url: string;
  publishedAt?: string;
  url?: string;
}
function RelatedArticleCard({
  title,
  description,
  category,
  image_url,
  publishedAt,
  url,
}: RelatedArticleCardProps) {
  const router = useRouter();

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNavigate = () => {
    const slug = createSlug(title);

    const articleData = {
      title,
      description,
      image_url: image_url,
      publishedAt: publishedAt || new Date().toISOString(),
      url: url || "",
      category: category,
    };

    sessionStorage.setItem(`article-${slug}`, JSON.stringify(articleData));
    router.push(`/pages/news/${slug}`);
  };
  return (
    <div className="cursor-pointer" onClick={handleNavigate}>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <div className="mb-2">
            <p className="text-sm text-gray-500 capitalize mb-1">{category}</p>
            <p className="font-semibold text-gray-800 line-clamp-2">{title}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
        <div className="w-20 h-20 shrink-0">
          <Image
            src={image_url || fallBackImage}
            alt={title}
            width={80}
            height={80}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
      <button
        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
        onClick={(e) => {
          e.stopPropagation();
          handleNavigate();
        }}
      >
        Read More
      </button>
    </div>
  );
}

export default RelatedArticleCard;
