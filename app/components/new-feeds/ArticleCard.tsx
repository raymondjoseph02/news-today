import Image from "next/image";
import Link from "next/link";
import fallBackImage from "@/public/images/freepik__adjust__20029.jpeg";
interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}
function ArticleCard({ title, description, imageUrl, date }: CardProps) {
  return (
    <Link href={""} className="space-y-6 group">
      <div className="rounded-lg w-full max-h-58 h-58 bg-gray-500 overflow-hidden">
        <Image
          src={imageUrl ?? fallBackImage}
          alt={title}
          width={600}
          height={600}
          className="size-full group-hover:scale-105 transition ease-in-out duration-300 "
        />
      </div>
      <div>
        <div className="space-y-2.5">
          <p className="line-clamp-2 text-lg font-semibold sm:text-2xl text-gray-100">
            {title}
          </p>
          <p className="text-gray-500 text-lg line-clamp-2">
            {description ?? "No description available at the moment "}
          </p>
        </div>
        <p className="text-gray-400">{date.slice(0, 10)}</p>
      </div>
    </Link>
  );
}

export default ArticleCard;
