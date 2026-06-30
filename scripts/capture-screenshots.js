const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://www.selatox.com';

const pages = [
  { name: '01_Home',              url: '/' },
  { name: '02_About',             url: '/about' },
  { name: '03_Our_Business',      url: '/our-business' },
  { name: '04_Manufacturing',     url: '/our-business/manufacturing' },
  { name: '05_Products',          url: '/products' },
  { name: '06_News',              url: '/news' },
  { name: '07_Culture',           url: '/culture' },
  { name: '08_Ethics',            url: '/ethics' },
  { name: '09_Career_Journey',    url: '/journey' },
  { name: '10_Open_Positions',    url: '/openings' },
  { name: '11_Contact',           url: '/contact' },
];

const OUT_DIR = path.join(__dirname, '..', 'uat-screenshots');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const page of pages) {
    const p = await browser.newPage();
    await p.setViewport({ width: 1440, height: 900 });
    console.log(`Capturing: ${page.name} → ${BASE_URL}${page.url}`);
    try {
      await p.goto(BASE_URL + page.url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1500)); // let animations settle
      const filePath = path.join(OUT_DIR, `${page.name}.png`);
      await p.screenshot({ path: filePath, fullPage: true });
      console.log(`  ✓ Saved: ${filePath}`);
    } catch (e) {
      console.error(`  ✗ Error on ${page.name}: ${e.message}`);
    }
    await p.close();
  }

  await browser.close();
  console.log('\nDone. Screenshots in:', OUT_DIR);
})();
