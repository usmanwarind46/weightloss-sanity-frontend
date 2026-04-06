import { Users, Award, Stethoscope, TrendingUp } from "lucide-react";

export function StatsSection() {
  return (
    <section className="py-24 relative">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-2">
            {" "}
            <span
              style={{
                background: "linear-gradient(135deg, #76c8a1, #4b6bc1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ready to begin a healthier, happier you?
            </span>{" "}
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Take the first step on your weight loss journey.
          </h2>
          <p className="text-gray-600 mx-auto para-font">
            Our medically supervised treatments help patients lose weight safely
            and effectively using MHRA-approved medications and licensed UK
            clinicians.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div
            className="rounded-3xl p-8 text-center hover:shadow-lg transition"
            style={{
              background: "linear-gradient(135deg, #3dbfa015, #4a7fc115)",
            }}
          >
            <div className="inline-flex bg-white p-4 rounded-2xl shadow-sm mb-4">
              <Users style={{ color: "#3dbfa0" }} size={28} />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              UK Licensed Clinical Team
            </h4>
            <p className="text-gray-500 text-sm">
              Our treatments are prescribed and monitored by qualified UK
              clinicians.
            </p>
          </div>

          <div
            className="rounded-3xl p-8 text-center hover:shadow-lg transition"
            style={{
              background: "linear-gradient(135deg, #3dbfa015, #4a7fc115)",
            }}
          >
            <div className="inline-flex bg-white p-4 rounded-2xl shadow-sm mb-4">
              <Award style={{ color: "#4a7fc1" }} size={28} />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              MHRA Approved Medications
            </h4>
            <p className="text-gray-500 text-sm">
              We only use medicines approved by the UK Medicines & Healthcare
              products Regulatory Agency.
            </p>
          </div>

          <div
            className="rounded-3xl p-8 text-center hover:shadow-lg transition"
            style={{
              background: "linear-gradient(135deg, #3dbfa015, #4a7fc115)",
            }}
          >
            <div className="inline-flex bg-white p-4 rounded-2xl shadow-sm mb-4">
              <Stethoscope style={{ color: "#3dbfa0" }} size={28} />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Free Online Consultation
            </h4>
            <p className="text-gray-500 text-sm">
              Speak with a clinician online to determine the best treatment for
              your weight loss journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
