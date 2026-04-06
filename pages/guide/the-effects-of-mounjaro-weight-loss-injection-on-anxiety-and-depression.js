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
            src="/Images/blog-6-1.webp"
            alt="Mounjaro effects on anxiety and depression"
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
                    Mounjaro
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-xs text-white/70 editorial-body">
                    January 26, 2026
                  </span>
                </div>
                <h1 className="editorial-title text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  The Effects of Mounjaro Weight-Loss Injection on Anxiety and
                  Depression
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
              The Effects of Mounjaro Weight-Loss Injection on Anxiety and
              Depression
            </span>
          </div>
        </div>

        {/* ── ARTICLE ── */}
        <article className="max-w-5xl mx-auto px-6 py-14 editorial-body">
          {/* Intro */}
          <p className="text-md text-gray-600 leading-relaxed mb-5 pb-5 border-b border-gray-100">
            Mounjaro weight loss injection is making waves in managing Type 2
            diabetes and supporting weight loss. While it helps with blood sugar
            control and sustainable weight loss, many patients wonder about its
            effects on mental health, particularly anxiety and depression. The
            mind-body connection is significant, as changes in glucose levels
            can affect emotional well-being.
          </p>
          <p className="text-md text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            Some individuals report improved mood, while others may experience
            symptoms of anxiety or depression. It's important to monitor mental
            health during treatment and discuss any mood changes with a doctor,
            as they could be related to low blood sugar or hormonal shifts. With
            proper care and support from healthcare professionals.
          </p>

          {/* Key Takeaways */}
          <div className="key-takeaway rounded-2xl p-8 mb-12">
            <h3 className="editorial-title text-xl font-bold text-gray-900 mb-5">
              Key Insights on Mounjaro and Mental Health
            </h3>
            <ul className="space-y-3">
              {[
                "Mounjaro is a prescription-only treatment used for type 2 diabetes and may form part of a supervised weight management plan alongside lifestyle changes.",
                "Emotional and mood responses can differ between individuals, particularly during early treatment or dose adjustments.",
                "Mounjaro is not used to treat anxiety or depression, and any mood changes should be discussed with a UK-licensed healthcare professional.",
                "Healthy routines such as balanced eating, regular activity, and good sleep support both physical and emotional well-being during treatment.",
                "Ongoing clinical review is important, especially for those with existing mental health concerns, to ensure safe and appropriate use.",
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
            Understanding Mounjaro and Its Mechanism of Action
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Mounjaro is a prescription-only medicine that contains tirzepatide
            and works by acting on GLP-1 and GIP receptors involved in appetite
            and blood glucose regulation. It is prescribed following a clinical
            assessment and is used as part of the management of Type 2 diabetes.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            In some cases,{" "}
            <a
              href="/weight-loss-treatments/mounjaro/"
              className="text-teal-600 hover:underline"
            >
              Mounjaro for weight loss
            </a>{" "}
            may be included within a wider, medically supervised weight
            management approach alongside lifestyle changes. Blood glucose
            fluctuations can influence energy levels and emotional well-being in
            some individuals.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            By supporting more stable glucose regulation, treatment may help
            reduce these fluctuations over time. However, Mounjaro is not
            intended to treat anxiety or depression, and responses can vary
            between individuals. Any emotional or mood-related changes should be
            monitored and discussed with a UK-licensed healthcare professional.
          </p>

          {/* Section 1b */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Can Mounjaro Affect Anxiety and Mood?
          </h2>

          <img
            src="/Images/blog-6-2.webp"
            alt="Mounjaro effects on anxiety and mood"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            Many users have reported varying effects on their mental health
            while using Mounjaro. Some feel calmer and experience less anxiety,
            while others may notice feelings of increased stress.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            For example, a recent report titled{" "}
            <a
              href="https://www.psychiatrist.com/pcc/mental-health-effects-tirzepatide-report-2-patients/"
              className="text-teal-600 hover:underline"
            >
              Mental Health Effects of Tirzepatide: A Report of 2 Patients
            </a>{" "}
            highlighted one individual who experienced significant mood
            improvements, including better sleep, increased happiness, and
            greater motivation, just weeks after increasing the tirzepatide
            dosage.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            This report also noted a substantial weight loss of nearly 22 Kgs
            alongside these mental health improvements after five months of
            tirzepatide use. On the other hand, a pharmacovigilance analysis of
            adverse-event reports for Mounjaro found that a small percentage of
            users reported mood-related effects. These included anxiety,
            depression, and, in rare cases, suicidal ideation.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            This highlights the importance of monitoring mental health while
            using the medication, which is why Weight Loss Pharmacy provides
            ongoing support to ensure safe and effective weight loss management
            (Tobaiqy &amp; Elkout, 2024).
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            These effects can be attributed to several factors, including
            individual body responses to the medication.
          </p>

          <ul className="space-y-4 mb-10">
            {[
              {
                bold: "Fluctuating Blood Sugar Level:",
                text: " Blood glucose level dips or spikes can trigger anxiety, and weight loss medication helps balance this, which may reduce nervousness for some users.",
              },
              {
                bold: "Appetite Changes:",
                text: " With Mounjaro, appetite regulation plays a big role in balancing mood. However, as your body adjusts to lower calorie intake, some may feel hunger-induced irritability or stress.",
              },
              {
                bold: "Gut-Brain Axis:",
                text: " Recent research explains how GLP-1 receptor agonists (the class Mounjaro belongs to) affect brain regions involved in appetite and mood regulation, providing a plausible biological route for how the gut-brain axis can influence mental health. By regulating appetite and digestion, weight-loss injection can impact the gut-brain axis, which influences emotional well-being.",
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
            While Mounjaro for weight loss can improve mood for many users, it's
            important to note that everyone's body reacts differently. It's
            essential to monitor how you feel and consult with a healthcare
            provider if needed.
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
            Potential Positive Effects on Anxiety &amp; Depression
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            While some individuals may experience side effects, there are also
            potential mental health benefits associated with Mounjaro:
          </p>
          <ul className="space-y-4 mb-10">
            {[
              {
                bold: "Improved Metabolic Health:",
                text: " Balancing blood glucose can lead to fewer energy crashes and mood swings, resulting in enhanced emotional well-being.",
              },
              {
                bold: "Reduced Inflammation:",
                text: " Weight loss with injection can reduce inflammation, which has been linked to both depression and anxiety.",
              },
              {
                bold: "Better Sleep Patterns:",
                text: " With improved metabolism and stable glucose level, many users report better quality sleep, contributing to improved mood.",
              },
              {
                bold: "Increased Confidence:",
                text: " As users lose weight and feel better physically, they often experience a boost in self-esteem, which can reduce symptoms of depression.",
              },
              {
                bold: "Enhanced Energy Levels:",
                text: " Consistent energy levels help combat fatigue, which is often associated with depression, promoting an overall positive mental state.",
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

          {/* Section 3 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Potential Side Effects That Might Influence Mood
          </h2>

          <img
            src="/Images/blog-6-3.webp"
            alt="Side effects that influence mood"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            While weight loss medication can offer mood benefits, there are
            potential side effects that may negatively impact mental health for
            some users:
          </p>
          <ul className="space-y-4 mb-5">
            {[
              {
                bold: "Nausea and Appetite Changes:",
                text: " Some users experience nausea or changes in appetite that can cause discomfort and frustration, potentially increasing stress or irritability.",
              },
              {
                bold: "Fatigue:",
                text: " Fatigue is a common side effect that could worsen feelings of depression if not managed.",
              },
              {
                bold: "Sleep Disruption:",
                text: " Changes in digestion and appetite may lead to sleep disturbances, which can impact mood and energy levels.",
              },
              {
                bold: "Blood Sugar Fluctuations:",
                text: " While Mounjaro for weight loss helps stabilise sugar levels, adjustments to the medication may cause occasional blood glucose fluctuations, which could lead to mood swings or stress.",
              },
              {
                bold: "Rare Reports of Low Mood:",
                text: " Some users have reported feeling low or mildly depressed, especially during the adjustment period. However, this is not common and typically improves with time.",
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
            It's important to note that the correlation between weight loss
            injection and mood changes varies greatly among users. Always
            monitor your symptoms and consult a healthcare provider if you
            experience persistent mood changes.
          </p>

          {/* Section 4 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Stress, Emotional Eating &amp; Mounjaro
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            <a
              href="https://www.mayoclinic.org/healthy-lifestyle/weight-loss/in-depth/weight-loss/art-20047342"
              className="text-teal-600 hover:underline"
            >
              Emotional eating
            </a>{" "}
            is a common challenge for those struggling with weight and mental
            health. With Mounjaro, the regulation of appetite may reduce
            emotional eating triggers. However, the transition to a healthier
            eating pattern can be challenging, and some individuals may
            experience emotional stress due to changes in their food intake.
          </p>

          {/* Pull Quote */}
          <blockquote className="pull-quote rounded-xl px-8 py-6 my-10 text-xl text-gray-700 leading-relaxed">
            "As your body adjusts to new hunger cues, you may feel an unfamiliar
            sense of calm or, alternatively, an increase in emotional eating
            triggers as the body adjusts to reduced dopamine spikes. These
            effects often subside with time and consistent support from
            healthcare professionals."
          </blockquote>

          {/* Section 5 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Who Is More Likely to Experience Anxiety Changes?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Certain individuals are more likely to experience mood changes while
            using Mounjaro:
          </p>
          <ul className="space-y-4 mb-10">
            {[
              {
                bold: "People with a History of Anxiety:",
                text: " Individuals with existing anxiety disorders may be more sensitive to fluctuations in blood glucose or appetite changes.",
              },
              {
                bold: "Those Sensitive to Blood Sugar Shifts:",
                text: " Some individuals experience mood changes when their glucose level fluctuates, and injection can make a noticeable difference in these fluctuations.",
              },
              {
                bold: "People with High Work Stress:",
                text: " Stressful lifestyles can exacerbate any potential mood disturbances related to weight loss or medication.",
              },
              {
                bold: "Individuals Undergoing Rapid Lifestyle Changes:",
                text: " Major shifts in diet, exercise, and medication can bring about emotional reactions during the adjustment phase.",
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

          {/* Section 6 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Safety: When to Seek Medical Help
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            If you experience any of the following red-flag symptoms, it's
            important to consult your healthcare provider immediately:
          </p>
          <ul className="space-y-3 mb-5">
            {[
              "Persistent sadness or low mood",
              "Severe anxiousness or panic attacks",
              "Suicidal thoughts or feelings of hopelessness",
              "Loss of interest in things you once enjoyed",
              "Difficulty functioning in daily life",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-600 text-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-gray-600 leading-relaxed mb-10">
            If you experience any of these symptoms, seek professional help
            immediately to ensure your safety and well-being.
          </p>

          {/* Section 7 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Tips to Manage Anxiety While Using Mounjaro
          </h2>

          <img
            src="/Images/blog-6-4.webp"
            alt="Tips to manage anxiety while using Mounjaro"
            className="w-full rounded-2xl mb-6"
          />

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              {
                title: "Start Slow",
                desc: "Gradually adjust to the medication to allow your body to adapt.",
              },
              {
                title: "Track Mood Changes",
                desc: "Regularly monitor how you feel to identify any patterns or triggers.",
              },
              {
                title: "Maintain Stable Meals",
                desc: "Keep your meals balanced to avoid blood sugar fluctuations.",
              },
              {
                title: "Hydration is Key",
                desc: "Drink plenty of water to stay hydrated and improve overall well-being.",
              },
              {
                title: "Gentle Exercise",
                desc: "Incorporate physical activity to reduce stress and improve mood.",
              },
              {
                title: "Mindfulness Practices",
                desc: "Try meditation or deep breathing exercises to stay calm.",
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
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Take the First Step Toward a Healthier &amp; Happier You
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            In conclusion, Mounjaro weight-loss injection may support some
            individuals managing Type 2 diabetes and weight loss, although its
            effects on mood can vary. When combined with healthy lifestyle
            habits, weight management approaches can contribute to overall
            physical and emotional well-being.
          </p>
          <p className="text-gray-600 leading-relaxed mb-12">
            Prescription medicines may be used alongside lifestyle measures such
            as diet, exercise, and health monitoring. Any decision to prescribe
            is made following an assessment by a UK-licensed healthcare
            professional to ensure suitability and safety.{" "}
            <a href="/" className="text-teal-600 hover:underline">
              Weight Loss Pharmacy
            </a>{" "}
            offers clinical oversight and wellbeing support, ensuring
            appropriate use according to medical guidance.
          </p>

          {/* FAQ */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-8">
            FAQs
          </h2>
          <div className="space-y-6 mb-14">
            {[
              {
                q: "Does Mounjaro make anxiety worse?",
                a: "Responses to Mounjaro can vary between individuals. Some people may notice changes in how they feel, including increased anxiousness, particularly during the early stages of treatment or while the body is adjusting. Any ongoing or concerning changes in mood should be discussed with a UK-licensed healthcare professional.",
              },
              {
                q: "Can Mounjaro help with depression?",
                a: "Mounjaro is not intended to treat depression. Some individuals report changes in mood while using the medicine, which may relate to metabolic or lifestyle changes occurring during treatment. Responses differ between individuals, and any ongoing or concerning mood changes should be discussed with a healthcare professional.",
              },
              {
                q: "Why do I feel more emotional while using Mounjaro?",
                a: "Emotional changes may occur for some people during treatment and can be associated with adjustments in appetite, energy levels, or general metabolic changes. These responses vary and may settle as the body adapts. Monitoring how you feel and seeking clinical advice if concerns persist is recommended.",
              },
              {
                q: "How long do mood changes last while using Mounjaro?",
                a: "Mood-related changes, if they occur, may be temporary and develop differently for each individual. Some people find these changes lessen as treatment continues, while others may require clinical review. Persistent or worsening symptoms should be discussed with a UK-licensed healthcare professional.",
              },
              {
                q: "Is it safe to use Mounjaro if I have anxiety?",
                a: "Mounjaro may be prescribed to individuals with a history of anxiety following a clinical assessment. As with any prescription medicine, careful monitoring is important, particularly if anxiety symptoms are influenced by changes in appetite or blood glucose. Any concerns should be raised with the prescribing clinician.",
              },
              {
                q: "Should I tell my clinician about existing mental health conditions before starting Mounjaro?",
                a: "Yes, it is important to share any history of anxiety, depression, or other mental health conditions during your clinical assessment. This helps ensure that treatment decisions are appropriate and that your well-being can be monitored safely throughout use.",
              },
              {
                q: "Does Mounjaro affect sleep patterns?",
                a: "Some individuals report changes in sleep while using Mounjaro, particularly during the early stages of treatment. These changes may relate to adjustments in appetite, digestion, or overall metabolic balance. Sleep experiences can vary, and any persistent sleep disturbance should be discussed with a UK-licensed healthcare professional.",
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
                "https://www.psychiatrist.com/pcc/mental-health-effects-tirzepatide-report-2-patients/",
                "https://www.researchgate.net/publication/377662684_Psychiatric_adverse_events_associated_with_semaglutide_liraglutide_and_tirzepatide_a_pharmacovigilance_analysis_of_individual_case_safety_reports_submitted_to_the_EudraVigilance_database",
                "https://www.sciencedirect.com/science/article/pii/S0002934325000592",
                "https://www.mayoclinic.org/healthy-lifestyle/weight-loss/in-depth/weight-loss/art-20047342",
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
