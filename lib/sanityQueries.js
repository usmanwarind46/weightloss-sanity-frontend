export const PAGE_QUERY = `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    sections[]{
      ...,

      termsPageTitle,
      termsPageContentHTML,
      
      privacyPageTitle,
      privacyPageContentHTML,

      complaintsPageTitle,
      complaintsPageContentHTML,
      
      refundsPageTitle,
      refundsPageContentHTML,

      shippingPageTitle,
      shippingPageContentHTML,

      contactDetailsHeading,

      contactDetailsItems[]{
        type,
        value
      },

      pharmacyHeading,
      pharmacyAddressLines,

      clinicResourcesHeading,

      aboutResourcesItems[]{
        title,
        description,
        href,
        iconKey
      },

      aboutTabsItems[]{
        label,
        title,
        aboutTabsFooterNote,
        aboutTabsParagraphs,

        aboutTabsCards[]{
          text,
          theme,
          iconKey
        },

        aboutTabsFooterNote
      },

      introText,

      aboutCards[]{
        number,
        text,
        theme
      },

      footerNote,
      
      topHeading,
      topParagraph1,
      topParagraph2,

      leftHeading,
      leftParagraph1,
      leftParagraph2,

      rightHeading,

      trustItems[]{
        text,
        iconKey,
        theme
      },

      heading,
      paragraph1,
      paragraph2,
      leadText,

      bulletItems[]{
        text
      },

      desktopImage{
        asset->{ _id, url }
      },
      mobileImage{
        asset->{ _id, url }
      },

      badges[]{
        "imageUrl": image.asset->url,
        alt
      },

      steps[]{
        number,
        description,
        bgColor,
        "imageUrl": image.asset->url
      },

      mainImage{
        asset->{ url }
      },

      cards[]{
        title,
        description,
        bgColor,
        fullWidth,
        "iconUrl": icon.asset->url
      },

      reviews[]{
        name,
        role,
        review,
        rating,
        "imageUrl": image.asset->url
      },

      expectationItems[]{
        title,
        description,
        iconKey
      },

      categories[]{
      category,
      faqs[]{
        question,
        answer
        }
      },

      aboutRegulatorItems[]{
        shortName,
        fullName,
        description,
        logo{
          asset->{ url }
        },
        imageWidth,
        imageHeight,
      },
    }
  }
`;

export const SITE_SETTINGS_QUERY = `
*[_type == "siteSettings"][0]{
  logo{
    asset->{ url }
  },
  topBarText,
  topBarRightText,

  navLinks[]{
    label,
    href
  },

  ctaLabel,
  ctaLink
}
`;
