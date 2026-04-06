import Image from "next/image";

export function TrustSection({ data }) {
  return (
    <section className="py-20 bg-white border-b-2 border-gray-200">
      <div className="container">
        <div className="text-center mb-12">
          <h2
            dangerouslySetInnerHTML={{
              __html: data.headingHtml,
            }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data?.subheading}
          </p>
        </div>

        {/* Trust Badges - Modern Horizontal Layout */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {data?.badges?.map((badge, i) => (
            <div key={i}>
              <img
                src={badge.imageUrl}
                alt={badge.alt}
                className="w-[100px] h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
