import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { sanityClient } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import {
  SINGLE_BLOG_QUERY,
  SEO_QUERY,
  SITE_SETTINGS_QUERY,
} from "../../lib/sanityQueries";
import { generateSchema } from "../../lib/schemaGenerator";
import { meta_url } from "../../config/constants";
import MetaLayout from "../../Meta/MetaLayout";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Paths
export async function getStaticPaths() {
  const slugs =
    await sanityClient.fetch(`*[_type == "post" && defined(slug.current)][].slug.current
  `);

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: "blocking",
  };
}

// ✅ Props
export async function getStaticProps({ params }) {
  const data = await sanityClient.fetch(SINGLE_BLOG_QUERY, {
    slug: params.slug,
  });

  const seoSettings = await sanityClient.fetch(SEO_QUERY);
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  return {
    props: {
      data,
      seoSettings,
      siteSettings,
    },
    revalidate: 1,
  };
}

function RelatedPostsSlider({ posts }) {
  const autoScrollPlugin = useRef(
    AutoScroll({
      speed: 1.2,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [autoScrollPlugin.current],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      autoScrollPlugin.current.stop();
      emblaApi.scrollPrev();
      setTimeout(() => autoScrollPlugin.current.play(), 1500);
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      autoScrollPlugin.current.stop();
      emblaApi.scrollNext();
      setTimeout(() => autoScrollPlugin.current.play(), 1500);
    }
  }, [emblaApi]);

  const categoryLabel = posts[0]?.categories?.[0]?.title || "Related";

  return (
    <section className="mt-16 border-t border-gray-100 pt-12 pb-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#4DB581] font-semibold mb-1">
              {categoryLabel}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Related Articles
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/guide/${post.slug?.current || post.slug}`}
                className="group flex-[0_0_100%] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)] block"
              >
                <div className="relative w-full h-[200px] sm:h-[220px] rounded-2xl overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={post.image || "/Images/placeholder.jpg"}
                    alt={post.imageAlt || post.title || "Related article"}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {post.categories?.[0]?.title && (
                  <span className="inline-block text-xs uppercase tracking-wide text-[#4DB581] font-semibold mb-2">
                    {post.categories[0].title}
                  </span>
                )}

                <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-[#4DB581] transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BlogPage({ data, seoSettings, siteSettings }) {
  console.log(data, "blog data");

  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/guide/${data?.slug?.current}`,
  });

  console.log(data?.content, "data?.content");

  const relatedPosts = data?.relatedPosts || [];

  // console.log(data._type, "Data type");

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/guide/${data?.slug?.current}`}
        autoSchemas={autoSchemas}
      />
      <Header data={siteSettings} />
      <div className="bg-white mb-15">
        {/* ── HERO ── */}
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <img
            src={data?.image}
            alt={data.imageAlt || data.title}
            className="w-full h-full object-cover"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-16 w-full">
            <div className="container m-auto">
              <div className="max-w-5xl">
                {/* CATEGORY + DATE */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-widest uppercase text-white/70 editorial-body">
                    Guide
                  </span>
                  <span className="text-white/40">·</span>

                  <span className="text-xs text-white/70 editorial-body">
                    {data?.categories?.[0]?.title}
                  </span>

                  <span className="text-white/40">·</span>

                  <span className="text-xs text-white/70 editorial-body">
                    {new Date(data?.publishedAt).toDateString()}
                  </span>
                </div>

                {/* TITLE */}
                <h1 className="editorial-title text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  {data?.title}
                </h1>

                {/* 🔥 AUTHOR + EXPERT */}
                <div className="text-white text-sm flex flex-wrap gap-2 items-center mt-10">
                  {/* <span>Written by</span>

                  {data?.author?.hasProfilePage ? (
                    <Link
                      href={`/author/${data.author.slug.current}`}
                      className="underline"
                    >
                      {data.author.name}
                    </Link>
                  ) : (
                    <span>{data?.author?.name}</span>
                  )}

                  <span>|</span> */}

                  <span>Reviewed by</span>

                  {data?.expert?.hasProfilePage ? (
                    <Link
                      href={`/expert/${data.expert.slug.current}`}
                      className="underline"
                    >
                      {data.expert.name}
                    </Link>
                  ) : (
                    <span>{data?.expert?.name}</span>
                  )}
                </div>
                <div className="text-white text-sm flex flex-wrap gap-2 items-center mt-2">
                  <span className="">
                    Last updated {new Date(data?.publishedAt).toDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BREADCRUMB ── */}
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400 editorial-body">
            <Link href="/" className="hover:text-teal-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/guide" className="hover:text-teal-600">
              Guide
            </Link>
            <span>/</span>
            <span className="text-gray-600">{data?.title}</span>
          </div>
        </div>

        {/* ── CONTENT (STATIC FOR NOW) ── */}
        <article className="container mx-auto px-3 sm:px-6 py-14 editorial-body blogs-content">
          <p className="text-md text-gray-600">
            {/* 🔥 NEXT STEP: WILL BE DYNAMIC */}
            <PortableText
              value={data?.content}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="text-md text-gray-600 leading-relaxed mb-5 break-words">
                      {children}
                    </p>
                  ),

                  h2: ({ children }) => (
                    <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="editorial-title text-xl font-bold text-gray-900 mb-5">
                      {children}
                    </h3>
                  ),
                },

                list: {
                  bullet: ({ children }) => (
                    <ul className="space-y-4 mb-8">{children}</ul>
                  ),
                },

                listItem: {
                  bullet: ({ children }) => (
                    <li className="blogs-dot items-start gap-3 text-gray-600 text-md marker:text-teal-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></span>
                      {children}
                    </li>
                  ),
                },

                marks: {
                  link: ({ children, value }) => (
                    <a
                      href={value?.href}
                      className="text-teal-600 hover:underline"
                      target="_blank"
                    >
                      {children}
                    </a>
                  ),
                },

                types: {
                  image: ({ value }) => (
                    <img
                      src={value?.asset?.url}
                      alt={value?.alt || ""}
                      className="w-full rounded-2xl mb-6"
                    />
                  ),

                  // 🔥 YOUR FIRST CUSTOM SECTION
                  cardsGrid: ({ value }) => (
                    <div className="my-12">
                      {/* Heading */}
                      {value.heading && (
                        <h2 className="section-heading text-2xl font-bold text-gray-900 mb-4">
                          {value.heading}
                        </h2>
                      )}

                      {/* Sub text */}
                      {value.subText && (
                        <p className="text-gray-600 mb-8">{value.subText}</p>
                      )}

                      {/* Cards */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {value.cards?.map((card, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                          >
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {card.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {card.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                  productComparison: ({ value }) => (
                    <div className="my-12">
                      {/* Heading */}
                      {value.heading && (
                        <h2 className="section-heading text-2xl font-bold text-gray-900 mb-8">
                          {value.heading}
                        </h2>
                      )}

                      {/* Cards */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {value.products?.map((product, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 border border-teal-600 rounded-2xl p-6 md:p-8 "
                          >
                            {/* Tag */}
                            {product.tagLine && (
                              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1 editorial-body">
                                {product.tagLine}
                              </p>
                            )}

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                              {product.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mb-5">
                              {product.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 mb-6">
                              {product.features?.map((item, j) => (
                                <li
                                  key={j}
                                  className="flex items-start gap-3 text-gray-600"
                                >
                                  <span className="text-teal-500">✔</span>
                                  {item}
                                </li>
                              ))}
                            </ul>

                            {/* Button */}
                            {product.buttonText && (
                              <a
                                href={product.buttonLink || "#"}
                                className="inline-block text-sm font-semibold text-white px-6 py-3 rounded-lg editorial-body"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #3dbfa0, #4b6bc1)",
                                }}
                              >
                                {product.buttonText}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                  blogAddQuote: ({ value }) => (
                    <div className="my-12">
                      <div className="border-t border-gray-200 pt-8">
                        <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed max-w-3xl">
                          “{value.text}”
                        </p>
                      </div>
                    </div>
                  ),
                  blogReferences: ({ value }) => (
                    <div className="bg-gray-50 rounded-2xl p-6 my-6">
                      {/* Heading */}
                      {value.heading && (
                        <h2 className="section-heading text-2xl font-bold text-gray-900 mb-6">
                          {value.heading}
                        </h2>
                      )}

                      {/* Links */}
                      <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
                        {value.links?.map((item, i) => (
                          <li key={i}>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-600 hover:underline break-all"
                            >
                              {item.url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                  blogRoutineCards: ({ value }) => (
                    <div className="my-12">
                      {/* Heading */}
                      {value.heading && (
                        <h2 className="section-heading text-2xl font-bold text-gray-900 mb-8">
                          {value.heading}
                        </h2>
                      )}

                      {/* Cards */}
                      <div className="grid md:grid-cols-3 gap-6">
                        {value.items?.map((item, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 border border-gray-100 rounded-2xl p-6"
                          >
                            {/* Title */}
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                  blogSingleProductCard: ({ value }) => (
                    <div className="my-12 bg-gray-50 border border-teal-600 rounded-2xl p-6 md:p-8">
                      <div className="grid lg:grid-cols-2 gap-10 items-center">
                        {/* LEFT CONTENT */}
                        <div className="order-2 lg:order-1">
                          {/* Tag */}
                          {value.tagLine && (
                            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1 editorial-body">
                              {value.tagLine}
                            </p>
                          )}

                          {/* Title */}
                          {value.title && (
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                              {value.title}
                            </h2>
                          )}

                          {/* Description */}
                          {value.description && (
                            <p className="text-gray-600 mb-5 max-w-2xl">
                              {value.description}
                            </p>
                          )}

                          {/* Features */}
                          {value.features && (
                            <ul className="space-y-3 mb-6">
                              {value.features.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-gray-600"
                                >
                                  <span className="text-teal-500">✔</span>

                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Button */}
                          {value.buttonText && (
                            <a
                              href={value.buttonLink || "#"}
                              className="inline-block text-sm font-semibold text-white px-6 py-3 rounded-lg editorial-body"
                              style={{
                                background:
                                  "linear-gradient(135deg, #3dbfa0, #4b6bc1)",
                              }}
                            >
                              {value.buttonText}
                            </a>
                          )}
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                          {value?.imageUrl && (
                            <Image
                              src={value.imageUrl}
                              width={200}
                              height={200}
                              alt={
                                value.imageAlt || value.title || "Product image"
                              }
                              className="w-full max-w-[420px] object-contain"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                  blogKeyTakeaways: ({ value }) => (
                    <div className="my-12 bg-gray-50 border border-[#dbe7f3] rounded-2xl p-6 md:p-8">
                      <div className="emphasize-box-inr">
                        {/* Heading */}
                        {value.heading && (
                          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-6">
                            {value.heading}
                          </h2>
                        )}

                        {/* Bullet Points */}
                        {value.items && (
                          <ul className="space-y-4">
                            {value.items.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-gray-700"
                              >
                                <span className="text-[#4565bf] mt-1">✔</span>

                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ),
                  blogTable: ({ value }) => (
                    <div className="my-10 overflow-x-auto rounded-2xl border border-gray-200">
                      <table className="w-full min-w-[700px] border-separate border-spacing-0">
                        <thead>
                          <tr className="bg-blue-50">
                            {value?.headers?.map((header, i) => (
                              <th
                                key={i}
                                className="border-r border-b border-gray-200 px-5 py-4 text-left font-semibold text-gray-900 last:border-r-0"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {value?.rows?.map((row, i) => {
                            const isLast = i === value.rows.length - 1;

                            return (
                              <tr
                                key={i}
                                className={
                                  i % 2 === 1 ? "bg-gray-50" : "bg-white"
                                }
                              >
                                <td
                                  className={`border-r border-gray-200 px-5 py-4 text-gray-700 align-top ${
                                    !isLast ? "border-b" : ""
                                  }`}
                                >
                                  {row.column1}
                                </td>

                                <td
                                  className={`border-r border-gray-200 px-5 py-4 text-gray-700 align-top ${
                                    !isLast ? "border-b" : ""
                                  }`}
                                >
                                  {row.column2}
                                </td>

                                <td
                                  className={`px-5 py-4 text-gray-700 align-top ${
                                    !isLast ? "border-b border-gray-200" : ""
                                  }`}
                                >
                                  {row.column3}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ),
                },
              }}
            />
          </p>
        </article>

        {relatedPosts.length > 0 && (
          <RelatedPostsSlider
            posts={relatedPosts}
            categoryLabel={data?.categories?.[0]?.title || "Related"}
          />
        )}
      </div>
      <Footer data={siteSettings} />
    </>
  );
}
