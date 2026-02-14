const fs = require('fs');
const path = require('path');

const pathsFile = 'scrape_paths.json';
const outputJson = 'extracted_logos.json';

const paths = JSON.parse(fs.readFileSync(pathsFile, 'utf8'));

const results = {};

paths.forEach(filePath => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        const url = data.metadata.sourceURL || data.metadata.url || 'UNKNOWN_URL';

        let logoUrl = null;

        // Strategy 1: Look for 'logo' string in HTML images FIRST (more specific)
        if (data.html) {
            const imgRegex = /<img\s+([^>]+)>/gi;
            let match;
            while ((match = imgRegex.exec(data.html)) !== null) {
                const attrs = match[1];

                // Extract src
                const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
                if (!srcMatch) continue;
                const src = srcMatch[1];

                // Check for "logo" in src, alt, class, id
                const isLogo = (
                    src.toLowerCase().includes('logo') ||
                    (attrs.match(/alt=["'][^"']*logo[^"']*["']/i)) ||
                    (attrs.match(/class=["'][^"']*logo[^"']*["']/i)) ||
                    (attrs.match(/id=["'][^"']*logo[^"']*["']/i))
                );

                if (isLogo) {
                    logoUrl = src;
                    console.log(`Found logo in HTML for ${url}: ${src}`);
                    break;
                }
            }
        }

        // Strategy 2: og:image as fallback
        if (!logoUrl && data.metadata.ogImage) {
            // Only use if it looks relevant?
            // Actually, if we didn't find a logo in HTML, og:image is better than nothing?
            // But for trustedinstallations it was a hero image.
            // Let's check if og:image has "logo" in it?
            if (data.metadata.ogImage.toLowerCase().includes('logo')) {
                logoUrl = data.metadata.ogImage;
                console.log(`Found logo in og:image for ${url}: ${logoUrl}`);
            } else {
                // Maybe store it as a backup but prefer null?
                // Or store it anyway and I manually review?
                // I'll stick to strict logic for now.
            }
        }

        // Strategy 3: Favicon as desperate fallback?
        // No, let's keep it null if not found.

        // Normalize URL
        if (logoUrl && !logoUrl.startsWith('http') && !logoUrl.startsWith('data:')) {
            try {
                const baseUrl = new URL(url);
                if (logoUrl.startsWith('//')) {
                    logoUrl = 'https:' + logoUrl;
                } else if (logoUrl.startsWith('/')) {
                    logoUrl = baseUrl.origin + logoUrl;
                } else {
                    // relative path
                    // simplistic join
                    logoUrl = baseUrl.origin + '/' + logoUrl;
                }
            } catch (e) {
                // ignore invalid base URLs
            }
        }

        results[url] = logoUrl;

    } catch (e) {
        console.error(`Error processing ${filePath}: ${e.message}`);
    }
});

fs.writeFileSync(outputJson, JSON.stringify(results, null, 2));
