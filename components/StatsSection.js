import { Users, Award, Stethoscope, TrendingUp } from "lucide-react";

export function StatsSection({ data }) {
  console.log(data, "dataaaaa");

  const iconMap = {
    Users,
    Award,
    Stethoscope,
    TrendingUp,
  };

  return (
    <section className="py-24 relative">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-2">
            <span
              dangerouslySetInnerHTML={{
                __html: data?.headingHtml || "",
              }}
            />
          </h2>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data?.heading2}
          </h2>

          <p className="text-gray-600 mx-auto para-font">{data?.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {data?.statsCards?.map((card, i) => {
            const IconComponent = iconMap[card?.icon];

            return (
              <div
                key={i}
                className="rounded-3xl p-8 text-center hover:shadow-lg transition"
                style={{
                  background: "linear-gradient(135deg, #3dbfa015, #4a7fc115)",
                }}
              >
                <div className="inline-flex bg-white p-4 rounded-2xl shadow-sm mb-4">
                  {IconComponent && (
                    <IconComponent
                      style={{ color: card.iconColor }}
                      size={28}
                      aria-label={card.iconAlt || card.title}
                      role="img"
                    />
                  )}
                </div>

                <h4 className="font-semibold text-gray-900 mb-2">
                  {card.title}
                </h4>

                <p className="text-gray-500 text-sm">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
