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
    ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
    ogType = "website",
    canonical = window.location.href,
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

    }, [title, description, keywords, ogImage, ogType, canonical]);

    return null;
};

export default SEO;
