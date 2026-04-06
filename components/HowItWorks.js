import Link from "next/link";
import { FadeUp, StaggerContainer, StaggerItem } from "./MotionWrapper";
import NextButton from "./ui/NextButton";

export function HowItWorks({ data }) {
  const { steps = [], footerText, buttonLabel, buttonLink } = data || {};

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto">
        {/* Heading */}
        <FadeUp>
          <div className="text-center mb-16">
            <h2
              dangerouslySetInnerHTML={{
                __html: data?.headingHtml,
              }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            />
          </div>
        </FadeUp>

        {/* Cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <StaggerItem key={index} hover className="h-full rounded-3xl">
              <div
                className={`${step.bgColor} rounded-3xl flex flex-col overflow-hidden h-full`}
              >
                <div className="p-8">
                  <div className="w-10 h-10 rounded-full border-2 border-gray-600 flex items-center justify-center mb-4">
                    <span className="text-gray-900 font-semibold">
                      {step.number}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-6 min-h-[48px] text-2xl roboto-reg">
                    {step.description}
                  </p>
                </div>

                <div className="flex-1 flex items-end justify-center">
                  <img
                    src={step?.imageUrl}
                    alt={`Step ${step.number}`}
                    className={`w-full h-auto object-contain how-it-work-${index + 1}`}
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Footer */}
        <FadeUp delay={0.2}>
          <div className="text-center">
            <p className="text-gray-600 mb-6 text-xl">{footerText}</p>

            <div className="py-4 max-w-max m-auto">
              <Link href={buttonLink || "/"}>
                <NextButton label={buttonLabel} />
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
