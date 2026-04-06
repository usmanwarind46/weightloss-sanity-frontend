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
            src="/Images/blog-3-1.webp"
            alt="Over-exercising on a weight loss injection"
            className="w-full h-full object-cover object-top"
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
                    Weight Loss
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-xs text-white/70 editorial-body">
                    January 26, 2026
                  </span>
                </div>
                <h1 className="editorial-title text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  Is Over-Exercising While on a Weight-Loss Injection Harmful or
                  Counterproductive?
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
              Is Over-Exercising While on a Weight-Loss Injection Harmful or
              Counterproductive?
            </span>
          </div>
        </div>

        {/* ── ARTICLE ── */}
        <article className="max-w-5xl mx-auto px-6 py-14 editorial-body">
          {/* Intro */}
          <p className="text-md text-gray-600 leading-relaxed mb-5 pb-5 border-b border-gray-100">
            Many people begin a weight loss injection journey feeling hopeful
            and ready for change. With that motivation, exercise naturally
            becomes part of the journey. However, it's important to understand
            that over-exercising while on these medications can be harmful and
            counterproductive.
          </p>
          <p className="text-md text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            While appetite suppression helps with weight loss, pushing your body
            too hard can lead to severe fatigue, dizziness, dehydration, and
            even hypoglycemia. This guide aims to give clear, medically
            responsible reassurance on how to exercise safely while using
            treatments such as the once-weekly obesity treatment available in
            the UK.
          </p>

          {/* Key Takeaways */}
          <div className="key-takeaway rounded-2xl p-8 mb-12">
            <h3 className="editorial-title text-xl font-bold text-gray-900 mb-5">
              What You Should Know for Safe Exercise on Weight-Loss Injections
            </h3>
            <ul className="space-y-3">
              {[
                "Over-exercising while using a weight loss injection can raise the risk of dizziness, fatigue, nausea, and glucose level fluctuations.",
                "Gentle, consistent activity supports safer and more sustainable long-term results than intense training too early.",
                "Clinical guidance highlights the importance of balanced nutrition alongside exercise, especially during appetite suppression.",
                "The weekly weight-loss shot can reduce hunger, which may lead to under-fuelling workouts without realising it.",
                "A gradual fitness routine matched to your energy levels delivers the best results while reducing the risk of exhaustion or injury.",
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
            What This Once-Weekly Obesity Treatment Does
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            A weight loss injection works by influencing appetite and hunger
            signals in the brain. One well-known example is{" "}
            <a
              href="/weight-loss-treatments/wegovy/"
              className="text-teal-600 hover:underline"
            >
              Wegovy
            </a>{" "}
            (semaglutide), the active ingredient used in certain prescription
            treatments. It is commonly recommended for weight management because
            it helps reduce cravings, increase fullness, and support long-term
            lifestyle changes.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            These treatments lead to:
          </p>
          <ul className="space-y-3 mb-5">
            {[
              "Slow down stomach emptying",
              "Reduce appetite",
              "Improve feelings of fullness",
              "Support long-term calorie reduction",
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
          <p className="text-gray-600 leading-relaxed mb-5">
            Current{" "}
            <a
              href="https://www.nhs.uk/conditions/obesity/treatment/"
              className="text-teal-600 hover:underline"
            >
              NHS
            </a>{" "}
            and NICE guidance highlight these weight loss injections once a week
            as an option for people with obesity when lifestyle changes alone
            are not enough. While these medications help reduce your calorie
            intake, balance is essential. Exercise remains important, but how
            much and how intense the activity should be must align with your
            energy levels, nutrition, and medical advice.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            <strong>Note:</strong> Wegovy (or other weight-loss injections) are
            prescription-only medications and should only be used under the
            supervision of a healthcare provider.
          </p>

          {/* Section 2 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            How Weight-Loss Treatments Affect the Body During Exercise
          </h2>

          <img
            src="/Images/blog-3-2.webp"
            alt="How weight loss treatments affect the body during exercise"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-6">
            A <strong>weight loss injection</strong> affects several internal
            processes that can influence how your body responds to physical
            activity. Understanding these changes helps you exercise safely and
            confidently.
          </p>

          <div className="space-y-6 mb-10">
            {[
              {
                title: "1. Appetite Suppression",
                text: "These treatments reduce hunger signals, helping you eat less and stay fuller for longer. However, this can make it easy to under-fuel workouts without realising it, especially if you're trying to increase your activity level.",
              },
              {
                title: "2. Blood Sugar Regulation",
                text: "Clinical guidance, including insights from Mayo Clinic, shows that these medications can lower blood sugar in some people. During vigorous exercise, this may cause tiredness, shakiness, or light-headedness — signs that your body needs more balanced nutrition.",
              },
              {
                title: "3. Energy Levels",
                text: "While some patients feel more in control and motivated, others notice temporary fatigue as their body adjusts. This is especially common during the first few weeks or when moving to a higher dose, which is why listening to your energy levels is essential.",
              },
              {
                title: "4. Slower Digestion",
                text: "Weight loss injection Wegovy slow gastric emptying, eating too close to a workout can lead to nausea, bloating, or discomfort. Many patients find that lighter meals and longer gaps between eating and exercise help reduce these symptoms.",
              },
              {
                title: "5. Mind-Body Connection",
                text: "Many people report a different relationship with food, movement, and motivation once their appetite decreases. This shift can be positive, but it also means pacing yourself, avoiding pressure, and giving your body time to adjust to your new routine.",
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

          {/* Section 3 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            What Happens if You Overdo Your Workouts on Treatment?
          </h2>

          <img
            src="/Images/blog-3-3.webp"
            alt="Overdoing workouts on weight loss treatment"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-6">
            Yes, for some people, pushing too hard can reduce progress and
            increase risks.{" "}
            <a
              href="https://www.nice.org.uk/guidance/ng246"
              className="text-teal-600 hover:underline"
            >
              Clinical guidance
            </a>{" "}
            and patient experiences show that pushing too hard while using a
            weight loss injection can place extra strain on the body. At a time
            when appetite, energy levels, and digestion are already changing.
          </p>

          <div className="space-y-6 mb-8">
            {[
              {
                title: "1. Under-Fuelled Training",
                text: "Lower appetite, which is common when using treatment, can mean you're not eating enough to support demanding workouts. This often results in weaker performance, slower recovery, and unexpected exhaustion.",
              },
              {
                title: "2. Increased Injury Risk",
                text: "Your muscles and joints rely on proper nutrition to repair safely. Low-calorie intake may increase the risk of fatigue and slower recovery. Especially if exercise intensity rises too quickly.",
              },
              {
                title: "3. Hormonal Stress Response",
                text: "Over-exercising can increase cortisol, the stress hormone. This may interfere with steady weight loss, trigger cravings, or create emotional pressure that makes the journey feel harder than it needs to be.",
              },
              {
                title: "4. Metabolic Strain",
                text: "Wegovy for weight loss can lower blood sugar and slow digestion. When combined with very intense training, this may lead to dizziness, extreme fatigue, or difficulty completing normal routines.",
              },
              {
                title: "5. Counterproductive Plateaus",
                text: "Some patients notice temporary water retention, disrupted appetite cues, or stronger hunger later in the day after very intense exercise. These fluctuations can make progress feel inconsistent and emotionally draining.",
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

          {/* Pull Quote */}
          <blockquote className="pull-quote rounded-xl px-8 py-6 my-10 text-xl text-gray-700 leading-relaxed">
            "Some patients tell us that when they increase their gym routine too
            quickly, their appetite drops even further. This leaves them feeling
            drained halfway through a workout, unsure whether to push on or stop
            to rest."
          </blockquote>

          {/* Section 4 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Benefits of the Right Amount of Exercise (Evidence-Based)
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            According to the NHS, NICE, and{" "}
            <a
              href="https://www.bda.uk.com/resource/sport-exercise-nutrition.html"
              className="text-teal-600 hover:underline"
            >
              British Dietetic Association guidance
            </a>
            , moderate activity provides significant benefits:
          </p>
          <ul className="space-y-3 mb-5">
            {[
              "Improved cardiovascular health",
              "Better mood and reduced stress",
              "Enhanced appetite regulation",
              "Stronger metabolism",
              "Better sleep",
              "Long-term weight maintenance",
              "Reduced loss of muscle mass",
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
            The key is consistency, not intensity.
          </p>

          {/* Section 5 — Dual Product Cards */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Potential Side Effects When Mixing Intense Exercise with Weight-Loss
            Injections
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {/* Wegovy card */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
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

            {/* Mounjaro card */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
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
          </div>

          <p className="text-gray-600 leading-relaxed mb-5">
            People using Wegovy for weight loss may notice certain side effects,
            and high-intensity exercise can amplify them. These reactions are
            usually mild, but they're important signals to slow down and protect
            your body.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              {
                bold: "Dizziness due to lower blood sugar:",
                text: " As appetite is reduced, some patients unintentionally eat too little, which can cause shakiness or light-headedness during workouts.",
              },
              {
                bold: "Nausea from slower digestion:",
                text: " GLP-1 treatments delay stomach emptying, so intense movement after meals can increase discomfort or queasiness.",
              },
              {
                bold: "Fatigue caused by low-calorie intake:",
                text: " Reduced hunger may lead to under-fuelled training, leaving you tired much sooner than expected.",
              },
              {
                bold: "Dehydration, especially during cardio:",
                text: " Many people drink less because they feel less thirsty, making hydration essential when exercising regularly.",
              },
              {
                bold: "Muscle cramps from insufficient electrolytes:",
                text: " Sweating combined with a lower food intake can reduce electrolytes, causing cramping or muscle tightness.",
              },
              {
                bold: "Headaches linked to lowered appetite and hydration levels:",
                text: " Missing meals or drinking too little water can trigger headaches, particularly on active days.",
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
            In most cases, these symptoms are not harmful, but they signal that
            your body needs food, water, or rest. Listening to these signals
            helps you stay safe while maximising the benefits of your treatment.
          </p>

          {/* Section 6 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Emotional &amp; Psychological Impact
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Over exercising is not just physical. Emotionally, patients may
            feel:
          </p>
          <ul className="space-y-3 mb-5">
            {[
              'Pressure to "make the most" of the medication',
              "Anxiety about weight regain",
              "Guilt for resting",
              "Comparison with others",
              "Fear of eating more to support exercise",
              "Burnout from unrealistic goals",
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
            A balanced routine helps reduce this emotional burden.
          </p>

          {/* Section 7 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Who Is More Likely to Experience Issues from Over-Exercising?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            People new to exercise often need extra time for their bodies to
            adjust, especially when starting a weight-loss injection. Those
            eating very few calories may also struggle, as appetite suppression
            can mask the need for proper fuel. Individuals with medical
            conditions such as anaemia, thyroid disorders, PCOS, or heart
            concerns usually benefit from personalised exercise advice to stay
            safe.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            Patients who increase their dosage may notice stronger nausea or
            fatigue, making intense activity difficult during adjustment
            periods. Similarly, people using a weight loss injection once a week
            often experience reduced hunger on certain days, which can make
            over-exercising risky when energy levels are naturally lower.
          </p>

          {/* Section 8 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            When to Seek Medical Help
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            Seek medical support immediately if you experience severe dizziness,
            persistent vomiting, chest pain, extreme breathlessness, fainting,
            severe stomach pain, confusion, or a rapid heart rate. These
            symptoms can signal issues such as low blood sugar, dehydration, or
            other complications that may worsen quickly without proper care.
            Getting prompt medical attention ensures your safety, helps identify
            the underlying cause, and allows your treatment plan to be adjusted
            if needed.
          </p>

          {/* Section 9 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Practical Exercise Tips for Patients Using a Wegovy Injection
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Here are safe, practical steps to protect your progress:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              {
                title: "Eat before exercise",
                desc: "Eat a balanced meal or snack 1-2 hours before exercise.",
              },
              {
                title: "Stay hydrated",
                desc: "Stay hydrated throughout the day.",
              },
              {
                title: "Avoid fasted HIIT",
                desc: "Avoid fasted high-intensity training.",
              },
              {
                title: "Start moderate",
                desc: "Start with 20-30 minutes of moderate exercise.",
              },
              {
                title: "Increase slowly",
                desc: "Increase training slowly.",
              },
              {
                title: "Rest & sleep",
                desc: "Prioritise sleep and rest days.",
              },
              {
                title: "Listen to your body",
                desc: "Stop immediately if you feel faint or nauseous.",
              },
              {
                title: "Seek advice",
                desc: "Speak to a clinician if exercise regularly feels difficult.",
              },
              {
                title: "Low-impact options",
                desc: "Consider low-impact workouts like walking, swimming, pilates, or cycling.",
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

          {/* Section 10 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Move Forward With Strength and Self-Care
          </h2>

          <img
            src="/Images/blog-3-4.webp"
            alt="Move forward with strength and self-care"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            The bottom line is that exercising while using a weight loss
            injection is not just safe, it's beneficial when done correctly.
            Problems usually arise when people push too hard, restrict calories
            too aggressively, or ignore early warning signs from their bodies. A
            balanced routine, steady progression, and adequate nutrition offer
            the strongest long-term results.
          </p>
          <p className="text-gray-600 leading-relaxed mb-12">
            <a href="/" className="text-teal-600 hover:underline">
              Weight Loss Pharmacy
            </a>{" "}
            provides Wegovy prescriptions online, which are subject to medical
            review and are prescribed only when clinically appropriate.
            Maintaining a steady, supported lifestyle change remains central to
            long-term health management.
          </p>

          {/* FAQ */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-8">
            FAQs
          </h2>
          <div className="space-y-6 mb-14">
            {[
              {
                q: "1. Can I do high-intensity workouts while using a weight loss injection?",
                a: "Yes, but increase intensity gradually and make sure you are eating enough to fuel your body. Pushing too hard too soon can worsen fatigue, dizziness, or nausea.",
              },
              {
                q: "2. Why do I feel dizzy during workouts?",
                a: "Dizziness can happen because appetite suppression leads to lower calorie intake. Low blood sugar and dehydration can also contribute, especially during cardio.",
              },
              {
                q: "3. Do I need more protein when using weight loss medication?",
                a: "Many patients benefit from slightly higher protein to protect muscle while losing weight. Protein also helps stabilise energy and supports recovery after exercise.",
              },
              {
                q: "4. Is the weekly weight loss shot safe for gym beginners?",
                a: "Yes, but beginners should start with short, gentle sessions to let their bodies adjust. A slow and steady approach reduces strain and prevents early burnout.",
              },
              {
                q: "5. How do I avoid nausea when exercising?",
                a: "Avoid working out right after a large meal and sip water throughout the day. Choosing low-impact movement on days with stronger side effects can also help.",
              },
              {
                q: "6. Can I pause exercise during dose increases?",
                a: "Absolutely, many people take it easier while adjusting to a higher dose. Resting during this phase helps manage side effects and protects your energy.",
              },
              {
                q: "7. Does exercise help reduce side effects?",
                a: "Light movement can improve digestion, circulation, and mood. However, over-exercising can intensify nausea, dizziness, and fatigue.",
              },
              {
                q: "8. Will exercise speed up my results?",
                a: "Moderate, consistent activity supports better long-term progress. Extreme or rushed training rarely speeds up results and can set you back.",
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
                "https://www.nice.org.uk/guidance/ng246",
                "https://www.mayoclinic.org/",
                "https://www.bda.uk.com/resource/sport-exercise-nutrition.html",
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
