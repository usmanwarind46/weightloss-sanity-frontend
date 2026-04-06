import Link from "next/link";
import { FadeUp } from "../MotionWrapper";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

export function LpHero() {
  const items = [
    {
      icon: "/Lp-images/icon/icon-1.png",
      text: "Same UK regulatory standards as all pharmacies",
    },
    {
      icon: "/Lp-images/icon/icon-2.png",
      text: "Transparent pricing from the start",
    },
    {
      icon: "/Lp-images/icon/icon-3.png",
      text: "UK-licensed doctors & pharmacists",
    },
  ];
  return (
    <section className="lphero relative overflow-hidden">
      <FadeUp>
        <div className="relative z-10 container sm:mx-auto sm:max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center lp">
            {/* Left: Text — 5 cols */}
            <div className="lphero-text  md:col-span-5">
              <h1 className="reg-font lphero-heading">
                Weight loss at <br />
                lowest price, for you
              </h1>
              <p className="lphero-subtext">
                Clinical medical assessment. Personalised treatment plan.
                UK-regulated private clinic.
              </p>
              <Link href="/start-consultation/">
                <button className="next-btn">
                  Start Your Consultation
                  <span className="next-btn-arrow">
                    <ChevronRight />
                  </span>
                </button>
              </Link>
            </div>

            {/* Right: Model Image + Badge — 7 cols */}
            <div className="lphero-image-col md:col-span-7">
              {/* Desktop */}
              <Image
                src="/Lp-images/hero-modal.png"
                alt="Weight loss model"
                width={1000}
                height={600}
                className="hero-modal-desktop"
              />

              {/* Mobile */}
              <Image
                src="/Lp-images/mobile-hero-modal.png"
                alt="Weight loss model"
                width={400}
                height={400}
                className="hero-modal-mobile"
              />
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Trust Bar */}
      <div className="trustbar">
        <div className="trustbar-track">
          {[...items, ...items, ...items].map((item, i) => (
            <div className="trustbar-item" key={i}>
              <Image
                src={item.icon}
                alt=""
                width={20}
                height={20}
                className="trustbar-icon"
              />
              <span className="trustbar-text">{item.text}</span>
              <span className="trustbar-divider">|</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
