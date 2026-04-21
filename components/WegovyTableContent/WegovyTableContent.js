"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const sections = [
  { id: "shouldMiss", label: "General Questions About Wegovy" },
  { id: "interaction", label: "Eligibility & Suitability" },
  { id: "shouldTakewagovy", label: "Dosing & Usage" },

  { id: "sideeffect", label: "Injection & Administration" },

  { id: "reduceEffect", label: "Storage & Handling" },

  { id: "wegovyWarnings", label: "Effectiveness & Results" },

  { id: "hearHealth", label: "Side Effects & Safety" },

  { id: "comparing", label: "Interactions & Precautions" },
  { id: "stopping", label: "Buying & Prescriptions" },
  { id: "Alternatives", label: "Costs & Pricing" },
  { id: "Fertility", label: " Comparisons & Switching Treatments" },
  { id: "test", label: "Alternative Treatments" },
  { id: "Resources", label: "Information & Resources" },
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
    <section className="mt-2 py-10 md:py-14 md:px-12.5 bg-white rounded">
      <div className="mx-auto container">
        <div className="flex flex-col md:flex-row gap-6">
          {/* ── Sticky Sidebar ── */}
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
              className="flex flex-col gap-4 sm:gap-5 border-b border-gray-300 pb-5 px-3 sm:px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                  General Questions About Wegovy
                </h2>
              </div>

              {/* What is Wegovy? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What is Wegovy?
              </h3>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                Wegovy offers an effective approach to weight management,
                specially formulated to support your body’s natural processes.
                This prescription-only weight loss medication contains
                semaglutide, a{" "}
                <span className="font-semibold text-teal-600">
                  {" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/9780839/#:~:text=GLP%2D1%20%28glucagon%2Dlike,in%20the%20gut%20L%20cells."
                    target="_blank"
                  >
                    GLP-1{" "}
                  </a>{" "}
                </span>{" "}
                receptor agonist that mimics the body’s natural
                appetite-regulating hormones. By working with your body’s
                natural systems, Wegovy medication helps you control hunger and
                stay satisfied with fewer calories, ultimately promoting lasting
                weight loss.
              </p>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                Unlike quick fixes, Wegovy supports sustainable weight loss by
                enhancing appetite regulation, improving satiety, and promoting
                healthier food choices. It's most effective when combined with a
                balanced diet and regular physical activity, offering a holistic
                approach to weight management.
              </p>

              {/* How does Wegovy work? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How does Wegovy work?
              </h3>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                Wegovy injection works by mimicking
                <span className="font-semibold text-teal-600">
                  {" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/9780839/#:~:text=GLP%2D1%20%28glucagon%2Dlike,in%20the%20gut%20L%20cells."
                    target="_blank"
                  >
                    GLP-1,
                  </a>{" "}
                </span>
                a hormone that your body naturally releases after eating. This
                hormone plays an essential role in managing appetite, blood
                sugar levels, and stomach emptying.
              </p>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                This combination of effects allows you to eat less, feel
                satisfied, and make better food choices, which in turn supports
                weight loss over time. For optimal results, Wegovy should be
                used alongside a calorie-controlled diet and regular exercise.
              </p>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                {" "}
                <span className="font-semibold text-teal-600">
                  {" "}
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/33567185/"
                    target="_blank"
                  >
                    {" "}
                    Clinical studies
                  </a>{" "}
                </span>{" "}
                show that most adults using Wegovy achieved significant weight
                loss. When combined with a balanced diet and exercise, they lost
                at least 5% of their initial body weight.
              </p>

              {/* What are the benefits of Wegovy? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What are the benefits of Wegovy?
              </h3>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                Wegovy offers several advantages for individuals seeking to
                manage their weight and improve overall health:
              </p>
              <ul className="space-y-3 ps-2 sm:ps-4 text-[#212529]">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span className="para-font reg-font text-gray-600">
                    <strong>Effective weight loss:</strong> Helps significantly
                    reduce body weight when combined with diet and exercise.
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span className="para-font reg-font text-gray-600">
                    <strong>Appetite control:</strong> Reduces hunger and
                    cravings by mimicking hormones that promote fullness.
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span className="para-font reg-font text-gray-600">
                    <strong>Metabolic & heart health:</strong> Improves blood
                    sugar control and lowers cardiovascular risks for certain
                    individuals.
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span className="para-font reg-font text-gray-600">
                    <strong>Convenient dosing:</strong> Administered once a
                    week, offering ease compared to daily treatments.
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span className="para-font reg-font text-gray-600">
                    <strong>Sustainable results:</strong> Supports long-term
                    weight loss and maintenance when used with lifestyle
                    changes.
                  </span>
                </li>
              </ul>

              {/* How effective is Wegovy? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How effective is Wegovy?
              </h3>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                Wegovy has shown noticeable results in clinical trials, helping
                individuals achieve meaningful weight loss. In a{" "}
                <span className="font-semibold text-teal-600">
                  {" "}
                  <a
                    href="https://www.nejm.org/doi/full/10.1056/NEJMoa2032183"
                    target="_blank"
                  >
                    {" "}
                    68-week
                  </a>{" "}
                </span>{" "}
                study, participants using the 2.4 mg maintenance dose lost
                between 15% and 17% of their body weight, far outperforming the
                2.4% loss observed in the placebo group.
              </p>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                This injectable treatment works effectively when paired with a
                balanced diet and regular physical activity, amplifying its
                effects and promoting long-term weight management.
              </p>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                The
                <span className="font-semibold text-teal-600">
                  {" "}
                  <a
                    href="https://www.nejm.org/doi/full/10.1056/NEJMoa2032183"
                    target="_blank"
                  >
                    clinical trials
                  </a>{" "}
                </span>
                revealed impressive outcomes for Wegovy users:
              </p>
              <ul className="space-y-3 ps-2 sm:ps-4 text-[#212529]">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span className="para-font reg-font text-gray-600">
                    86% of participants shed at least 5% of their body weight
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span className="para-font reg-font text-gray-600">
                    69% lost 10% of their body weight
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span className="para-font reg-font text-gray-600">
                    50% achieved a 15% or greater reduction in body weight
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                Wegovy not only aids in weight loss but also offers other health
                benefits, including a reduction in waist circumference and a
                lowering of systolic blood pressure.
              </p>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                <strong>Disclaimer:</strong> Weight loss results are based on
                clinical trials, but individual outcomes may vary.
              </p>

              {/* What are the weight loss outcomes across different Wegovy doses? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What are the weight loss outcomes across different Wegovy doses?
              </h3>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                The amount of weight lost with Wegovy can vary depending on the
                dosage. Higher doses typically lead to more significant weight
                loss outcomes.
              </p>
              <div className="w-full overflow-hidden">
                <Image
                  width={1200}
                  height={150}
                  src={"/Images/differentWegovyDoes.jpg"}
                  alt="Different Wegovy Doses"
                  className="w-full  mx-auto h-auto object-contain"
                />
              </div>
              <p className="para-font reg-font text-gray-600">
                <strong>Note:</strong> These results are based on clinical
                trials{" "}
                <span className="font-semibold text-teal-600">
                  <a
                    href="https://www.nejm.org/doi/full/10.1056/NEJMoa2032183"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    over 68 weeks
                  </a>
                </span>{" "}
                and are compared against a placebo group; individual outcomes
                may vary.
              </p>
              {/* How long does Wegovy take to work? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How long does Wegovy take to work?
              </h3>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                Wegovy doesn't produce instant weight loss — it begins working
                inside your body within days, but noticeable effects take time.
                You'll usually feel reduced hunger within the first couple of
                weeks, and many people start to see visible weight loss around
                4–8 weeks after starting treatment as the dose gradually
                increases. Full, meaningful results often take several months of
                consistent weekly injections and lifestyle changes.
              </p>

              {/* Is Wegovy safe? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Is Wegovy safe?
              </h3>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                Yes, Wegovy showed safe tolerability in patients during clinical
                studies. It is a licensed weight-loss medication approved in the
                UK, designed for use under medical supervision. While generally
                well-tolerated, some users may experience mild side effects like
                nausea, headache, or digestive issues, which often improve with
                time. Serious risks, though rare, can include gallbladder
                problems or pancreatitis, especially in individuals with certain
                health conditions. Always consult a doctor to assess suitability
                and manage any potential risks.
              </p>

              {/* Is there a generic version of Wegovy? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Is there a generic version of Wegovy?
              </h3>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                Currently, Wegovy does not have a generic alternative available
                in the UK. It remains under patent protection, and a generic
                version may be available after the patent expires in 2031. For
                now, Wegovy is only available in its branded form with a
                prescription.
              </p>

              {/* Can Wegovy improve heart health? */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can Wegovy improve heart health?
              </h3>
              <p className="para-font reg-font text-gray-600 reg-font text-[#212529]">
                Wegovy isn't just effective for weight loss; it also has
                cardiovascular benefits.
                <span className="font-semibold text-teal-600">
                  {" "}
                  <a
                    href="https://www.nejm.org/doi/full/10.1056/NEJMoa2307563"
                    target="_blank"
                  >
                    Clinical studies
                  </a>{" "}
                </span>
                show that people using Wegovy saw a{" "}
                <span className="font-semibold text-teal-600">
                  <a
                    href="https://www.nejm.org/doi/full/10.1056/NEJMoa2307563"
                    target="_blank"
                  >
                    20% reduction
                  </a>{" "}
                </span>
                in the risk of major heart-related events, including heart
                attacks and strokes. This makes it a powerful option for those
                dealing with obesity-related cardiovascular risks.
              </p>
            </div>

            {/*  Eligibility & Suitability */}
            <div
              id="interaction"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Eligibility & Suitability
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Who can use Wegovy?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Wegovy is typically prescribed to adults with a BMI over 30, or
                over 27 if they have weight-related health concerns like high
                blood pressure, type 2 diabetes, or high cholesterol. Our UK
                licensed clinician will assess your eligibility based on your
                medical history and weight loss goals.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Who is eligible for Wegovy?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                To determine if a Wegovy is right for you, a licensed healthcare
                provider will conduct a detailed assessment. This weight loss
                treatment is generally recommended for adults who meet one of
                the following criteria: A Body Mass Index{" "}
                <a
                  href="https://support.medexpress.co.uk/hc/en-gb/articles/18449019056541-Am-I-eligible-for-treatment-with-Mounjaro-or-Wegovy"
                  target="_blank"
                  className="text-teal-600"
                >
                  (BMI) of 30 or higher
                </a>
                , or A BMI of 27 or higher, alongside health conditions related
                to weight, such as:
              </p>
              <ul className="space-y-3 ps-4 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Type 2 diabetes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>High blood pressure</span>
                </li>
                {/* <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Cardiovascular disease</span>
                </li> */}
              </ul>
              <p className="para-font reg-font text-[#212529]">
                The decision to prescribe weight loss pen is based on this
                thorough evaluation, ensuring the treatment is suited to your
                specific health needs. Before starting treatment, make sure to
                carefully review the{" "}
                <a
                  href="https://www.medicines.org.uk/emc/files/pil.13801.pdf"
                  target="_blank"
                  className="text-teal-600"
                >
                  patient information leaflet.
                </a>
              </p>
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Who should not take Wegovy?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Wegovy is not suitable for everyone. If you are pregnant,
                planning to become pregnant, or breastfeeding, it is not
                recommended due to the lack of safety data during pregnancy and
                lactation.
              </p>

              <p className="para-font reg-font text-[#212529]">
                It is also not advised for individuals with a BMI below 27
                unless there is a weight-related medical condition.
                Additionally, people with an allergy to semaglutide or any other
                ingredients in weight loss pen should avoid this medication.
              </p>
              <p className="para-font reg-font text-[#212529]">
                If you have any of the following health conditions, consult with
                our clinician before starting Wegovy medication:
              </p>
              <ul className="space-y-3 ps-4 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Diabetic retinopathy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>A history of pancreatitis</span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Cardiovascular disease</span>
                </li>
              </ul>
              {/* <Image
                width={1200}
                height={150}
                src={"/Images/Mounjarodosage.webp"}
                alt="Mounjaro Dos
                age"
              /> */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Is Wegovy right for me?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Wegovy may be right for you if you have a BMI of 30 or above, or
                27+ with weight-related conditions, and have not seen results
                with lifestyle changes alone. It helps control appetite and
                supports gradual weight loss. Suitability depends on your
                medical history, current medications, and overall health. A
                clinician assessment is essential before starting.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can Wegovy be used by people with diabetes?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Adults living with type 2 diabetes may use Wegovy, but medical
                supervision plays a key role. If you already take diabetes
                medications, Our healthcare professionals will closely review
                your treatment plan and monitor your response to avoid issues
                such as low blood sugar. Suitability always depends on your
                individual health profile.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can Wegovy be used by people without diabetes?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Yes. Wegovy is prescribed for weight loss in adults without
                diabetes as long as they meet eligibility criteria (commonly BMI
                ≥ 30, or BMI ≥ 27 with a weight-related condition) and pass a
                clinician review. It was originally developed for type 2
                diabetes, but it’s now used specifically for weight management
                in suitable patients.
              </p>
            </div>

            {/* ── Dosing & Usage ── */}

            <div
              id="shouldTakewagovy"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Dosing & Usage
                </h2>
              </div>
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What dosage of Wegovy should I use?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Our healthcare professionals use a step-wise schedule where you
                start low and increase every 4 weeks until you reach a
                maintenance dose.
              </p>
              <ul className="space-y-3 ps-4 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Weeks 1–4:</strong> 0.25 mg once-weekly
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Weeks 5–8:</strong> 0.5 mg once-weekly
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Weeks 9–12:</strong> 1.0 mg once-weekly
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Weeks 13–16:</strong> 1.7 mg once-weekly
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Week 17 onwards:</strong> 2.4 mg once-weekly
                    (maintenance)
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-[#212529]">
                The maintenance may be 1.7 mg or 2.4 mg, depending on what our
                UK licensed clinician decides is right for you.
              </p>
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How does the Wegovy dosage plan support safe, gradual weight
                loss?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Wegovy is prescribed using a step-by-step dosing plan, designed
                to help your body adjust comfortably while ensuring maximum
                effectiveness. Starting at a low dose, the medication gradually
                increases to a maintenance dose of 2.4 mg, helping to minimise
                side effects while promoting steady weight loss.
              </p>

              <p className="para-font reg-font text-[#212529]">
                This structured approach allows the body to acclimate to the
                medication, ensuring that weight loss happens safely and
                progressively under medical supervision.
              </p>

              <Image
                width={1200}
                height={150}
                src={"/Images/wegovy-injections.jpg"}
                alt="Mounjaro Dosage"
              />
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Finding the right Wegovy dose for you
              </h3>
              <p className="para-font reg-font text-[#212529]">
                The "right" dose is typically the one that delivers steady
                progress while still feeling tolerable day-to-day — without
                pushing through side effects unnecessarily. Treatment is not
                one-size-fits-all, and our healthcare professional may keep you
                at a lower dose if you're doing well on it.
              </p>
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Adjusting your dose
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Dose increases are usually planned every 4 weeks, but
                adjustments can happen based on how you feel. If side effects
                are troublesome, the UK licensed healthcare professional may
                recommend staying on the same dose longer rather than moving up
                on schedule. Only change dose under clinical advice.
              </p>
              <h3 className="text-lg sm:text-2xl reg-font text-blackblack">
                Can I take Wegovy a day early?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Yes, you can take your dose a day early, but ensure that at
                least 3 days have passed since your last injection. However,
                it’s important to confirm any adjustments with our clinician to
                make sure it’s safe for you.
              </p>
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What happens if I miss a dose of Wegovy?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                If you forget to take your Wegovy weight loss injections and
                it’s been 5 days or less, administer the dose as soon as you
                remember. Afterwards, continue with your next injection on the
                usual day, even if it’s only a few days apart.
              </p>
              <p className="para-font reg-font text-[#212529]">
                However, if more than 5 days have passed, skip the missed dose
                and resume your regular schedule. Never attempt to take a double
                dose to make up for the missed one, as it could increase the
                risk of side effects.
              </p>
              <p className="para-font reg-font text-[#212529]">
                Consistently missing doses can impact the effectiveness of your
                treatment. If you miss two or more doses, consult our healthcare
                providers. They may advise restarting the treatment at a lower
                dose, especially if you’ve experienced any stomach-related
                discomfort.
              </p>
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How long should I take Wegovy for?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                The length of time you need to take Wegovy depends on your
                individual weight loss goals. Most people use it until they
                reach their desired weight, with some choosing to stay on the
                medication to help maintain their results. After six months, Our
                healthcare professional will review your progress to determine
                if continuing is appropriate.
              </p>
              <p className="para-font reg-font text-[#212529]">
                If you’ve lost at least 5% of your starting body weight and are
                experiencing no major side effects, you may continue using
                medication as part of your long-term weight management plan.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How long do you take Wegovy for weight loss?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Most people take Wegovy weekly for at least 6–12 months, with
                continuation beyond that depending on how much more weight loss
                and health improvements you want to achieve.
              </p>
              <p className="para-font reg-font text-[#212529]">
                In the UK, treatment may be continued as long as it’s considered
                safe and effective, but many plans start with a gradual dose
                escalation over the first 16–20 weeks before staying at a
                maintenance dose until your goals are reached.
              </p>

              <p className="para-font reg-font text-[#212529]">
                Stopping too early often leads to weight regain, so licensed
                healthcare professionals typically recommend ongoing use until
                desired weight and lifestyle changes are sustained.
              </p>
            </div>

            {/* ── Injection & Administration ── */}
            <div
              id="sideeffect"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Injection & Administration
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How to administer the Wegovy injection?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Wegovy is a subcutaneous injection, which means it’s injected
                just under the skin, typically once a week. You can take it with
                or without food, but to maintain consistency, it’s ideal to
                administer the injection at the same time each week. Each pen
                contains four doses, enough for one month of treatment. Once you
                finish the four doses, you’ll need to start a new pen.
              </p>
              <p className="para-font reg-font text-[#212529]">
                Here’s a simple guide to help you administer your weight loss
                pen:
              </p>

              <ul className="space-y-3 ps-4 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">Verify your medication:</span>{" "}
                    Start by checking that the medication in your pen matches
                    the prescribed dosage. Ensure that the label and strength
                    align with our doctor’s instructions
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">Examine the pen:</span> Remove
                    the cap and inspect the pen before use. The liquid inside
                    should be clear and free from any particles or cloudiness.
                    If the liquid looks unusual, do not use it.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">Prepare the needle:</span> For
                    each injection, always use a new needle. Attach it securely
                    to the pen, ensuring it’s ready for use.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">First-time flow check:</span> If
                    you’re using the pen for the first time, remove both the
                    inner and outer needle caps. Perform the flow check as
                    detailed in the instructions to ensure the pen is working
                    properly.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">Set the correct dose:</span>{" "}
                    Adjust the dose selector to match the prescribed amount.
                    This ensures you receive the right amount of medication for
                    your treatment plan.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">
                      Choose your injection site:
                    </span>{" "}
                    Select a suitable area for the injection, such as the
                    abdomen (avoiding the area within 5 cm of your belly
                    button), upper thigh, or the upper arm. Make sure to rotate
                    injection sites weekly to minimize irritation and promote
                    consistent absorption.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">Administer the injection:</span>{" "}
                    Insert the needle at a 90-degree angle into the skin. Keep
                    an eye on the dose counter during the injection to ensure
                    the full dose is delivered.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">
                      Dispose of the needle properly:
                    </span>{" "}
                    After the injection, replace the outer needle cap, unscrew
                    it, and dispose of both the needle and cap in a designated
                    sharps bin. Proper disposal helps ensure safety and hygiene.
                  </span>
                </li>
              </ul>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Where should Wegovy be injected?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Wegovy is injected just beneath the skin (subcutaneously),
                typically in the abdomen, upper legs, or upper arms. To reduce
                any discomfort or irritation, rotate the injection sites weekly.
                This ensures you don’t experience soreness from injecting in the
                same spot repeatedly, promoting a smoother injection experience.
              </p>
              <Image
                width={1200}
                height={150}
                src={"/Images/WhereshouldinjectMounjaro.png"}
                alt="Where should I inject Mounjaro"
              />

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How to dispose of used needles?
              </h3>

              <ul className="space-y-3 ps-4 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">Use a sharps bin:</span> Place
                    each used needle straight into an approved,
                    puncture-resistant sharps container after use.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">Never use household waste:</span>{" "}
                    Do not put needles in general rubbish or recycling, as this
                    creates a risk of injury.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">Prepare the needle:</span> For
                    each injection, always use a new needle. Attach it securely
                    to the pen, ensuring it’s ready for use.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">Get a sharps container:</span>{" "}
                    These are available from pharmacies, GP surgeries, or may be
                    provided during your consultation.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">
                      Dispose of the full bin safely:
                    </span>{" "}
                    Once the sharps bin is around two-thirds full, seal it and
                    arrange disposal through your local council’s clinical waste
                    service or a participating pharmacy.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <span className="med-font">
                      Recycle the pen if available:
                    </span>{" "}
                    After removing the needle, empty pens may be recyclable
                    through pharmacy-led schemes, depending on availability.
                  </span>
                </li>
              </ul>

              <p className="para-font reg-font text-[#212529]">
                This keeps disposal safe, hygienic, and compliant with UK
                clinical waste guidance.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Does Wegovy come with needles?
              </h3>

              <p className="para-font reg-font text-[#212529]">
                Yes. Wegovy is supplied as a pre-filled injection pen. The
                medication comes ready to use, and injection needles can be
                included with your order if required.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Do I need to buy my own needles?
              </h3>

              <p className="para-font reg-font text-[#212529]">
                There is no need to source needles independently. If needed,
                needles and a sharps bin can be purchased at the time of
                checkout.
              </p>
            </div>

            {/* strong */}
            <div
              id="reduceEffect"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Storage & Handling
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How do I store Wegovy?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                When storing Wegovy, it’s important to keep the medication in
                the fridge before use. The ideal temperature is between 2°C and
                8°C. Make sure to store it away from the cooling element. After
                the pen is opened, it can be kept at room temperature below
                30°C, or you can continue storing it in the fridge. If you don’t
                use the pen within 6 weeks, it should be discarded. Always keep
                the cap on to protect it from light.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How long can Wegovy be out of the fridge?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Once opened, Wegovy can stay out of the fridge for up to 6
                weeks, as long as it doesn’t exceed 30°C. Keep the pen in its
                original packaging to prevent light exposure and store it in a
                cool, dry place.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can I travel with Wegovy?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                When travelling, always carry your Wegovy pen in your hand
                luggage to avoid temperature fluctuations in the aircraft hold.
                Store the pen in a cooler to maintain the recommended
                temperature range (2°C to 8°C). Remember to bring your Wegovy
                prescription and adhere to airline regulations regarding
                medication transport.
              </p>
            </div>

            {/* ── Effectiveness & Results ── */}
            <div
              id="wegovyWarnings"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Effectiveness & Results
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How quickly does Wegovy suppress appetite?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Most people notice appetite reduction within days to 1–2 weeks,
                and it commonly becomes more noticeable within the first 4
                weeks. For many, appetite control can feel stronger by weeks
                9–12 as dosing increases.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Why am I still hungry on Wegovy?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                If you’re still feeling hungry on Wegovy, several factors could
                be at play, such as not reaching your optimal dose or not
                following a balanced diet. It’s crucial to maintain a proper
                nutritional intake while on Wegovy, as being in a calorie
                deficit without proper nutrition can hinder your progress. If
                hunger continues, discuss other treatment options With our
                clinician.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What happens when I stop taking Wegovy?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Wegovy is non-addictive, and it’s safe to stop once you reach a
                healthy weight. However, you may experience an increase in
                appetite as the medication’s effects diminish. Research shows
                that many people regain some of the weight lost once they stop
                using the injection, especially within the first year.
              </p>

              <p className="para-font reg-font text-[#212529]">
                To prevent this, continue healthy habits such as a balanced,
                calorie-controlled diet and regular exercise. While weight loss
                treatment can help you lose weight, sustaining those results
                requires ongoing lifestyle changes.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Will I regain weight after stopping Wegovy?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Weight regain is possible after stopping Wegovy, especially if
                diet and activity changes aren’t maintained. On average, people
                may regain a large proportion of the weight lost (one provider
                cites around two-thirds regained on average), but results vary
                person to person.
              </p>
            </div>

            {/* ── Side Effects & Safety ── */}
            <div
              id="hearHealth"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Side Effects & Safety
                </h2>
              </div>

              {/* Common Side Effects */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-2xl reg-font text-black">
                  What are the side effects of Wegovy?
                </h3>
                <p className="para-font reg-font text-[#212529]">
                  Wegovy can cause side effects, although many people experience
                  minimal or no issues. Some side effects are mild and
                  temporary, often improving as the body adjusts to the
                  medication.
                </p>
                <h3 className="text-lg sm:text-2xl reg-font text-black">
                  Very common side effects
                </h3>
                <ul className="list-disc list-inside para-font text-[#212529] space-y-1">
                  <li>Nausea or vomiting</li>
                  <li>Diarrhoea</li>
                  <li>Constipation</li>
                  <li>Headache</li>
                  <li>Stomach discomfort or pain</li>
                  <li>Fatigue</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-2xl reg-font text-black">
                  Common side effects
                </h3>
                <ul className="list-disc list-inside para-font text-[#212529] space-y-1">
                  <li>Hair thinning</li>
                  <li>Redness or swelling at the injection site</li>
                  <li>Gallstones</li>
                  <li>Indigestion</li>
                  <li>Bloating, burping, or gas</li>
                  <li>Heartburn or acid reflux</li>
                </ul>
              </div>

              {/* Serious Side Effects */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-2xl reg-font text-black">
                  What are serious side effects of Wegovy?
                </h3>
                <p className="para-font text-[#212529]">
                  While less common, there are serious reactions to be aware of.
                  These include:
                </p>
                <ul className="list-disc list-inside para-font text-[#212529] space-y-1">
                  <li>
                    {" "}
                    <span className="med-font">Pancreatitis</span> marked by
                    severe stomach or back pain
                  </li>
                  <li>
                    <span className="med-font">Diabetic retinopathy</span>{" "}
                    worsening of eye conditions in diabetic individuals
                  </li>
                  <li>
                    <span className="med-font">Kidney-related issues</span>,
                    such as difficulty urinating or back pain
                  </li>
                  <li>
                    <span className="med-font">Severe allergic reactions</span>{" "}
                    with symptoms like swelling, difficulty breathing, or
                    dizziness
                  </li>
                </ul>
                <p className="para-font text-[#212529]">
                  It's important to monitor for these and seek immediate medical
                  help if necessary. For detailed information, please consult
                  your
                  <a
                    href="https://www.medicines.org.uk/emc/files/pil.13801.pdf"
                    target="_blank"
                    className="text-teal-600"
                  >
                    patient information leaflet.
                  </a>
                  .
                </p>
              </div>

              {/* How long do side effects last */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-2xl reg-font text-black">
                  How long do side effects last?
                </h3>
                <p className="para-font text-[#212529]">
                  Most side effects are short-lived and improve as your body
                  adjusts — commonly a few days to a few weeks. They are most
                  likely in the first month. They can return after a dose
                  increase, then usually settle again.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-2xl reg-font text-black">
                  Are there long-term side effects of Wegovy?
                </h3>
                <p className="para-font text-[#212529]">
                  Wegovy is approved for longer-term use, and there’s no fixed
                  maximum duration, but it should be reviewed regularly so the
                  benefits continue to outweigh the risks. Longer-term or less
                  common risks discussed by UK providers include issues like
                  gallstones, and rare but serious effects such as pancreatitis
                  or severe allergic reactions; some guidance also flags
                  monitoring for thyroid swelling, especially if you have
                  thyroid disease.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-2xl reg-font text-black">
                  What should I do if I lose weight too quickly?
                </h3>
                <p className="para-font text-[#212529]">
                  If weight loss feels rapid, avoid undereating. Stick to small,
                  regular meals and stay well hydrated to support safe progress.
                  Follow the prescribed dosing schedule. Increasing doses faster
                  than advised can raise the risk of side effects. Rapid loss
                  can happen in good responders, but it’s sensible to check in
                  with your healthcare professional if you’re unsure. Seek
                  urgent medical advice if fast weight loss is accompanied by
                  persistent vomiting, severe abdominal pain, dizziness, or
                  signs of dehydration.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-2xl reg-font text-black">
                  How to manage Wegovy side effects?
                </h3>
                <p className="para-font text-[#212529]">
                  Many of the side effects associated with Wegovy are temporary
                  and typically subside as your body adjusts. To help manage
                  common effects like nausea, try staying hydrated, eating
                  smaller meals throughout the day, and avoiding spicy or heavy
                  foods.
                </p>

                <p className="para-font text-[#212529]">
                  If side effects persist or become more intense, contact our
                  healthcare provider for guidance. Should you experience severe
                  symptoms, such as intense abdominal pain or difficulty
                  breathing, seek emergency medical attention immediately.
                </p>
              </div>
              {/* Managing Side Effects */}
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What are the important warnings to consider when using Wegovy?
              </h3>
              <p className="para-font text-[#212529]">
                Wegovy is a powerful weight loss tool, but it’s essential to use
                it with caution. Before starting Wegovy, ensure you have a full
                understanding of potential risks and consult with a healthcare
                provider if you have any of the following:
              </p>
              <ul className="list-disc list-inside para-font text-[#212529] space-y-1">
                <li>
                  {" "}
                  <span className="med-font">Kidney issues:</span> If you have
                  kidney problems, it’s crucial to discuss this with our
                  clinician before using Wegovy. They may need to adjust your
                  dosage or consider alternative options.
                </li>
                <li>
                  <span className="med-font">
                    Diabetes and pancreatitis history:{" "}
                  </span>{" "}
                  Those with diabetes or a history of pancreatitis should
                  consult a healthcare provider to ensure Wegovy is safe for
                  them.
                </li>
                <li>
                  <span className="med-font">Eye health and surgery: </span> If
                  you have diabetic retinopathy or are planning surgery, it’s
                  essential to talk to our clinician about whether Wegovy is
                  suitable for you.
                </li>
                <li>
                  <span className="med-font">Current medications:</span> If you
                  are already taking antidiabetic medications such as insulin or
                  sulfonylureas, or other weight loss treatments like Saxenda or
                  Mounjaro, be sure to inform our healthcare provider. Combining
                  these medications could pose risks.
                </li>
              </ul>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Wegovy and pregnancy
              </h3>
              <p className="para-font text-[#212529]">
                Do not use Wegovy if you are pregnant, planning to become
                pregnant, or breastfeeding, as its safety during these
                conditions has not been established. The safety of injection
                during pregnancy and lactation has not been established.
                Discontinue use at least two months before attempting to
                conceive. If you suspect you may be pregnant, stop taking
                medication and seek advice from our healthcare provider.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Wegovy and breastfeeding
              </h3>
              <p className="para-font text-[#212529]">
                Do not use Wegovy while breastfeeding. The effects of the
                medication on breast milk are unknown, and it’s important to
                prioritise the health and safety of both you and your baby.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Contraception requirements
              </h3>
              <p className="para-font text-[#212529]">
                While using Wegovy, contraception is advised to prevent
                pregnancy. Although Wegovy does not impact the effectiveness of
                oral contraceptives, side effects such as vomiting or diarrhea
                may reduce their absorption. In such cases, you may need to use
                alternative contraception methods to ensure protection.
              </p>

              <p className="para-font text-[#212529]">
                Always ensure you’re fully informed and consult our healthcare
                professional to assess if weight loss treatment is the right fit
                for your health needs. Your safety and well-being are our
                priority.
              </p>
            </div>

            {/* ── Eligibility & Prescription ── */}
            <div
              id="comparing"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Interactions & Precautions
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Does Wegovy interact with other medications?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                It’s crucial to discuss any current medications or supplements
                with our healthcare provider before starting Wegovy for weight
                loss. This helps our clinician evaluate potential interactions
                and adjust your treatment plan to ensure it’s both safe and
                effective for you.
              </p>
              <p className="para-font reg-font text-[#212529]">
                If you’re managing diabetes with insulin or sulfonylureas,
                combining them with a weight loss injection may increase the
                risk of low blood sugar (hypoglycemia). Our UK licensed
                clinician may suggest more frequent blood sugar monitoring and
                adjust your diabetes medication accordingly.
              </p>
              <p className="para-font reg-font text-[#212529]">
                Additionally, avoid using weight loss medication with other
                GLP-1 receptor agonists like Mounjaro or liraglutide. Combining
                these medications could result in excessive dosing, raising the
                risk of unwanted side effects. Always consult our healthcare
                provider if you’re using other treatments to ensure they are
                compatible with Wegovy.
              </p>
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can I take Wegovy with insulin?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Yes, sometimes — but only under clinician supervision. Wegovy is
                not a replacement for insulin, and using it alongside insulin or
                other diabetes medicines can raise the risk of low blood sugar
                (hypoglycaemia). Our prescriber may adjust doses and advise
                closer glucose monitoring.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can Wegovy be taken with other GLP-1 medications?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                No. You should not use Wegovy alongside another GLP-1 receptor
                agonist (for example, medicines containing semaglutide or other
                GLP-1 treatments). This is effectively "doubling up" and
                significantly increases the risk of side effects.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What precautions should I take before using Wegovy?
              </h3>
              <ul className="space-y-3 ps-4 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Have a full medical review:</strong> Share your
                    complete medical history and all current medicines,
                    especially diabetes treatments, so suitability can be safely
                    assessed.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Understand risks and side effects:</strong>{" "}
                    Digestive symptoms are common. Be aware of warning signs
                    that need medical advice, including symptoms of
                    pancreatitis.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    <strong>Use regulated supply only:</strong> Wegovy should be
                    obtained through a legitimate prescription and supplied by
                    an approved pharmacy.
                  </span>
                </li>
              </ul>
            </div>

            <div
              id="stopping"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Buying & Prescriptions
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can I buy Wegovy online?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                You can conveniently buy Wegovy online through a trusted
                service. A licensed healthcare provider will assess your health
                status and determine if Wegovy is the right fit for your weight
                loss goals. If appropriate, a wegovy prescription will be
                issued, and Wegovy will be delivered directly to your door in
                discreet packaging, ensuring your privacy and convenience.
              </p>
              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Where can I buy Wegovy in the UK?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Wegovy is available in the UK only through regulated services
                that are legally authorized to prescribe prescription-only
                medicines. You can access it via:
              </p>
              <ul className="space-y-3 ps-4 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    UK registered online pharmacies that assess suitability
                    before prescribing.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Private weight-management clinics offering clinician-led
                    consultations, such as Online Weight Loss Clinic, Mayfair
                    Weight Loss Clinic, and ASDA Online Doctor.
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-[#212529]">
                Wegovy is not sold over the counter and should never be
                purchased from unregulated sellers.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How do I get a prescription for Wegovy?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Getting a Wegovy prescription online is simple. Complete our
                online consultation, and our licensed medical team will assess
                your eligibility. If you meet the criteria, Wegovy will be
                prescribed, and you can have it delivered discreetly to your
                home.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How to request Wegovy from Online Weight Loss Clinic?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                To request Wegovy from Online Weight Loss Clinic:
              </p>

              <ol className="list-decimal space-y-3 ps-6 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="">1.</span>
                  <span>Complete a secure online medical assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="">2.</span>
                  <span>
                    Provide details such as BMI, medical history, and current
                    medications
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="">3.</span>
                  <span>A UK-licensed clinician reviews your information</span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="">4.</span>
                  <span>
                    If approved, the clinic dispenses Wegovy and arranges
                    delivery
                  </span>
                </li>
              </ol>
              <p className="para-font reg-font text-[#212529]">
                Prescription approval is based on clinical suitability, not
                guaranteed.
              </p>

              {/* <h3 className="text-lg sm:text-2xl reg-font text-black">
                How do I get a prescription for Wegovy?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Getting a Wegovy prescription online is simple. Complete our
                online consultation and our licensed medical team will assess
                your eligibility. If you meet the criteria, Wegovy will be
                prescribed and delivered discreetly to your home.
              </p> */}

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How to request Wegovy from an Online Weight Loss Clinic?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                To request Wegovy from Online Weight Loss Clinic:
              </p>
              <ul className="space-y-3 ps-4 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Complete a secure online medical assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Provide details such as BMI, medical history, and current
                    medications
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>A UK-licensed prescriber reviews your information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    If approved, the pharmacy dispenses Wegovy and arranges
                    delivery
                  </span>
                </li>
              </ul>
              <p className="para-font reg-font text-[#212529]">
                Prescription approval is based on clinical suitability and is
                not guaranteed.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Ordering for the first time
              </h3>
              <p className="para-font reg-font text-[#212529]">
                First-time orders follow a structured process to ensure Wegovy
                is supplied safely and in line with UK regulations:
              </p>
              <ul className="space-y-3 ps-4 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Submit an online health questionnaire for clinical review
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Ensure all health information is accurate to support safe
                    prescribing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Wait for prescriber approval before payment and dispensing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Receive discreet home delivery once approved</span>
                </li>
              </ul>

              <p className="para-font reg-font text-[#212529]">
                This process ensures Wegovy is supplied safely and in line with
                UK prescribing regulations. Each pack contains four once-weekly
                injections, covering one month of treatment. Prices reflect the
                prescribed dose strength and may vary based on availability.
                Wegovy is supplied only following a successful clinical
                assessment and prescription approval.
              </p>
            </div>

            {/* ── Costs & Pricing ── */}
            <div
              id="Alternatives"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Costs & Pricing
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How much does Wegovy cost in the UK?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                The cost of Wegovy in the UK depends on the prescribed dose.
                Based on current in-stock pricing, monthly costs are:
              </p>

              <div className="overflow-hidden rounded-md border border-gray-300 ">
                <table className="w-full para-font text-[#212529]">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="text-left px-4 py-3 font-semibold">
                        Dose
                      </th>
                      <th className="text-left px-4 py-3 font-semibold">
                        Supply
                      </th>
                      <th className="text-left px-4 py-3 font-semibold">
                        Monthly Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3">0.25 mg</td>
                      <td className="px-4 py-3">4 weekly doses</td>
                      <td className="px-4 py-3 font-medium">£88.00</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="px-4 py-3">0.5 mg</td>
                      <td className="px-4 py-3">4 weekly doses</td>
                      <td className="px-4 py-3 font-medium">£98.00</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3">1.0 mg</td>
                      <td className="px-4 py-3">4 weekly doses</td>
                      <td className="px-4 py-3 font-medium">£109.00</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="px-4 py-3">1.7 mg</td>
                      <td className="px-4 py-3">4 weekly doses</td>
                      <td className="px-4 py-3 font-medium">£164.00</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3">2.4 mg</td>
                      <td className="px-4 py-3">4 weekly doses</td>
                      <td className="px-4 py-3 font-medium">£198.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="para-font reg-font text-[#212529]">
                Each pack contains four once-weekly injections, covering one
                month of treatment. Prices reflect the dose strength prescribed
                and may change based on availability. Wegovy is supplied only
                after a successful clinical assessment and prescription
                approval.
              </p>
            </div>
            {/* ── Delivery & Support ── */}
            <div
              id="Fertility"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Comparisons & Switching Treatments
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What is the difference between Wegovy and Mounjaro?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Wegovy and Mounjaro are both injectable weight-loss medications,
                but they use different active ingredients and work slightly
                differently. Wegovy contains semaglutide, which mimics the GLP-1
                hormone to reduce appetite and slow digestion. Mounjaro contains
                tirzepatide, which targets both GLP-1 and GIP hormones,
                potentially leading to stronger appetite control and greater
                weight loss in clinical studies. Their dosing schedules and
                effects vary, and they are not interchangeable without medical
                guidance.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What is the difference between Wegovy and Saxenda?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                While both help with weight management, Wegovy uses semaglutide
                and is given once-weekly, whereas Saxenda uses liraglutide and
                must be injected daily. Wegovy stays active in the body much
                longer, allowing weekly dosing, whereas Saxenda's shorter
                activity means daily administration is required.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What is the difference between Wegovy and Ozempic?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Although Wegovy and Ozempic contain the same active ingredient —
                semaglutide — they serve different purposes. Wegovy is
                prescribed for weight loss, while Ozempic is used for managing
                type 2 diabetes. They also differ in dosage, with Wegovy being
                more focused on appetite regulation for weight management.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Can I switch to Wegovy from Mounjaro?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Switching from{" "}
                <a
                  href="/weight-loss-treatments//mounjaro"
                  className="text-teal-600"
                  target="_blank"
                >
                  Mounjaro
                </a>{" "}
                to Wegovy is straightforward. After evaluating your needs and
                progress, our clinical team will guide you through the process
                and adjust your dosage accordingly. This transition can usually
                take place within a week to ensure a seamless continuation of
                your weight loss journey.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Which weight loss injection is best for me?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                There is no single "best" weight loss injection for everyone.
                The right option depends on your BMI, medical history, and
                prescriber assessment.
              </p>
              <ul className="space-y-3 ps-4 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    In the UK, injections like Wegovy are commonly considered
                    for adults with a BMI of 30+, or 27+ with a weight-related
                    condition.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    It's a once-weekly injection that helps reduce appetite and
                    support weight loss when combined with lifestyle changes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    The best injection for you is the one a UK-licensed
                    prescriber confirms is safe and suitable based on your
                    individual health needs.
                  </span>
                </li>
              </ul>
            </div>

            {/* ── Comparisons & Alternatives ── */}
            <div
              id="test"
              className="flex flex-col gap-5 border-b border-gray-300 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Alternative Treatments
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What are alternative weight loss medications?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                If Wegovy isn't the right fit for you, we offer other treatments
                such as Mounjaro and Nevolat. These medications also work by
                regulating blood sugar and controlling appetite. Our prescribing
                team will assess your specific needs and help you explore other
                weight loss options that suit your health and lifestyle.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                How does Wegovy compare to other weight loss injections?
              </h3>

              <div className="block md:hidden space-y-4">
                {[
                  {
                    point: "Active substance",
                    wegovy: "Semaglutide",
                    mounjaro: "Tirzepatide",
                    saxenda: "Liraglutide",
                  },
                  {
                    point: "Mechanism of action",
                    wegovy:
                      "Helps reduce hunger, delays digestion, and increases feelings of fullness",
                    mounjaro:
                      "Regulates appetite, slows digestion, enhances fullness, and supports blood sugar control",
                    saxenda:
                      "Controls appetite, slows digestion, and promotes longer-lasting satiety",
                  },
                  {
                    point: "Dose adjustment pattern",
                    wegovy: "Increases at 4-week intervals",
                    mounjaro: "Increases at 4-week intervals",
                    saxenda: "Increases every week",
                  },
                  {
                    point: "Administration frequency",
                    wegovy: "Once per week",
                    mounjaro: "Once per week",
                    saxenda: "Once per day",
                  },
                  {
                    point: "Weight loss in studies",
                    wegovy: "Average losses up to 15% of body weight",
                    mounjaro: "Average losses up to 20% of body weight",
                    saxenda: "Average losses between 5% and 10%",
                  },
                  {
                    point: "Prescription required",
                    wegovy: "Yes",
                    mounjaro: "Yes",
                    saxenda: "Yes",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="rounded-md border border-gray-300 overflow-hidden"
                  >
                    <div className="bg-blue-100 px-4 py-2">
                      <p className="font-semibold text-sm text-[#212529]">
                        {row.point}
                      </p>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <div className="flex justify-between px-4 py-2">
                        <span className="text-sm font-medium text-[#212529] w-1/3">
                          Wegovy
                        </span>
                        <span className="text-sm text-[#212529] w-2/3 text-right">
                          {row.wegovy}
                        </span>
                      </div>
                      <div className="flex justify-between px-4 py-2 bg-gray-50">
                        <span className="text-sm font-medium text-[#212529] w-1/3">
                          Mounjaro
                        </span>
                        <span className="text-sm text-[#212529] w-2/3 text-right">
                          {row.mounjaro}
                        </span>
                      </div>
                      <div className="flex justify-between px-4 py-2">
                        <span className="text-sm font-medium text-[#212529] w-1/3">
                          Saxenda
                        </span>
                        <span className="text-sm text-[#212529] w-2/3 text-right">
                          {row.saxenda}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop table — hidden on mobile */}
              <div className="hidden md:block overflow-x-auto rounded-md border border-gray-300">
                <table className="w-full text-sm text-[#212529]">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="text-left px-4 py-3 font-semibold">
                        Comparison point
                      </th>
                      <th className="text-left px-4 py-3 font-semibold">
                        Wegovy
                      </th>
                      <th className="text-left px-4 py-3 font-semibold">
                        Mounjaro
                      </th>
                      <th className="text-left px-4 py-3 font-semibold">
                        Saxenda
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium">
                        Active substance
                      </td>
                      <td className="px-4 py-3">Semaglutide</td>
                      <td className="px-4 py-3">Tirzepatide</td>
                      <td className="px-4 py-3">Liraglutide</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        Mechanism of action
                      </td>
                      <td className="px-4 py-3">
                        Helps reduce hunger, delays digestion, and increases
                        feelings of fullness
                      </td>
                      <td className="px-4 py-3">
                        Regulates appetite, slows digestion, enhances fullness,
                        and supports blood sugar control
                      </td>
                      <td className="px-4 py-3">
                        Controls appetite, slows digestion, and promotes
                        longer-lasting satiety
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium">
                        Dose adjustment pattern
                      </td>
                      <td className="px-4 py-3">
                        Increases at 4-week intervals
                      </td>
                      <td className="px-4 py-3">
                        Increases at 4-week intervals
                      </td>
                      <td className="px-4 py-3">Increases every week</td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        Administration frequency
                      </td>
                      <td className="px-4 py-3">Once per week</td>
                      <td className="px-4 py-3">Once per week</td>
                      <td className="px-4 py-3">Once per day</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium">
                        Weight loss in studies
                      </td>
                      <td className="px-4 py-3">
                        Average losses up to 15% of body weight
                      </td>
                      <td className="px-4 py-3">
                        Average losses up to 20% of body weight
                      </td>
                      <td className="px-4 py-3">
                        Average losses between 5% and 10%
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        Prescription required
                      </td>
                      <td className="px-4 py-3">Yes</td>
                      <td className="px-4 py-3">Yes</td>
                      <td className="px-4 py-3">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ──  Information & Resources ── */}
            <div
              id="Resources"
              className="flex flex-col gap-5 pb-5 px-1 scroll-mt-34"
            >
              <div className="bg-blue-200 p-2 rounded-md">
                <h2 className="text-xl sm:text-xl sm:text-3xl font-bold text-black text-center">
                  Information & Resources
                </h2>
              </div>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                Where can I find the Wegovy patient information leaflet?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                The Wegovy{" "}
                <a
                  href="https://www.medicines.org.uk/emc/files/pil.13801.pdf"
                  target="_blank"
                  className="text-teal-600"
                >
                  Patient Information Leaflet (PIL)
                </a>{" "}
                is provided with your prescription medication packaging when
                your treatment is dispensed by the Online Weight Loss Clinic.
              </p>

              <h3 className="text-lg sm:text-2xl reg-font text-black">
                What information is included with Wegovy treatment?
              </h3>
              <p className="para-font reg-font text-[#212529]">
                Wegovy treatment includes a UK-licensed, once-weekly semaglutide
                injection, with clear information on how it works to reduce
                appetite and cravings. You'll also receive:
              </p>
              <ul className="space-y-3 ps-4 text-[#212529] para-font">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Details on dose strengths and pricing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Eligibility criteria and prescriber review information
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Common side effects and safety guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>Storage instructions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                  <span>
                    Ongoing clinician oversight as part of the treatment to
                    support safe and appropriate use
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManjaroTableContent;
