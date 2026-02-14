const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const logosFile = 'extracted_logos.json';
const portfolioFile = 'research/portfolio_data.json';
const outputDir = 'public/client-logos';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const logos = JSON.parse(fs.readFileSync(logosFile, 'utf8'));
const portfolio = JSON.parse(fs.readFileSync(portfolioFile, 'utf8'));

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
                // handle redirect
                downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
            } else {
                reject(new Error(`Status Code: ${res.statusCode}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const processLogos = async () => {
    for (const project of portfolio) {
        const url = project.url;
        // normalize keys in logos (some have trailing slashes)
        let logoUrl = logos[url] || logos[url + '/'] || logos[url.replace(/\/$/, '')];

        if (logoUrl) {
            try {
                const ext = path.extname(new URL(logoUrl).pathname) || '.png';
                // sanitize title for filename
                const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const filename = `${slug}${ext}`;
                const filepath = path.join(outputDir, filename);

                console.log(`Downloading ${logoUrl} to ${filepath}...`);
                await downloadImage(logoUrl, filepath);

                project.logo = `/client-logos/${filename}`;
            } catch (e) {
                console.error(`Failed to download logo for ${project.title}: ${e.message}`);
            }
        }
    }

    fs.writeFileSync(portfolioFile, JSON.stringify(portfolio, null, 2));
    console.log('Portfolio data updated.');
};

processLogos();
