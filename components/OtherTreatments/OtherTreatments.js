import Image from "next/image";
import Link from "next/link";
import { getBuyLink } from "../ProductCard/ProductCard";

const CheckIcon = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8.5" stroke={color} strokeOpacity="0.4" />
    <path
      d="M5.5 9L7.8 11.5L12.5 6.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Vertical card: image on top, details and buttons below
function TreatmentCard({ product }) {
  const buyLink = getBuyLink(product?.href);

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.09)" }}
    >
      {/* Image */}
      <div
        className="relative flex h-[220px] items-center justify-center"
        style={{ backgroundColor: product?.bgColor }}
      >
        <div className="relative h-[180px] w-[180px]">
          {product?.image && (
            <Image
              src={product.image}
              alt={product?.imageAlt || product?.name || "Treatment"}
              fill
              className="object-contain drop-shadow-xl"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-1 text-xl font-bold text-gray-900">
          {product?.name}{" "}
          {product?.subtitle && (
            <span className="text-base font-normal text-gray-700">
              ({product.subtitle})
            </span>
          )}
        </h3>

        {product?.price && (
          <p
            className="mb-4 text-sm font-medium wieght-card-font"
            style={{ color: "#4CAF8A" }}
          >
            Starting from{" "}
            <span className="underline underline-offset-2">
              {product.price}
            </span>
          </p>
        )}

        <ul className="mb-5 flex flex-col gap-2.5">
          {product?.features?.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm leading-snug text-gray-600 wieght-card-font"
            >
              <span className="mt-0.5 shrink-0">
                <CheckIcon color={product?.bgColor} />
              </span>
              <span>
                {f.text}
                {f.bold && (
                  <strong className="font-semibold text-gray-800">
                    {f.bold}
                  </strong>
                )}
                {f.suffix}
              </span>
            </li>
          ))}
        </ul>

        {/* Buttons stay at the bottom so all cards line up */}
        <div className="mt-auto flex flex-col gap-3">
          {buyLink && (
            <Link
              href={buyLink}
              className="block w-full rounded-xl py-3 text-center text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:scale-[1.02] wieght-card-font"
              style={{
                background: `linear-gradient(135deg, #4B6BC1 0%, #3f59a8 100%)`,
                boxShadow: "0 4px 16px rgba(75,107,193,0.35)",
              }}
            >
              Buy {product?.name}
            </Link>
          )}

          <Link
            href={product?.href || "#"}
            className="block w-full rounded-xl py-3 text-center text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:scale-[1.02] wieght-card-font"
            style={{
              background: `linear-gradient(135deg, #4CAF8A 0%, #3d9e7a 100%)`,
              boxShadow: "0 4px 16px rgba(76,175,138,0.35)",
            }}
          >
            View Treatment
          </Link>
        </div>
      </div>
    </div>
  );
}

// Treatments page cards, minus the product page you are on
export default function OtherTreatments({ products = [], currentHref }) {
  const normalize = (href) => href?.replace(/\/$/, "");

  const otherProducts = (products || []).filter(
    (product) => normalize(product?.href) !== normalize(currentHref),
  );

  if (!otherProducts.length) return null;

  return (
    <section className="bg-white container mx-auto px-4 sm:px-6 py-6 sm:py-12">
      <h4 className="text-2xl sm:text-4xl med-font text-gray-900 text-center mb-10">
        Explore Other Weight Loss Treatments
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {otherProducts.map((product, i) => (
          <TreatmentCard key={product?.href || i} product={product} />
        ))}
      </div>
    </section>
  );
}
