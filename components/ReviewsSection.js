"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import { FadeUp } from "./MotionWrapper";

export function ReviewsSection({ data }) {
  const reviews = data?.reviews || [];

  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="container">
        {/* Header */}
        <FadeUp delay={0.3}>
          <div className="text-center ">
            <h2
              dangerouslySetInnerHTML={{ __html: data?.headingHtml }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            />
            <p className="text-xl text-gray-600 mx-auto">{data?.subheading}</p>
          </div>

          {/* Rating badge */}
          <div className="text-center mt-5 mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-teal-50 text-teal-700 rounded-full">
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{data?.ratingText}</span>
            </div>
          </div>
        </FadeUp>

        {/* Slider wrapper — arrows sit outside, py-3 lets shadows breathe */}
        <div className="relative">
          {/* Prev button — small, outside the card area */}
          <button
            id="rev-prev"
            aria-label="Previous"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10
                       w-8 h-8 rounded-full bg-white border border-gray-200
                       shadow-md flex items-center justify-center
                       text-gray-500 hover:text-teal-600 hover:border-teal-300
                       transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Next button */}
          <button
            id="rev-next"
            aria-label="Next"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10
                       w-8 h-8 rounded-full bg-white border border-gray-200
                       shadow-md flex items-center justify-center
                       text-gray-500 hover:text-teal-600 hover:border-teal-300
                       transition-colors cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>

          {/* px-1 + py-3 gives room for card shadows to not get clipped */}
          <div className="px-1 py-3">
            <Swiper
              modules={[Navigation, A11y]}
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
              style={{ alignItems: "stretch" }}
              navigation={{
                prevEl: "#rev-prev",
                nextEl: "#rev-next",
              }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 16 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index} style={{ height: "auto" }}>
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow h-full">
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-3 mb-4">
                      {/* <img
                        src={review.imageUrl}
                        alt={review.name}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      /> */}
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {review.name}
                        </h4>
                        {/* <p className="text-xs text-teal-600 font-medium">
                          {review.role}
                        </p> */}
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      "{review.review}"
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
