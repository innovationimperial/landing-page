const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const logoUrl = "https://contas.co.za/wp-content/uploads/2024/08/CONTAS-LOGO.svg";
const outputDir = 'public/client-logos';
const filename = 'contas-logo.svg';
const filepath = path.join(outputDir, filename);

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

console.log(`Downloading ${logoUrl} to ${filepath}...`);
downloadImage(logoUrl, filepath)
    .then(() => console.log('Download complete.'))
    .catch(err => console.error('Download failed:', err));
