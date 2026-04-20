"use client";

import Image from "next/image";

export function MedicationSection({ data }) {
  const { subheading, cards = [] } = data || {};
  console.log(data, "Medical Data");

  return (
    <section id="treatments" className="bg-[#F9F9F9] pt-14 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* LEFT */}
          <div className="col-span-7 my-auto">
            <div className="mb-8">
              <h2
                dangerouslySetInnerHTML={{
                  __html: data?.headingHtml,
                }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              />

              <p className="sm:text-[18px] text-[#585858] reg-font max-w-2xl">
                {subheading}
              </p>
            </div>

            {/* Mobile Image */}
            <div className="flex lg:hidden items-end justify-center mt-6">
              <Image
                src={data?.mainImage?.asset?.url}
                alt={data?.mainImageAlt || "Image"}
                width={400}
                height={440}
                className="w-3/4 h-auto object-contain"
              />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cards.map((card, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: card.bgColor }}
                  className={`rounded-2xl p-6 ${
                    card.fullWidth ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="w-13 h-13 rounded-full bg-white flex items-center justify-center mb-4 border border-black">
                    <Image
                      src={card.iconUrl}
                      width={32}
                      height={32}
                      alt={card.iconAlt || card.title || "Feature icon"}
                    />
                  </div>

                  <h3 className="text-sm sm:text-[20px] med-font text-gray-900 mb-2">
                    {card.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-[#585858] reg-font leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-span-5">
            <div className="hidden lg:flex items-end justify-end">
              <Image
                src={data?.mainImage?.asset?.url}
                alt={data?.mainImageAlt || "Image"}
                width={580}
                height={640}
                className="w-full h-auto object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
