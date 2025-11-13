import Hero from "./components/new-feeds/Hero";
import RecentArticles from "./components/new-feeds/RecentArticles";

export default function Home() {
  return (
    <>
      <div className="min-h-[calc(100vh-100px)] bg-gray-50">
        <Hero />
        <RecentArticles />
      </div>
    </>
  );
}
