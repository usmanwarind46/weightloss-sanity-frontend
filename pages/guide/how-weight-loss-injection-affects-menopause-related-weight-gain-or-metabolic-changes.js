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
            alt="Weight loss injection and menopause"
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
                  How Weight-Loss Injection Affects Menopause Related Weight
                  Gain or Metabolic Changes
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
              How Weight-Loss Injection Affects Menopause Related Weight Gain or
              Metabolic Changes
            </span>
          </div>
        </div>

        {/* ── ARTICLE ── */}
        <article className="max-w-5xl mx-auto px-6 py-14 editorial-body">
          {/* Intro */}
          <p className="text-md text-gray-600 leading-relaxed mb-5 pb-5 border-b border-gray-100">
            As women go through menopause, many experience significant changes
            in their metabolism, appetite, and fat distribution. Hormonal
            shifts, especially the decline in oestrogen, can cause weight gain,
            particularly around the abdomen. These metabolic changes can make it
            harder to lose weight, leading many women to seek additional support
            through medical treatments.
          </p>
          <p className="text-md text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            One such treatment gaining popularity is the weight loss injection
            Mounjaro. This injection helps manage weight by regulating appetite,
            improving insulin sensitivity, and reducing fat storage. This
            article explores how Mounjaro aids weight loss, helps with
            menopause-related weight gain, and why it may be an effective
            solution for women in this stage of life.
          </p>

          {/* Key Takeaways */}
          <div className="key-takeaway rounded-2xl p-8 mb-12">
            <h3 className="editorial-title text-xl font-bold text-gray-900 mb-5">
              Key Factors to Consider When Using Mounjaro During Menopause
            </h3>
            <ul className="space-y-3">
              {[
                "Mounjaro for weight loss helps regulate appetite, improve insulin sensitivity, and reduce abdominal fat, making it beneficial for menopause-related weight gain.",
                "Weight loss injection Mounjaro targets metabolic changes during menopause by controlling hunger and stabilising blood sugar levels.",
                "These injections support weight management but should be combined with a healthy lifestyle, including diet and exercise.",
                "Mounjaro weight loss UK offers benefits for women who struggle with hormonal changes, appetite regulation, and weight gain during menopause.",
                "Side effects like mild nausea can occur, but Mounjaro weight loss injection is a valuable tool for managing weight during menopause.",
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
            How Menopause Impacts Weight, Appetite, and Metabolism
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Menopause triggers a variety of changes in a woman's body that can
            affect weight and metabolism:
          </p>

          <div className="space-y-6 mb-10">
            {[
              {
                title: "Oestrogen Decline",
                text: "As oestrogen levels naturally decrease during menopause, women often experience an increase in fat storage, particularly around the abdominal area. This hormonal shift alters fat distribution, making it easier for weight to accumulate and harder to shed. The result is a more challenging weight-loss process as the body adapts to lower oestrogen levels.",
              },
              {
                title: "Muscle Mass Reduction",
                text: "Oestrogen is essential for maintaining muscle mass in women, and its decline during menopause leads to a natural decrease in muscle tissue. This loss of muscle mass contributes to a slower metabolism, as muscles burn more calories even at rest. With less muscle and a slower metabolism, weight gain becomes more common and harder to manage.",
              },
              {
                title: "Slower Metabolism",
                text: "As the body's metabolism slows during menopause, fewer calories are burned at rest, making it easier to gain weight and harder to lose it. This slowdown is often exacerbated by the loss of muscle mass, as muscle tissue burns more calories than fat. A reduced metabolic rate means that even small increases in caloric intake can lead to weight gain.",
              },
              {
                title: "Increased Abdominal Fat",
                text: "Many women notice that during menopause, fat tends to accumulate around the midsection, particularly in the abdominal area. This is known as visceral fat, and it is often the most stubborn type of fat to lose, even with regular exercise and a balanced diet. Increased abdominal fat can also heighten the risk of metabolic diseases like Type 2 diabetes and cardiovascular issues.",
              },
              {
                title: "Appetite and Satiety Changes",
                text: "Hormonal fluctuations during menopause can disrupt the body's appetite regulation mechanisms, leading to increased hunger or difficulty feeling full after eating. These changes in satiety can cause some women to overeat or make unhealthy food choices, further complicating weight management. This can lead to unwanted weight gain if left unaddressed.",
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

          {/* Section 2 — Dual Product Cards */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            How Weight-Loss Injections Work During Menopause
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

          {/* Section 2 continued */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Mounjaro for weight loss
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            It works by mimicking two natural hormones in the body, GLP-1
            (glucagon-like peptide-1) and GIP (gastric inhibitory peptide).
            These hormones play essential roles in regulating blood sugar,
            appetite, and fat storage. Here's how{" "}
            <a
              href="/weight-loss-treatments/mounjaro/"
              className="text-teal-600 hover:underline"
            >
              Mounjaro weight loss injection
            </a>{" "}
            can help with menopause-related metabolic changes:
          </p>

          <div className="space-y-6 mb-10">
            {[
              {
                title: "Appetite Regulation",
                text: "The weight loss medication helps to regulate appetite by mimicking the action of natural hormones like GLP-1 and GIP, which control hunger signals in the brain. For menopausal women, who often experience increased appetite and cravings due to hormonal fluctuations, this effect is particularly beneficial. By increasing feelings of fullness, weight loss injection Mounjaro makes it easier to manage portion sizes, leading to a reduction in calorie intake and more effective weight management.",
              },
              {
                title: "Blood Sugar Control",
                text: "Mounjaro for weight loss improves insulin sensitivity by enhancing the body's ability to use insulin more efficiently. This is especially important for menopausal women who may face insulin resistance, a common issue during this stage of life. By stabilising blood sugar levels, weight loss injection Mounjaro helps to reduce fluctuations in hunger and energy, which can also contribute to weight loss and improved metabolic health.",
              },
              {
                title: "Slower Gastric Emptying",
                text: "One of Mounjaro's key mechanisms is slowing down the rate at which food leaves the stomach, a process known as gastric emptying. This leads to prolonged feelings of fullness, which helps control hunger and prevent overeating. For menopausal women, this effect is particularly valuable, as it helps reduce the challenges of managing cravings and portion sizes.",
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
            How Injections May Help With Menopause-Related Body Changes
          </h2>

          <img
            src="/Images/blog-4-2.webp"
            alt="How injections help with menopause-related body changes"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            For menopausal women dealing with weight gain and metabolic changes,
            the weight loss injection offers several key benefits:
          </p>
          <ul className="space-y-4 mb-10">
            {[
              {
                bold: "Reduced Appetite:",
                text: " Weight loss shot Mounjaro helps curb hunger, making it easier to manage portion sizes and calorie intake.",
              },
              {
                bold: "Improved Insulin Sensitivity:",
                text: " As insulin resistance increases during menopause, weight-loss medication helps the body process glucose more effectively, reducing the risk of weight gain.",
              },
              {
                bold: "Stabilised Energy Levels:",
                text: " By regulating blood sugar levels and reducing hunger, Mounjaro weight loss in the UK helps maintain steady energy levels throughout the day.",
              },
              {
                bold: "Reduced Visceral Fat:",
                text: " The injection reduces visceral fat, which is the fat stored around internal organs, and is particularly effective at reducing this harmful type of fat. A recent body-composition study found that tirzepatide noticeably reduced total fat mass, visceral adipose tissue (VAT), and waist circumference in overweight and obese adults.",
              },
              {
                bold: "Improved Metabolic Markers:",
                text: " Weekly tirzepatide dose has shown improvement in metabolic health, including cholesterol and blood pressure, which can help reduce menopause-related health risks.",
              },
              {
                bold: "Better Ability to Maintain a Calorie Deficit:",
                text: " Mounjaro makes it easier to stay in a calorie deficit, which is necessary for weight loss.",
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
            Common Side Effects &amp; Considerations for Menopausal Users
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            While Mounjaro weight loss in the UK is generally safe, there are
            some potential side effects to be aware of:
          </p>
          <ul className="space-y-4 mb-10">
            {[
              {
                bold: "Mild Nausea:",
                text: " One of the most common side effects is nausea, especially during the first few days of using the injection. This usually subsides as the body adjusts.",
              },
              {
                bold: "Digestive Changes:",
                text: " Some users experience digestive issues, such as constipation or diarrhoea. It's important to stay hydrated and eat a balanced diet.",
              },
              {
                bold: "Hormonal Symptoms:",
                text: " The weight loss injection does not replace hormone replacement therapy (HRT) for menopausal symptoms, and women may still need separate management for hot flashes or mood swings.",
              },
              {
                bold: "Not a Replacement for Lifestyle Changes:",
                text: " While Mounjaro for weight loss can aid in weight management, it is not a substitute for maintaining a healthy diet and regular physical activity.",
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

          {/* Section 5 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Lifestyle Strategies to Enhance Results During Menopause
          </h2>

          <img
            src="/Images/blog-4-3.jpg"
            alt="Lifestyle strategies during menopause"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            To get the most out of weight loss treatment, incorporating healthy
            lifestyle habits can noticeably enhance weight loss results.
            Consuming high-protein meals is essential to maintain muscle mass,
            which is particularly important during menopause when muscle loss is
            more common.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Engaging in strength-training exercises, such as resistance
            training, helps counteract muscle loss and boosts metabolism, making
            weight loss more effective. Additionally, low-impact fitness
            activities like walking, swimming, and cycling are ideal for
            menopausal women who want to stay active without putting excess
            strain on their joints.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Finally, staying well-hydrated, eating meals at regular intervals,
            and prioritising good sleep hygiene can support overall well-being,
            helping to maximise the benefits of weight loss efforts.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            <strong>Note:</strong> Mounjaro is a prescription-only medication
            and should only be used under the supervision of a licensed
            healthcare professional.
          </p>

          {/* Section 6 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Safety and Medical Oversight
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Prescription-only medicines are considered only when clinically
            appropriate and following an assessment by a UK-licensed healthcare
            professional. Medical review focuses on suitability, safety, and
            individual health needs, with ongoing monitoring where required.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            Lifestyle measures such as nutrition, physical activity, and general
            wellbeing remain important parts of long-term health management.{" "}
            <a
              href="/weight-loss-treatments/mounjaro/"
              className="text-teal-600 hover:underline"
            >
              Weight Loss Pharmacy
            </a>{" "}
            provides clinically led wellbeing support and medical oversight, in
            line with professional standards and regulatory guidance.
          </p>

          {/* Section 7 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Empower Your Weight Loss Journey with Mounjaro
          </h2>

          <img
            src="/Images/blog-4-4.webp"
            alt="Empower your weight loss journey with Mounjaro"
            className="w-full rounded-2xl mb-6"
          />

          <p className="text-gray-600 leading-relaxed mb-5">
            Weight loss injections like Mounjaro provide valuable support for
            women facing menopause-related weight gain and metabolic changes. By
            helping to regulate appetite and improve insulin sensitivity. The
            weekly weight loss shot Mounjaro can assist you in regaining control
            of your weight and overall health during this important stage of
            life.
          </p>
          <p className="text-gray-600 leading-relaxed mb-12">
            For lasting results, it's essential to pair this treatment with a
            healthy lifestyle.{" "}
            <a href="/" className="text-teal-600 hover:underline">
              Weight Loss Pharmacy
            </a>{" "}
            provides clinically led wellbeing support and medical oversight,
            with all treatment decisions guided by assessment from a UK-licensed
            healthcare professional and a focus on safety and appropriate care.
          </p>

          {/* FAQ */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-8">
            FAQ
          </h2>
          <div className="space-y-6 mb-14">
            {[
              {
                q: "1. What is the cost of Mounjaro weight loss injections in the UK?",
                a: "The cost of Mounjaro weight loss UK injections in the UK typically ranges from £150 to 300/month, depending on dosage and the supplier.",
              },
              {
                q: "2. How long should you use Mounjaro for weight loss during menopause?",
                a: "Mounjaro can be used as long as needed to achieve weight loss goals, but it should be monitored and reviewed regularly with a healthcare provider.",
              },
              {
                q: "3. Can Mounjaro help with hormonal weight gain during menopause?",
                a: "Yes, Mounjaro helps manage appetite and improves insulin sensitivity, which can assist with weight gain related to hormonal changes during menopause.",
              },
              {
                q: "4. Is Mounjaro safe for menopausal women with diabetes?",
                a: "Yes, Mounjaro is safe for menopausal women with Type 2 diabetes and can help with blood sugar control and weight loss.",
              },
              {
                q: "5. How can I get a Mounjaro prescription online?",
                a: "You can get a Mounjaro prescription online through licensed pharmacies like Weight Loss Pharmacy after completing a medical assessment.",
              },
              {
                q: "6. What are the side effects of Mounjaro weight loss injections?",
                a: "Common side effects include mild nausea, digestive changes, and occasionally headaches or dizziness, which usually subside over time.",
              },
              {
                q: "7. Does Mounjaro work for weight loss after menopause?",
                a: "Yes, Mounjaro can support weight loss after menopause by regulating appetite and improving metabolic function.",
              },
              {
                q: "8. Can Mounjaro reduce visceral fat during menopause?",
                a: "Yes, Mounjaro helps reduce visceral fat, particularly around the abdomen, which is common during menopause.",
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
                "https://my.clevelandclinic.org/health/body/21893-metabolism",
                "https://www.nhs.uk/conditions/menopause/symptoms/",
                "https://www.madisonwomensclinic.com/menopause-and-insulin-resistance/",
                "https://www.researchgate.net/publication/383809274_The_Effect_of_Tirzepatide_on_Body_Composition_in_People_with_Overweight_and_Obesity_A_Systematic_Review_of_Randomized_Controlled_Studies",
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
