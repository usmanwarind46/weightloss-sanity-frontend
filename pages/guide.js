"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { IoIosArrowForward } from "react-icons/io";
import { FaTags } from "react-icons/fa6";
import Link from "next/link";
import MetaLayout from "../Meta/MetaLayout";
import { meta_url } from "../config/constants";
import {
  SEO_QUERY,
  SITE_SETTINGS_QUERY,
  BLOGS_QUERY,
  CATEGORIES_QUERY,
} from "../lib/sanityQueries";
import { generateSchema } from "../lib/schemaGenerator";
import { sanityClient } from "../lib/sanity";

export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);
  const blogs = await sanityClient.fetch(BLOGS_QUERY);
  const categories = await sanityClient.fetch(CATEGORIES_QUERY);

  return {
    props: {
      seoSettings,
      siteSettings,
      blogs,
      categories,
    },
    revalidate: 60,
  };
}

const INITIAL_SHOW = 6;
const LOAD_MORE_COUNT = 3;

const SkeletonCard = ({ i }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: i * 0.06 }}
    className="flex flex-col"
  >
    <div className="w-full h-[195px] sm:h-[220px] rounded-2xl mb-4 bg-gray-200 overflow-hidden relative">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
    <div className="h-6 w-24 rounded-full bg-gray-200 mb-3 overflow-hidden relative">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
    <div className="h-4 w-full rounded bg-gray-200 mb-2 overflow-hidden relative">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
    <div className="h-4 w-4/5 rounded bg-gray-200 mb-2 overflow-hidden relative">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
    <div className="h-4 w-2/3 rounded bg-gray-200 overflow-hidden relative">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  </motion.div>
);

const CategoryBadge = ({ category }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-lg font-medium bg-green-50 text-black">
    {" "}
    <FaTags className="text-[#4DB581] text-lg" />
    {category}{" "}
  </span>
);

const GuideCard = ({ guide, i }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col cursor-pointer group"
  >
    <Link href={`/guide/${guide.slug}`}>
      <div className="relative w-full h-[195px] sm:h-[220px] rounded-2xl overflow-hidden mb-4 bg-gray-100">
        <Image
          src={guide.image || "/Images/placeholder.jpg"}
          alt={guide.title}
          fill
          className="object-cover object-center group-hover:scale-[1.05] transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-[#4B5FC0] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
      </div>
      <div className="mb-2">
        {guide.categories.map((cat, idx) => (
          <CategoryBadge key={idx} category={cat} />
        ))}
      </div>
      <h3 className="text-sm md:text-[20px] reg-font text-gray-800 leading-snug group-hover:text-[#4DB581] transition-colors duration-200">
        {guide.title}
      </h3>
      <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-sm text-[#4B5FC0] font-medium">Read more</span>
        <IoIosArrowForward className="text-[#4B5FC0]" />
      </div>
    </Link>
  </motion.article>
);

export default function GuidesSection({
  seoSettings,
  siteSettings,
  blogs,
  categories,
}) {
  const [active, setActive] = useState("All");
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);

  const categoryTabs = ["All", ...categories.map((cat) => cat.title)];

  const guides = blogs.map((blog) => ({
    id: blog._id,
    title: blog.title,
    image: blog.image,
    categories: blog.categories?.map((c) => c.title) || [],
    slug: blog.slug?.current,
  }));

  const filtered =
    active === "All"
      ? guides
      : guides.filter((g) => g.categories.includes(active));

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const newCardsCount = Math.min(
    LOAD_MORE_COUNT,
    filtered.length - visibleCount,
  );

  const handleCategoryChange = (cat) => {
    if (cat === active) return;
    setActive(cat);
    setVisibleCount(INITIAL_SHOW);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
      setLoadingMore(false);
    }, 800);
  };

  const autoSchemas = generateSchema({
    globalSeo: seoSettings,
    canonical: `${meta_url}/guide/`,
  });

  return (
    <>
      <MetaLayout
        globalSeo={seoSettings}
        canonical={`${meta_url}/guide/`}
        autoSchemas={autoSchemas}
      />{" "}
      <Header data={siteSettings} />
      <section
        className="w-full py-14 md:py-16 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(180deg, #eef4ff 0%, #f8faff 40%, #ffffff 100%)",
        }}
      >
        {" "}
        <div className="container">
          {/* Heading */}{" "}
          <div className="text-center mb-10">
            {" "}
            <h1 className="text-3xl sm:text-4xl md:text-5xl med-font text-gray-900 mb-3 leading-tight">
              Guides{" "}
            </h1>{" "}
          </div>
          {/* Filter tabs */}
          <div className="flex justify-center mb-12">
            <div
              className="flex items-center p-1 gap-0.5 rounded-2xl"
              style={{
                background: "rgba(75, 95, 192, 0.07)",
                border: "1px solid rgba(75, 95, 192, 0.12)",
              }}
            >
              {categoryTabs.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="relative px-4 sm:px-5 py-2 rounded-xl text-sm transition-all duration-200 cursor-pointer"
                >
                  {active === cat && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, #4B5FC0 0%, #6B7FD4 100%)",
                        boxShadow: "0 4px 16px rgba(75,95,192,0.35)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 font-medium ${
                      active === cat
                        ? "text-white"
                        : "text-gray-500 hover:text-gray-700 footer-font-size"
                    }`}
                  >
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </div>
          {/* Cards count */}
          <div className="flex items-center justify-end mb-6">
            <div className="h-px flex-1 bg-gray-100 mr-4" />
            <p className="text-xs text-gray-400 reg-font">
              Showing{" "}
              <span className="text-gray-700 font-semibold">
                {Math.min(visibleCount, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="text-gray-700 font-semibold">
                {filtered.length}
              </span>{" "}
              Results
            </p>
          </div>
          {/* Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-9"
          >
            <AnimatePresence mode="popLayout">
              {/* Visible cards */}
              {visible.map((guide, i) => (
                <GuideCard key={guide.id} guide={guide} i={i} />
              ))}

              {/* Skeletons only for load more */}
              {loadingMore &&
                Array.from({ length: newCardsCount }).map((_, i) => (
                  <SkeletonCard key={`sk-more-${i}`} i={i} />
                ))}
            </AnimatePresence>
          </motion.div>
          {/* Load More button */}
          {!loadingMore && hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={handleLoadMore}
                className="group flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-medium text-white transition-all duration-200 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, #4B5FC0 0%, #6B7FD4 100%)",
                  boxShadow: "0 4px 16px rgba(75,95,192,0.3)",
                }}
              >
                <span>Load More</span>
                <IoIosArrowForward className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>
          )}
          {/* All loaded message */}
          {!hasMore && filtered.length > INITIAL_SHOW && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-gray-400 mt-12 reg-font"
            >
              You've seen all {filtered.length} Results.
            </motion.p>
          )}
        </div>
      </section>
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
      <Footer />
    </>
  );
}
