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
            src="/Images/blog-4-1.webp"
            alt="How to Balance Your Macronutrients While Using Wegovy for Weight Management"
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
                    January 21, 2026
                  </span>
                </div>
                <h1 className="editorial-title text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  How to Balance Your Macronutrients While Using Wegovy for
                  Weight Management
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
              How to Balance Your Macronutrients While Using Wegovy for Weight
              Management
            </span>
          </div>
        </div>

        {/* ── ARTICLE ── */}
        <article className="max-w-5xl mx-auto px-6 py-14 editorial-body">
          {/* Intro */}
          <p className="text-md text-gray-600 leading-relaxed mb-5 pb-5 border-b border-gray-100">
            How does balancing macronutrients support weight management while
            using Wegovy? People prescribed Wegovy are often advised to make
            dietary and lifestyle changes under medical guidance. Wegovy for
            weight loss may help control appetite, but long-term results rely on
            daily habits. Balanced nutrients support energy, fullness, and
            maintain consistent routines.
          </p>
          <p className="text-md text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            Macronutrients include protein, carbohydrates, and fats, all
            essential for normal body function. When using Wegovy injections,
            understanding how to balance these nutrients can support appetite
            control and overall well-being. A sensible, balanced approach to
            nutrition helps build healthy habits that continue safely over the
            long term.
          </p>

          {/* Key Takeaways */}
          <div className="key-takeaway rounded-2xl p-8 mb-12">
            <h3 className="editorial-title text-xl font-bold text-gray-900 mb-5">
              Key Facts About Wegovy and Macronutrient Balance
            </h3>
            <ul className="space-y-3">
              {[
                "Macronutrients like protein, carbohydrates, and fats are vital for weight loss while using Wegovy.",
                "A balanced macronutrient ratio supports energy levels, appetite control, and overall weight loss results.",
                "Wegovy weight loss works best when combined with proper dietary adjustments, including the right balance of macronutrients.",
                "Exercise, hydration, and mindset play significant roles in maximising weight loss with Wegovy.",
                "Accessing Wegovy through a trusted provider ensures safety and effectiveness in your weight loss journey.",
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
            Understanding Wegovy and How It Supports Weight Loss
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            <a
              href="/weight-loss-treatments/wegovy/"
              className="text-teal-600 hover:underline"
            >
              Wegovy
            </a>{" "}
            is a weight loss injection that contains semaglutide, a medication
            that mimics a natural hormone in the body called GLP-1. This hormone
            helps regulate blood sugar and suppresses appetite, leading to
            reduced food intake and weight loss.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            While Wegovy for weight loss can notably help with appetite control,
            it's important to note that diet still plays a pivotal role in the
            overall effectiveness of the treatment. When using this treatment,
            paying attention to a balanced and nutrient-dense diet remains
            important.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            Dietary habits can play a supportive role in weight management
            alongside prescribed treatment and may help individuals maintain
            changes over time as part of a broader, lifestyle-led approach.
          </p>

          {/* Section 2 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            What Are Macronutrients? A Simple Breakdown
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Macronutrients are the three main nutrients our bodies require in
            large amounts: protein, carbohydrates, and fats. Each macronutrient
            serves a specific purpose in maintaining bodily functions and
            supporting weight loss, particularly when using this weight loss
            treatment.
          </p>

          <div className="space-y-6 mb-10">
            {[
              {
                title: "Protein",
                text: "Helps build and repair muscles, keeps you feeling full longer, and supports metabolic health. For Wegovy users, protein helps counteract any potential muscle loss from weight loss.",
              },
              {
                title: "Carbohydrates",
                text: "The body's primary energy source. Carbs are essential for fueling workouts and keeping blood sugar stable. However, focusing on complex carbs (like whole grains) rather than simple carbs (like sugar) will support steady energy levels and prevent glucose spikes.",
                link: {
                  href: "https://www.bbcgoodfood.com/health/nutrition/all-you-need-to-know-about-carbohydrates",
                  text: "complex carbs",
                },
              },
              {
                title: "Fats",
                text: "Healthy fats are essential for hormone production, brain health, and keeping you satiated. Omega-3s found in fish or plant-based fats like avocado are excellent choices for those on a weight loss journey.",
                link: {
                  href: "https://www.nhs.uk/live-well/eat-well/food-types/different-fats-nutrition/",
                  text: "Omega-3s found in fish",
                },
              },
            ].map((item, i) => (
              <div key={i} className="border-b border-gray-100 pb-6">
                <h4 className="editorial-title font-bold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-md leading-relaxed">
                  {item.link
                    ? item.text.replace(item.link.text, "").split("").length > 0
                      ? (() => {
                          const parts = item.text.split(item.link.text);
                          return (
                            <>
                              {parts[0]}
                              <a
                                href={item.link.href}
                                className="text-teal-600 hover:underline"
                              >
                                {item.link.text}
                              </a>
                              {parts[1]}
                            </>
                          );
                        })()
                      : item.text
                    : item.text}
                </p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mb-10">
            Each of these macronutrients contributes to overall health and
            weight management, and understanding how to balance them can support
            dietary choices while using Wegovy as part of a medically supervised
            weight management plan.
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

          {/* Section 3 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Ideal Macronutrient Ratio for Weight Loss on Wegovy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            The optimal macronutrient ratio for weight loss on the injection can
            vary depending on individual needs, but generally, a balanced
            approach is recommended. Experts suggest the following{" "}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7589789/"
              className="text-teal-600 hover:underline"
            >
              ratio ranges
            </a>{" "}
            for macronutrients:
          </p>
          <ul className="space-y-4 mb-8">
            {[
              {
                bold: "Protein:",
                text: " 10–30% of your daily caloric intake",
              },
              {
                bold: "Carbohydrates:",
                text: " 45–65% of your daily caloric intake",
              },
              { bold: "Fats:", text: " 25–35% of your daily caloric intake" },
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
          <p className="text-gray-600 leading-relaxed mb-6">
            This balance ensures that your body receives enough energy to fuel
            workouts, build muscle, and manage hunger, while also supporting fat
            loss.
          </p>

          {/* Macronutrient Examples Grid */}
          <p className="text-gray-600 leading-relaxed mb-4 font-semibold">
            Macronutrient Breakdown Examples:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              {
                title: "Example 1 (2000-calorie diet)",
                items: ["Protein: 150–180g", "Carbs: 200–250g", "Fats: 45–67g"],
              },
              {
                title: "Example 2 (1500-calorie diet)",
                items: ["Protein: 113–135g", "Carbs: 150–188g", "Fats: 33–50g"],
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-gray-100 bg-gray-50"
              >
                <h4 className="editorial-title font-bold text-gray-900 mb-3">
                  {item.title}
                </h4>
                <ul className="space-y-1">
                  {item.items.map((li, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-md text-gray-500"
                    >
                      <span className="text-teal-500">✔</span> {li}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed mb-10">
            It's important to adjust the ratio based on your specific weight
            loss goals, activity level, and how your body responds to Wegovy.
          </p>

          {/* Section 4 — Meal Plan */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Sample Daily Wegovy-Friendly Meal Plan
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            To make it easier to understand how to incorporate the ideal
            macronutrient balance into your diet, here's a sample daily meal
            plan tailored for GLP-1 medication users. This plan focuses on
            nutrient-dense, low-calorie meals that help manage appetite while
            providing ample energy for physical activity.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: "Breakfast",
                items: [
                  "Scrambled eggs with spinach and mushrooms (Protein: 25g, Fat: 15g, Carbs: 10g)",
                  "A slice of whole grain toast with avocado (Protein: 3g, Fat: 12g, Carbs: 25g)",
                ],
              },
              {
                title: "Lunch",
                items: [
                  "Grilled chicken salad with mixed greens, cherry tomatoes, cucumbers, olive oil, and balsamic vinegar (Protein: 30g, Fat: 20g, Carbs: 12g)",
                ],
              },
              {
                title: "Dinner",
                items: [
                  "Baked salmon with roasted vegetables (zucchini, bell peppers, and broccoli) (Protein: 35g, Fat: 18g, Carbs: 20g)",
                ],
              },
              {
                title: "Snack",
                items: [
                  "Greek yogurt with chia seeds (Protein: 15g, Fat: 10g, Carbs: 12g)",
                ],
              },
            ].map((meal, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-gray-100 bg-gray-50"
              >
                <h4 className="editorial-title font-bold text-gray-900 mb-2">
                  {meal.title}
                </h4>
                <ul className="space-y-2">
                  {meal.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-md text-gray-500 leading-relaxed"
                    >
                      <span className="text-teal-500 mt-0.5">✔</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed mb-10">
            This meal plan provides a good balance of protein, healthy fats, and
            complex carbs, all while being rich in micronutrients to support
            overall health and weight loss.
          </p>

          {/* Pull Quote */}
          <blockquote className="pull-quote rounded-xl px-8 py-6 my-10 text-xl text-gray-700 leading-relaxed">
            "Sustainable weight management is achieved when medication
            complements healthy habits rather than replacing them."
          </blockquote>

          {/* Section 5 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Common Macronutrient Mistakes to Avoid While on Wegovy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            When using Wegovy injection for weight loss, there are a few common
            mistakes to watch out for:
          </p>
          <ul className="space-y-4 mb-10">
            {[
              {
                bold: "Not enough protein:",
                text: " Protein is essential for preserving muscle mass during weight loss. Make sure you're getting enough protein to support your weight loss goals.",
              },
              {
                bold: "Too few healthy fats:",
                text: " Healthy fats are crucial for hormone regulation and maintaining energy. Don't skip on good fats like avocados, nuts, and olive oil.",
              },
              {
                bold: "Too many refined carbs:",
                text: " Refined carbs, like white bread and sugary snacks, can cause blood sugar spikes and make it harder to maintain weight loss. Opt for whole grains and complex carbs instead.",
              },
              {
                bold: "Skipping meals:",
                text: " Skipping meals can lead to overeating later in the day and disrupt metabolism. Instead, focus on balanced meals and snacks to keep your appetite in check.",
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

          {/* Section 6 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Lifestyle Habits That Support Weight Management While Using Wegovy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Maximising weight loss with Wegovy involves more than just taking
            the injection. Consider these practices:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              {
                title: "Movement",
                desc: "Incorporate regular exercise into your routine to enhance fat burning and preserve lean muscle mass.",
              },
              {
                title: "Hydration",
                desc: "Staying hydrated supports metabolism and reduces hunger.",
              },
              {
                title: "Mindset",
                desc: "A positive mindset is essential for long-term success. Stay committed and consistent with your efforts.",
              },
              {
                title: "Habit formation",
                desc: "Establish healthy habits, like regular meal times and consistent physical activity, to maintain your results.",
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

          {/* Section 7 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            How Macronutrients and Lifestyle Management Affect Weight Loss with
            Wegovy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            The balance of macronutrients can influence how people feel while
            using a GLP-1 injection, including appetite, energy levels, and
            overall well-being. Adequate protein intake may help support
            feelings of fullness, while healthy fats contribute to steady
            energy. Balanced carbohydrates also play a role in maintaining
            stable blood glucose levels and reducing fatigue.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            For lasting results, Wegovy injection should be supported by
            long-term lifestyle changes under medical supervision. Regular
            eating patterns, ongoing physical activity, and positive daily
            routines help strengthen the effects of balanced nutrition.
            Sustainable weight management is achieved when medication
            complements healthy habits rather than replacing them.
          </p>

          {/* Section 8 — Bottom Line */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            The Bottom Line
          </h2>

          <p className="text-gray-600 leading-relaxed mb-5">
            Maintaining a balanced approach while using Wegovy means focusing on
            nutrition as part of a wider weight management plan. An appropriate
            balance of protein, healthy fats, and carbohydrates can help support
            energy levels and feelings of fullness. Wegovy for weight loss may
            form part of this structured approach when used under medical
            supervision alongside consistent dietary habits.
          </p>
          <p className="text-gray-600 leading-relaxed mb-12">
            Alongside nutrition, regular physical activity, adequate hydration,
            and a supportive mindset all play a role in overall wellbeing.
            Weight management is not limited to medication use alone and
            benefits from long-term lifestyle changes. Individuals who wish to
            review their progress can speak with a qualified healthcare
            professional at{" "}
            <a href="/" className="text-teal-600 hover:underline">
              Weight Loss Pharmacy
            </a>{" "}
            for personalised guidance and support.
          </p>

          {/* FAQ */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-8">
            FAQ
          </h2>
          <div className="space-y-6 mb-14">
            {[
              {
                q: "1. How can macronutrients affect my weight loss on Wegovy?",
                a: "The balance of protein, carbohydrates, and fats may influence appetite, energy levels, and how the body responds during treatment with Wegovy. Adequate protein intake can support satiety, healthy fats contribute to sustained energy, and balanced carbohydrates help maintain stable blood glucose levels as part of an overall dietary approach.",
              },
              {
                q: "2. What macronutrient ratio is best for weight loss on Wegovy?",
                a: "For optimal weight loss on Wegovy, aim for 25–30% protein, 40–50% carbohydrates, and 20–30% fats. This balance supports muscle preservation, energy levels, and fat loss while keeping hunger at bay.",
              },
              {
                q: "3. How can I maintain energy levels while using Wegovy?",
                a: "To maintain energy on weight loss injection, focus on a balanced diet rich in healthy fats and complex carbohydrates. These macronutrients help regulate glucose and prevent energy slumps, ensuring you stay active throughout the day.",
              },
              {
                q: "4. What are common mistakes when managing macronutrients on Wegovy?",
                a: "Common mistakes include not getting enough protein, skipping healthy fats, or consuming too many refined carbs. These errors can lead to increased hunger, decreased energy, and potential weight regain.",
              },
              {
                q: "5. How does Wegovy impact my appetite and hunger levels?",
                a: "Wegovy suppresses appetite, making it easier to stick to a healthy eating plan. However, balancing macronutrients in your diet is crucial to maintain this effect and prevent overeating when the medication's appetite-suppressing benefits wear off.",
              },
              {
                q: "6. Is it important to eat regularly while using Wegovy?",
                a: "Maintaining regular meals can help support nutritional intake and energy levels during treatment. As appetite may change while using Wegovy, some individuals may unintentionally eat less than intended. Paying attention to meal timing and food quality can help ensure nutritional needs are met, particularly when calorie intake is reduced.",
              },
              {
                q: "7. How can I create a Wegovy-friendly meal plan?",
                a: "To build a Wegovy-friendly meal plan, aim for balanced meals with lean proteins, healthy fats, and complex carbs. Ensure you're eating nutrient-dense foods that align with your macronutrient ratio for sustained weight loss.",
              },
              {
                q: "8. What lifestyle changes should I make alongside Wegovy for lasting weight loss?",
                a: "Alongside Wegovy, focusing on consistent physical activity, sufficient fluid intake, and regular, balanced meals may help support general health during treatment. Access to professional guidance can assist individuals in reviewing lifestyle habits in a structured and medically appropriate way.",
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
                "https://www.bbcgoodfood.com/health/nutrition/all-you-need-to-know-about-carbohydrates",
                "https://www.nhs.uk/live-well/eat-well/food-types/different-fats-nutrition/",
                "https://pmc.ncbi.nlm.nih.gov/articles/PMC7589789/",
                "https://www.nhs.uk/live-well/exercise/",
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
