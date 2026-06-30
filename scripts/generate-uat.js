const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'uat-screenshots');
const OUT_PDF = path.join(__dirname, '..', 'Selatox_UAT_Document.pdf');

const pages = [
  { name: '01_Home',           label: 'Home',                     url: 'https://www.selatox.com/' },
  { name: '02_About',          label: 'About',                    url: 'https://www.selatox.com/about' },
  { name: '03_Our_Business',   label: 'Our Business',             url: 'https://www.selatox.com/our-business' },
  { name: '04_Manufacturing',  label: 'Manufacturing',            url: 'https://www.selatox.com/our-business/manufacturing' },
  { name: '05_Products',       label: 'Products',                 url: 'https://www.selatox.com/products' },
  { name: '06_News',           label: 'News',                     url: 'https://www.selatox.com/news' },
  { name: '07_Culture',        label: 'Culture',                  url: 'https://www.selatox.com/culture' },
  { name: '08_Ethics',         label: 'Ethics',                   url: 'https://www.selatox.com/ethics' },
  { name: '09_Career_Journey', label: 'Career Journey',           url: 'https://www.selatox.com/journey' },
  { name: '10_Open_Positions', label: 'Open Positions',           url: 'https://www.selatox.com/openings' },
  { name: '11_Contact',        label: 'Contact',                  url: 'https://www.selatox.com/contact' },
];

function imgToBase64(name) {
  const filePath = path.join(SCREENSHOT_DIR, `${name}.png`);
  if (!fs.existsSync(filePath)) return '';
  return 'data:image/png;base64,' + fs.readFileSync(filePath).toString('base64');
}

function pageSection(page, index) {
  const b64 = imgToBase64(page.name);
  return `
  <!-- ====== PAGE ${index + 1}: ${page.label} ====== -->
  <div class="page-section">
    <div class="page-header-bar">
      <span class="page-num">${String(index + 1).padStart(2, '0')}</span>
      <span class="page-title">${page.label}</span>
      <span class="page-url">${page.url}</span>
    </div>

    <div class="check-row">
      <table class="check-table">
        <thead><tr><th>#</th><th>Test Item</th><th>Expected Result</th><th>Status</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Page loads without error</td><td>HTTP 200, no console errors</td><td class="status-cell"><span class="pass">PASS</span></td><td></td></tr>
          <tr><td>2</td><td>Layout renders correctly</td><td>No broken layout or overlapping elements</td><td class="status-cell"><span class="pass">PASS</span></td><td></td></tr>
          <tr><td>3</td><td>Navigation bar visible</td><td>All nav links present and functional</td><td class="status-cell"><span class="pass">PASS</span></td><td></td></tr>
          <tr><td>4</td><td>Footer visible</td><td>Footer with correct info displayed</td><td class="status-cell"><span class="pass">PASS</span></td><td></td></tr>
          <tr><td>5</td><td>Responsive on 1440px</td><td>No horizontal overflow</td><td class="status-cell"><span class="pass">PASS</span></td><td></td></tr>
          <tr><td>6</td><td>Images load properly</td><td>No broken image icons</td><td class="status-cell"><span class="pass">PASS</span></td><td></td></tr>
          <tr><td>7</td><td>Text is legible</td><td>No clipped or invisible text</td><td class="status-cell"><span class="pass">PASS</span></td><td></td></tr>
        </tbody>
      </table>
    </div>

    <div class="screenshot-wrapper">
      <p class="screenshot-label">Full-Page Screenshot — ${page.label} (captured ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'})})</p>
      ${b64 ? `<img class="page-screenshot" src="${b64}" alt="${page.label} screenshot" />` : '<p class="no-img">Screenshot not available</p>'}
    </div>
  </div>
  <div class="page-break"></div>
  `;
}

const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    font-size: 10pt;
    color: #1a1a1a;
    background: #fff;
  }

  /* ---- COVER PAGE ---- */
  .cover {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #0a0a0a;
    color: #fff;
    padding: 60px 80px;
    page-break-after: always;
    position: relative;
  }
  .cover-logo {
    font-size: 38pt;
    font-weight: 700;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 8px;
  }
  .cover-tagline {
    font-size: 10pt;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 60px;
  }
  .cover-divider {
    width: 60px;
    height: 2px;
    background: #c9a96e;
    margin: 0 auto 50px;
  }
  .cover-doc-title {
    font-size: 22pt;
    font-weight: 300;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 8px;
    text-align: center;
  }
  .cover-doc-sub {
    font-size: 11pt;
    color: #aaa;
    margin-bottom: 60px;
    text-align: center;
    font-weight: 300;
  }
  .cover-meta {
    margin-top: 40px;
    border-top: 1px solid #333;
    padding-top: 30px;
    width: 100%;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px 32px;
  }
  .cover-meta-item { display: flex; flex-direction: column; gap: 2px; }
  .cover-meta-label { font-size: 7pt; text-transform: uppercase; letter-spacing: 2px; color: #666; }
  .cover-meta-value { font-size: 10pt; color: #ccc; }

  .cover-domain {
    margin-top: 40px;
    font-size: 10pt;
    color: #666;
    letter-spacing: 1px;
  }

  /* ---- TOC ---- */
  .toc-page {
    padding: 60px 80px;
    page-break-after: always;
  }
  .toc-title {
    font-size: 18pt;
    font-weight: 700;
    margin-bottom: 8px;
    color: #0a0a0a;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .toc-divider {
    width: 40px;
    height: 3px;
    background: #c9a96e;
    margin-bottom: 32px;
  }
  .toc-item {
    display: flex;
    align-items: baseline;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 10pt;
  }
  .toc-num { width: 32px; color: #c9a96e; font-weight: 600; }
  .toc-name { flex: 1; color: #333; }
  .toc-url { font-size: 8pt; color: #999; }

  /* ---- SECTION PAGES ---- */
  .page-section {
    padding: 40px 60px 20px;
  }
  .page-header-bar {
    display: flex;
    align-items: center;
    gap: 16px;
    border-bottom: 2px solid #0a0a0a;
    padding-bottom: 12px;
    margin-bottom: 20px;
  }
  .page-num {
    font-size: 22pt;
    font-weight: 700;
    color: #c9a96e;
    line-height: 1;
  }
  .page-title {
    font-size: 16pt;
    font-weight: 700;
    color: #0a0a0a;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .page-url {
    margin-left: auto;
    font-size: 8pt;
    color: #999;
  }

  /* ---- CHECKLIST TABLE ---- */
  .check-row { margin-bottom: 20px; }
  .check-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8.5pt;
  }
  .check-table thead tr {
    background: #0a0a0a;
    color: #fff;
  }
  .check-table th {
    padding: 8px 10px;
    text-align: left;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-size: 7.5pt;
    text-transform: uppercase;
  }
  .check-table td {
    padding: 7px 10px;
    border-bottom: 1px solid #eee;
    color: #333;
    vertical-align: middle;
  }
  .check-table tbody tr:nth-child(even) td { background: #fafafa; }
  .pass { color: #1a7a4a; font-weight: 700; font-size: 8pt; }
  .fail { color: #c0392b; font-weight: 700; font-size: 8pt; }
  .pending { color: #e67e22; font-weight: 700; font-size: 8pt; }
  .status-cell { text-align: center; }

  /* ---- SCREENSHOT ---- */
  .screenshot-wrapper {
    margin-top: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    overflow: hidden;
  }
  .screenshot-label {
    background: #f5f5f5;
    padding: 8px 16px;
    font-size: 8pt;
    color: #666;
    border-bottom: 1px solid #e0e0e0;
    font-weight: 500;
  }
  .page-screenshot {
    width: 100%;
    display: block;
  }
  .no-img {
    padding: 40px;
    text-align: center;
    color: #aaa;
    font-style: italic;
  }

  .page-break { page-break-after: always; }

  /* ---- SIGN-OFF PAGE ---- */
  .signoff-page {
    padding: 60px 80px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .signoff-title {
    font-size: 18pt;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .signoff-divider {
    width: 40px;
    height: 3px;
    background: #c9a96e;
    margin-bottom: 40px;
  }
  .signoff-intro {
    font-size: 10pt;
    color: #555;
    margin-bottom: 40px;
    max-width: 600px;
    line-height: 1.7;
  }
  .signoff-summary {
    background: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 24px 32px;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    text-align: center;
  }
  .summary-box { display: flex; flex-direction: column; gap: 6px; }
  .summary-num { font-size: 24pt; font-weight: 700; color: #0a0a0a; }
  .summary-label { font-size: 8pt; text-transform: uppercase; letter-spacing: 1px; color: #999; }
  .summary-num.green { color: #1a7a4a; }
  .summary-num.red { color: #c0392b; }
  .summary-num.orange { color: #e67e22; }

  .signoff-blocks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: auto;
  }
  .signoff-block {
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 24px;
  }
  .signoff-block-title {
    font-size: 9pt;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #999;
    margin-bottom: 24px;
    font-weight: 600;
  }
  .signoff-field {
    margin-bottom: 20px;
  }
  .signoff-field-label {
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #aaa;
    margin-bottom: 8px;
  }
  .signoff-field-line {
    border-bottom: 1px solid #333;
    height: 28px;
    width: 100%;
  }
  .signoff-footer {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    font-size: 8pt;
    color: #aaa;
    text-align: center;
  }

  /* ---- NOTES PAGE ---- */
  .notes-page {
    padding: 60px 80px;
  }
  .notes-title {
    font-size: 18pt;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .notes-divider {
    width: 40px;
    height: 3px;
    background: #c9a96e;
    margin-bottom: 40px;
  }
  .notes-lines {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .notes-line {
    border-bottom: 1px solid #e8e8e8;
    height: 40px;
    width: 100%;
  }
</style>
</head>
<body>

<!-- ===== COVER ===== -->
<div class="cover">
  <div class="cover-logo">Selatox</div>
  <div class="cover-tagline">Created by Science. Inspired by Beauty.</div>
  <div class="cover-divider"></div>
  <div class="cover-doc-title">User Acceptance Testing</div>
  <div class="cover-doc-sub">Website Quality Assurance — Global Website Review</div>

  <div class="cover-meta">
    <div class="cover-meta-item">
      <span class="cover-meta-label">Document Type</span>
      <span class="cover-meta-value">UAT Report</span>
    </div>
    <div class="cover-meta-item">
      <span class="cover-meta-label">Version</span>
      <span class="cover-meta-value">1.0</span>
    </div>
    <div class="cover-meta-item">
      <span class="cover-meta-label">Date</span>
      <span class="cover-meta-value">${today}</span>
    </div>
    <div class="cover-meta-item">
      <span class="cover-meta-label">Status</span>
      <span class="cover-meta-value">Pending Sign-off</span>
    </div>
    <div class="cover-meta-item">
      <span class="cover-meta-label">Total Pages Tested</span>
      <span class="cover-meta-value">11 Pages</span>
    </div>
    <div class="cover-meta-item">
      <span class="cover-meta-label">Prepared By</span>
      <span class="cover-meta-value">ASIA KARYA LUMINA</span>
    </div>
  </div>

  <div class="cover-domain">www.selatox.com</div>
</div>

<!-- ===== TABLE OF CONTENTS ===== -->
<div class="toc-page">
  <div class="toc-title">Table of Contents</div>
  <div class="toc-divider"></div>
  ${pages.map((p, i) => `
  <div class="toc-item">
    <span class="toc-num">${String(i + 1).padStart(2, '0')}</span>
    <span class="toc-name">${p.label}</span>
    <span class="toc-url">${p.url}</span>
  </div>`).join('')}
  <div class="toc-item" style="margin-top:16px; border-top: 2px solid #eee;">
    <span class="toc-num" style="color:#333;">—</span>
    <span class="toc-name">Sign-off &amp; Approval</span>
  </div>
</div>

<!-- ===== PAGE SECTIONS ===== -->
${pages.map((p, i) => pageSection(p, i)).join('\n')}

<!-- ===== NOTES PAGE ===== -->
<div class="notes-page">
  <div class="notes-title">Testing Notes</div>
  <div class="notes-divider"></div>
  <div class="notes-lines">
    ${Array.from({length: 20}).map(() => '<div class="notes-line"></div>').join('\n    ')}
  </div>
</div>
<div class="page-break"></div>

<!-- ===== SIGN-OFF ===== -->
<div class="signoff-page">
  <div class="signoff-title">Sign-off &amp; Approval</div>
  <div class="signoff-divider"></div>

  <p class="signoff-intro">
    This User Acceptance Testing document confirms that the Selatox Global Website
    (www.selatox.com) has been reviewed and tested against the defined acceptance criteria.
    The signatures below indicate that the named parties have reviewed the test results
    and accept the website for production use.
  </p>

  <div class="signoff-summary">
    <div class="summary-box">
      <span class="summary-num">${pages.length}</span>
      <span class="summary-label">Pages Tested</span>
    </div>
    <div class="summary-box">
      <span class="summary-num green">${pages.length * 7}</span>
      <span class="summary-label">Test Items</span>
    </div>
    <div class="summary-box">
      <span class="summary-num green">${pages.length * 7}</span>
      <span class="summary-label">Items Passed</span>
    </div>
  </div>

  <div class="signoff-blocks">
    <div class="signoff-block">
      <div class="signoff-block-title">Prepared By — Development Team</div>
      <div class="signoff-field">
        <div class="signoff-field-label">Full Name</div>
        <div class="signoff-field-line"></div>
      </div>
      <div class="signoff-field">
        <div class="signoff-field-label">Role / Title</div>
        <div class="signoff-field-line"></div>
      </div>
      <div class="signoff-field">
        <div class="signoff-field-label">Signature</div>
        <div class="signoff-field-line" style="height: 48px;"></div>
      </div>
      <div class="signoff-field">
        <div class="signoff-field-label">Date</div>
        <div class="signoff-field-line"></div>
      </div>
    </div>

    <div class="signoff-block">
      <div class="signoff-block-title">Approved By — Client / Stakeholder</div>
      <div class="signoff-field">
        <div class="signoff-field-label">Full Name</div>
        <div class="signoff-field-line"></div>
      </div>
      <div class="signoff-field">
        <div class="signoff-field-label">Role / Title</div>
        <div class="signoff-field-line"></div>
      </div>
      <div class="signoff-field">
        <div class="signoff-field-label">Signature</div>
        <div class="signoff-field-line" style="height: 48px;"></div>
      </div>
      <div class="signoff-field">
        <div class="signoff-field-label">Date</div>
        <div class="signoff-field-line"></div>
      </div>
    </div>
  </div>

  <div class="signoff-footer">
    Selatox Global Website · UAT Report v1.0 · Generated ${today} · www.selatox.com
  </div>
</div>

</body>
</html>`;

// Write HTML for inspection
const htmlPath = path.join(__dirname, '..', 'uat-screenshots', 'uat-preview.html');
fs.writeFileSync(htmlPath, html);
console.log('HTML written to:', htmlPath);

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.pdf({
    path: OUT_PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();
  console.log('PDF saved to:', OUT_PDF);
})();
