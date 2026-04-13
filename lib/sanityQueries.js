export const PAGE_QUERY = `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,

    seo {
      metaTitle,
      metaDescription,
      canonical,
      noIndex,
      noFollow,

      ogTitle,
      ogDescription,
      ogImage{
        asset->{ url }
      },

      twitterTitle,
      twitterDescription,
      twitterImage{
        asset->{ url }
      }
    },

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
  ctaLink,

  footerLogo{
    asset->{ url }
  },

  footerDescription,
  footerLinks1,
  footerLinks2,
  footerContact{
    phone,
    email,
    address,
  },
  pharmacy{
    name,
    registrationNumber,
    registrationLink,
    prescriberName,
    prescriberGmc,
    prescriberLink,
    description,
  },
  footerBottomText,
}
`;

export const SEO_QUERY = `
*[_type == "seo"][0]{
  defaultTitle,
  titleTemplate,
  defaultDescription,
  siteUrl,
  allowAll,
  disallowPaths,
  sitemapUrl,
  sitemapCustomRoutes,


  defaultNoIndex,
  defaultNoFollow,

  ogSiteName,
  ogType,

  defaultOgImage{
    asset->{ url }
  },

  twitterCard,

  robotsContent,
  additionalMetaTags
}
`;

export const BLOGS_QUERY = `
*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,

  "image": featuredImage.asset->url,

  author->{
    name,
    slug,
    hasProfilePage
  },

  expert->{
    name,
    slug,
    hasProfilePage
  },

  categories[]->{
    title,
    slug
  }
}
`;

export const SINGLE_BLOG_QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  _type,

  "image": featuredImage.asset->url,

  content[]{
  ...,
  _type == "image" => {
    ...,
    asset->{
      url
      }
    }
  },

  author->{
  name,
  slug,
  hasProfilePage
  },

  expert->{
  name,
  slug,
  hasProfilePage
  },

  categories[]->{
  title,
  slug
  },

  seo
}
`;

export const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc){ _id, title, slug }`;

export const AUTHOR_QUERY = `*[_type == "author" && slug.current == $slug][0]{ name, slug, role, bio, about, expertise, medicalExpertise, gmcNumber, gmcLink, specialisms, qualifications, "image": image.asset->url }`;

export const EXPERT_QUERY = `*[_type == "expert" && slug.current == $slug][0]{ name, slug, role, bio, about, "expertise": credentials, medicalExpertise, gmcNumber, gmcLink, specialisms, qualifications, "image": image.asset->url }`;
