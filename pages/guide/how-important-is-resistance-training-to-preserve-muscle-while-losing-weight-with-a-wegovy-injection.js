import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="bg-white">
        {/* ── HERO ── */}
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <img
            src="/Images/blog-2-1.webp"
            alt="Resistance training and Wegovy"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-16 w-full">
            <div className="w-[80%] m-auto">
              <div className="max-w-5xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-widest uppercase text-white/70 editorial-body">
                    Guide
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-xs text-white/70 editorial-body">
                    Wegovy
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-xs text-white/70 editorial-body">
                    January 26, 2026
                  </span>
                </div>
                <h1 className="editorial-title text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  How Important Is Resistance Training to Preserve Muscle While
                  Losing Weight With a Wegovy injection?
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* ── BREADCRUMB ── */}
        <div className="border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400 editorial-body">
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/guide"
              className="hover:text-teal-600 transition-colors"
            >
              Guide
            </Link>
            <span>/</span>
            <span className="text-gray-600">
              How Important Is Resistance Training to Preserve Muscle While
              Losing Weight With a Wegovy injection?
            </span>
          </div>
        </div>

        {/* ── ARTICLE ── */}
        <article className="max-w-5xl mx-auto px-6 py-14 editorial-body">
          {/* Intro */}
          <p className="text-md text-gray-600 leading-relaxed mb-5 pb-5 border-b border-gray-100">
            Losing weight often feels like a balancing act, reducing excess fat
            while maintaining strength and muscle for daily function. With
            treatments like Wegovy injection, appetite suppression can help curb
            food intake, but without proper nutrition, some of that weight loss
            can come from lean muscle instead of fat.
          </p>
          <p className="text-md text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            Resistance training is essential to counteract this effect and
            preserve muscle mass, which is crucial for avoiding metabolic
            slowdown and weight regain. This guide will explore why strength
            training is key to a healthy weight loss journey on Wegovy.
          </p>

          {/* Key Takeaways */}
          <div className="key-takeaway rounded-2xl p-8 mb-12">
            <h3 className="editorial-title text-xl font-bold text-gray-900 mb-5">
              Essential Insights for Combining Wegovy and Resistance Training
            </h3>
            <ul className="space-y-3">
              {[
                "Combining a semaglutide injection for weight loss with resistance training helps preserve muscle mass and supports metabolic health.",
                "Appetite suppression from the weekly weight-loss shot can lower protein intake. Strength training, plus good nutrition, counters that risk.",
                "Clinical evidence on GLP-1 medications and muscle mass remains limited, but experts emphasise that lifestyle measures are key.",
                "Most benefit comes when resistance training is regular, progressive and accompanied by enough protein, hydration, and rest.",
                "If you notice rapid strength loss, persistent fatigue or dizziness while on treatment, seek medical advice.",
                "UK patients can access Wegovy injection safely through licensed pharmacies offering services.",
              ].map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-md text-gray-700"
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white text-xs"
                    style={{
                      background: "linear-gradient(135deg, #3dbfa0, #4b6bc1)",
                    }}
                  >
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 1 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Understanding How a Wegovy Injection Works in the Body
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            A{" "}
            <a
              href="/weight-loss-treatments/wegovy/"
              className="text-teal-600 hover:underline"
            >
              Wegovy injection
            </a>{" "}
            is a prescription-only weight-loss treatment that contains
            semaglutide, a GLP-1 receptor agonist used under medical
            supervision. It is designed to support adults living with obesity or
            excess weight by helping regulate appetite and improve satiety.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Healthcare professionals prescribe it as part of a wider, structured
            weight-management plan that includes diet, activity and ongoing
            monitoring.{" "}
            <a
              href="https://www.nhs.uk/conditions/obesity/treatment/"
              className="text-teal-600 hover:underline"
            >
              NHS
            </a>{" "}
            guidance supports using semaglutide alongside lifestyle changes.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            <strong>Note:</strong> Wegovy (semaglutide) should only be used
            under the supervision of a licensed healthcare provider.
          </p>

          {/* Product Card */}
          <div className="border border-gray-200 rounded-2xl p-6 mb-12 bg-gray-50">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1 editorial-body">
              GLP-1
            </p>
            <h4 className="editorial-title text-2xl font-bold text-gray-900 mb-2">
              Wegovy
            </h4>
            <p className="text-md text-gray-500 mb-4">
              A weekly GLP-1 treatment proven to reduce hunger and support
              meaningful, long-term fat loss.
            </p>
            <ul className="space-y-2 mb-5">
              {[
                "~16.9% average body weight loss",
                "Boosts metabolic & cardiovascular health",
                "Proven, long-established safety profile",
                "Weekly injection, easy to use",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-md text-gray-700"
                >
                  <span className="text-teal-500">✔</span> {item}
                </li>
              ))}
            </ul>
            <a
              href="/start-consultation/?product_id=1"
              className="inline-block text-sm font-semibold text-white px-6 py-3 rounded-lg editorial-body"
              style={{
                background: "linear-gradient(135deg, #3dbfa0, #4b6bc1)",
              }}
            >
              Start Your Free Consultation
            </a>
          </div>

          {/* Section 1b — How the Medication Helps */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            How the Medication Helps With Appetite and Weight Loss
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Semaglutide works by mimicking a natural hormone produced in the gut
            after eating. This hormone signals the brain that you are full,
            slows down digestion, and reduces appetite. As noted by the{" "}
            <a
              href="https://www.mayoclinic.org/diseases-conditions/obesity/in-depth/weight-loss-drugs/art-20044832"
              className="text-teal-600 hover:underline"
            >
              Mayo Clinic
            </a>
            , GLP-1 agonists help regulate appetite and satiety. For many, these
            effects help maintain a calorie deficit for weight loss without
            feelings of deprivation.
          </p>

          {/* Section 1c — Why Preserving Muscle */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Why Preserving Muscle Is Especially Important During Treatment
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            While the Wegovy injection supports appetite control, the reduced
            desire to eat can also mean some people unintentionally consume less
            protein than their body needs. This is why resistance training is
            strongly recommended alongside the medication. Strength exercises
            stimulate muscle maintenance, support metabolic health and help
            ensure the weight you lose comes primarily from fat, not from
            valuable lean tissue.
          </p>

          {/* Section 2 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Why Muscle Loss Can Happen During Weight Loss
          </h2>
          <p className="text-gray-600 text-md leading-relaxed mb-5">
            Research notes that significant weight loss from GLP-1 treatment may
            include reductions in both fat mass and lean mass. Several factors
            can contribute to muscle loss when losing weight, especially under
            the influence of a Wegovy injection:
          </p>
          <ul className="space-y-4 mb-8">
            {[
              {
                bold: "Metabolic slowdown:",
                text: " Calorie restriction often reduces basal metabolic rate over time; lean muscle mass tends to drop when energy intake is low.",
              },
              {
                bold: "Reduced appetite → lower protein intake:",
                text: " With a reduced appetite, many people struggle to meet adequate protein needs, which are essential for muscle maintenance.",
              },
              {
                bold: "Lower training energy:",
                text: " Feeling less hungry or experiencing early fatigue may reduce motivation or energy for physical activity, including resistance training.",
              },
              {
                bold: "Age, activity level, and hormonal factors:",
                text: " Older adults naturally lose muscle mass with age ('sarcopenia'). Without regular strength challenges and adequate nutrition, weight loss may disproportionately affect muscle rather than fat.",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-600 text-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></span>
                <span>
                  <strong className="text-gray-800">{item.bold}</strong>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed mb-10">
            Without countermeasures, losing weight even under a clinically
            supported injection can result in undesirable loss of lean tissue.
          </p>

          {/* Image 2 */}
          <img
            src="/Images/blog-2-2.webp"
            alt="Resistance training for muscle preservation"
            className="w-full rounded-2xl mb-10"
          />

          {/* Section 3 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            The Role of Resistance Training in Preserving Muscle
          </h2>
          <p className="text-gray-600 text-md leading-relaxed mb-5">
            Resistance training, such as lifting weights, using resistance
            bands, or bodyweight strength work plays a central role in
            preserving muscle when losing weight. Here's how:
          </p>
          <ul className="space-y-4 mb-8">
            {[
              {
                bold: "Muscle protein synthesis:",
                text: " Strength training stimulates muscle fibres, signalling the body to synthesise protein and maintain or grow muscle tissue, counteracting the natural breakdown during calorie deficit.",
              },
              {
                bold: "Metabolism support:",
                text: " With more muscle mass, resting metabolic rate stays higher. This helps prevent metabolic slowdown that often accompanies weight loss.",
              },
              {
                bold: "Improved body composition:",
                text: " Instead of losing both fat and muscle, resistance training shifts the balance to more fat loss and muscle retention, supporting a leaner, stronger physique.",
              },
              {
                bold: "Counteracting GLP-1–related appetite changes:",
                text: " Since appetite is reduced with the weekly weight-loss shot, strength training reminds the body it still needs nutrients for muscle repair and helps maintain lean mass even with lower calorie intake.",
              },
              {
                bold: "Strength and functional health:",
                text: " Strong muscles support mobility, stability, bone health and better day-to-day functioning. It is essential, especially for older adults or those losing significant weight.",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-600 text-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></span>
                <span>
                  <strong className="text-gray-800">{item.bold}</strong>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Pull Quote */}
          <blockquote className="pull-quote rounded-xl px-8 py-6 my-10 text-xl text-gray-700 leading-relaxed">
            "In short, the muscles you maintain (or build) are what help ensure
            weight loss stays healthy, functional and long-term."
          </blockquote>

          {/* Section 4 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Who Is Most at Risk of Losing Muscle During Wegovy Treatment?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Muscle loss during a weight loss shot Wegovy course is more likely
            in certain groups. Older adults are naturally at higher risk because
            they generally have lower muscle mass and slower protein synthesis.
            People who begin treatment with low baseline muscle, particularly
            those who were not very active beforehand, may also notice quicker
            declines in strength.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Also, people eating too few calories or not getting enough protein
            can further increase this risk, especially when appetite suppression
            from the weekly weight-loss shot makes it harder to meet nutritional
            needs. Individuals who rely solely on medication and diet changes
            without incorporating resistance training are similarly vulnerable.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            Busy schedules, low activity levels or limited mobility can also
            make it challenging for some patients to add regular strength
            sessions. Understanding these risk factors of Wegovy for weight loss
            treatment helps tailor a safer, more effective plan to protect
            muscle while losing fat.
          </p>

          {/* Section 5 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            How Much Resistance Training Do Experts Recommend?
          </h2>

          {/* Image 3 */}
          <img
            src="/Images/blog-2-3.webp"
            alt="Expert resistance training recommendations"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            While there is no one-size-fits-all, UK-aligned clinical guidance
            suggests:
          </p>
          <ul className="space-y-4 mb-8">
            {[
              {
                bold: "Frequency:",
                text: " at least 2–3 resistance training sessions per week.",
              },
              {
                bold: "Intensity:",
                text: " moderate to challenging enough to feel muscle fatigue by the last couple of reps, but without compromising form or risking injury.",
              },
              {
                bold: "Duration:",
                text: " 20–45 minutes per session, focusing on major muscle groups (legs, back, chest, core).",
              },
              {
                bold: "Progressive overload:",
                text: " gradually increase weight, resistance, or repetitions over time to stimulate muscle adaptation.",
              },
              {
                bold: "Rest and recovery:",
                text: " allow 48 hours between sessions for muscle recovery; maintain proper sleep, hydration, and nutrition.",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-600 text-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                <span>
                  <strong className="text-gray-800">{item.bold}</strong>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Weekly routine grid */}
          <p className="text-gray-600 leading-relaxed mb-4 font-semibold">
            Example weekly routine (beginner-friendly):
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                title: "Monday",
                desc: "Bodyweight squat + push-ups + resistance-band rows (20–25 min)",
              },
              {
                title: "Wednesday",
                desc: "Resistance-band deadlifts + glute bridges + planks (20–30 min)",
              },
              {
                title: "Friday",
                desc: "Dumbbell or bodyweight lunges + shoulder press + core work (25–35 min)",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-gray-100 bg-gray-50"
              >
                <h4 className="editorial-title font-bold text-gray-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-md text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed mb-10">
            As fitness improves, resistance and volume can increase.
          </p>

          {/* Section 6 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            When to Seek Medical or Clinical Guidance
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            You should consult your GP, pharmacist, or clinician if you
            experience:
          </p>
          <div className="space-y-6 mb-10">
            {[
              {
                title: "Extreme Fatigue",
                text: "Ongoing tiredness may indicate your calorie or protein intake is too low, or that your dose needs reviewing. If you feel unusually weak despite eating well, a professional assessment is important. Weight Loss Pharmacy encourages patients to report any persistent fatigue early for safe dose adjustments.",
              },
              {
                title: "Rapid Strength Loss",
                text: "Sudden drops in strength can be a sign that your body is losing muscle rather than fat during treatment. This may happen if protein intake or resistance training is not sufficient. Speaking to a clinician helps ensure your plan protects lean muscle and supports healthy progress.",
              },
              {
                title: "Dizziness or Fainting",
                text: "These symptoms may point to low blood sugar, dehydration, or overly rapid weight loss. They can also occur if you are not eating enough to support your activity levels. Professional guidance ensures you remain safe while continuing your weight-loss journey.",
              },
              {
                title: "Severe Appetite Suppression",
                text: "Some people find their hunger drops so evidently that they struggle to meet basic nutritional needs. This can affect energy, immunity, and muscle health over time. A clinician can help adjust your plan, suggest nutrient-dense options and ensure safer intake levels.",
              },
              {
                title: "Persistent Digestive Issues",
                text: "Symptoms like nausea, vomiting, diarrhoea or constipation can make it difficult to exercise or stay hydrated. Left unmanaged, they may impact your overall progress and well-being. A pharmacist or GP can offer medical strategies to ease symptoms and keep your treatment safe.",
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-gray-100 pb-6">
                <h4 className="editorial-title font-bold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-md leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Section 7 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Practical Tips: How to Combine a Wegovy Injection With Resistance
            Training
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {[
              {
                title: "Daily protein target",
                desc: "Around 1.2–1.6 g protein per kg body weight (or per lean mass), depending on age, activity and weight-loss goals.",
              },
              {
                title: "Stay hydrated",
                desc: "Especially if appetite is reduced or if you're training, dehydration can impair recovery and muscle maintenance.",
              },
              {
                title: "Begin with beginner-level strength training",
                desc: "Bodyweight or light resistance, gradually increasing intensity.",
              },
              {
                title: "Adopt progressive overload",
                desc: "Steadily add resistance or reps over weeks to stimulate muscle preservation.",
              },
              {
                title: "Allow rest days",
                desc: "Muscles need time to recover, especially under calorie deficit.",
              },
              {
                title: "Eat balanced meals when hunger allows",
                desc: "Even if appetite is suppressed, use nutrient-dense, protein-rich foods.",
              },
              {
                title: "Listen to your body",
                desc: "If you feel dizzy, over-fatigued or weak, ease back and seek medical advice if needed.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-gray-100 bg-gray-50"
              >
                <h4 className="editorial-title font-bold text-gray-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-md text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Section 8 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5 mt-10">
            Your Journey to Fat Loss and Muscle Confidence
          </h2>

          {/* Image 4 */}
          <img
            src="/Images/blog-2-4.webp"
            alt="Fat loss and muscle confidence journey"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            To sum up, using a Wegovy injection is intended to support weight
            management when combined with lifestyle measures and used under
            medical supervision, rather than as a standalone solution. Combining
            the treatment with resistance training and balanced nutrition is
            essential.
          </p>
          <p className="text-gray-600 leading-relaxed mb-12">
            Strength work helps protect muscle, maintain your metabolism, and
            support mobility, stability and overall well-being.{" "}
            <a href="/" className="text-teal-600 hover:underline">
              Weight Loss Pharmacy
            </a>{" "}
            provides access to Wegovy prescriptions online, which are subject to
            medical review and prescribed only when clinically appropriate. A
            personalised approach prioritising healthy habits leads to
            sustainable outcomes.
          </p>

          {/* FAQ */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-8">
            FAQs
          </h2>
          <div className="space-y-6 mb-14">
            {[
              {
                q: "Q1: Is a weekly weight-loss shot enough to preserve muscle by itself?",
                a: "No. While the weight loss shot Wegovy can help reduce appetite and support fat loss, clinical guidance emphasises combining it with a healthy diet and physical activity. Without resistance training and adequate protein, muscle loss remains a risk.",
              },
              {
                q: "Q2: Can older adults use a semaglutide injection for weight loss safely?",
                a: "Yes, but they are more at risk of muscle loss, so regular strength training, balanced nutrition, and proper monitoring are especially important.",
              },
              {
                q: "Q3: How often should I do resistance training while on Wegovy?",
                a: "Ideally, 2–3 times per week, focusing on all major muscle groups. Consistency and progressive overload matter more than the duration of individual sessions.",
              },
              {
                q: "Q4: Does weight loss injection affect energy or recovery after workouts?",
                a: "Some people experience lower appetite or mild fatigue early in the treatment of Wegovy for weight loss, which may reduce energy for training. So, starting with lighter resistance and good nutrition helps.",
              },
              {
                q: "Q5: How much does Wegovy cost in the UK?",
                a: "Pricing depends on the dose and provider. Maintenance-dose pens typically cost more. Always source from licensed pharmacies to ensure safety and authenticity.",
              },
              {
                q: "Q6: Can I order Wegovy online in the UK?",
                a: "Yes, via licensed pharmacies after a doctor or pharmacist reviews your eligibility. Look for Wegovy prescription online services that follow regulated protocols, like those offered by Weight Loss Pharmacy.",
              },
              {
                q: "Q7: Will I lose muscle if I don't lift weights while on a weight loss injection?",
                a: "Without resistance training, using Wegovy for weight loss increases the risk of muscle loss, particularly if caloric intake and protein levels are reduced.",
              },
              {
                q: "Q8: What signs suggest I should see a doctor while on the weekly weight-loss shot?",
                a: "Seek advice if you feel extreme fatigue, dizziness, rapid strength loss, persistent weakness or digestive problems interfering with eating or training.",
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-6">
                <h4 className="editorial-title font-bold text-gray-900 mb-2">
                  {faq.q}
                </h4>
                <p className="text-gray-600 text-md leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* References */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="editorial-title text-lg font-bold text-gray-900 mb-4">
              References
            </h3>
            <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
              {[
                "https://www.nhs.uk/conditions/obesity/treatment/",
                "https://www.mayoclinic.org/diseases-conditions/obesity/in-depth/weight-loss-drugs/art-20044832",
                "https://www.researchgate.net/publication/261532045_British_Dietetic_Association_evidence-based_guidelines_for_the_protein_requirements_of_adults_undergoing_maintenance_haemodialysis_or_peritoneal_dialysis",
                "https://pmc.ncbi.nlm.nih.gov/articles/PMC11940170/",
              ].map((url, i) => (
                <li key={i}>
                  <a
                    href={url}
                    className="text-teal-600 hover:underline break-all"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}
