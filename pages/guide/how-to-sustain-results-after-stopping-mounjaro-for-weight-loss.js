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
            alt="How to Sustain Results After Stopping Mounjaro for Weight Loss"
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
                    January 21, 2026
                  </span>
                </div>
                <h1 className="editorial-title text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  How to Sustain Results After Stopping Mounjaro for Weight Loss
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
              How to Sustain Results After Stopping Mounjaro for Weight Loss
            </span>
          </div>
        </div>

        {/* ── ARTICLE ── */}
        <article className="max-w-5xl mx-auto px-6 py-14 editorial-body">
          {/* Intro */}
          <p className="text-md text-gray-600 leading-relaxed mb-5 pb-5 border-b border-gray-100">
            Opting for Mounjaro treatment can be a powerful step in managing
            weight, but sustaining results after treatment requires a shift in
            approach. While Mounjaro for weight loss is most effective with
            dietary changes, physical activity, and medical guidance, lasting
            success lies in building sustainable, healthy habits once the
            injections end.
          </p>
          <p className="text-md text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            To maintain weight loss after stopping Mounjaro, focus on healthy
            habits: prioritise protein, fibre, and healthy fats, engage in
            exercise, ensure adequate sleep, and manage stress. Behavioural
            tools and regular doctor check-ins are essential for preventing
            weight regain and maintaining progress. This guide explains what to
            expect and how to continue your journey confidently.
          </p>

          {/* Key Takeaways */}
          <div className="key-takeaway rounded-2xl p-8 mb-12">
            <h3 className="editorial-title text-xl font-bold text-gray-900 mb-5">
              Essential Insights for Maintaining Weight Loss
            </h3>
            <ul className="space-y-3">
              {[
                "Weight management often continues beyond the end of treatment, with long-term progress relying on consistent daily habits rather than medication alone.",
                "Individual responses vary after stopping Mounjaro, and changes in appetite, routine, or motivation may develop gradually over time.",
                "Sustainable eating patterns and regular physical activity can help support weight stability when maintained consistently.",
                "Behavioural factors such as stress, emotional eating, and routine changes can influence outcomes and may benefit from ongoing awareness and support.",
                "Continued access to healthcare guidance can be helpful for reviewing progress and making adjustments based on individual needs.",
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
            What Happens When You Stop Mounjaro?
          </h2>

          {/* Image 2 */}
          <img
            src="/Images/blog-3-2.webp"
            alt="Mounjaro Pen"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            When you stop taking Mounjaro for weight loss, several physiological
            and lifestyle changes may occur. First, the{" "}
            <a
              href="https://www.sciencedirect.com/topics/medicine-and-dentistry/glucagon-like-peptide-1"
              className="text-teal-600 hover:underline"
            >
              suppression of appetite
            </a>{" "}
            and reduction in cravings that the weight-loss injection provides
            will gradually fade. Your metabolism may also slow down, and the
            weight loss you experienced could be harder to maintain.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Additionally, the healthy habits developed while on treatment may
            become less ingrained, making it easy to fall back into old
            routines. It is important to recognise that these changes are common
            after stopping treatment. Individual experiences vary, and some
            people may notice changes in appetite or weight over time.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            Ongoing attention to diet, physical activity, and behavioural habits
            may support weight management during this transition. Access to
            appropriate clinical guidance can help individuals review their
            approach and make adjustments where needed, based on personal health
            factors.
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
            Common Risks of Regaining Weight After Injection Discontinuation
          </h2>
          <p className="text-gray-600 text-md leading-relaxed mb-5">
            When prescription-only weight-loss injections are discontinued,
            individuals may face several risks that contribute to regaining lost
            weight. Here are the most common risks:
          </p>
          <ul className="space-y-4 mb-10">
            {[
              {
                bold: "Metabolic slowdown:",
                text: " Without the appetite-suppressing effects of weight-loss treatment, the body may adjust its metabolism, leading to a decrease in calorie burn.",
              },
              {
                bold: "Appetite changes:",
                text: " Weight loss injection Mounjaro helps regulate appetite, and once it's stopped, you may feel hungrier and more prone to overeating.",
              },
              {
                bold: "Returning to old habits:",
                text: " If the weight loss journey hasn't been paired with permanent lifestyle changes, old habits such as overeating or poor food choices may resurface.",
              },
              {
                bold: "Loss of motivation:",
                text: " Without the clear support of injection, some may struggle to maintain the motivation to continue with healthy eating and exercise.",
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

          {/* Section 3 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Strategy 1: Gradual Lifestyle &amp; Nutrition Adjustment
          </h2>

          {/* Image 3 */}
          <img
            src="/Images/blog-3-3.webp"
            alt="Gradual Lifestyle & Nutrition Adjustment"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            One of the most important strategies for sustaining weight loss
            after stopping Mounjaro is gradually adjusting your lifestyle and
            nutrition. This involves adopting{" "}
            <a
              href="https://www.nhs.uk/live-well/eat-well/"
              className="text-teal-600 hover:underline"
            >
              healthy eating habits
            </a>{" "}
            that are sustainable in the long term.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              {
                bold: "Healthy eating:",
                text: " Focus on nutrient-dense foods like vegetables, lean proteins, whole grains, and healthy fats. Aim to incorporate a variety of foods to avoid feelings of deprivation.",
              },
              {
                bold: "Portion control:",
                text: " Mounjaro for weight loss reduce appetite during treatment, affecting portion sizes. After discontinuation, it's important to remain mindful of portion control and recognise hunger and fullness cues. As appetite changes post-treatment, adjusting eating habits can help maintain weight management.",
              },
              {
                bold: "Balanced meals:",
                text: " Ensure that every meal contains a balance of macronutrients (protein, fat, carbohydrates) to keep you satisfied and energised throughout the day.",
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

          {/* Section 4 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Strategy 2: Sustainable Exercise &amp; Movement Plan
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Exercise is a key component of weight maintenance, and it's crucial
            to develop a sustainable movement plan that fits into your
            lifestyle. Here's how you can approach it:
          </p>
          <ul className="space-y-4 mb-5">
            {[
              {
                bold: "Low-impact exercises:",
                text: " If you experience joint issues or need a gentler approach, consider exercises like swimming, cycling, walking, or yoga. These are easy on the joints and can help maintain an active lifestyle without risking injury.",
              },
              {
                bold: "Realistic routines:",
                text: " Start with manageable goals. Begin with a 30-minute workout, three times a week, and gradually increase intensity as your stamina improves.",
              },
              {
                bold: "Consistency:",
                text: " Aim to make physical activity a regular part of your routine. Exercise isn't just about burning calories. It also helps regulate appetite, improve mental health, and prevent the metabolic slowdown that can occur after stopping weight loss injections.",
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
            At{" "}
            <a href="/" className="text-teal-600 hover:underline">
              Weight Loss Pharmacy
            </a>
            , we understand the importance of finding the right exercise plan
            that works for you, and we're here to offer support in your weight
            maintenance journey.
          </p>

          {/* Section 5 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Strategy 3: Behavioral &amp; Mindset Support
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Changing your mindset and behavior is crucial for long-term success
            in weight maintenance. Emotional eating, stress, and boredom can all
            contribute to weight regain.
          </p>
          <ul className="space-y-4 mb-10">
            {[
              {
                bold: "Habit formation:",
                text: " Focus on creating lasting habits that support your weight loss. This might include meal prepping, tracking your food, or simply being mindful of your eating habits.",
              },
              {
                bold: "Emotional eating awareness:",
                text: " Address any emotional triggers that may cause overeating. Techniques like journaling, meditation, or mindfulness can help you stay in tune with your body and emotions.",
              },
              {
                bold: "Self-monitoring:",
                text: " Regularly check in with yourself to monitor your progress. Keeping a food diary, tracking workouts, and measuring your progress can help you stay focused on your long-term goals.",
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
            Strategy 4: Periodic Maintenance &amp; Check-ins
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Even after discontinuing the weight loss shot of Mounjaro, periodic
            check-ins with a healthcare provider or nutritionist can help ensure
            that your weight loss journey remains on track.
          </p>
          <ul className="space-y-4 mb-5">
            {[
              {
                bold: "Clinical support:",
                text: " Many individuals benefit from continuing regular check-ins with a healthcare professional, who can guide you on adjusting your diet, exercise, and lifestyle habits.",
              },
              {
                bold: "Nutritionist guidance:",
                text: " A nutritionist can help you develop a personalised eating plan, ensuring that you are meeting all your nutritional needs while maintaining weight loss.",
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
            Regular assessments will help you stay accountable and address any
            issues that may arise during your maintenance phase.
          </p>

          {/* Section 7 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Strategy 5: Alternative Safe Medical or Non-Medical Supports
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            While Mounjaro for weight loss may no longer be part of your
            routine, there are other ways to support your weight loss and health
            goals:
          </p>
          <ul className="space-y-4 mb-5">
            {[
              {
                bold: "Medical supervision:",
                text: " If you're finding it difficult to sustain weight loss, alternative treatments or medications may be suitable for some individuals. Consult with a healthcare professional for guidance on the safest options.",
              },
              {
                bold: "Supplements:",
                text: " Some people may benefit from supplements that support metabolism or appetite control. However, always seek professional advice before adding anything new to your routine.",
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
            Remember, any new medical or non-medical support should be discussed
            with a healthcare provider to ensure it aligns with your overall
            health goals. At Weightloss Pharmacy, we're committed to helping you
            find the safest and most effective ways to maintain your weight
            loss.
          </p>

          {/* Section 8 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Tips for Long-Term Success After Weekly Weight Loss Injections
          </h2>

          {/* Image 4 */}
          <img
            src="/Images/blog-3-4.webp"
            alt="Tips for Long-Term Success After Weekly Weight Loss Injections"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            To support ongoing weight management after stopping Mounjaro for
            weight loss injections, the following considerations may be helpful.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                title: "Consistency is key",
                desc: "Stick to your new routine and make healthy eating and exercise a habit. Don't expect instant results; sustainable weight loss is a gradual process.",
              },
              {
                title: "Focus on progress, not perfection",
                desc: "Celebrate small victories and don't be discouraged by setbacks. Weight maintenance is an ongoing journey.",
              },
              {
                title: "Stay supported",
                desc: "Surround yourself with a support system, whether it's family, friends, or healthcare professionals, to keep you motivated.",
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

          {/* Conclusion */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Conclusion: Embrace Your Journey and Keep Pushing Forward
          </h2>

          {/* Pull Quote */}
          <blockquote className="pull-quote rounded-xl px-8 py-6 my-10 text-xl text-gray-700 leading-relaxed">
            "Weight management does not end when treatment stops, and continued
            focus on healthy routines may help support longer-term balance."
          </blockquote>

          <p className="text-gray-600 leading-relaxed mb-5">
            In summary, maintaining changes after stopping Mounjaro injections
            can present challenges, and individual experiences vary. Mounjaro
            for weight loss may form part of a broader weight management plan,
            but long-term stability often depends on ongoing attention to
            lifestyle habits.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Gradual adjustments to diet, regular physical activity, and support
            for mental well-being can play an important role in managing weight
            over time. Weight management does not end when treatment stops, and
            continued focus on healthy routines may help support longer-term
            balance. At{" "}
            <a href="/" className="text-teal-600 hover:underline">
              Weight Loss Pharmacy
            </a>
            , we offer expert support and guidance to help you maintain your
            weight loss and live a healthier lifestyle for the long term.
          </p>
          <p className="text-gray-600 leading-relaxed mb-12">
            If you are concerned about weight regain, speak with our qualified
            healthcare professional to explore appropriate medical and
            non-medical options. Ongoing support may include nutritional
            guidance, physical activity advice, and behavioural strategies to
            help individuals maintain healthy habits.
          </p>

          {/* FAQ */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-8">
            FAQ
          </h2>
          <div className="space-y-6 mb-14">
            {[
              {
                q: "1. How can I approach weight management after stopping Mounjaro injections?",
                a: "After stopping treatment, ongoing attention to lifestyle habits becomes important. Gradual adjustments to eating patterns, regular physical activity, and awareness of behavioural factors may support weight management over time. Some individuals also find periodic check-ins with a healthcare professional or nutrition specialist helpful when reviewing their approach.",
              },
              {
                q: "2. What happens to my metabolism after discontinuing Mounjaro?",
                a: "After stopping Mounjaro, your metabolism may slow down, making it harder to burn calories. Implementing healthy eating habits and regular exercise can help maintain your metabolic rate and prevent weight regain.",
              },
              {
                q: "3. Can weight changes occur after stopping Mounjaro?",
                a: "Changes in weight may occur for some individuals after treatment ends, as appetite and energy balance can shift over time. Maintaining mindful eating habits, portion awareness, and regular movement may help support weight management, although individual responses can vary.",
              },
              {
                q: "4. What considerations are there when stopping Mounjaro for weight loss?",
                a: "After discontinuing Mounjaro for weight loss, some people notice changes such as increased appetite or a return to previous routines. Reviewing nutrition, physical activity, and behavioural habits can be useful during this transition. Access to appropriate clinical guidance may help individuals make adjustments based on their personal health needs.",
              },
              {
                q: "5. How can I stay motivated after stopping Mounjaro?",
                a: "Staying motivated involves setting realistic goals, tracking progress, and surrounding yourself with a support system. Behavioural changes like mindfulness and self-monitoring can also help you stay on track with your weight loss journey.",
              },
              {
                q: "6. Does physical activity still matter after stopping Mounjaro?",
                a: "Physical activity continues to play a role in overall health after treatment has ended. Choosing activities that are appropriate for your fitness level, including low-impact or joint-friendly options where suitable, may support general wellbeing and help establish a consistent routine.",
              },
              {
                q: "7. What kind of diet should I follow after stopping Mounjaro?",
                a: "Focus on a balanced diet rich in fruits, vegetables, lean proteins, and whole grains. Portion control and mindful eating are key to preventing overeating and sustaining your weight loss after stopping Mounjaro.",
              },
              {
                q: "8. Can I get help maintaining my weight loss after Mounjaro?",
                a: "Yes, we do offer ongoing support through nutritional advice, regular check-ins with healthcare professionals, and personalised weight loss strategies to help you maintain your results after Mounjaro.",
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
                "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038",
                "https://www.sciencedirect.com/topics/medicine-and-dentistry/glucagon-like-peptide-1",
                "https://www.nhs.uk/live-well/eat-well/",
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
