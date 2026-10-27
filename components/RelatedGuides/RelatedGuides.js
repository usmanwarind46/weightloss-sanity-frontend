import Image from "next/image";
import Link from "next/link";
import { FaTags } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

// Latest blogs from the product's category, styled like the /guide cards
export default function RelatedGuides({ posts = [] }) {
  if (!posts?.length) return null;

  return (
    <section className="bg-white container mx-auto px-4 sm:px-6 py-6 sm:py-12">
      <h4 className="text-2xl sm:text-4xl med-font text-gray-900 text-center mb-10">
        Related Weight Loss Guides
      </h4>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post._id} className="flex flex-col group">
            <Link href={`/guide/${post.slug}`}>
              <div className="relative w-full h-[195px] sm:h-[220px] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                <Image
                  src={post.image || "/Images/placeholder.jpg"}
                  alt={post.imageAlt || post.title}
                  fill
                  className="object-cover object-center group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-[#4B5FC0] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
              </div>

              <div className="mb-2 flex flex-wrap gap-1">
                {post.categories?.map((cat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium bg-green-50 text-black"
                  >
                    <FaTags className="text-[#4DB581] text-sm" />
                    {cat?.title}
                  </span>
                ))}
              </div>

              <h3 className="text-base md:text-[20px] reg-font text-gray-800 leading-snug group-hover:text-[#4DB581] transition-colors duration-200">
                {post.title}
              </h3>

              <div className="mt-2 flex items-center gap-1 text-[#4B5FC0]">
                <span className="text-sm font-medium">Read more</span>
                <IoIosArrowForward />
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/guide"
          className="inline-block border-2 border-[#4565BF] px-8 py-3 rounded-md text-[#4565BF] semibold-font text-md hover:bg-[#4565BF] hover:text-white transition-all duration-200"
        >
          View All Guides
        </Link>
      </div>
    </section>
  );
}
