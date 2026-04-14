import Link from "next/link";
import NextButton from "./ui/NextButton";

export function CTASection({ data }) {
  return (
    <section className="relative overflow-hidden cta-bg">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/10" />

      <div className="relative z-10 container mx-auto py-16 sm:py-24 md:py-36 cta-wrap">
        <div className="max-w-lg md:max-w-xl">
          {/* Heading */}
          <h2
            dangerouslySetInnerHTML={{
              __html: data?.headingHtml,
            }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          />

          {/* Description */}
          <p className="text-white/80 text-sm sm:text-base reg-font mb-4 sm:mb-8 leading-relaxed para-font">
            {data?.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 cta-btn">
            {data?.primaryButton?.link && (
              <Link href={data.primaryButton.link || "/start-consultation/"}>
                <NextButton label={data.primaryButton.label} />
              </Link>
            )}

            {data?.secondaryButton?.link && (
              <Link
                href={data.secondaryButton.link || "/about-clinic/"}
                className="inline-flex items-center gap-2 border-2 border-white/70 hover:border-white text-white hover:bg-white/10 px-6 py-3 rounded-md text-sm md:text-base font-medium transition-all duration-200 group"
              >
                {data.secondaryButton.label}
              </Link>
            )}
          </div>

          {/* Note */}
          {data?.note && (
            <p className="text-xs text-white/50 mt-5 reg-font">{data.note}</p>
          )}
        </div>
      </div>
    </section>
  );
}
