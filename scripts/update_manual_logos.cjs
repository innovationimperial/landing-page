const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const portfolioFile = 'research/portfolio_data.json';
const outputDir = 'public/client-logos';

const manualLogos = {
    "https://www.trustedinstallations.co.za/": "https://www.trustedinstallations.co.za/dstv-picture.jpg", // Using og:image/hero as logo placeholder if actual logo not distinct, but wait, let's look closer at the HTML.
    // HTML has <div class="absolute transition-all... text-ti-blue-200 ...">DStv Installation Experts</div> which implies text logo.
    // But it has a favicon: https://www.trustedinstallations.co.za/favicon-16x16.png (too small).
    // Let's use the hero image as a fallback background or just skip if no clear logo? 
    // Actually, looking at the code again, there IS no clear `img src="...logo..."`. 
    // Wait, let's check Imperial Nexus.
    "https://www.imperialnexus.space/": "https://www.imperialnexus.space/lovable-uploads/062bc15e-1f68-4dd2-bca9-d3a46735a3c9.png", // og:image seems to be a logo/dashboard preview. Let's use it.

    "https://www.professionalcleaning.co.za/": "https://www.professionalcleaning.co.za/new%20logo%20proclean.jpg" // Found in favicon path but likely available as file. Let's try to verify if there is a better one. 
    // The HTML has <img src="https://www.professionalcleaning.co.za/new%20logo%20proclean.jpg" (deduced from favicon) - wait, favicon is usually small.
    // Let's look at the HTML for 'Proffesional cleaning co' ... 
    // It has <meta property="og:image" content="/proffesional cleaning company.png"> -> https://www.professionalcleaning.co.za/proffesional%20cleaning%20company.png
};

// Refined manual map after second look at step outputs:
const updates = [
    {
        url: "https://www.trustedinstallations.co.za/",
        logoUrl: "https://www.trustedinstallations.co.za/favicon.ico" // Fallback to favicon if no logo found, but let's try to find a better one? 
        // actually the site seems to use text for the logo "DStv Installation Experts". 
        // Let's skip Trusted for now or use a generic "DStv" icon if we can't find one. 
        // actually let's use the one found in the other tool output if any. 
        // For now, let's use the specific ones we found.
    },
    {
        url: "https://www.imperialnexus.space/",
        logoUrl: "https://www.imperialnexus.space/lovable-uploads/062bc15e-1f68-4dd2-bca9-d3a46735a3c9.png"
    },
    {
        url: "https://www.professionalcleaning.co.za/",
        logoUrl: "https://www.professionalcleaning.co.za/proffesional%20cleaning%20company.png"
    }
];

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(filepath);
                res.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
            } else {
                reject(new Error(`Status Code: ${res.statusCode}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const processUpdates = async () => {
    const portfolio = JSON.parse(fs.readFileSync(portfolioFile, 'utf8'));

    for (const update of updates) {
        if (!update.logoUrl) continue;

        const project = portfolio.find(p => p.url === update.url || p.url === update.url.replace(/\/$/, ''));
        if (project) {
            try {
                const ext = path.extname(new URL(update.logoUrl).pathname) || '.png';
                const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const filename = `${slug}${ext}`;
                const filepath = path.join(outputDir, filename);

                console.log(`Downloading ${update.logoUrl} to ${filepath}...`);
                await downloadImage(update.logoUrl, filepath);
                project.logo = `/client-logos/${filename}`;
            } catch (e) {
                console.error(`Failed to download for ${update.url}: ${e.message}`);
            }
        }
    }

    fs.writeFileSync(portfolioFile, JSON.stringify(portfolio, null, 2));
    console.log('Portfolio data updated with manual entries.');
};

processUpdates();
