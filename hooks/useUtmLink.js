import { useEffect, useState } from "react";

export function useUtmLink(baseUrl) {
  const [url, setUrl] = useState(baseUrl);

  useEffect(() => {
    const utmSource = localStorage.getItem("utm_source");
    const utmMedium = localStorage.getItem("utm_medium");
    const utmCampaign = localStorage.getItem("utm_campaign");

    if (utmSource && utmSource !== "organic") {
      const params = new URLSearchParams();
      params.set("utm_source", utmSource);
      if (utmMedium) params.set("utm_medium", utmMedium);
      if (utmCampaign) params.set("utm_campaign", utmCampaign);
      setUrl(`${baseUrl}?${params.toString()}`);
    }
  }, [baseUrl]);

  return url;
}
