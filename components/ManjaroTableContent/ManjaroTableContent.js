"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const sections = [
  { id: "shouldMiss", label: "General Information" },
  { id: "interaction", label: "Dosing & usage of Mounjaro" },
  { id: "shouldTakewagovy", label: "Injection & Administration" },
  { id: "sideeffect", label: "Effectiveness & Results" },
  { id: "reduceEffect", label: "Side Effects & Safety" },
  { id: "wegovyWarnings", label: "Eligibility & Prescription" },
  { id: "hearHealth", label: "Diet, Lifestyle & Storage" },
  { id: "comparing", label: "Costs & Pricing" },
  { id: "stopping", label: "Delivery & Support" },
  { id: "Alternatives", label: "Comparisons & Alternatives" },
  { id: "Fertility", label: "Fertility & Hormonal Health" },
];

const ManjaroTableContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("shouldMiss");
  const observerRef = useRef(null);

  useEffect(() => {
    const handleIntersect = (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.2,
    });

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    observerRef.current.disconnect();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      sections.forEach(({ id: secId }) => {
        const elem = document.getElementById(secId);
        if (elem) observerRef.current.observe(elem);
      });
    }, 2000);
  };

  return (
    <section className="mt-2 py-7 sm:py-15  bg-white rounded">
      <div className="mx-auto container">
        <div className="flex flex-col md:flex-row gap-6">
          <div
            className={`flex flex-col gap-2 self-start flex-1 w-full md:sticky md:top-32 ${isOpen ? "sticky top-0 z-50" : ""}`}
          >
            <div className="flex flex-col w-full border border-gray-300 rounded-tl-lg rounded-tr-lg overflow-hidden">
              {/* Header - always visible */}
              <div className="bg-[#c7d9f5] py-4 px-4 w-full flex items-center justify-between">
                <h3 className="text-[#1a2e4a] text-xl font-semibold">
                  Table of Content
                </h3>
                {/* Hamburger button - only on mobile */}
                <button
                  className="md:hidden flex flex-col gap-1.5 p-1"
                  onClick={() => setIsOpen((prev) => !prev)}
                  aria-label="Toggle Table of Contents"
                >
                  <span
                    className={`block w-5 h-0.5 bg-[#1a2e4a] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
                  />
                  <span
                    className={`block w-5 h-0.5 bg-[#1a2e4a] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`block w-5 h-0.5 bg-[#1a2e4a] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
                  />
                </button>
              </div>

              {/* List - always shown on md+, toggled on mobile */}
              <ul
                className={`flex flex-col md:flex ${isOpen ? "flex" : "hidden"}`}
              >
                {sections.map(({ id, label }) => {
                  const isActive = activeId === id;
                  return (
                    <li key={id}>
                      <button
                        onClick={() => {
                          handleClick(id);
                          setIsOpen(false); // close on mobile after click
                        }}
                        className={`w-full text-left px-4 py-3 text-lg border-b border-gray-200 transition-all duration-200 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis block
                ${
                  isActive
                    ? "bg-[#d4f0e8] text-[#1a3c30] med-font"
                    : "bg-white text-[#333] hover:bg-gray-50 reg-font"
                }`}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* ── Main Content ── */}
          <div className="flex flex-col gap-5 items-start flex-[1.8]">
            {/* ── General Information ── */}
            <div
              id="shouldMiss"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  General Information
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What is Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro is an injectable medication designed to support weight
                loss by mimicking the body’s natural processes that control
                hunger and food intake. The active ingredient, tirzepatide,
                interacts with two incretin hormones (GLP-1 and GIP), which help
                regulate appetite and digestion.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What is Mounjaro used for?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro is used to assist with weight loss by reducing calorie
                intake. It works through several key mechanisms:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Delays stomach emptying, prolonging the feeling of fullness
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Increases satiety, sending stronger signals to your brain
                    that you’ve eaten enough
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Supports insulin release, which helps manage blood sugar
                    levels and reduces cravings
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                These combined effects make it easier to follow a sustainable
                diet and achieve long-term weight loss.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What’s the difference between Mounjaro and Zepbound?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro and Zepbound both contain the same active ingredient,
                tirzepatide, and work through similar mechanisms. The key
                difference is that Zepbound is the brand name used in the US,
                while tirzepatide injection is the licensed name for the UK.
                Both treatments target GLP-1 and GIP hormones to assist in
                appetite regulation and weight loss.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Who manufactures Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro is manufactured by Eli Lilly and Company, a
                long‑established American pharmaceutical firm that produces the
                tirzepatide‑based injection for weight management and diabetes
                treatment.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How does Mounjaro work?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro’s active ingredient, tirzepatide, works by activating
                the body’s natural incretin hormones (GLP-1 and GIP), which play
                an important role in regulating appetite and digestion.
              </p>
              <p className="para-font reg-font text-gray-600">
                Here’s how it helps:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Suppresses hunger by signalling to your brain that you’re
                    full, even after smaller portions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Prolongs fullness by slowing down the emptying of the
                    stomach, so you feel satisfied longer
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Supports blood sugar regulation, which can be especially
                    beneficial for individuals with diabetes
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                These effects make it easier for patients to stick to a
                reduced-calorie diet and achieve weight loss goals without
                feeling constantly hungry.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How long does it take to work?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Many users report significant changes in appetite control and
                reduced cravings within the first few weeks of treatment. As the
                dosage increases, weight loss typically becomes more pronounced.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How effective are Mounjaro injections?
              </h3>
              <p className="para-font reg-font text-gray-600">
                <span className="font-semibold text-teal-600">
                  <a
                    href="https://www.nejm.org/doi/full/10.1056/NEJMoa2206038"
                    target="_blank"
                  >
                    Clinical trials
                  </a>
                </span>{" "}
                show that Mounjaro can support significant weight loss, although
                results vary based on individual factors like initial weight,
                diet, and exercise adherence. For example:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>15mg dose:</strong> Participants lost an average of
                    22.5% of their body weight
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>10mg dose:</strong> Participants lost around 21.4%
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>5mg dose:</strong> Averages were closer to 16%
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                In contrast, those on a placebo experienced a much smaller
                reduction of around 2.4%. These results demonstrate the
                significant impact Mounjaro shot for weight loss can have,
                especially when used in conjunction with a healthy lifestyle.
              </p>
              <p className="para-font reg-font text-gray-600">
                <strong>Note:</strong> Individual outcomes may vary. The
                following factors can influence the results you may experience:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Initial weight</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Adherence to diet and exercise plans</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Overall health status and pre-existing conditions</span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                Mounjaro works best when combined with healthy lifestyle
                choices, including balanced nutrition and regular physical
                activity. Patients who take this combined approach often see
                steadier weight loss and better overall health, supporting
                long-term weight management rather than short-term results.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What are the weight loss outcomes across different Mounjaro
                doses?
              </h3>
              <p className="para-font reg-font text-gray-600">
                The amount of weight loss you may experience with Mounjaro
                weight loss injection depends on the dosage. Higher doses tend
                to produce more pronounced results, leading to greater weight
                reduction.
              </p>
              <Image
                width={1200}
                height={150}
                src={"/Images/differentMounjaroDoes.png"}
                alt="Different Mounjaro Doses"
              />
              <p className="para-font reg-font text-gray-600">
                <strong>Note:</strong> The data presented is derived from a{" "}
                <span className="font-semibold text-teal-600">
                  <a
                    href="https://www.nejm.org/doi/full/10.1056/NEJMoa2206038"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    72-week clinical trial
                  </a>
                </span>
                , comparing results with a placebo group.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Is Mounjaro right for me?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro may suit you if you’re 18+ and you have either a BMI of
                30+, or a BMI of 27+ with a weight-related condition such as
                prediabetes, high blood pressure, high cholesterol, or heart
                problems.
              </p>
              <p className="para-font reg-font text-gray-600">
                A healthcare professional should also check your medical history
                and current medicines to confirm it’s safe for you, and you
                shouldn’t use it if you’re pregnant (you may need to stop at
                least 1 month before trying to conceive).
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What else should I know about Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro is approved for those with a BMI over 30 or a BMI of
                27+ with weight-related health conditions. It is not suitable
                for people with certain medical conditions, such as severe
                digestive problems, a history of pancreatitis, or thyroid
                cancer. Be sure to provide your full medical history and details
                about any medications you’re taking when completing your online
                questionnaire.
              </p>
            </div>

            {/* ── Dosing & Usage ── */}
            <div
              id="interaction"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                  Dosing & usage of Mounjaro
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How to use Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro weight loss injection is designed to be easy to
                administer, with a fine, low-pain needle that requires no manual
                pushing of the medication. To use the pen, simply press the dose
                knob until the dose window shows “0,” indicating the dose has
                been fully delivered. Afterwards, gently pull the needle from
                your skin and dispose of it properly.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How do I take Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                To ensure optimal results and comfort, you can inject Mounjaro
                injection into the abdomen, thigh, or upper arm. Here are some
                helpful tips:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Rotate injection sites each week to prevent irritation and
                    discomfort. While you can inject in the same area (e.g.,
                    your stomach), vary the specific spot each time.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    For noticeable weight loss benefits, abdomen injections are
                    often recommended due to their stronger appetite-suppressing
                    effects.
                  </span>
                </li>
              </ul>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Mounjaro dosage?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro is prescribed using a stepwise approach, starting with
                lower doses and gradually increasing to allow your body to
                adjust. The highest maintenance dose is 15 mg. The dosing
                schedule is designed to provide the most effective treatment
                while minimising potential side effects.
              </p>
              <Image
                width={1200}
                height={150}
                src={"/Images/Mounjarodosage.png"}
                alt="Mounjaro Dosage"
              />

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Do I need to start from the lowest dose of Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Yes. Mounjaro treatment begins at the lowest dose, i.e. 2.5 mg,
                and increases gradually. Starting with a low dose helps your
                body adjust to the medication and reduces the risk of side
                effects. Our healthcare professional will guide the step-up
                schedule based on your tolerance and weight loss progress,
                increasing the dose at set intervals until you reach your target
                maintenance level.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Why do you have to increase your dose of Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                You increase your Mounjaro dose gradually to help your body
                adjust and reduce the risk of side effects, especially digestive
                symptoms like nausea. The step-up schedule also helps you reach
                a dose that gives stronger appetite control safely, without
                starting too high or increasing too quickly.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What happens if I miss a dose?
              </h3>
              <p className="para-font reg-font text-gray-600">
                If you miss a dose of Mounjaro, take it as soon as possible
                within 4 days (96 hours). If more than 4 days have passed,
                simply skip the missed dose and continue with your next dose on
                your regular schedule.
              </p>
              <p className="para-font reg-font text-gray-600">
                <strong>Important:</strong> If more than two weeks have passed
                since your last dose, consult with our clinician before
                proceeding. They may advise you to restart your treatment plan.
              </p>
              <p className="para-font reg-font text-gray-600">
                Never take more than one dose to make up for a missed dose, as
                this will not enhance effectiveness and may increase the risk of
                side effects.
                {/* If you need to adjust the day you take Mounjaro,
                ensure there is a 72-hour gap (3 days) between your last dose
                and the new schedule. Afterwards, continue taking it once a week
                on a new day. */}
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                When should I order my next dose?
              </h3>
              <p className="para-font reg-font text-gray-600">
                You should plan to order your next supply of Mounjaro or similar
                weekly injectable well before you run out, ideally after you’ve
                started and adjusted to your treatment schedule. Many clinics
                recommend placing your order at least two weeks before your
                current supply ends to avoid gaps in treatment. Consistency
                matters for effectiveness, so ensuring you have your next dose
                ready in advance helps maintain stable dosing and supports
                uninterrupted weight management.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                When is the best time to take Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                The ideal time to take Mounjaro is when it fits most
                conveniently into your routine. The key is consistency; take it
                on the same day each week to help keep your weight loss on
                track.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What is a KwikPen?
              </h3>
              <p className="para-font reg-font text-gray-600">
                The KwikPen is the device used to administer Mounjaro. It’s
                designed for ease of use, making the injection process as simple
                and efficient as possible.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Does it matter if there’s an air bubble in the pen?
              </h3>
              <p className="para-font reg-font text-gray-600">
                No, a small air bubble in your Mounjaro pen is normal and
                expected. These pens can contain tiny air pockets, and they do{" "}
                not affect the dose or reduce effectiveness of the injection.
                You should still administer the full dose as instructed. If
                you’re concerned or the bubble seems unusually large, consult
                our UK licensed clinician for reassurance.
              </p>
            </div>

            {/* ── Injection & Administration ── */}
            <div
              id="shouldTakewagovy"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                  Injection & Administration
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Where should I inject Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                To ensure optimal results and comfort, you can inject Mounjaro
                into the abdomen, thigh, or upper arm. Here are some helpful
                tips:
              </p>
              <Image
                width={1200}
                height={150}
                src={"/Images/WhereshouldinjectMounjaro.png"}
                alt="Where should I inject Mounjaro"
                className="w-full h-auto"
              />
              <p className="para-font reg-font text-gray-600 para-font">
                To prevent irritation and discomfort, rotate injection sites
                each week, varying the specific spot within the same area (e.g.,
                stomach). Abdomen injections are often recommended for
                noticeable weight loss benefits due to their stronger
                appetite-suppressing effects.
              </p>
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Best injection sites for Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                To ensure optimal results and comfort, you can inject Mounjaro
                into the abdomen, thigh, or upper arm. Here are some helpful
                tips:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Rotate injection sites each week to prevent irritation and
                    discomfort. While you can inject in the same area (e.g.,
                    your stomach), vary the specific spot each time.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    For noticeable weight loss benefits, abdomen injections are
                    often recommended due to their stronger appetite-suppressing
                    effects.
                  </span>
                </li>
              </ul>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                I’m scared of needles. Do I have to inject it?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Yes, Mounjaro must be injected under the skin (subcutaneously)
                to work properly. There is currently no oral alternative
                available through UK prescribing services. However, many people
                find the once-weekly injection easier than expected, and the UK
                licensed clinician can guide you on proper technique to make it
                as comfortable and straightforward as possible.
              </p>
            </div>

            {/* ── Effectiveness & Results ── */}
            <div
              id="sideeffect"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                  Effectiveness & Results
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Does Mounjaro work for everyone?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro supports weight loss in many individuals, but results
                can vary. Your weight loss depends on multiple factors, such as
                diet, exercise, and how your body responds to the medication.
                Our healthcare professionals can guide you on alternative
                treatments if weight loss shots Mounjaro isn’t providing the
                results you expect.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How quickly does Mounjaro suppress appetite?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Appetite suppression from Mounjaro can begin within a few days
                for some individuals. For others, the effect may become more
                noticeable after a few weeks, with stronger effects as the
                dosage increases.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Why am I not losing weight on Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Several factors may contribute to slower-than-expected weight
                loss on Mounjaro:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Diet and calorie intake:</strong> Mounjaro helps
                    control appetite, but a calorie deficit is still necessary.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Plateau effects:</strong> Your body may adapt after
                    initial progress, requiring adjustments in lifestyle or
                    dosage.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Dose adjustment:</strong> If necessary, your dose
                    may need to be increased for optimal results.
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                Our healthcare professionals can help you evaluate the
                appropriate course of action to boost your weight loss results.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Will I gain weight after stopping Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                When you stop taking Mounjaro, its effects gradually wear off,
                leading to a return of appetite. Without continued healthy
                habits, this could result in weight gain.{" "}
                <span className="font-semibold text-teal-600">
                  <a
                    href="https://www.obesityalliance.co.uk/news/weight-regain-after-mounjaro-means-the-loss-of-health-gains-study-finds"
                    target="_blank"
                  >
                    Clinical studies
                  </a>
                </span>{" "}
                show an average weight gain of 14% after discontinuing Mounjaro,
                underscoring the importance of maintaining a healthy lifestyle
                even after stopping the medication.
              </p>
              <p className="para-font reg-font text-gray-600">
                It takes around 25 days for the medication to leave your system,
                and your hormones will typically return to normal within a week.
                While there are no common withdrawal symptoms, some individuals
                may experience emotional changes or cravings due to the loss of
                appetite control.
              </p>
              <p className="para-font reg-font text-gray-600">
                To manage these changes, it’s important to maintain a balanced
                diet and regular physical activity. Always consult our
                healthcare providers before stopping treatment to ensure proper
                weight management.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What happens when you stop taking Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                When you stop using Mounjaro, its effects will gradually fade,
                leading to an increase in hunger and potentially weight gain if
                healthy eating habits aren't maintained. Mounjaro also helps in
                regulating blood sugar, so you may notice a reduction in its
                effectiveness once discontinued.
              </p>
              <p className="para-font reg-font text-gray-600">
                It's important to consult our clinical team before stopping the
                medication to ensure you continue with healthy habits and avoid
                unwanted weight gain.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can Mounjaro cause muscle loss?
              </h3>
              <p className="para-font reg-font text-gray-600">
                While Mounjaro itself doesn't directly cause muscle loss, weight
                loss can lead to a reduction in both fat and muscle mass. This
                is common with any weight loss process, especially when in a
                calorie deficit. To preserve muscle, it's important to maintain
                adequate protein intake and engage in resistance exercises
                during treatment.
              </p>
            </div>

            {/* ── Side Effects & Safety ── */}
            <div
              id="reduceEffect"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                  Side Effects & Safety
                </h2>
              </div>

              {/* What are the main side effects of Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What are the main side effects of Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Like any medication, Mounjaro injection may cause side effects
                as your body adjusts. The most common side effects are
                gastrointestinal and typically lessen over time. Here’s what you
                might experience:
              </p>

              <h4 className="text-lg med-font text-black">
                Very common side effects:
              </h4>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                {[
                  "Nausea",
                  "Vomiting",
                  "Indigestion",
                  "Diarrhoea",
                  "Constipation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="para-font reg-font text-gray-600">
                These often improve as your body adapts. If they persist,
                contact our healthcare provider for advice.
              </p>

              <h4 className="text-lg med-font text-black">
                Other common side effects:
              </h4>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                {[
                  "Stomach pain",
                  "Injection site reactions (e.g., redness, swelling)",
                  "Dizziness",
                  "Fatigue",
                  "Bloating and gas",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-lg med-font text-black">
                Uncommon side effects:
              </h4>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                {[
                  "Increased heart rate",
                  "Changes in taste",
                  "Delayed stomach emptying",
                  "Skin rashes or eczema",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Mounjaro rare side effects? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Mounjaro rare side effects?
              </h3>
              <p className="para-font reg-font text-gray-600">
                There are some rare side effects that are not commonly reported,
                but it’s important to seek immediate medical attention if you
                experience any of the following symptoms:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Pancreatitis:</strong> Severe stomach pain, with or
                    without vomiting. Seek urgent medical help.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Gallbladder issues:</strong> Sharp pain in the upper
                    right abdomen. Seek immediate medical care.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Anaphylaxis:</strong> Difficulty breathing or
                    swelling of the face, lips, or tongue. Seek emergency
                    assistance.
                  </span>
                </li>
              </ul>

              {/* How to manage the side effects of Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How to manage the side effects of Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                For most people, side effects subside over time, but if they
                persist or worsen, we are here to help. You may find relief by
                adjusting your diet or eating smaller meals to ease nausea or
                digestive issues.
              </p>
              <p className="para-font reg-font text-gray-600">
                However, if you have concerns about any side effects, please
                reach out to our UK licensed clinician for advice on managing
                them. For serious symptoms, like severe abdominal pain, we urge
                you to seek medical help right away.
              </p>
              <p className="para-font reg-font text-gray-600">
                Refer to the{" "}
                <span className="font-semibold text-teal-600">
                  <a
                    href="https://www.medicines.org.uk/emc/product/15484/pil#about-medicine"
                    target="_blank"
                  >
                    Patient Information Leaflet
                  </a>
                </span>{" "}
                for a complete list of side effects and additional guidance.
              </p>

              {/* How long do side effects last? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How long do side effects last, and are there long-term side
                effects?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Most common side effects of Mounjaro, such as nausea or stomach
                discomfort, typically improve within a few days or weeks as your
                body adjusts to the medication. However, if side effects persist
                or worsen, consult our UK licensed clinician to reassess your
                treatment plan.
              </p>
              <p className="para-font reg-font text-gray-600">
                Currently, there are no confirmed long-term side effects
                associated with Mounjaro. Although ongoing research is being
                conducted to better understand its effects over extended
                periods.
              </p>

              {/* Tips to minimise side effects */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Tips to minimise side effects
              </h3>
              <p className="para-font reg-font text-gray-600">
                To reduce the likelihood of side effects, consider these
                strategies:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Stay hydrated throughout the day.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Eat smaller, more frequent meals to avoid stomach upset.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Follow your prescribed dosing schedule to prevent
                    unnecessary complications. If you experience side effects,
                    consider using over-the-counter remedies like antacids or
                    laxatives for relief, but always consult with our prescriber
                    first.
                  </span>
                </li>
              </ul>

              {/* What warnings and risks should I consider? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What warnings and risks should I consider before using Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro is not suitable for everyone. If you are allergic to
                any of the ingredients in Mounjaro, you should avoid using this
                treatment.
              </p>
              <p className="para-font reg-font text-gray-600">
                Additionally, there are certain serious side effects to be aware
                of, including:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                {[
                  "Pancreatitis (inflammation of the pancreas)",
                  "Gastroparesis (delayed stomach emptying)",
                  "Gallstones",
                  "Severe allergic reactions",
                  "Gastrointestinal issues",
                  "Low blood sugar when used alongside diabetes medication or in overdose situations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="para-font reg-font text-gray-600">
                It’s essential to consult with our UK licensed clinician if you
                have any existing medical conditions or experience side effects
                during treatment.
              </p>

              {/* Medication interactions */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What medication interactions should I be aware of when taking
                Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro can interact with other diabetes medications,
                potentially causing hypoglycemia (low blood sugar) when taken
                with insulin or sulfonylurea.
              </p>
              <p className="para-font reg-font text-gray-600">
                Before starting Mounjaro, inform our UK licensed clinician about
                any other medications you’re taking, including over-the-counter
                drugs and herbal supplements. This ensures safe and effective
                treatment.
              </p>

              {/* Is long-term use suitable? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Is long-term use of Mounjaro suitable for me?
              </h3>
              <p className="para-font reg-font text-gray-600">
                The duration of Mounjaro use for weight loss depends on your
                individual health profile and how well your body responds. For
                some, long-term use may be necessary to maintain weight loss and
                continue managing blood sugar levels.
              </p>
              <p className="para-font reg-font text-gray-600">
                However, discontinuing Mounjaro without maintaining a healthy
                lifestyle could lead to weight regain. It’s crucial to maintain
                regular check-ins with our healthcare professional to ensure
                Mounjaro remains the appropriate choice for your long-term
                health goals.
              </p>

              {/* How often do I need to take Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How often do I need to take Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro is a once-weekly weight loss treatment that can be
                taken any time of day, with or without food. To ensure
                consistent results, it’s important to stick to a regular
                schedule.
              </p>
              <p className="para-font reg-font text-gray-600">
                You can pick a day and time that works for you, and setting a
                reminder on your phone can help you stay on track. If you need
                to change your dosing day, wait at least 72 hours between doses
                to maintain the medication’s effectiveness.
              </p>

              {/* What happens if I lose weight too quickly? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What happens if I lose weight too quickly?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Losing weight too quickly while using Mounjaro can lead to
                several risks:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Muscle and nutrient loss:</strong> Rapid weight loss
                    can cause your body to break down muscle, leading to
                    decreased muscle mass and bone density.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Gallbladder and digestive issues:</strong> Fast
                    weight reduction increases the risk of gallstones and
                    digestive discomfort.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Rebound weight gain:</strong> Quick weight loss can
                    trigger increased hunger, causing rapid weight regain once
                    treatment is stopped.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Nutrient deficiencies:</strong> A reduced appetite
                    may lead to a lack of essential vitamins and minerals,
                    causing fatigue and weakness.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Metabolic strain:</strong> Rapid weight loss can put
                    strain on your metabolism, leading to dizziness, low energy,
                    and other symptoms.
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                It’s important to monitor your weight loss rate and consult with
                a clinician if it’s too fast.
              </p>

              {/* Is Mounjaro safe? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Is Mounjaro safe?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro injection for weight loss is considered safe for many
                individuals when prescribed by a licensed healthcare
                professional. It has been rigorously tested and approved for use
                in the UK. If you are eligible, tirzepatide can help you achieve
                your weight loss goals safely and effectively, with many
                patients reporting positive results in clinical trials.
              </p>

              {/* Is Mounjaro safe for non-diabetics? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Is Mounjaro safe for non-diabetics?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Yes, Mounjaro is safe for non-diabetics when prescribed by a
                healthcare professional. It is licensed for weight management in
                adults with a higher BMI, even without diabetes. However, it
                should only be used after a medical assessment and under
                supervision to ensure safety and effectiveness.
              </p>

              {/* Who can't take Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Who can’t take Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Do not use Mounjaro shot if you:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Are pregnant, trying to conceive, or breastfeeding, as the
                    safety of Mounjaro during pregnancy and lactation has not
                    been established.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Have a personal or family history of medullary thyroid
                    carcinoma (MTC) or Multiple Endocrine Neoplasia Type 2
                    (MEN2), as these conditions may increase the risk of
                    thyroid-related complications.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Are allergic to tirzepatide or any ingredients in Mounjaro,
                    as this could lead to serious allergic reactions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Are under 18 years old, as Mounjaro has not been studied or
                    approved for use in minors.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Have a history of eating disorders or unexplained weight
                    loss, as Mounjaro is not recommended for individuals with
                    these conditions due to potential risks.
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                Additionally, it’s essential to consult our UK licensed
                clinician if you have any of the following conditions, as extra
                monitoring or adjustments may be necessary during your
                treatment:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Diabetic retinopathy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Severe kidney or liver issues, as these can affect how
                    Mounjaro is processed in the body.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Gastroparesis (delayed stomach emptying) may impact how the
                    medication works.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Pancreatitis, as this condition can be aggravated by certain
                    medications, including Mounjaro.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    If you are currently using other diabetes medications,
                    especially insulin or oral diabetes drugs, combining these
                    with Mounjaro may increase the risk of low blood sugar.
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                To determine if weight loss injection Mounjaro is the right
                treatment for you, please complete our{" "}
                <span className="font-semibold text-teal-600">
                  <a href="/start-consultation/?product_id=4">
                    online consultation form
                  </a>
                </span>
                , where a UK licensed clinician will review your medical history
                and provide guidance.
              </p>
            </div>

            {/* ── Eligibility & Prescription ── */}
            <div
              id="wegovyWarnings"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                  Eligibility & Prescription
                </h2>
              </div>

              {/* Mounjaro eligibility? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Mounjaro eligibility?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro is suitable for adults who meet specific eligibility
                criteria, which are reviewed during an online consultation with
                a UK-licensed healthcare professional. This treatment is
                generally recommended for individuals who have:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>A BMI of 30 or higher, or</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    A BMI of 27 or above, coupled with at least one
                    weight-related health condition, such as:
                  </span>
                </li>
              </ul>
              <ul className="space-y-3 ps-10 text-gray-600 para-font">
                {[
                  "Type 2 diabetes or pre-diabetes",
                  "Obstructive sleep apnoea",
                  "High cholesterol",
                  "High blood pressure",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-400 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="para-font reg-font text-gray-600">
                Eligibility for Mounjaro weight loss injection is confirmed only
                after a thorough medical assessment, ensuring that the treatment
                is appropriate based on your health status and weight management
                needs. Always go through the{" "}
                <span className="font-semibold text-teal-600">
                  <a
                    href="https://guides.chemist-4-u.com/wp-content/uploads/2025/12/pil.15481.pdf"
                    target="_blank"
                  >
                    patient information leaflet
                  </a>
                </span>{" "}
                before use.
              </p>

              {/* What BMI do I need to start Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What BMI do I need to start Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                To start Mounjaro, you generally need a BMI of 30 or higher.
                However, if your BMI is 27 or above and you have a
                weight-related health condition (like type 2 diabetes or high
                blood pressure), you may also be eligible for treatment.
              </p>

              {/* How do I get a prescription for Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How do I get a prescription for Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                To buy Mounjaro from Online Weight Loss Clinic, here’s the
                straightforward process based on how the clinic operates:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Start with a free online consultation, complete the form
                    with your health details. This allows their UK registered
                    healthcare professional to assess whether Mounjaro is
                    appropriate for you.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Choose Mounjaro as your treatment once the consultation is
                    reviewed and approved.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Confirm your order and make payment — after approval, a
                    valid UK prescription is generated.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Receive your medication by tracked delivery from our
                    UK-based partner pharmacy.
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                This ensures you get legitimate, prescription‑only Mounjaro
                safely and in line with UK regulations.
              </p>
            </div>

            {/* ── Diet, Lifestyle & Storage ── */}
            <div
              id="hearHealth"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                  Diet, Lifestyle & Storage
                </h2>
              </div>

              {/* Do I need to change my diet while on Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Do I need to change my diet while on Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                While on Mounjaro, there’s no strict diet requirement, but
                adopting a balanced, reduced-calorie diet with lean proteins,
                fibre-rich foods, and whole grains will enhance weight loss.
                Mounjaro helps reduce appetite, so pairing it with healthy
                eating and increased activity is key to maximising results and
                managing potential side effects.
              </p>

              {/* Can I still drink alcohol? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can I still drink alcohol?
              </h3>
              <p className="para-font reg-font text-gray-600">
                It’s advisable to limit alcohol intake during Mounjaro
                treatment. While alcohol doesn’t directly affect the medication,
                it can exacerbate side effects like nausea, vomiting, and
                gastrointestinal discomfort. Additionally, alcohol is high in
                calories and could undermine your weight loss efforts.
              </p>

              {/* Should I take supplements on Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Should I take supplements on Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Not usually. Most providers recommend focusing on a balanced,
                nutrient-rich diet first, even if your appetite is reduced on
                Mounjaro. Supplements are not routinely required unless there is
                a specific reason.
              </p>
              <p className="para-font reg-font text-gray-600">
                You may only need supplements if:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    A healthcare professional identifies a nutrient deficiency
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Your reduced food intake makes it difficult to meet key
                    needs, such as protein or fibre
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                Always speak with your prescriber or pharmacist before starting
                supplements, as unnecessary use or incorrect dosing may not be
                beneficial.
              </p>

              {/* How do I store Mounjaro, and can I travel with it? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How do I store Mounjaro, and can I travel with it?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro should be stored in a refrigerator between 2°C and 8°C
                and must not be frozen. Keep the pen in its original packaging
                to protect it from light. If refrigeration is not available, it
                can be kept at room temperature (up to 30°C) for a maximum of 30
                days. Once this period has passed, any unused pen should be
                safely discarded, even if doses remain.
              </p>
              <p className="para-font reg-font text-gray-600">
                When travelling, Mounjaro can be carried with you, provided it
                stays within the recommended temperature range. Use an insulated
                travel pouch if needed and avoid exposing the pen to direct heat
                or sunlight. Always check the expiry date before use and dispose
                of used pens and needles using an approved sharps container.
              </p>
            </div>

            {/* ── Costs & Pricing ── */}
            <div
              id="comparing"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                  Costs & Pricing
                </h2>
              </div>

              {/* Mounjaro prices */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Mounjaro prices?
              </h3>
              <p className="para-font reg-font text-gray-600">
                At Online Weight Loss Clinic, Mounjaro is available in multiple
                dose strengths, each priced for a full month of treatment.
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                {[
                  {
                    dose: "2.5 mg",
                    price: "£139.00",
                    desc: "initial adjustment dose.",
                  },
                  {
                    dose: "5 mg",
                    price: "£179.00",
                    desc: "first continuation dose.",
                  },
                  {
                    dose: "7.5 mg",
                    price: "£230.00",
                    desc: "mid-titration dose.",
                  },
                  {
                    dose: "10 mg",
                    price: "£239.00",
                    desc: "higher continuation dose.",
                  },
                  {
                    dose: "12.5 mg",
                    price: "£265.00",
                    desc: "advanced continuation dose.",
                  },
                  {
                    dose: "15 mg",
                    price: "£279.00",
                    desc: "maintenance dose once fully adjusted.",
                  },
                ].map(({ dose, price, desc }) => (
                  <li key={dose} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                    <span>
                      <strong>{dose}:</strong> {price} – {desc}.
                    </span>
                  </li>
                ))}
              </ul>
              <p className="para-font reg-font text-gray-600">
                These prices include the free online medical consultation
                required for prescription approval.
              </p>

              {/* Why did Mounjaro's price increase? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Why did Mounjaro’s price increase?
              </h3>
              <p className="para-font reg-font text-gray-600">
                The price of Mounjaro rose because its manufacturer, Eli Lilly,
                raised the wholesale list price across all dose strengths. This
                adjustment was made to align the UK pricing with that in other
                developed markets, as the original UK price had been set lower
                when the treatment first launched to improve access. Since all
                private providers buy Mounjaro from Lilly, they have passed
                these higher supplier costs on to patients. The medication
                itself hasn’t changed, only the price paid by pharmacies and,
                consequently, private patients has gone up.
              </p>

              {/* Will the price go down? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Will the price go down?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Most UK providers cannot guarantee a future price drop for
                Mounjaro. Since the manufacturer Eli Lilly recently raised list
                prices to align UK costs with European markets, providers say
                prices are unlikely to fall in the short term unless those
                supply or wholesale costs change. Retail prices are set by
                pharmacies based on what they pay from manufacturers and
                wholesalers, so any reduction depends on decisions from Lilly
                and how pharmacies adjust their pricing strategies, not on
                individual clinics themselves.
              </p>

              {/* What should I do if I can't afford Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What should I do if I can’t afford Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                If you can’t afford Mounjaro, consider these options:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Discuss alternatives:</strong> Speak to our
                    prescribing team about more affordable weight-loss
                    treatments like Wegovy or Saxenda.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Compare prices:</strong> Prices vary across
                    providers, so shop around for the best deal.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Adjust dosage:</strong> A lower dose might still be
                    effective and more budget-friendly.
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                Always consult a healthcare provider before making changes.
              </p>

              {/* How much will my weight loss journey cost? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How much will my weight loss journey cost?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Weight loss with Mounjaro is priced per month and varies by dose
                and provider. Typical private prescription costs in the UK for a
                four‑week supply of Mounjaro pens range roughly from around
                £159–£245 per month, depending on the strength you’re prescribed
                and the service you use. Lower‑strength starter pens are usually
                cheapest, while higher doses cost more.
              </p>
              <p className="para-font reg-font text-gray-600">
                Clinics and online doctors often bundle prescription and
                clinical reviews into the monthly price, and you’ll need an
                online or in‑person consultation before you can start treatment.
              </p>

              {/* How can I save on Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How can I save on Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                The key to saving money on your treatment is having a clear
                understanding of the costs, so you can plan your budget
                effectively. When you’re aware of what to expect, it becomes
                much easier to manage expenses.
              </p>
              <p className="para-font reg-font text-gray-600">
                For some individuals, sticking to a lower dose while still
                seeing positive results can be a cost-effective strategy. If it
                continues to provide the desired benefits, this approach can
                help reduce overall costs. Explore options for financing your
                weight loss treatment.
              </p>
            </div>

            {/* ── Delivery & Support ── */}
            <div
              id="stopping"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                  Delivery & Support
                </h2>
              </div>

              {/* How long does delivery take? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How long does delivery take, and do I need to be home to take
                delivery?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Delivery from Online Weight Loss Clinic is arranged once your
                consultation and eligibility are approved by the UK registered
                clinicians. They aim to dispatch your medication promptly to
                your address in discreet, tracked packaging. You should be
                available at your delivery address to sign for the parcel when
                it arrives, as prescription weight‑loss medication must be
                received in person to ensure safe and compliant delivery.
              </p>

              {/* Do you provide discreet delivery? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Do you provide discreet delivery?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Yes, all prescriptions, including Mounjaro, are sent in plain,
                unbranded packaging to protect your privacy and delivered to
                your chosen address.
              </p>

              {/* Do I need to buy my own needles? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Do I need to buy my own needles?
              </h3>
              <p className="para-font reg-font text-gray-600">
                No, you don’t need to buy your own needles. Needles and sharps
                bins can be added to your order during your assessment if
                required.
              </p>

              {/* How often do I need to do a consultation? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How often do I need to do a consultation?
              </h3>
              <p className="para-font reg-font text-gray-600">
                You will have a clinical review before your first prescription.
                After that, follow‑up consultations are scheduled regularly to
                monitor progress and adjust dosage as needed throughout your
                treatment.
              </p>

              {/* Can I switch medication? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can I switch medication?
              </h3>
              <p className="para-font reg-font text-gray-600">
                If you’re considering changing your weight loss treatment,
                simply complete our online consultation form. One of our
                UK-licensed clinicians will review your details to determine
                whether switching medication is safe and suitable for your
                individual health needs.
              </p>

              {/* What's included with my treatment? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What’s included with my treatment?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Your treatment includes everything needed to start safely and
                confidently:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                {[
                  "A free online medical assessment to check your eligibility",
                  "Review and approval by a UK licensed clinician",
                  "A prescription issued when clinically appropriate",
                  "Discreet, temperature-controlled delivery from a partner pharmacy",
                  "Clear guidance and ongoing clinical support throughout your treatment",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="para-font reg-font text-gray-600">
                This ensures your treatment is medically reviewed, properly
                prescribed, and delivered safely.
              </p>

              {/* Is mental health support available? */}
              {/* <h3 className="text-lg sm:text-2xl reg-font text-black">
                Is mental health support available for weight loss patients?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Yes, if you are experiencing any mental health challenges during
                your weight loss journey, mental health support is available.
                You can consult our team for personalised advice or explore our
                Mental Health Support Hub for additional resources.
              </p> */}
            </div>

            {/* ── Comparisons & Alternatives ── */}
            <div
              id="Alternatives"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                  Comparisons & Alternatives
                </h2>
              </div>

              {/* What are alternative weight loss treatments? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What are alternative weight loss treatments?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Other treatments for weight loss include Wegovy (Semaglutide)
                and Nevolat (Liraglutide). Each medication has different active
                ingredients and dosage regimens, but they all aim to regulate
                appetite and aid weight loss. Our prescribing team can help you
                explore these options and find the appropriate treatment based
                on your needs.
              </p>

              {/* What are the non-drug alternatives to Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What are the non-drug alternatives to Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                If medication isn’t the right option, several non-drug
                approaches are commonly recommended:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Structured lifestyle changes such as personalised diet
                    plans, regular physical activity, and behaviour-change
                    support to improve long-term weight control.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Clinically guided weight-management programmes, including
                    NHS or private services, which focus on nutrition education,
                    activity planning, and ongoing accountability.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Professional coaching or counselling to address eating
                    habits, triggers, and sustainable routines that support
                    weight loss without medication.
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                These options focus on building healthier habits and long-term
                lifestyle changes rather than appetite-suppressing treatments.
              </p>

              {/* Can I switch from Wegovy to Mounjaro? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can I switch from Wegovy to Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Yes, you can switch from Wegovy to Mounjaro, but only under
                medical supervision. Both treatments work differently and must
                not be used together. A healthcare professional will need to
                carry out a new medical assessment, review your response to
                Wegovy, and decide whether Mounjaro is suitable for you. If
                approved, they will also advise on the correct timing and
                starting dose to reduce side effects and ensure a safe
                transition.
              </p>
              <p className="para-font reg-font text-gray-600">
                In short, switching is possible, but it requires a new
                prescription and clinical guidance to do it safely.
              </p>

              {/* Wegovy or Mounjaro injections, which is best? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Wegovy or Mounjaro injections, which is best?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Both Wegovy and Mounjaro are once-weekly prescription injections
                used to support weight loss, but they work slightly differently.
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Wegovy contains semaglutide and targets the GLP-1 hormone.
                    It is a well-established option and has strong evidence for
                    long-term weight management.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Mounjaro contains tirzepatide and acts on both GLP-1 and GIP
                    hormones. Clinical studies show it can lead to greater
                    average weight loss for many people.
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                Side effects are broadly similar for both treatments and mainly
                affect digestion, especially during dose increases.
              </p>

              {/* Which treatment should I choose? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Which treatment should I choose, Wegovy or Mounjaro?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Choosing between Wegovy and Mounjaro depends on how your body
                responds and what you want to achieve:
              </p>
              <ul className="space-y-3 ps-4 text-gray-600 para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Mounjaro is often associated with greater average weight
                    loss in clinical studies, as it works on two
                    appetite-related hormones (GIP and GLP-1).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Wegovy uses a single hormone pathway (GLP-1) and has been
                    available for weight loss for longer, which some people
                    prefer from a familiarity and long-term data perspective.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Both are once-weekly injections with gradual dose increases,
                    but they differ in dose strength and how individuals
                    tolerate them.
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600">
                The right option is best decided through a clinical assessment,
                based on your medical history, weight loss goals, and how you
                respond to treatment.
              </p>
            </div>

            {/* ── Fertility & Hormonal Health ── */}
            <div
              id="Fertility"
              className="flex flex-col gap-5 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                  Fertility & Hormonal Health
                </h2>
              </div>

              {/* Does Mounjaro affect fertility? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Does Mounjaro affect fertility?
              </h3>
              <p className="para-font reg-font text-gray-600">
                There is no evidence that weight loss injections Mounjaro
                directly impacts fertility. In fact, weight loss and improved
                metabolic health could even enhance fertility. However, it’s
                important to discuss any concerns with our clinicians,
                especially regarding contraceptive effectiveness while on
                Mounjaro.
              </p>

              {/* Does Mounjaro affect periods? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Does Mounjaro affect periods?
              </h3>
              <p className="para-font reg-font text-gray-600">
                Mounjaro may cause changes in your menstrual cycle, such as
                irregular periods or changes in flow, particularly in
                individuals with PCOS. However, improved insulin regulation and
                weight loss may lead to more regular cycles. If you notice
                significant changes, consult our healthcare provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManjaroTableContent;
