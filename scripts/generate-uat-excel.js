const ExcelJS = require('exceljs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'Selatox_UAT_Document.xlsx');

const PAGES = [
  { name: 'Home',           url: 'https://www.selatox.com/' },
  { name: 'About',          url: 'https://www.selatox.com/about' },
  { name: 'Our Business',   url: 'https://www.selatox.com/our-business' },
  { name: 'Manufacturing',  url: 'https://www.selatox.com/our-business/manufacturing' },
  { name: 'Products',       url: 'https://www.selatox.com/products' },
  { name: 'News',           url: 'https://www.selatox.com/news' },
  { name: 'Culture',        url: 'https://www.selatox.com/culture' },
  { name: 'Ethics',         url: 'https://www.selatox.com/ethics' },
  { name: 'Career Journey', url: 'https://www.selatox.com/journey' },
  { name: 'Open Positions', url: 'https://www.selatox.com/openings' },
  { name: 'Contact',        url: 'https://www.selatox.com/contact' },
];

const TEST_CATEGORIES = [
  { cat: 'Functional', priority: 'High', tests: [
    ['Page loads without error',       'HTTP 200 response, no blank screen'],
    ['All navigation links work',      'Clicking nav items routes to correct pages'],
    ['Footer links functional',        'Footer links navigate correctly'],
    ['Interactive elements respond',   'Buttons, dropdowns, accordions work as expected'],
    ['Contact / forms submit',         'Form submissions succeed with valid data'],
    ['Form validation works',          'Invalid input shows appropriate error messages'],
  ]},
  { cat: 'UI / Visual', priority: 'Medium', tests: [
    ['Layout renders correctly',       'No broken layout or overlapping elements'],
    ['Images load properly',           'No broken image icons, correct aspect ratio'],
    ['Text is legible',                'No clipped, invisible, or overflowing text'],
    ['Brand colors applied correctly', 'Correct palette used per design spec'],
    ['Typography consistent',          'Font sizes and weights match design'],
    ['Animations / transitions smooth','Scroll animations and transitions are fluid'],
  ]},
  { cat: 'Responsive', priority: 'Medium', tests: [
    ['Desktop 1440px — no overflow',   'No horizontal scroll, elements fit viewport'],
    ['Laptop 1280px — layout intact',  'Content readable, no broken grid'],
    ['Tablet 768px — layout adapts',   'Hamburger menu appears, columns stack correctly'],
    ['Mobile 375px — fully usable',    'Content readable, no overlapping elements'],
  ]},
  { cat: 'Content', priority: 'Low', tests: [
    ['All section headings correct',   'Headings match approved copy'],
    ['Body text correct',              'Paragraphs match approved copy, no typos'],
    ['Images match design brief',      'Correct images used per page spec'],
    ['No placeholder text',            'No lorem ipsum or dummy text visible'],
    ['Internal links correct',         'All internal links point to correct pages'],
  ]},
  { cat: 'SEO / Technical', priority: 'Low', tests: [
    ['Page title tag correct',         'Browser tab shows correct title'],
    ['Meta description present',       'Correct meta description in page source'],
    ['OG tags present',                'og:title, og:image, og:description set'],
    ['Images have alt text',           'No missing alt attributes on images'],
    ['No JS console errors',           'Browser console shows zero errors on load'],
  ]},
];

const C = {
  black:      'FF0A0A0A',
  gold:       'FFC9A96E',
  darkGray:   'FF1E1E1E',
  midGray:    'FF555555',
  lightGray:  'FFF5F5F5',
  white:      'FFFFFFFF',
  greenBg:    'FFE6F4EA',
  greenFg:    'FF1A7A4A',
  redBg:      'FFFCE8E6',
  redFg:      'FFC0392B',
  orangeBg:   'FFFFF3E0',
  orangeFg:   'FFE67E22',
  blueBg:     'FFE8F0FE',
  blueFg:     'FF1A56DB',
  rowAlt:     'FFFAFAFA',
};

const today = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });

function f(color) { return { type:'pattern', pattern:'solid', fgColor:{argb: color} }; }
function border(color='FFD0D0D0') {
  const s = { style:'thin', color:{argb: color} };
  return { top:s, left:s, bottom:s, right:s };
}

(async () => {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'ASIA KARYA LUMINA';
  wb.created = new Date();

  // ══════════════════════════════
  // SHEET 1: SUMMARY
  // ══════════════════════════════
  const wsCover = wb.addWorksheet('Summary', { views:[{showGridLines:false}] });

  wsCover.columns = [
    {key:'margin', width:2},
    {key:'A', width:6},
    {key:'B', width:26},
    {key:'C', width:36},
    {key:'D', width:14},
    {key:'E', width:14},
    {key:'F', width:14},
    {key:'G', width:18},
    {key:'H', width:14},
    {key:'end', width:2},
  ];

  // Header band rows 1-8
  for (let r = 1; r <= 8; r++) {
    const row = wsCover.getRow(r);
    row.height = r === 1 ? 6 : r === 3 ? 38 : r === 4 ? 20 : r === 6 ? 20 : 10;
    for (let c = 1; c <= 10; c++) row.getCell(c).fill = f(C.black);
  }

  // Logo / title
  const r3 = wsCover.getRow(3);
  const titleCell = r3.getCell(2);
  titleCell.value = 'SELATOX';
  titleCell.font = { name:'Arial', bold:true, size:24, color:{argb:C.white} };
  titleCell.alignment = { vertical:'middle' };

  const r4 = wsCover.getRow(4);
  const subCell = r4.getCell(2);
  subCell.value = 'User Acceptance Testing — Global Website';
  subCell.font = { name:'Arial', size:10, color:{argb:'FFAAAAAA'} };
  subCell.alignment = { vertical:'middle' };

  const r6 = wsCover.getRow(6);
  r6.getCell(2).value = 'www.selatox.com';
  r6.getCell(2).font = { name:'Arial', size:9, color:{argb:'FFC9A96E'} };

  // Meta right side
  [['Version','1.0'],['Date',today],['Status','Pending Sign-off']].forEach(([lbl,val], i) => {
    const col = 7 + i;
    r3.getCell(col).value = lbl;
    r3.getCell(col).font = { name:'Arial', size:7, color:{argb:'FF888888'} };
    r3.getCell(col).alignment = { horizontal:'center', vertical:'bottom' };
    r4.getCell(col).value = val;
    r4.getCell(col).font = { name:'Arial', bold:true, size:10, color:{argb: lbl==='Status' ? C.gold : C.white} };
    r4.getCell(col).alignment = { horizontal:'center', vertical:'middle' };
  });

  // Gold accent strip row 9
  const goldRow = wsCover.getRow(9);
  goldRow.height = 4;
  for (let c = 1; c <= 10; c++) goldRow.getCell(c).fill = f(C.gold);

  // Spacer
  wsCover.getRow(10).height = 14;

  // Section label
  const r11 = wsCover.getRow(11);
  r11.height = 14;
  r11.getCell(2).value = 'TEST SUMMARY';
  r11.getCell(2).font = { name:'Arial', bold:true, size:8, color:{argb:'FF999999'} };

  // Stats boxes
  wsCover.getRow(12).height = 8;
  const stats = [
    ['Pages Tested', PAGES.length, C.black],
    ['Total Items', PAGES.reduce((a, _, i) => a + TEST_CATEGORIES.reduce((b,c)=>b+c.tests.length,0), 0), C.black],
    ['PASS', 0, C.greenFg],
    ['FAIL', 0, C.redFg],
    ['PENDING', TEST_CATEGORIES.reduce((b,c)=>b+c.tests.length,0)*PAGES.length, C.orangeFg],
  ];
  const statCols = [3,4,5,6,7];
  stats.forEach(([label, val, color], i) => {
    const col = statCols[i];
    const rNum = wsCover.getRow(13);
    rNum.height = 44;
    const numCell = rNum.getCell(col);
    numCell.value = val;
    numCell.font = { name:'Arial', bold:true, size:20, color:{argb:color} };
    numCell.alignment = { horizontal:'center', vertical:'middle' };
    numCell.fill = f(C.lightGray);
    numCell.border = border();

    const rLbl = wsCover.getRow(14);
    rLbl.height = 20;
    const lblCell = rLbl.getCell(col);
    lblCell.value = label;
    lblCell.font = { name:'Arial', size:8, color:{argb:'FF666666'} };
    lblCell.alignment = { horizontal:'center', vertical:'middle' };
    lblCell.fill = f(C.lightGray);
    lblCell.border = border();
  });

  wsCover.getRow(15).height = 10;
  wsCover.getRow(16).height = 20;

  // Table header
  const thRow = wsCover.getRow(17);
  thRow.height = 26;
  const thHeaders = ['#','Page Name','URL','Test Items','PASS','FAIL','PENDING'];
  thHeaders.forEach((h, i) => {
    const cell = thRow.getCell(i + 2);
    cell.value = h;
    cell.font = { name:'Arial', bold:true, size:9, color:{argb:C.white} };
    cell.fill = f(C.black);
    cell.alignment = { horizontal:'center', vertical:'middle' };
    cell.border = border();
  });

  // Table rows
  const totalItemsPerPage = TEST_CATEGORIES.reduce((a,c)=>a+c.tests.length,0);
  PAGES.forEach((page, i) => {
    const row = wsCover.getRow(18 + i);
    row.height = 22;
    const bg = i % 2 === 0 ? C.lightGray : C.white;
    const vals = [
      String(i+1).padStart(2,'0'),
      page.name,
      page.url,
      totalItemsPerPage,
      0,
      0,
      totalItemsPerPage,
    ];
    vals.forEach((v, j) => {
      const cell = row.getCell(j + 2);
      cell.value = v;
      cell.font = { name:'Arial', size:9, color:{argb:'FF333333'} };
      cell.fill = f(bg);
      cell.border = border();
      cell.alignment = { horizontal: j < 2 ? 'left' : 'center', vertical:'middle' };
    });
  });

  // ══════════════════════════════
  // PER-PAGE SHEETS
  // ══════════════════════════════
  for (let pi = 0; pi < PAGES.length; pi++) {
    const page = PAGES[pi];
    const ws = wb.addWorksheet(page.name, { views:[{showGridLines:false, state:'frozen', ySplit:9}] });

    ws.columns = [
      {key:'margin', width:2},
      {key:'num',    width:5},
      {key:'cat',    width:18},
      {key:'test',   width:40},
      {key:'expect', width:38},
      {key:'pri',    width:10},
      {key:'status', width:12},
      {key:'notes',  width:30},
      {key:'end',    width:2},
    ];

    // Header band
    for (let r = 1; r <= 7; r++) {
      const row = ws.getRow(r);
      row.height = r===1?6 : r===2?36 : r===3?18 : r===4?8 : r===5?18 : r===6?8 : 10;
      for (let c = 1; c <= 9; c++) row.getCell(c).fill = f(C.black);
    }

    const hRow2 = ws.getRow(2);
    hRow2.getCell(2).value = `${String(pi+1).padStart(2,'0')}  ${page.name.toUpperCase()}`;
    hRow2.getCell(2).font = { name:'Arial', bold:true, size:16, color:{argb:C.white} };
    hRow2.getCell(2).alignment = { vertical:'middle' };

    hRow2.getCell(6).value = 'Overall:';
    hRow2.getCell(6).font = { name:'Arial', size:8, color:{argb:'FF888888'} };
    hRow2.getCell(6).alignment = { horizontal:'right', vertical:'middle' };

    hRow2.getCell(7).value = 'PENDING';
    hRow2.getCell(7).font = { name:'Arial', bold:true, size:11, color:{argb:C.gold} };
    hRow2.getCell(7).alignment = { horizontal:'center', vertical:'middle' };

    const hRow3 = ws.getRow(3);
    hRow3.getCell(2).value = page.url;
    hRow3.getCell(2).font = { name:'Arial', size:9, color:{argb:'FFAAAAAA'} };
    hRow3.getCell(2).alignment = { vertical:'middle' };

    const hRow5 = ws.getRow(5);
    hRow5.getCell(2).value = 'Tested by:';
    hRow5.getCell(2).font = { name:'Arial', size:8, color:{argb:'FF888888'} };
    hRow5.getCell(3).font = { name:'Arial', size:9, color:{argb:C.white} };

    hRow5.getCell(5).value = 'Date:';
    hRow5.getCell(5).font = { name:'Arial', size:8, color:{argb:'FF888888'} };
    hRow5.getCell(5).alignment = { horizontal:'right', vertical:'middle' };
    hRow5.getCell(6).font = { name:'Arial', size:9, color:{argb:C.white} };

    // Gold strip
    const goldR = ws.getRow(7);
    goldR.height = 4;
    for (let c = 1; c <= 9; c++) goldR.getCell(c).fill = f(C.gold);

    ws.getRow(8).height = 10;

    // Column headers row 9
    const colHeaders = ['#','Category','Test Item','Expected Result','Priority','Status','Notes / Defect Ref'];
    const headRow = ws.getRow(9);
    headRow.height = 26;
    colHeaders.forEach((h, i) => {
      const cell = headRow.getCell(i + 2);
      cell.value = h;
      cell.font = { name:'Arial', bold:true, size:9, color:{argb:C.white} };
      cell.fill = f(C.darkGray);
      cell.alignment = { horizontal: i < 2 ? 'left' : i === 0 ? 'center' : 'left', vertical:'middle' };
      cell.border = border();
    });
    headRow.getCell(2).alignment = { horizontal:'center', vertical:'middle' };

    // Data rows
    let rowNum = 10;
    let itemNum = 1;
    for (const { cat, priority, tests } of TEST_CATEGORIES) {
      for (const [testName, expected] of tests) {
        const row = ws.getRow(rowNum);
        row.height = 20;
        const bg = itemNum % 2 === 0 ? C.rowAlt : C.white;

        const priColor = priority === 'High' ? C.redFg : priority === 'Medium' ? C.orangeFg : C.blueFg;
        const cells = [
          [2, String(itemNum).padStart(2,'0'), 'center', bg, {name:'Arial',size:9,color:{argb:'FF999999'}}],
          [3, cat,      'left',   bg, {name:'Arial',size:9,color:{argb:C.midGray}}],
          [4, testName, 'left',   bg, {name:'Arial',size:9,color:{argb:'FF1A1A1A'}}],
          [5, expected, 'left',   bg, {name:'Arial',size:8,italic:true,color:{argb:'FF666666'}}],
          [6, priority, 'center', bg, {name:'Arial',size:8,bold:true,color:{argb:priColor}}],
          [7, 'PENDING','center', C.orangeBg, {name:'Arial',size:9,bold:true,color:{argb:C.orangeFg}}],
          [8, '',       'left',   bg, {name:'Arial',size:9,color:{argb:'FF333333'}}],
        ];

        cells.forEach(([col, val, align, bgColor, fontStyle]) => {
          const cell = row.getCell(col);
          cell.value = val;
          cell.font = fontStyle;
          cell.fill = f(bgColor);
          cell.alignment = { horizontal:align, vertical:'middle', wrapText: col === 4 || col === 5 };
          cell.border = border();
        });

        // Data validation for Status
        ws.getCell(`G${rowNum}`).dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: ['"PASS,FAIL,PENDING,N/A"'],
        };

        rowNum++;
        itemNum++;
      }
    }

    // Footer totals
    ws.getRow(rowNum).height = 6;
    rowNum++;
    const footRow = ws.getRow(rowNum);
    footRow.height = 22;
    const totalItems = itemNum - 1;
    const firstData = 10;
    const lastData = rowNum - 2;

    [
      [2, 'TOTALS', 'center', C.lightGray, {name:'Arial',bold:true,size:9,color:{argb:'FF333333'}}],
      [3, `${totalItems} items`, 'center', C.lightGray, {name:'Arial',size:9,color:{argb:'FF333333'}}],
      [4, '', 'center', C.lightGray, {name:'Arial',bold:true,size:9,color:{argb:C.greenFg}}],
      [5, '', 'center', C.lightGray, {name:'Arial',bold:true,size:9,color:{argb:C.redFg}}],
      [6, '', 'center', C.lightGray, {name:'Arial',bold:true,size:9,color:{argb:C.orangeFg}}],
      [7, `0 / ${totalItems}`, 'center', C.lightGray, {name:'Arial',bold:true,size:9,color:{argb:C.greenFg}}],
      [8, '', 'left', C.lightGray, {name:'Arial',size:9,color:{argb:'FF333333'}}],
    ].forEach(([col, val, align, bg, fontStyle]) => {
      const cell = footRow.getCell(col);
      cell.value = val;
      cell.font = fontStyle;
      cell.fill = f(bg);
      cell.alignment = { horizontal:align, vertical:'middle' };
      cell.border = border();
    });
  }

  // ══════════════════════════════
  // SIGN-OFF SHEET
  // ══════════════════════════════
  const wsSign = wb.addWorksheet('Sign-off', { views:[{showGridLines:false}] });
  wsSign.columns = [
    {key:'margin', width:2},
    {key:'A', width:32},
    {key:'B', width:32},
    {key:'end', width:2},
  ];

  for (let r = 1; r <= 6; r++) {
    const row = wsSign.getRow(r);
    row.height = r===1?6 : r===2?36 : r===3?16 : r===4?8 : r===5?4 : 12;
    for (let c = 1; c <= 4; c++) row.getCell(c).fill = f(r===5 ? C.gold : C.black);
  }

  wsSign.getRow(2).getCell(2).value = 'SIGN-OFF & APPROVAL';
  wsSign.getRow(2).getCell(2).font = { name:'Arial', bold:true, size:16, color:{argb:C.white} };
  wsSign.getRow(2).getCell(2).alignment = { vertical:'middle' };

  wsSign.getRow(3).getCell(2).value = 'Selatox Global Website — User Acceptance Testing';
  wsSign.getRow(3).getCell(2).font = { name:'Arial', size:9, color:{argb:'FFAAAAAA'} };
  wsSign.getRow(3).getCell(2).alignment = { vertical:'middle' };

  // Summary table
  wsSign.getRow(7).height = 14;
  wsSign.getRow(7).getCell(2).value = 'TEST RESULT SUMMARY';
  wsSign.getRow(7).getCell(2).font = { name:'Arial', bold:true, size:8, color:{argb:'FF999999'} };

  const totalItemsAll = TEST_CATEGORIES.reduce((a,c)=>a+c.tests.length,0) * PAGES.length;
  const summaryData = [
    ['Total Pages Tested',  PAGES.length],
    ['Total Test Items',    totalItemsAll],
    ['Items Passed',        0],
    ['Items Failed',        0],
    ['Items Pending',       totalItemsAll],
    ['Overall Pass Rate',   '0%'],
  ];

  summaryData.forEach(([label, val], i) => {
    const r = wsSign.getRow(8 + i);
    r.height = 22;
    const bg = i % 2 === 0 ? C.lightGray : C.white;
    const lCell = r.getCell(2);
    lCell.value = label;
    lCell.font = { name:'Arial', size:9, color:{argb:'FF555555'} };
    lCell.fill = f(bg); lCell.border = border();
    lCell.alignment = { vertical:'middle' };

    const vCell = r.getCell(3);
    vCell.value = val;
    vCell.font = { name:'Arial', bold:true, size:10, color:{argb:'FF1A1A1A'} };
    vCell.fill = f(bg); vCell.border = border();
    vCell.alignment = { horizontal:'center', vertical:'middle' };
  });

  // Signature blocks
  const sigStart = 8 + summaryData.length + 2;
  const sigBlocks = [
    'Prepared By — Development Team',
    'Approved By — Client / Stakeholder',
  ];

  sigBlocks.forEach((title, bi) => {
    const startR = sigStart + bi * 7;
    const titleRow = wsSign.getRow(startR);
    titleRow.height = 22;
    [2,3].forEach(c => {
      titleRow.getCell(c).fill = f(C.darkGray);
      titleRow.getCell(c).border = border('FF333333');
    });
    titleRow.getCell(2).value = title.toUpperCase();
    titleRow.getCell(2).font = { name:'Arial', bold:true, size:9, color:{argb:C.white} };
    titleRow.getCell(2).alignment = { vertical:'middle' };

    ['Full Name', 'Role / Title', 'Signature', 'Date'].forEach((field, fi) => {
      const r = wsSign.getRow(startR + 1 + fi);
      r.height = field === 'Signature' ? 30 : 22;
      const lCell = r.getCell(2);
      lCell.value = field;
      lCell.font = { name:'Arial', size:8, color:{argb:'FF888888'} };
      lCell.fill = f(C.lightGray); lCell.border = border();
      lCell.alignment = { vertical:'middle' };
      r.getCell(3).fill = f(C.white); r.getCell(3).border = border();
    });

    wsSign.getRow(startR + 5).height = 10;
  });

  const footerR = wsSign.getRow(sigStart + sigBlocks.length * 7 + 1);
  footerR.height = 16;
  footerR.getCell(2).value = `Selatox Global Website  ·  UAT Document v1.0  ·  Generated ${today}  ·  www.selatox.com`;
  footerR.getCell(2).font = { name:'Arial', size:7, italic:true, color:{argb:'FFBBBBBB'} };

  await wb.xlsx.writeFile(OUT);
  console.log('Saved:', OUT);
})();
