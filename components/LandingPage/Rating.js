"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex T",
      text: `The consultation process was thorough and professional. The prescriber took time to review my medical history carefully and explained the assessment process clearly. Delivery was prompt and discreet.`,
    },
    {
      name: "Sarah M",
      text: `Appreciated the transparent pricing structure with no hidden fees. The monthly flexibility made it easier to manage financially compared to services requiring long-term commitments.`,
    },
    {
      name: "James R",
      text: `Clinical team was responsive when I had questions about my treatment. The prescriber made adjustments based on my progress and ensured I understood how to manage any side effects.`,
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  // dots update
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  // auto scroll
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="review-section">
      <div className="container text-center !my-10">
        <h2 className="lp-testimonial-title title">
          Trusted by patients <span>across the UK</span>
        </h2>

        {/* ✅ Desktop Grid */}
        <div className="lp-testimonial-grid rating-desktop">
          {testimonials.map((item, i) => (
            <div key={i} className="lp-testimonial-card">
              <h4 className="lp-testimonial-name semibold-font">{item.name}</h4>
              <p className="lp-testimonial-text">{item.text}</p>

              <div className="lp-testimonial-footer">
                <img
                  src="/Lp-images/trust.png"
                  className="lp-testimonial-logo"
                />
                <img
                  src="/Lp-images/stars.png"
                  className="lp-testimonial-stars"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Mobile Slider */}
        <div className="rating-mobile">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((item, i) => (
                <div key={i} className="flex-[0_0_100%] px-2">
                  <div className="lp-testimonial-card">
                    <h4 className="lp-testimonial-name semibold-font">
                      {item.name}
                    </h4>
                    <p className="lp-testimonial-text">{item.text}</p>

                    <div className="lp-testimonial-footer">
                      <img
                        src="/Lp-images/trust.png"
                        className="lp-testimonial-logo"
                      />
                      <img
                        src="/Lp-images/stars.png"
                        className="lp-testimonial-stars"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  selectedIndex === i ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
