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
            src="/Images/why-weightloss-blog-1.webp"
            alt="Hair loss and Mounjaro"
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
            <div className="container m-auto">
              <div className="max-w-5xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-widest uppercase text-white/70 editorial-body">
                    Guide
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-xs text-white/70 editorial-body">
                    Mounjaro
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-xs text-white/70 editorial-body">
                    January 26, 2026
                  </span>
                </div>
                <h1 className="editorial-title text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  Why Weight-Loss Injection Mounjaro Might Trigger Hair Loss and
                  How to Prevent It
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* ── BREADCRUMB ── */}
        <div className="border-b border-gray-100">
          <div className="container mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400 editorial-body">
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
              Why Weight-Loss Injection Mounjaro Might Trigger Hair Loss
            </span>
          </div>
        </div>

        {/* ── ARTICLE ── */}
        <article className="container mx-auto px-6 py-14 editorial-body">
          {/* Intro */}
          <p className="text-md text-gray-600 leading-relaxed mb-5 pb-5 border-b border-gray-100">
            Starting a weight loss injection Mounjaro programme can feel
            positive, especially for those aiming to improve their health and
            manage weight more effectively. However, some people notice changes
            such as increased hair shedding or reduced thickness during their
            journey. This can feel concerning, particularly when the goal is
            improved wellbeing rather than new worries about appearance.
          </p>
          <p className="text-md text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            If you are experiencing this, you are not alone. It is common to
            question whether hair changes are temporary or related to weight
            loss treatment. This article explains why hair shedding may occur,
            what current evidence suggests, and practical steps that may help
            reduce the risk while keeping safety a priority.
          </p>

          {/* Key Takeaways */}
          <div className="key-takeaway rounded-2xl p-8 mb-12">
            <h3 className="editorial-title text-xl font-bold text-gray-900 mb-5">
              Key Takeaways
            </h3>
            <ul className="space-y-3">
              {[
                "The weight loss injection Mounjaro can lead to rapid weight loss, which sometimes triggers hair shedding.",
                "Hormonal and metabolic shifts, nutrient gaps, stress and calorie restriction may all contribute.",
                "Early evidence is limited; anecdotal reports warrant caution rather than alarm.",
                "A balanced diet, protein intake, gentle exercise and scalp care can help reduce hair-loss risk.",
                "Safe access through regulated prescription helps ensure dosage is monitored and side effects managed.",
                "If shedding is severe or persistent, seek medical review promptly to rule out other causes.",
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
            The Basics of Mounjaro: What It Is and How It Works
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Mounjaro for weight loss is a{" "}
            <a
              href="https://www.nhs.uk/conditions/obesity/treatment/"
              className="text-teal-600 hover:underline"
            >
              clinically approved
            </a>{" "}
            medication containing tirzepatide, offered to adults with obesity or
            overweight as part of a structured weight-management plan. It acts
            by stimulating the same gut hormones (GIP and GLP-1) that help
            control hunger, steady digestion, and signal fullness more quickly.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            As a prescribed option, the weight loss injection Mounjaro is
            usually paired with guidance on nutrition and physical activity, as
            weight management works best when medication is supported by healthy
            daily routines.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Used responsibly, it may help reduce calorie intake, support fat
            loss, and improve metabolic markers. However, as with many potent
            treatments, it requires careful monitoring and a holistic approach.
          </p>

          {/* Product Card */}
          <div className="border border-gray-200 rounded-2xl p-6 mb-12 bg-gray-50">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1 editorial-body">
              GLP-1 / GIP
            </p>
            <h4 className="editorial-title text-2xl font-bold text-gray-900 mb-2">
              Mounjaro
            </h4>
            <p className="text-md text-gray-500 mb-4">
              Dual-agonist support that helps curb appetite, hunger, and
              cravings to drive substantial, sustained weight loss.
            </p>
            <ul className="space-y-2 mb-5">
              {[
                "~22.5% average body weight loss",
                "Significant weight reduction",
                "Improves blood sugar levels",
                "Clinically proven weight loss",
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
              href="/start-consultation/?product_id=4"
              className="inline-block text-sm font-semibold text-white px-6 py-3 rounded-lg editorial-body"
              style={{
                background: "linear-gradient(135deg, #3dbfa0, #4b6bc1)",
              }}
            >
              Start Your Free Consultation
            </a>
          </div>

          {/* Section 2 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Why Mounjaro Might Be Linked to Hair Loss
          </h2>
          <p className="text-gray-600 text-md leading-relaxed mb-5">
            Hair loss during the use of the weight loss shot Mounjaro may stem
            from several overlapping factors:
          </p>
          <ul className="space-y-4 mb-8">
            {[
              {
                bold: "Hormonal and metabolic shifts",
                text: " are triggered by the drug, that leads to rapid fat loss.",
              },
              {
                bold: "Calorie restriction and nutrient deficits",
                text: " cause the body to divert resources away from non-essential functions like hair growth.",
              },
              {
                bold: "Stress response and emotional strain",
                text: " of significant lifestyle changes, which can impact the hair cycle.",
              },
              {
                bold: "Rapid weight loss itself",
                text: " is known to sometimes precipitate telogen effluvium, a temporary hair-shedding condition.",
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
            In short, while the weight loss injection Mounjaro supports fat
            reduction, the body undergoes big adjustments, and hair can get
            caught in the crossfire.
          </p>

          {/* Section 3 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            The Core Science | What Happens in the Body?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            When you begin weight loss injection Mounjaro, several internal
            changes can influence hair health. The medication's hormonal action
            on GIP and GLP-1 alters appetite and digestion, which often leads to
            reduced calorie and protein intake. Over time, this can limit the
            essential building blocks your hair needs to stay strong and grow
            well.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            As your{" "}
            <a
              href="https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2836527"
              className="text-teal-600 hover:underline"
            >
              metabolism shifts
            </a>{" "}
            during fat loss, the body naturally prioritises vital functions.
            Non-essential processes, such as hair production, may receive fewer
            resources. If protein, iron, zinc or other nutrients fall below what
            your body requires, the scalp and hair follicles may not get enough
            support to maintain healthy growth.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Rapid weight loss and the physical stress of significant body
            changes can also raise cortisol or other stress hormones. This type
            of stress is a known trigger for telogen effluvium. It's a temporary
            form of shedding where hair enters the resting phase too early and
            falls out more easily.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            The emotional side plays a significant part too. Anxiety about
            appearance, disrupted sleep or changes in mood can place further
            strain on the hair cycle, gradually contributing to thinning or
            increased shedding.
          </p>

          {/* Pull Quote */}
          <blockquote className="pull-quote rounded-xl px-8 py-6 my-10 text-xl text-gray-700 leading-relaxed">
            "Taken together, these shifts create a perfect storm for possible
            hair loss during treatment. Importantly, the injection itself is not
            directly damaging hair — it is the combination of metabolic stress,
            reduced intake and psychological factors that may lead to temporary
            shedding."
          </blockquote>

          {/* Section 4 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Benefits of Mounjaro for Weight Loss (Scientifically Supported)
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Despite the hair-loss concern, many benefits of Mounjaro injection
            UK remain well-documented:
          </p>
          <ul className="space-y-3 mb-10">
            {[
              "Significant reductions in body weight, especially fat mass, when combined with lifestyle changes.",
              "Improvement in blood sugar control and metabolic markers in people with type 2 diabetes or pre-diabetes.",
              "Appetite reduction leading to easier calorie control, which may support long-term weight management.",
              "Potential improvement in cardiovascular risk factors (blood pressure, cholesterol) in some users.",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-600 text-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed mb-10">
            These benefits underscore why many choose this weight loss injection
            Mounjaro, provided it's managed responsibly.
          </p>

          {/* Section 5 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Potential Side Effects Related to Hair Loss
          </h2>

          <img
            src="/Images/why-weightloss-blog-2.webp"
            alt="Woman checking hair in mirror"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            Even though direct research linking Mounjaro weight loss UK and hair
            loss is limited, several risks merit attention:
          </p>
          <ul className="space-y-4 mb-5">
            {[
              {
                bold: "Telogen effluvium:",
                text: " triggered by rapid weight loss, nutrient deficiency or stress may cause diffuse hair thinning.",
              },
              {
                bold: "Protein and micronutrient deficiencies:",
                text: " If the diet is inadequate, especially during appetite suppression.",
              },
              {
                bold: "Metabolic stress:",
                text: " It is caused by rapid fat loss, hormonal and digestive changes.",
              },
              {
                bold: "Emotional stress and body-image worries:",
                text: " They lead to sleep disruption or increased cortisol.",
              },
              {
                bold: "Delayed hair growth cycle:",
                text: " Even once shedding slows, regrowth may take months.",
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
            It's important to stress: these are possible side-effects, not
            certain outcomes. Many people complete treatment without noticeable
            hair changes.
          </p>

          {/* Section 6 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Emotional &amp; Psychological Impact
          </h2>

          <img
            src="/Images/why-weightloss-blog-3.webp"
            alt="Emotional impact of hair loss"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            Hair loss or even the fear of it can take an emotional toll. For
            some people using a Mounjaro injection, the early satisfaction of
            weight loss can quickly shift into worry about changes in
            appearance. This worry may affect self-esteem and body confidence,
            disrupt sleep, or lead to dips in mood.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Some individuals also notice changes in eating patterns or become
            preoccupied with trying to "fix" their hair. This can reduce
            motivation and make the weight-loss journey feel harder, especially
            if progress slows. At Online Weightloss Clinic, we understand that
            emotional well-being is just as important as physical health. It's
            completely normal to feel concerned, and planning for balance,
            support and reassurance is an essential part of safe weight
            management.
          </p>

          {/* Section 7 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Who Is More Likely to Experience Hair Loss on Mounjaro?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Hair thinning during Mounjaro weight loss programmes seems more
            common in people who:
          </p>
          <ul className="space-y-3 mb-5">
            {[
              "Lose weight very rapidly (> 1 kg per week on average)",
              "Follow low-calorie or micronutrient-poor diets",
              "Already had fragile or thinning hair before starting treatment",
              "Have thyroid issues, iron deficiency or other metabolic/hormonal imbalances",
              "Face high stress levels or suffer from poor sleep",
              "Do not supplement with adequate protein, vitamins or minerals",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-600 text-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed mb-10">
            Being aware of these risk factors helps you adjust your plan
            accordingly.
          </p>

          {/* Section 8 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Practical Tips to Prevent or Reduce Hair Loss
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            If you choose the weight loss injection Mounjaro, here are practical
            ways to protect your hair:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {[
              {
                title: "Protein intake",
                desc: "Ensure sufficient protein intake, aim for 1.0–1.5 g per kg body weight daily.",
              },
              {
                title: "Supplements",
                desc: "Support with iron, zinc, biotin, B-vitamins and vitamin D.",
              },
              {
                title: "Stay hydrated",
                desc: "Dehydration can impair hair follicle health.",
              },
              {
                title: "Gentle activity",
                desc: "Maintain gentle physical activity, avoid extreme dieting or over-exercise.",
              },
              {
                title: "Scalp care",
                desc: "Use gentle shampoo, avoid harsh treatments, and reduce heat styling.",
              },
              {
                title: "Manage stress & sleep",
                desc: "Restful sleep and stress reduction help maintain healthy hair cycles.",
              },
              {
                title: "Gradual weight loss",
                desc: "Monitor gradual weight loss and avoid extreme calorie restriction where possible.",
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
            These simple steps can go a long way in reducing hair-loss risk,
            while still supporting fat loss.
          </p>

          {/* Section 9 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            A Future Where Hair and Health Thrive
          </h2>

          <img
            src="/Images/why-weightloss-blog-4.webp"
            alt="Woman with hair loss holding brush"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            To put it in a nutshell, weight-loss injection Mounjaro can be an
            effective tool for reducing fat and improving metabolic health, but
            it is not without potential challenges. Hair loss may occur,
            particularly in the context of rapid weight loss, nutrient
            deficiencies, or stress. Importantly, this risk appears indirect and
            manageable.
          </p>
          <p className="text-gray-600 leading-relaxed mb-12">
            <a href="/" className="text-teal-600 hover:underline">
              Online Weightloss Clinic
            </a>{" "}
            provides access to wellbeing services where care is determined
            following assessment by a UK-licensed healthcare professional, with
            decisions based on safety, suitability and clinical appropriateness.
          </p>

          {/* FAQ */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-8">
            FAQs
          </h2>
          <div className="space-y-6 mb-14">
            {[
              {
                q: "Q1: Does everyone on Mounjaro lose hair?",
                a: "No. Hair loss is not a guaranteed side effect. Many people using Mounjaro injection UK complete treatment without noticing any hair thinning, especially if they follow a balanced diet and monitor nutrient intake.",
              },
              {
                q: "Q2: When does hair shedding typically start if it happens?",
                a: "Hair loss related to rapid weight loss or metabolic stress commonly appears 2–4 months after the trigger, so if you start shedding in that window, it may be linked to your weight change rather than genetics.",
              },
              {
                q: "Q3: Can switching from Mounjaro help stop hair loss?",
                a: "Not necessarily. If shedding results from nutrient deficits or rapid weight loss, restoring nutrition and stabilising weight may help. Always consult your clinician before changing treatment.",
              },
              {
                q: "Q4: Should I take hair-support supplements alongside treatment?",
                a: "Supplements may help, but it's better to optimise diet first. If you consider supplements (e.g. iron, biotin, zinc), discuss with your GP and avoid high-dose self-medicating.",
              },
              {
                q: "Q5: Is the hair loss permanent?",
                a: "Usually not. In most cases of telogen effluvium triggered by weight loss or stress, hair regrowth begins within 3–6 months, once the underlying cause is addressed.",
              },
              {
                q: "Q6: Does weight loss injection Wegovy have hair-loss risks like Mounjaro?",
                a: "Some users of the weight loss injection Wegovy notice temporary shedding, much like those on the Mounjaro injection. This is usually due to rapid weight loss or reduced nutrients rather than the medication itself, and similar nutrition and care tips can help protect hair.",
              },
              {
                q: "Q7: Is it safer to lose weight slowly to avoid hair loss?",
                a: "Yes. Gradual weight loss (e.g. 0.5–1 kg per week) is less shocking to the body and reduces risk of stress- or nutrition-induced shedding.",
              },
              {
                q: "Q8: Can I still use Mounjaro if I'm worried about hair loss?",
                a: "Yes, many doctors support its use when paired with proper nutrition, monitoring and lifestyle support. If you're concerned, discuss with your clinician before starting treatment.",
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
              <li>
                <a
                  href="https://www.nhs.uk/conditions/obesity/treatment/"
                  className="text-teal-600 hover:underline break-all"
                >
                  https://www.nhs.uk/conditions/obesity/treatment/
                </a>
              </li>
              <li>
                <a
                  href="https://my.clevelandclinic.org/health/diseases/24486-telogen-effluvium"
                  className="text-teal-600 hover:underline break-all"
                >
                  https://my.clevelandclinic.org/health/diseases/24486-telogen-effluvium
                </a>
              </li>
              <li>
                <a
                  href="https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2836527"
                  className="text-teal-600 hover:underline break-all"
                >
                  https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2836527
                </a>
              </li>
              <li>
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2895000/"
                  className="text-teal-600 hover:underline break-all"
                >
                  https://pmc.ncbi.nlm.nih.gov/articles/PMC2895000/
                </a>
              </li>
            </ul>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}
