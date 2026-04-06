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
            src="/Images/blog-5-1.webp"
            alt="Foods that help reduce nausea on Mounjaro"
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
                  Which Types of Foods Help Reduce Nausea or Digestive Issues
                  When Using Mounjaro for Weight Loss?
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
              Which Types of Foods Help Reduce Nausea or Digestive Issues When
              Using Mounjaro for Weight Loss?
            </span>
          </div>
        </div>

        {/* ── ARTICLE ── */}
        <article className="max-w-5xl mx-auto px-6 py-14 editorial-body">
          {/* Intro */}
          <p className="text-md text-gray-600 leading-relaxed mb-5 pb-5 border-b border-gray-100">
            Experiencing nausea or digestive discomfort after starting Mounjaro
            for weight loss? You're not alone. Stomach pain, nausea, and
            bloating are common side effects, especially during the initial
            adjustment period. While these symptoms can affect appetite and food
            tolerance, they often improve with time.
          </p>
          <p className="text-md text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            In this blog, we'll dive into how smart food choices, like lean
            proteins, whole grains, and low glycemic fruits and veggies, can
            ease digestive discomfort. Thoughtful meal planning, combined with
            clinical oversight, can support your journey and help minimise side
            effects for a smoother experience with Mounjaro.
          </p>

          {/* Key Takeaways */}
          <div className="key-takeaway rounded-2xl p-8 mb-12">
            <h3 className="editorial-title text-xl font-bold text-gray-900 mb-5">
              Key Dietary Tips for Easing Mounjaro's Digestive Issues
            </h3>
            <ul className="space-y-3">
              {[
                "Mounjaro for weight loss can cause nausea or digestive discomfort, but diet adjustments can help alleviate these issues.",
                "Foods like bananas, rice, and toast (BRAT diet) are great for reducing nausea.",
                "Hydration-supportive foods, such as ginger and broths, help soothe the stomach.",
                "Lean proteins, high-fibre vegetables, and small meals are ideal for digestion support.",
                "Avoid greasy, spicy, and carbonated foods that can worsen nausea or bloating.",
                "Mounjaro prescriptions are available online through trusted clinics for safe access and expert guidance.",
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
            Why Mounjaro Can Cause Nausea or Digestive Issues
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Mounjaro for weight loss works by mimicking two hormones,{" "}
            <a
              href="https://www.ncbi.nlm.nih.gov/books/NBK279038/"
              className="text-teal-600 hover:underline"
            >
              GLP-1 and GIP
            </a>
            , which help regulate blood sugar and control appetite. These
            effects aid in weight loss by reducing hunger and stabilising blood
            sugar. They can sometimes lead to nausea, bloating, or digestive
            discomfort, particularly during the body's adjustment period.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            The{" "}
            <a
              href="/weight-loss-treatments/mounjaro/"
              className="text-teal-600 hover:underline"
            >
              Mounjaro injection
            </a>{" "}
            also slows gastric emptying, causing food to stay in the stomach
            longer, which can result in feelings of fullness or discomfort.
            Additionally, appetite suppression may lead to sickness, especially
            when adjusting to smaller meals.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            These digestive issues are usually temporary and subside as the body
            adapts to the medication. In the meantime, mindful food choices can
            help reduce nausea and manage discomfort throughout your weight loss
            journey.
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
            Best Foods to Help Reduce Nausea While Using Mounjaro
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            If you're experiencing indigestion while using Mounjaro, there are
            several foods that can help soothe your stomach and ease discomfort.
            Here are some of the best foods for reducing nausea:
          </p>

          {/* BRAT Diet */}
          <h3 className="editorial-title text-xl font-bold text-gray-900 mb-4">
            BRAT Diet (Bananas, Rice, Apple sauce, Toast)
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            The{" "}
            <a
              href="https://www.healthline.com/health/brat-diet"
              className="text-teal-600 hover:underline"
            >
              BRAT diet
            </a>{" "}
            is a well-known approach for calming an upset stomach. It consists
            of bland foods that are easy to digest, which can help reduce nausea
            and stomach irritation.
          </p>
          <ul className="space-y-4 mb-6">
            {[
              {
                bold: "Bananas:",
                text: " Mild and easy to digest, bananas are rich in potassium and help replenish electrolytes lost during nausea.",
              },
              {
                bold: "Rice:",
                text: " Plain rice is gentle on the stomach and provides a simple source of carbohydrates without upsetting digestion.",
              },
              {
                bold: "Apple sauce:",
                text: " Mild and soothing, apple sauce is a great way to get some vitamins without overwhelming the stomach.",
              },
              {
                bold: "Toast:",
                text: " Plain, dry toast can help absorb excess stomach acid and provide a solid base for meals.",
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

          <img
            src="/Images/blog-5-2.webp"
            alt="BRAT diet foods for nausea"
            className="w-full rounded-2xl mb-8"
          />

          {/* Simple Carbohydrates */}
          <h3 className="editorial-title text-xl font-bold text-gray-900 mb-4">
            Simple Carbohydrates
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Carbohydrates are easy to digest and provide energy without causing
            digestive issues. Opt for simple carbs like crackers, plain pasta,
            and mashed potatoes to settle your stomach.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              {
                bold: "Plain crackers:",
                text: " These are an excellent snack option for those feeling nauseous, as they are dry and mild.",
              },
              {
                bold: "Boiled potatoes:",
                text: " Easy on the stomach, potatoes provide a comforting, easy-to-digest carbohydrate.",
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

          {/* Ginger */}
          <h3 className="editorial-title text-xl font-bold text-gray-900 mb-4">
            Ginger-Based Foods
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Ginger has long been known for its ability to soothe the stomach and
            reduce nausea. Incorporating ginger into your diet can help{" "}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6341159/"
              className="text-teal-600 hover:underline"
            >
              settle your digestive system
            </a>{" "}
            while using Mounjaro for weight loss.
          </p>
          <ul className="space-y-4 mb-6">
            {[
              {
                bold: "Ginger tea:",
                text: " Ginger tea is a warm, soothing drink that can calm nausea and aid digestion.",
              },
              {
                bold: "Ginger chews:",
                text: " Convenient and portable, ginger chews can be a quick solution for soothing stomach discomfort.",
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

          <img
            src="/Images/blog-5-3.webp"
            alt="Ginger based foods for digestion"
            className="w-full rounded-2xl mb-8"
          />

          {/* Hydration */}
          <h3 className="editorial-title text-xl font-bold text-gray-900 mb-4">
            Hydration-Supportive Foods
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            <a
              href="https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/water-drinks-nutrition/"
              className="text-teal-600 hover:underline"
            >
              Staying hydrated is crucial
            </a>{" "}
            while using weight loss shot Mounjaro, especially if you're
            experiencing nausea or digestive discomfort. Certain foods can help
            keep you hydrated and soothe your stomach.
          </p>
          <ul className="space-y-4 mb-12">
            {[
              {
                bold: "Clear broths:",
                text: " These are light on the stomach, hydrating, and easy to digest.",
              },
              {
                bold: "Coconut water:",
                text: " Rich in electrolytes, coconut water helps replenish lost fluids and support digestion.",
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
            Foods That Support Digestion During Mounjaro Treatment
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            To reduce digestive discomfort, it's important to focus on foods
            that are gentle on the digestive system while still providing the
            nutrients your body needs. Here are some options:
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                title: "High-Fibre Gentle Options",
                items: [
                  {
                    bold: "Oats:",
                    text: " A good source of soluble fibre that can help regulate digestion without irritating the stomach.",
                  },
                  {
                    bold: "Sweet potatoes:",
                    text: " Gentle on the stomach, rich in fibre, and packed with vitamins.",
                  },
                ],
              },
              {
                title: "Lean Proteins",
                items: [
                  {
                    bold: "Chicken or turkey breast:",
                    text: " Easy to digest and provide high-quality protein.",
                  },
                  {
                    bold: "Fish:",
                    text: " Salmon or cod are rich in omega-3 fatty acids and easy on the digestive system.",
                  },
                ],
              },
              {
                title: "Easily Digested Cooked Vegetables",
                items: [
                  {
                    bold: "Carrots:",
                    text: " Full of nutrients and easy to digest when cooked.",
                  },
                  {
                    bold: "Zucchini:",
                    text: " Light and mild, easily incorporated into meals.",
                  },
                ],
              },
            ].map((group, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-gray-100 bg-gray-50"
              >
                <h4 className="editorial-title font-bold text-gray-900 mb-3">
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-md text-gray-600 leading-relaxed"
                    >
                      <strong className="text-gray-800">{item.bold}</strong>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section 4 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Foods and Eating Habits to Avoid If You Feel Nauseous
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            Certain foods can amplify nausea or digestive discomfort,
            particularly when using Mounjaro for weight loss in the UK. It is
            best to avoid greasy or fried foods, as they are{" "}
            <a
              href="https://www.healthline.com/nutrition/greasy-food"
              className="text-teal-600 hover:underline"
            >
              difficult to digest
            </a>{" "}
            and can worsen nausea and bloating. Excessively spicy meals can
            irritate the stomach lining, leading to increased digestive
            discomfort. Moreover, large portions may overwhelm the digestive
            system, resulting in nausea. High-fat dairy products can cause
            bloating and discomfort, and carbonated drinks introduce gas into
            the digestive system, further contributing to bloating and
            discomfort. Avoiding these foods until symptoms subside can help
            ease digestive issues during your weight loss journey.
          </p>

          {/* Section 5 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Practical Eating Tips for Managing Mounjaro Side Effects
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            In addition to choosing the right foods, adopting certain eating
            habits can help manage the side effects of weight loss shot
            Mounjaro. Eating slowly is important as consuming food too quickly
            can lead to discomfort, bloating, and sickness; take your time with
            each bite and chew your food thoroughly.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            It's also essential to stop eating when you feel full, even if there
            is food left on your plate, as this helps prevent overeating.
            Staying hydrated by drinking plenty of water throughout the day
            supports digestion and overall well-being.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            Furthermore, avoiding lying down right after meals is crucial, as
            lying down can slow digestion and worsen nausea. Instead, try to
            stay upright for at least 30 minutes after eating.
          </p>

          {/* Section 6 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            When Symptoms Persist | Getting Support
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            If digestive discomfort persists despite dietary adjustments, it's
            important to seek professional help. Weightloss Pharmacy offers
            Mounjaro prescriptions online with medical guidance to ensure your
            weight loss journey is safe and effective. If symptoms interfere
            with daily life, a healthcare provider can adjust your treatment
            plan to better suit your needs.
          </p>

          {/* Section 7 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Mounjaro &amp; Food Timing Tips
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The timing of your meals can also impact how your body reacts to
            Mounjaro for weight loss:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                title: "Meal Spacing",
                desc: "Try to space meals evenly throughout the day to avoid overwhelming your stomach.",
              },
              {
                title: "Injection-Day Adjustments",
                desc: "Consider modifying your eating schedule on the days you take the Mounjaro weight loss injection to avoid discomfort.",
              },
              {
                title: "Morning vs Evening Options",
                desc: "You may find it helpful to eat smaller, lighter meals in the evening to prevent digestive issues overnight.",
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
            Long-Term Lifestyle Support While Using Mounjaro Injection UK
          </h2>

          <img
            src="/Images/blog-5-4.webp"
            alt="Long-term lifestyle support with Mounjaro"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            For longer-term comfort while using treatment, establishing steady
            and sustainable habits is important. Mounjaro injection UK is
            prescribed as part of a wider, clinician-led approach rather than a
            standalone solution. Consistent meal times and regular physical
            activity can help the body adapt to appetite changes.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            These routines support digestion and make it easier to manage hunger
            cues safely over time. Balanced meals play an important role in
            supporting overall well-being during treatment. Including adequate
            protein, fibre, and healthy fats can help with feelings of fullness
            and digestive comfort.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Paying attention to hunger and fullness signals also helps avoid
            over- or under-eating. This mindful approach supports a healthier
            relationship with food as part of long-term weight management.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            <strong>Note:</strong> Mounjaro should only be prescribed by a
            qualified healthcare professional, based on individual assessment
            and suitability.
          </p>

          {/* Conclusion */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Conclusion: Embrace Better Health with Mounjaro
          </h2>

          {/* Pull Quote */}
          <blockquote className="pull-quote rounded-xl px-8 py-6 my-10 text-xl text-gray-700 leading-relaxed">
            "Digestive discomfort during weight management can often be
            alleviated with appropriate food choices and mindful eating habits.
            Focusing on gentle, easy-to-digest foods and maintaining consistent
            eating routines may help reduce symptoms and support overall
            well-being."
          </blockquote>

          <p className="text-gray-600 leading-relaxed mb-12">
            If digestive symptoms persist or worsen, it is important to seek
            advice from a qualified healthcare professional.{" "}
            <a href="/" className="text-teal-600 hover:underline">
              Weightloss Pharmacy
            </a>{" "}
            offers clinically led wellbeing support, Mounjaro prescriptions
            online, and expert medical oversight, ensuring decisions are guided
            by professional assessment, with a focus on safety and appropriate
            care.
          </p>

          {/* FAQ */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-8">
            FAQ
          </h2>
          <div className="space-y-6 mb-14">
            {[
              {
                q: "1. Does Mounjaro cause nausea?",
                a: "Yes, nausea is a common side effect of Mounjaro for weight loss as the body adjusts to the medication. Eating bland, stomach-friendly foods like bananas and rice can help alleviate this discomfort.",
              },
              {
                q: "2. What foods should I avoid while using Mounjaro?",
                a: "Avoid greasy, fried foods, excessive spice, large portions, high-fat dairy, and carbonated drinks, as they can exacerbate nausea or digestive issues while using Mounjaro weight loss UK.",
              },
              {
                q: "3. Can Mounjaro help with digestive issues?",
                a: "Mounjaro for weight loss is not intended to treat digestive problems, though some people may notice changes as their body adjusts to treatment. Eating a balanced diet with adequate fibre, lean protein, and staying well hydrated may help support digestive comfort. Persistent symptoms should be discussed with a UK-licensed healthcare professional.",
              },
              {
                q: "4. How can I reduce nausea while using Mounjaro?",
                a: "Consuming mild, easy-to-digest foods like crackers, plain toast, and ginger-based products can help manage nausea. Staying hydrated with clear broths and ginger tea also supports digestive comfort.",
              },
              {
                q: "5. Is it safe to obtain Mounjaro online in the UK?",
                a: "Mounjaro for weight loss can be supplied online following a medical assessment by a UK-licensed healthcare professional. It should only be obtained from a registered UK pharmacy that provides appropriate checks, monitoring, and patient support to ensure safe use.",
              },
              {
                q: "6. How long does nausea last while using Mounjaro?",
                a: "Nausea is a commonly reported side effect when starting Mounjaro or during dose increases. For many people, this symptom may lessen as the body adjusts to the medication over time. The duration can vary between individuals, and any persistent or severe symptoms should be discussed with a UK-licensed healthcare professional.",
              },
              {
                q: "7. Can I exercise while using Mounjaro?",
                a: "Yes, gentle exercise like walking or light stretching can improve digestion and reduce stress. Regular physical activity can also support Mounjaro's weight loss effects and promote overall well-being.",
              },
              {
                q: "8. What should I do if I feel fatigued on Mounjaro?",
                a: "Fatigue is a common side effect of Mounjaro weight loss UK. To manage it, try incorporating small, frequent meals, staying hydrated, and getting plenty of rest. If fatigue persists, discuss it with your healthcare provider.",
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
                "https://www.ncbi.nlm.nih.gov/books/NBK279038/",
                "https://www.healthline.com/health/brat-diet",
                "https://pmc.ncbi.nlm.nih.gov/articles/PMC6341159/",
                "https://www.healthline.com/nutrition/greasy-food",
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
