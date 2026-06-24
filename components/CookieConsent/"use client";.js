"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export default function CookieConsentInit() {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom left",
          equalWeightButtons: false,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      categories: {
        necessary: {
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [{ name: /^_ga/ }, { name: "_gid" }, { name: "_cl_id" }],
          },
        },
        // marketing: {
        //   autoClear: {
        //     cookies: [{ name: "_fbp" }],
        //   },
        // },
      },

      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "We use cookies",
              description:
                "We use cookies to run essential parts of this site and to understand how it's used (Google Analytics, Google Tag Manager, CustomerLabs) so we can improve it. You can accept all cookies, reject the non-essential ones, or manage your preferences.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage preferences",
            },
            preferencesModal: {
              title: "Cookie preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Save preferences",
              closeIconLabel: "Close",
              sections: [
                {
                  title: "Strictly necessary",
                  description:
                    "These cookies are essential for the website to function and cannot be switched off.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics",
                  description:
                    "These cookies help us understand how visitors use the site (Google Analytics, Google Tag Manager, CustomerLabs) so we can improve it.",
                  linkedCategory: "analytics",
                },
                // {
                //   title: "Marketing",
                //   description:
                //     "These cookies are used to measure and improve the effectiveness of our advertising (Meta Pixel).",
                //   linkedCategory: "marketing",
                // },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}

// ==========================================================================================================

import "./globals.css";
import "../styles/fonts.css";
import "../styles/lp.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import WegovySignupModalWrapper from "../components/WegovySignupModalWrapper";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== "undefined" && window._cl) {
        window._cl.pageview();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script id="customerlabs-tag" strategy="afterInteractive">
        {`!function(t,e,r,c,a,n,s){t.ClAnalyticsObject=a,t[a]=t[a]||[],t[a].methods=["trackSubmit","trackClick","pageview","identify","track","trackConsent"],t[a].factory=function(e){return function(){var r=Array.prototype.slice.call(arguments);return r.unshift(e),t[a].push(r),t[a]}};for(var i=0;i<t[a].methods.length;i++){var o=t[a].methods[i];t[a][o]=t[a].factory(o)};n=e.createElement(r),s=e.getElementsByTagName(r)[0],n.async=1,n.crossOrigin="anonymous",n.src=c,s.parentNode.insertBefore(n,s)}(window,document,"script","https://cdn.js.customerlabs.co/cl8602w8wtgm8u.js","_cl");_cl.SNIPPET_VERSION="2.0.0"`}
      </Script>

      <Toaster position="top-center" />
      <Component {...pageProps} />
    </>
  );
}



// ==========================================================================================================



import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/vercel.ico" />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WMDVRXWG');`,
          }}
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GB2G3KMRVD"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GB2G3KMRVD');
            `,
          }}
        />

        {/* Meta Pixel */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1333513215275270');
              fbq('track', 'PageView');
            `,
          }}
        /> */}
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WMDVRXWG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Main />
        <NextScript />

        {/* <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1333513215275270&ev=PageView&noscript=1"
            alt=""
          />
        </noscript> */}
      </body>
    </Html>
  );
}
