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
            src="/Images/blog-7-1.webp"
            alt="Physical activity and Wegovy injection"
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
                    Wegovy
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-xs text-white/70 editorial-body">
                    January 21, 2026
                  </span>
                </div>
                <h1 className="editorial-title text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  How Physical Activity Supports Care While Using Wegovy
                  Injection
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
              How Physical Activity Supports Care While Using Wegovy Injection
            </span>
          </div>
        </div>

        {/* ── ARTICLE ── */}
        <article className="max-w-5xl mx-auto px-6 py-14 editorial-body">
          {/* Intro */}
          <p className="text-md text-gray-600 leading-relaxed mb-5 pb-5 border-b border-gray-100">
            Physical activity is an essential part of a comprehensive care plan
            for individuals using Wegovy injection under medical supervision.
            While the medication regulates appetite, long-term weight management
            relies on consistent, healthy habits. Staying active helps preserve
            muscle mass, supports energy levels, and boosts general well-being
            alongside treatment.
          </p>
          <p className="text-md text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            Exercise, especially strength training, can prevent muscle loss
            common during weight loss, enhance calorie burning, and improve
            heart health. Whether new to physical activity or returning after a
            break, incorporating movement into your routine helps maintain
            structure and supports the treatment's overall effectiveness.
          </p>

          {/* Key Takeaways */}
          <div className="key-takeaway rounded-2xl p-8 mb-12">
            <h3 className="editorial-title text-xl font-bold text-gray-900 mb-5">
              Key Points About Wegovy and Exercise
            </h3>
            <ul className="space-y-3">
              {[
                "Wegovy injection helps regulate appetite and improve insulin sensitivity for weight loss.",
                "Exercise boosts Wegovy's effects, aiding fat-burning, metabolism, and muscle retention.",
                "Effective exercises include low-impact cardio, strength training, HIIT, and core exercises.",
                "Regular exercise prevents muscle loss and supports long-term weight management.",
                "Wegovy may be prescribed by licensed UK providers following a medical consultation.",
                "Wegovy's weight loss price is affordable with clear, transparent costs at trusted providers.",
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
            Understanding Wegovy Treatment
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            <a
              href="/weight-loss-treatments/wegovy/"
              className="text-teal-600 hover:underline"
            >
              Wegovy injection
            </a>{" "}
            is a prescription medication that{" "}
            <a
              href="https://www.mayoclinic.org/drugs-supplements/semaglutide-subcutaneous-route/description/drg-20406730"
              className="text-teal-600 hover:underline"
            >
              contains semaglutide
            </a>
            , a weight loss injection that works by mimicking a natural hormone
            in the body called GLP-1. This hormone regulates appetite and food
            intake by reducing hunger and promoting feelings of fullness. The
            Wegovy injection helps reduce calorie intake, making it easier to
            stick to a weight loss plan.
          </p>

          <div className="space-y-6 mb-10">
            {[
              {
                title: "How It Supports Weight Loss",
                text: "Wegovy for weight loss supports weight management by reducing appetite and promoting fat loss. It can also improve blood sugar control, making it beneficial for individuals with Type 2 diabetes. By regulating your hunger hormones, the weekly weight-loss shot helps you make healthier food choices and avoid overeating, contributing to more sustainable weight loss over time.",
              },
              {
                title: "How Exercise Enhances Its Effects",
                text: "Physical activity can provide additional support for individuals using this injection as part of a clinician-led weight management approach. Regular exercise may help preserve muscle mass, support heart health, and contribute to daily energy balance during treatment. Incorporating suitable forms of movement into a routine can also encourage sustainable lifestyle habits. Exercise plans should be adapted to individual ability levels and reviewed with a healthcare professional when appropriate.",
              },
              {
                title: "Relevance to UK Patients",
                text: "This weekly weight-management injection is prescribed after a consultation with a UK-licensed healthcare professional, who assesses medical history, health, and treatment suitability. It is part of a structured, clinician-led care plan with ongoing monitoring for safe use.",
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

          {/* Section 2 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Why Exercise is Important with Weight Loss Injections
          </h2>

          <div className="space-y-6 mb-10">
            {[
              {
                title: "Prevents Muscle Loss",
                text: "One of the main challenges of weight loss is preserving muscle mass. As you lose fat, there's a risk of losing muscle too. Exercise, especially strength training, helps protect muscle tissue while you lose fat. This is particularly important when using Wegovy injection because the weight loss process can lead to muscle loss if not paired with exercise.",
              },
              {
                title: "Boosts Metabolism",
                text: "Exercise increases the rate at which your body burns calories, even when at rest. Regular physical activity, especially strength training and HIIT (High-Intensity Interval Training), can boost your metabolism and help you burn more calories throughout the day. This makes it easier to lose weight while on weight loss treatment.",
              },
              {
                title: "Improves Cardiovascular Health",
                text: "Cardiovascular exercise, such as walking, cycling, or swimming, helps strengthen the heart and improve circulation. This is important for overall health and weight loss. Additionally, good cardiovascular health supports better fat-burning, which complements the effects of medication.",
              },
              {
                title: "Enhances Fat-Burning",
                text: "Certain types of exercise, like HIIT, can trigger your body to burn more fat during and after the workout. When combined with Wegovy, these exercises can accelerate fat loss and help you achieve your weight loss goals faster.",
              },
              {
                title: "Supports Long-Term Weight Maintenance",
                text: "Exercise helps you maintain your weight loss long-term by increasing muscle mass, improving metabolism, and promoting healthy habits. Combining Wegovy with regular exercise ensures that you don't just lose weight but also develop a sustainable lifestyle that supports your health and weight goals.",
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
            Top Workouts to Boost Your Wegovy Weight Loss Success
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            To support healthy weight management while using Wegovy injection,
            the following exercises are commonly recommended for different
            fitness levels. Whether you are new to physical activity or already
            have an established routine, choosing suitable forms of exercise can
            help complement prescribed treatment as part of a wider lifestyle
            approach.
          </p>

          {/* Workout 1 */}
          <h3 className="editorial-title text-xl font-bold text-gray-900 mb-4">
            1. Low-Impact Cardio (Beginner-Friendly)
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you're new to exercise or have mobility issues, low-impact cardio
            exercises are a great way to get started. These exercises are easy
            on the joints and help you burn calories without putting too much
            strain on your body.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {[
              {
                title: "Walking",
                desc: "A simple yet effective way to increase your daily activity. Aim for 30 minutes a day to start.",
              },
              {
                title: "Cycling",
                desc: "Whether stationary or on a bike, cycling is an excellent low-impact exercise that boosts cardiovascular health.",
              },
              {
                title: "Swimming",
                desc: "An excellent full-body workout that provides resistance without the impact on joints.",
              },
              {
                title: "Elliptical Training",
                desc: "A low-impact option for burning calories while protecting your joints.",
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
          <p className="text-gray-600 leading-relaxed mb-8">
            These exercises are perfect for those who are just starting their
            weight loss journey or have joint issues. They help you stay active
            without the risk of injury.
          </p>

          {/* Workout 2 */}
          <h3 className="editorial-title text-xl font-bold text-gray-900 mb-4">
            2. Strength Training (2-3 Times Per Week)
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Strength training is essential to preserve muscle mass while losing
            fat. Wegovy weight loss may help you shed pounds, but strength
            training ensures you maintain lean muscle tissue, which{" "}
            <a
              href="https://www.health.harvard.edu/diet-and-weight-loss/exercise-and-weight-loss-the-importance-of-resting-energy-expenditure"
              className="text-teal-600 hover:underline"
            >
              boosts metabolism
            </a>{" "}
            and promotes fat loss.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            {[
              {
                title: "Bodyweight Exercises",
                desc: "Simple exercises like squats, lunges, and push-ups are great for building muscle.",
              },
              {
                title: "Resistance Bands",
                desc: "These bands provide variable resistance and are great for targeting specific muscle groups.",
              },
              {
                title: "Light Weights",
                desc: "Start with light dumbbells or kettlebells to increase muscle strength and tone.",
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
          <p className="text-gray-600 leading-relaxed mb-8">
            Strength training should be done 2-3 times per week to see
            noticeable results. It complements weight loss injections by
            improving muscle mass, which is essential for long-term weight loss.
          </p>

          {/* Workout 3 */}
          <h3 className="editorial-title text-xl font-bold text-gray-900 mb-4">
            3. HIIT (High-Intensity Interval Training) for Faster Fat Loss
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            HIIT is a great way to burn fat quickly, especially for individuals
            with a higher fitness level. HIIT involves short bursts of intense
            activity followed by brief rest periods, which boosts fat-burning
            and accelerates weight loss.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {[
              {
                title: "20-30 Minute Routines",
                desc: "A typical HIIT session lasts between 20 to 30 minutes, making it time-efficient.",
              },
              {
                title: "Example Intervals",
                desc: "30 seconds of sprinting, followed by 30 seconds of walking or light jogging.",
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
          <p className="text-gray-600 leading-relaxed mb-8">
            HIIT is ideal for individuals who are already active and looking to
            enhance fat loss while using medication.
          </p>

          {/* Workout 4 */}
          <h3 className="editorial-title text-xl font-bold text-gray-900 mb-4">
            4. Core &amp; Stability Training
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Core and stability exercises are important for improving posture,
            balance, and flexibility, which are vital for overall health and
            metabolism. These exercises also help reduce stress and promote
            relaxation, improving mental wellbeing.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            {[
              {
                title: "Pilates",
                desc: "Focuses on core strength, flexibility, and balance.",
              },
              {
                title: "Yoga",
                desc: "Great for increasing flexibility and mental focus, reducing stress, and supporting weight loss.",
              },
              {
                title: "Balance Exercises",
                desc: "Simple exercises that improve coordination and strengthen your core.",
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
          <p className="text-gray-600 leading-relaxed mb-8">
            These exercises support overall health, aid in weight loss, and
            complement the effects of injection by improving body strength and
            flexibility.
          </p>

          {/* Workout 5 */}
          <h3 className="editorial-title text-xl font-bold text-gray-900 mb-4">
            5. Everyday Movement Boosters
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Incorporating more movement throughout the day is essential for
            long-term weight loss success. These small changes add up to
            significant calorie burns over time.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            {[
              {
                title: "10,000 Steps",
                desc: "Walking 10,000 steps daily is a great goal to aim for, which can be achieved through walking or light movement throughout the day.",
              },
              {
                title: "Standing More",
                desc: "Reduce sedentary time by standing more often, using a standing desk, or taking regular breaks to walk around.",
              },
              {
                title: "Mini Workouts",
                desc: "Short bursts of activity throughout the day can help burn extra calories.",
              },
              {
                title: "Stair Climbing",
                desc: "Incorporating stairs into your routine is an effective way to burn calories and build leg strength.",
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
            These everyday movements are easy to implement and effective for
            boosting your activity level.
          </p>

          {/* Section 4 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            How Much Exercise is Recommended While Using Wegovy?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            The NHS recommends at least{" "}
            <a
              href="https://www.nhs.uk/live-well/exercise/"
              className="text-teal-600 hover:underline"
            >
              150 minutes of moderate-intensity
            </a>{" "}
            exercise per week, or 75 minutes of vigorous exercise, combined with
            strength training twice a week. This aligns well with Wegovy weight
            loss UK recommendations for optimal results. Regular physical
            activity will enhance the effectiveness of weight-loss injections in
            promoting fat loss, improving overall health, and ensuring that you
            maintain your weight loss results.
          </p>

          {/* Section 5 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Tips to Stay Motivated
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              {
                title: "Set Realistic Goals",
                desc: "Break your weight loss goals into smaller, achievable steps to stay motivated.",
              },
              {
                title: "Track Progress",
                desc: "Keep a workout journal or use fitness apps to track your progress.",
              },
              {
                title: "Start Slow",
                desc: "If you're new to exercise, start with simple activities and gradually increase intensity.",
              },
              {
                title: "Mix Different Workouts",
                desc: "Variety can keep things interesting and prevent boredom.",
              },
              {
                title: "Listen to Your Body",
                desc: "Don't push yourself too hard, take rest days and focus on recovery.",
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

          {/* Section 6 */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-5">
            Wegovy Weight Loss UK: Eligibility and Safety Guidelines
          </h2>

          <div className="space-y-6 mb-10">
            {[
              {
                title: "Who Can Use Large Weight Loss Injections?",
                text: "The GLP-1 injection is suitable for adults with Type 2 diabetes or obesity who have a BMI of 30 or higher (or 27 with weight-related health conditions). A medical consultation is necessary to assess eligibility.",
              },
              {
                title: "When to Avoid Exercise Temporarily",
                text: "If you experience any adverse side effects from Wegovy injection, such as nausea or fatigue, consult with your healthcare provider before engaging in intense exercise.",
              },
              {
                title: "When to Consult a Clinician",
                text: "It's essential to speak with a healthcare provider before starting any new exercise regimen, especially if you have any underlying health conditions.",
              },
              {
                title: "Side Effect Management",
                text: "If you experience side effects like nausea or fatigue while on weight-loss treatment, rest and hydration are important. Speak to your healthcare provider if symptoms persist.",
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
            Achieve Lasting Results with Wegovy and Exercise
          </h2>

          {/* Pull Quote */}
          <blockquote className="pull-quote rounded-xl px-8 py-6 my-10 text-xl text-gray-700 leading-relaxed">
            "Incorporating regular exercise alongside Wegovy injection can
            enhance weight loss results and improve overall health. By combining
            activities such as low-impact cardio, strength training, and HIIT,
            you can support fat loss while maintaining muscle mass and metabolic
            health."
          </blockquote>

          <p className="text-gray-600 leading-relaxed mb-12">
            Whether starting treatment or focusing on long-term progress,
            exercise is key to sustained weight management. If medication is
            part of the plan, a UK-licensed healthcare professional will assess
            its suitability.{" "}
            <a href="/" className="text-teal-600 hover:underline">
              Weight Loss Pharmacy
            </a>{" "}
            provides support focused on clinical review, safety, and appropriate
            use.
          </p>

          {/* FAQ */}
          <h2 className="section-heading text-2xl font-bold text-gray-900 mb-8">
            FAQs
          </h2>
          <div className="space-y-6 mb-14">
            {[
              {
                q: "1. How does Wegovy help with weight loss?",
                a: "Wegovy helps regulate appetite, improve insulin sensitivity, and promote fat burning, which leads to sustainable weight loss.",
              },
              {
                q: "2. What exercises should I do while using Wegovy?",
                a: "Combine low-impact cardio, strength training, and HIIT for optimal weight loss results while using Wegovy.",
              },
              {
                q: "3. How can I get a Wegovy prescription online?",
                a: "Complete an online consultation with a healthcare provider, who will assess your eligibility for Wegovy.",
              },
              {
                q: "4. Is exercise important for Wegovy weight loss?",
                a: "Yes, exercise enhances the effects of Wegovy, helping to boost metabolism, prevent muscle loss, and accelerate fat-burning.",
              },
              {
                q: "5. Who can use Wegovy?",
                a: "Wegovy is suitable for adults with Type 2 diabetes or obesity who meet certain BMI requirements.",
              },
              {
                q: "6. Can Wegovy be used as a standalone solution for weight management?",
                a: "Wegovy is intended to be used as part of a structured weight-management plan under medical supervision. Ongoing attention to diet, physical activity, and behavioural factors is generally advised to support care during and after treatment.",
              },
              {
                q: "7. Do I need medical approval to use Wegovy in the UK?",
                a: "Yes. Wegovy is a prescription-only medicine in the UK and can only be provided following an assessment by a UK-licensed healthcare professional. This review helps determine whether the treatment is appropriate based on medical history and individual health needs.",
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
                "https://www.mayoclinic.org/drugs-supplements/semaglutide-subcutaneous-route/description/drg-20406730",
                "https://www.diabetes.org.uk/about-diabetes/looking-after-diabetes/treatments/tablets-and-medication/glp-1/semaglutide/wegovy",
                "https://www.health.harvard.edu/diet-and-weight-loss/exercise-and-weight-loss-the-importance-of-resting-energy-expenditure",
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
