import { useEffect } from "react";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    canonical?: string;
}

const SEO = ({
    title = "Innovation Imperial - Premium Digital Agency",
    description = "Award-winning digital agency crafting cinematic experiences. Specializing in UI/UX design, web development, branding, and strategic consulting.",
    keywords = "digital agency, UI/UX design, web development, branding, strategic consulting, Innovation Imperial",
    ogImage = "/og-image.png",
    ogType = "website",
    canonical = "https://innovationimperial.co.za",
}: SEOProps) => {
    useEffect(() => {
        // Update title
        document.title = title;

        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.setAttribute("name", "description");
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute("content", description);

        // Update meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement("meta");
            metaKeywords.setAttribute("name", "keywords");
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute("content", keywords);

        // Update OG Title
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
            ogTitle = document.createElement("meta");
            ogTitle.setAttribute("property", "og:title");
            document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute("content", title);

        // Update OG Description
        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (!ogDesc) {
            ogDesc = document.createElement("meta");
            ogDesc.setAttribute("property", "og:description");
            document.head.appendChild(ogDesc);
        }
        ogDesc.setAttribute("content", description);

        // Update OG Image
        let ogImg = document.querySelector('meta[property="og:image"]');
        if (!ogImg) {
            ogImg = document.createElement("meta");
            ogImg.setAttribute("property", "og:image");
            document.head.appendChild(ogImg);
        }
        ogImg.setAttribute("content", ogImage);

        // Update OG Type
        let ogT = document.querySelector('meta[property="og:type"]');
        if (!ogT) {
            ogT = document.createElement("meta");
            ogT.setAttribute("property", "og:type");
            document.head.appendChild(ogT);
        }
        ogT.setAttribute("content", ogType);

        // Canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement("link");
            canonicalLink.setAttribute("rel", "canonical");
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute("href", canonical);

        // Structured Data (JSON-LD)
        let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
        if (!jsonLdScript) {
            jsonLdScript = document.createElement("script");
            jsonLdScript.setAttribute("type", "application/ld+json");
            document.head.appendChild(jsonLdScript);
        }

        const organizationData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Innovation Imperial",
            "url": "https://innovationimperial.co.za",
            "logo": "https://innovationimperial.co.za/new_favicon_logo.svg",
            "image": "https://innovationimperial.co.za/og-image.png",
            "description": description,
            "email": "office@innovationimperial.net",
            "telephone": "27697906374",
            "founder": [
                {
                    "@type": "Person",
                    "name": "Ntsane Foulo",
                    "jobTitle": "CEO & Founder"
                },
                {
                    "@type": "Person",
                    "name": "McMarsh Dzwimbu",
                    "jobTitle": "COO & Founder"
                }
            ],
            "member": [
               {
                  "@type": "Person",
                  "name": "Enock Ndoy",
                  "jobTitle": "CTO"
               },
               {
                  "@type": "Person",
                  "name": "Tonderai Dzwimbu",
                  "jobTitle": "CFO"
               },
               {
                  "@type": "Person",
                  "name": "Mtandazo Dube",
                  "jobTitle": "CSO"
               }
            ],
            "sameAs": [
                "https://www.facebook.com/people/Innovation-imperial-Technology-hub/61585235175645/",
                "https://www.instagram.com/innovation.imperial/",
                "https://x.com/innov_imperial"
            ],
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Johannesburg",
                "addressCountry": "ZA"
            }
        };

        const faqData = {
           "@context": "https://schema.org",
           "@type": "FAQPage",
           "mainEntity": [
             {
               "@type": "Question",
               "name": "What services does Innovation Imperial offer?",
               "acceptedAnswer": {
                 "@type": "Answer",
                 "text": "Innovation Imperial specializes in cinematic UI/UX design, custom web development, premium branding, and strategic digital consulting."
               }
             },
             {
               "@type": "Question",
               "name": "Where is Innovation Imperial based?",
               "acceptedAnswer": {
                 "@type": "Answer",
                 "text": "We are a premium digital agency based in Johannesburg, South Africa, serving clients globally."
               }
             }
           ]
        };

        jsonLdScript.textContent = JSON.stringify([organizationData, faqData]);

    }, [title, description, keywords, ogImage, ogType, canonical]);

    return null;
};

export default SEO;
