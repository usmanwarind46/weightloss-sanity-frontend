import Link from "next/link";
import { FadeUp } from "./MotionWrapper";
import NextButton from "./ui/NextButton";
import Image from "next/image";

export function Hero({ data }) {
  return (
    <section className="relative min-h-[700px] overflow-hidden pt-16">
      {/* 🔥 BACKGROUND IMAGES */}
      <div className="absolute inset-0 z-0">
        {/* Desktop */}
        {data.desktopImage?.asset?.url && (
          <Image
            src={data.desktopImage.asset.url}
            alt="banner"
            fill
            priority
            className="object-cover hidden sm:block"
          />
        )}

        {/* Mobile */}
        {data.mobileImage?.asset?.url && (
          <Image
            src={data.mobileImage.asset.url}
            alt="banner"
            fill
            priority
            className="object-cover block sm:hidden"
          />
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/60 via-teal-900/70 to-transparent"></div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* 🔥 CONTENT */}
      <FadeUp>
        <div className="relative z-10 container mx-auto py-20">
          <div>
            {/* HTML Heading */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl semibold-font text-white mb-6 leading-tight"
              dangerouslySetInnerHTML={{
                __html: data.headingHtml || "",
              }}
            />

            {/* Subheading */}
            <p
              className="text-xl text-white/90 mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: data.subheadingHtml || "",
              }}
            />

            {/* Button */}
            <div className="py-4 max-w-max">
              <Link href={data.buttonLink || "/"}>
                <NextButton label={data.buttonText || "Click"} />
              </Link>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
