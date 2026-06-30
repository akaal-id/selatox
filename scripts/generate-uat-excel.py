from openpyxl import Workbook
from openpyxl.styles import (
    Font, PatternFill, Alignment, Border, Side, GradientFill
)
from openpyxl.utils import get_column_letter
from openpyxl.styles.numbers import FORMAT_DATE_DDMMYY
from openpyxl.worksheet.datavalidation import DataValidation
import datetime

wb = Workbook()

# ─────────────────────────────────────────────
# PALETTE
# ─────────────────────────────────────────────
BLACK      = "FF0A0A0A"
GOLD       = "FFC9A96E"
GOLD_LIGHT = "FFFFF3DC"
DARK_GRAY  = "FF1E1E1E"
MID_GRAY   = "FF555555"
LIGHT_GRAY = "FFF5F5F5"
WHITE      = "FFFFFFFF"
GREEN_BG   = "FFE6F4EA"
GREEN_FG   = "FF1A7A4A"
RED_BG     = "FFFCE8E6"
RED_FG     = "FFC0392B"
ORANGE_BG  = "FFFFF3E0"
ORANGE_FG  = "FFE67E22"
BLUE_BG    = "FFE8F0FE"
BLUE_FG    = "FF1A56DB"
ROW_ALT    = "FFFAFAFA"

def fill(hex_color):
    return PatternFill("solid", fgColor=hex_color)

def font(bold=False, size=10, color=BLACK, italic=False, name="Arial"):
    return Font(name=name, bold=bold, size=size, color=color, italic=italic)

def border_thin():
    s = Side(style="thin", color="FFD0D0D0")
    return Border(left=s, right=s, top=s, bottom=s)

def border_bottom():
    s = Side(style="thin", color="FFD0D0D0")
    return Border(bottom=s)

def border_thick_bottom():
    s = Side(style="medium", color="FF0A0A0A")
    return Border(bottom=s)

def align(h="left", v="center", wrap=False):
    return Alignment(horizontal=h, vertical=v, wrap_text=wrap)

PAGES = [
    ("Home",            "https://www.selatox.com/",                    "/"),
    ("About",           "https://www.selatox.com/about",               "/about"),
    ("Our Business",    "https://www.selatox.com/our-business",        "/our-business"),
    ("Manufacturing",   "https://www.selatox.com/our-business/manufacturing", "/our-business/manufacturing"),
    ("Products",        "https://www.selatox.com/products",            "/products"),
    ("News",            "https://www.selatox.com/news",                "/news"),
    ("Culture",         "https://www.selatox.com/culture",             "/culture"),
    ("Ethics",          "https://www.selatox.com/ethics",              "/ethics"),
    ("Career Journey",  "https://www.selatox.com/journey",             "/journey"),
    ("Open Positions",  "https://www.selatox.com/openings",            "/openings"),
    ("Contact",         "https://www.selatox.com/contact",             "/contact"),
]

TEST_CATEGORIES = [
    ("Functional",   [
        ("Page loads without error",        "HTTP 200 response, no blank screen"),
        ("All navigation links work",       "Clicking nav items routes to correct pages"),
        ("Footer links functional",         "Footer links navigate correctly"),
        ("Interactive elements respond",    "Buttons, dropdowns, accordions work"),
        ("Forms submit correctly",          "Form submissions succeed with valid data"),
        ("Forms validate inputs",           "Invalid input shows appropriate error messages"),
    ]),
    ("UI / Visual", [
        ("Layout renders correctly",        "No broken layout or overlapping elements"),
        ("Images load properly",            "No broken image icons, correct aspect ratio"),
        ("Text is legible",                 "No clipped, invisible, or overflowing text"),
        ("Brand colors applied correctly",  "Correct palette used per design spec"),
        ("Typography consistent",           "Font sizes and weights match design"),
        ("Icons display correctly",         "All icons visible and properly aligned"),
        ("Animations/transitions smooth",   "Scroll animations and transitions are fluid"),
    ]),
    ("Responsive", [
        ("Desktop 1440px — no overflow",    "No horizontal scroll, elements fit viewport"),
        ("Laptop 1280px — layout intact",   "Content readable, no broken grid"),
        ("Tablet 768px — layout adapts",    "Hamburger menu appears, columns stack"),
        ("Mobile 375px — fully usable",     "Content readable, no overlapping elements"),
    ]),
    ("Content",  [
        ("All section headings correct",    "Headings match approved copy"),
        ("Body text correct",               "Paragraphs match approved copy"),
        ("Images correct per page",         "Images match design brief"),
        ("No placeholder/lorem ipsum text", "No dummy text visible anywhere"),
        ("Links point to correct URLs",     "Internal and external links verified"),
    ]),
    ("Performance / SEO", [
        ("Page title correct",              "Browser tab shows correct title tag"),
        ("Meta description present",        "Correct meta description in page source"),
        ("OG tags present",                 "og:title, og:image, og:description set"),
        ("Images have alt text",            "No missing alt attributes on images"),
        ("No console errors",               "Browser console shows no JS errors"),
    ]),
]

today_str = datetime.date.today().strftime("%d %B %Y")

# ═══════════════════════════════════════════════
# SHEET 1: COVER / SUMMARY
# ═══════════════════════════════════════════════
ws_cover = wb.active
ws_cover.title = "Summary"
ws_cover.sheet_view.showGridLines = False
ws_cover.column_dimensions["A"].width = 2
ws_cover.column_dimensions["B"].width = 22
ws_cover.column_dimensions["C"].width = 28
ws_cover.column_dimensions["D"].width = 14
ws_cover.column_dimensions["E"].width = 14
ws_cover.column_dimensions["F"].width = 14
ws_cover.column_dimensions["G"].width = 14
ws_cover.column_dimensions["H"].width = 14
ws_cover.column_dimensions["I"].width = 2

# Header banner
for r in range(1, 9):
    for c in range(1, 10):
        ws_cover.cell(r, c).fill = fill(BLACK)

ws_cover.row_dimensions[1].height = 8
ws_cover.row_dimensions[2].height = 10
ws_cover.row_dimensions[3].height = 36
ws_cover.row_dimensions[4].height = 22
ws_cover.row_dimensions[5].height = 10
ws_cover.row_dimensions[6].height = 22
ws_cover.row_dimensions[7].height = 18
ws_cover.row_dimensions[8].height = 10

ws_cover["B3"] = "SELATOX"
ws_cover["B3"].font = Font(name="Arial", bold=True, size=26, color=WHITE)
ws_cover["B3"].alignment = align("left", "center")

ws_cover["B4"] = "User Acceptance Testing — Global Website"
ws_cover["B4"].font = Font(name="Arial", bold=False, size=11, color="FFAAAAAA")
ws_cover["B4"].alignment = align("left", "center")

ws_cover["B6"] = "www.selatox.com"
ws_cover["B6"].font = Font(name="Arial", size=9, color=GOLD[2:])
ws_cover["B6"].alignment = align("left", "center")

ws_cover["F3"] = "Version"
ws_cover["F3"].font = Font(name="Arial", size=7, color="FF888888")
ws_cover["F3"].alignment = align("center", "bottom")
ws_cover["F4"] = "1.0"
ws_cover["F4"].font = Font(name="Arial", bold=True, size=13, color=WHITE)
ws_cover["F4"].alignment = align("center", "center")

ws_cover["G3"] = "Date"
ws_cover["G3"].font = Font(name="Arial", size=7, color="FF888888")
ws_cover["G3"].alignment = align("center", "bottom")
ws_cover["G4"] = today_str
ws_cover["G4"].font = Font(name="Arial", bold=True, size=11, color=WHITE)
ws_cover["G4"].alignment = align("center", "center")

ws_cover["H3"] = "Status"
ws_cover["H3"].font = Font(name="Arial", size=7, color="FF888888")
ws_cover["H3"].alignment = align("center", "bottom")
ws_cover["H4"] = "Pending"
ws_cover["H4"].font = Font(name="Arial", bold=True, size=11, color=GOLD[2:])
ws_cover["H4"].alignment = align("center", "center")

# Gold accent line
ws_cover.row_dimensions[9].height = 4
for c in range(1, 10):
    ws_cover.cell(9, c).fill = fill(GOLD)

# Spacer
ws_cover.row_dimensions[10].height = 16

# Stats row header
ws_cover.row_dimensions[11].height = 14
ws_cover["B11"] = "TEST SUMMARY"
ws_cover["B11"].font = Font(name="Arial", bold=True, size=8, color="FF999999")
ws_cover["B11"].alignment = align("left", "bottom")

ws_cover.row_dimensions[12].height = 10

# Stats boxes
stat_cols = ["C", "D", "E", "F", "G"]
stats = [
    ("Pages Tested",  "=COUNTA(Index!B4:B14)",           BLACK,      WHITE),
    ("Total Items",   "=SUM(Index!E4:E14)",               BLACK,      WHITE),
    ("PASS",          "=SUMIF(Index!F4:F14,\"PASS\",Index!E4:E14)",  GREEN_FG,  "FF1A7A4A"),
    ("FAIL",          "=SUMIF(Index!F4:F14,\"FAIL\",Index!E4:E14)",  RED_FG,    "FFC0392B"),
    ("PENDING",       "=SUMIF(Index!F4:F14,\"PENDING\",Index!E4:E14)", ORANGE_FG, "FFE67E22"),
]

for i, (col, (label, formula, num_color, bg)) in enumerate(zip(stat_cols, stats)):
    ws_cover.row_dimensions[13].height = 42
    ws_cover.row_dimensions[14].height = 20
    ws_cover.row_dimensions[15].height = 10

    c_num = ws_cover[f"{col}13"]
    c_num.value = formula
    c_num.font = Font(name="Arial", bold=True, size=20, color=num_color)
    c_num.alignment = align("center", "center")
    c_num.fill = fill(LIGHT_GRAY)
    c_num.border = border_thin()

    c_lbl = ws_cover[f"{col}14"]
    c_lbl.value = label
    c_lbl.font = Font(name="Arial", size=8, color="FF666666")
    c_lbl.alignment = align("center", "center")
    c_lbl.fill = fill(LIGHT_GRAY)
    c_lbl.border = border_thin()

# Spacer
ws_cover.row_dimensions[16].height = 20

# Page Index Table header
ws_cover.row_dimensions[17].height = 28
for col, label in zip(["B","C","D","E","F","G","H"], ["#","Page Name","URL","Test Count","Result","Tester","Date Tested"]):
    cell = ws_cover[f"{col}17"]
    cell.value = label
    cell.font = Font(name="Arial", bold=True, size=9, color=WHITE)
    cell.fill = fill(BLACK)
    cell.alignment = align("center", "center")
    cell.border = border_thin()

for i, (name, url, slug) in enumerate(PAGES):
    row = 18 + i
    ws_cover.row_dimensions[row].height = 22
    bg = LIGHT_GRAY if i % 2 == 0 else WHITE

    data = [
        (str(i+1).zfill(2), "center"),
        (name, "left"),
        (url, "left"),
        (f"=COUNTA('{name}'!D:D)-1", "center"),
        (f"='{name}'!M2", "center"),
        ("", "left"),
        ("", "center"),
    ]
    for col, (val, align_h) in zip(["B","C","D","E","F","G","H"], data):
        cell = ws_cover[f"{col}{row}"]
        cell.value = val
        cell.font = Font(name="Arial", size=9, color="FF333333")
        cell.fill = fill(bg)
        cell.alignment = align(align_h, "center")
        cell.border = border_thin()

    # Color the result cell
    result_cell = ws_cover[f"F{row}"]
    result_cell.font = Font(name="Arial", bold=True, size=9, color="FF333333")

# ═══════════════════════════════════════════════
# SHEET 2: INDEX (helper for summary formulas)
# ═══════════════════════════════════════════════
ws_idx = wb.create_sheet("Index")
ws_idx.sheet_state = "hidden"
ws_idx["A1"] = "page"; ws_idx["B1"] = "name"; ws_idx["C1"] = "url"
ws_idx["D1"] = "slug"; ws_idx["E1"] = "test_count"; ws_idx["F1"] = "result"

for i, (name, url, slug) in enumerate(PAGES):
    r = i + 4
    ws_idx[f"A{r}"] = i + 1
    ws_idx[f"B{r}"] = name
    ws_idx[f"C{r}"] = url
    ws_idx[f"D{r}"] = slug
    # count non-blank cells in Status column of each page sheet (col D = test items, col G = status)
    ws_idx[f"E{r}"] = f"=COUNTA('{name}'!G:G)-1"
    ws_idx[f"F{r}"] = f"='{name}'!M2"

# ═══════════════════════════════════════════════
# HELPER: build per-page test sheet
# ═══════════════════════════════════════════════
def make_page_sheet(wb, page_name, page_url, page_idx):
    ws = wb.create_sheet(page_name)
    ws.sheet_view.showGridLines = False

    # Col widths
    col_widths = {"A":2,"B":5,"C":22,"D":40,"E":35,"F":10,"G":12,"H":20,"I":2}
    for col, w in col_widths.items():
        ws.column_dimensions[col].width = w

    # ── Header ──
    for r in range(1, 7):
        for c in range(1, 10):
            ws.cell(r, c).fill = fill(BLACK)

    ws.row_dimensions[1].height = 6
    ws.row_dimensions[2].height = 32
    ws.row_dimensions[3].height = 18
    ws.row_dimensions[4].height = 8
    ws.row_dimensions[5].height = 18
    ws.row_dimensions[6].height = 8

    ws["B2"] = f"{str(page_idx).zfill(2)}  {page_name.upper()}"
    ws["B2"].font = Font(name="Arial", bold=True, size=16, color=WHITE)
    ws["B2"].alignment = align("left", "center")

    ws["B3"] = page_url
    ws["B3"].font = Font(name="Arial", size=9, color="FFAAAAAA")
    ws["B3"].alignment = align("left", "center")

    ws["F2"] = "Overall Result"
    ws["F2"].font = Font(name="Arial", size=7, color="FF888888")
    ws["F2"].alignment = align("center", "bottom")

    # M2 = hidden overall result formula (referenced by summary)
    ws["M2"] = f'=IF(COUNTIF(G:G,"FAIL")>0,"FAIL",IF(COUNTIF(G:G,"PENDING")>0,"PENDING","PASS"))'
    ws["M2"].font = Font(name="Arial", size=1, color=WHITE)  # hide visually

    ws["G2"] = f"=IF(M2=\"PASS\",\"✓ PASS\",IF(M2=\"FAIL\",\"✗ FAIL\",\"● PENDING\"))"
    ws["G2"].font = Font(name="Arial", bold=True, size=11, color=GOLD[2:])
    ws["G2"].alignment = align("center", "center")

    ws["B5"] = f"Tested by:"
    ws["B5"].font = Font(name="Arial", size=8, color="FF888888")
    ws["B5"].alignment = align("left", "center")
    ws["C5"] = ""  # tester fills in
    ws["C5"].font = Font(name="Arial", size=9, color=WHITE)
    ws["C5"].alignment = align("left", "center")
    ws["C5"].border = Border(bottom=Side(style="thin", color="FF555555"))

    ws["E5"] = "Date Tested:"
    ws["E5"].font = Font(name="Arial", size=8, color="FF888888")
    ws["E5"].alignment = align("right", "center")
    ws["F5"] = ""
    ws["F5"].font = Font(name="Arial", size=9, color=WHITE)
    ws["F5"].alignment = align("center", "center")
    ws["F5"].border = Border(bottom=Side(style="thin", color="FF555555"))

    # Gold line
    ws.row_dimensions[7].height = 4
    for c in range(1, 10):
        ws.cell(7, c).fill = fill(GOLD)

    ws.row_dimensions[8].height = 12

    # ── Column headers ──
    ws.row_dimensions[9].height = 26
    headers = [("B","#","center"),("C","Category","left"),("D","Test Item","left"),
               ("E","Expected Result","left"),("F","Priority","center"),
               ("G","Status","center"),("H","Notes / Defect Ref","left")]
    for col, label, align_h in headers:
        cell = ws[f"{col}9"]
        cell.value = label
        cell.font = Font(name="Arial", bold=True, size=9, color=WHITE)
        cell.fill = fill(DARK_GRAY)
        cell.alignment = align(align_h, "center")
        cell.border = border_thin()

    # ── Data validation for Status ──
    dv = DataValidation(type="list", formula1='"PASS,FAIL,PENDING,N/A"', allow_blank=True)
    dv.sqref = "G10:G200"
    ws.add_data_validation(dv)

    # ── Test rows ──
    row = 10
    item_num = 1
    for cat_name, tests in TEST_CATEGORIES:
        for test_name, expected in tests:
            ws.row_dimensions[row].height = 20
            bg = LIGHT_GRAY if item_num % 2 == 0 else WHITE

            ws[f"B{row}"].value = item_num
            ws[f"B{row}"].font = Font(name="Arial", size=9, color="FF999999")
            ws[f"B{row}"].alignment = align("center", "center")
            ws[f"B{row}"].fill = fill(bg)
            ws[f"B{row}"].border = border_thin()

            ws[f"C{row}"].value = cat_name
            ws[f"C{row}"].font = Font(name="Arial", size=9, color=MID_GRAY[2:])
            ws[f"C{row}"].alignment = align("left", "center")
            ws[f"C{row}"].fill = fill(bg)
            ws[f"C{row}"].border = border_thin()

            ws[f"D{row}"].value = test_name
            ws[f"D{row}"].font = Font(name="Arial", size=9, color="FF1A1A1A")
            ws[f"D{row}"].alignment = align("left", "center", wrap=True)
            ws[f"D{row}"].fill = fill(bg)
            ws[f"D{row}"].border = border_thin()

            ws[f"E{row}"].value = expected
            ws[f"E{row}"].font = Font(name="Arial", size=8, color="FF666666", italic=True)
            ws[f"E{row}"].alignment = align("left", "center", wrap=True)
            ws[f"E{row}"].fill = fill(bg)
            ws[f"E{row}"].border = border_thin()

            # Priority
            priority = "High" if cat_name == "Functional" else ("Medium" if cat_name in ("UI / Visual","Responsive") else "Low")
            p_color = RED_FG if priority == "High" else (ORANGE_FG if priority == "Medium" else BLUE_FG)
            ws[f"F{row}"].value = priority
            ws[f"F{row}"].font = Font(name="Arial", bold=True, size=8, color=p_color)
            ws[f"F{row}"].alignment = align("center", "center")
            ws[f"F{row}"].fill = fill(bg)
            ws[f"F{row}"].border = border_thin()

            # Status — default PENDING
            ws[f"G{row}"].value = "PENDING"
            ws[f"G{row}"].font = Font(name="Arial", bold=True, size=9, color=ORANGE_FG)
            ws[f"G{row}"].alignment = align("center", "center")
            ws[f"G{row}"].fill = fill(ORANGE_BG)
            ws[f"G{row}"].border = border_thin()

            # Notes
            ws[f"H{row}"].value = ""
            ws[f"H{row}"].font = Font(name="Arial", size=9, color="FF333333")
            ws[f"H{row}"].alignment = align("left", "center", wrap=True)
            ws[f"H{row}"].fill = fill(bg)
            ws[f"H{row}"].border = border_thin()

            row += 1
            item_num += 1

    # ── Summary footer ──
    ws.row_dimensions[row].height = 6
    row += 1

    footer_row = row
    ws.row_dimensions[footer_row].height = 22
    total_items = item_num - 1

    for col, label, formula, f_color in [
        ("C", "Total",   f"={total_items}",                    "FF333333"),
        ("D", "Pass",    f'=COUNTIF(G10:G{footer_row-2},"PASS")',  GREEN_FG),
        ("E", "Fail",    f'=COUNTIF(G10:G{footer_row-2},"FAIL")',  RED_FG),
        ("F", "Pending", f'=COUNTIF(G10:G{footer_row-2},"PENDING")', ORANGE_FG),
        ("G", "Pass %",  f'=IFERROR(COUNTIF(G10:G{footer_row-2},"PASS")/({total_items}),0)', GREEN_FG),
    ]:
        lbl = ws[f"{col}{footer_row}"]
        lbl.font = Font(name="Arial", bold=True, size=9, color=f_color)
        lbl.alignment = align("center", "center")
        lbl.fill = fill(LIGHT_GRAY)
        lbl.border = border_thin()

    ws[f"B{footer_row}"] = "TOTALS"
    ws[f"B{footer_row}"].font = Font(name="Arial", bold=True, size=9, color="FF333333")
    ws[f"B{footer_row}"].alignment = align("center", "center")
    ws[f"B{footer_row}"].fill = fill(LIGHT_GRAY)
    ws[f"B{footer_row}"].border = border_thin()

    ws[f"C{footer_row}"] = f"={total_items}"
    ws[f"D{footer_row}"] = f'=COUNTIF(G10:G{footer_row-2},"PASS")'
    ws[f"E{footer_row}"] = f'=COUNTIF(G10:G{footer_row-2},"FAIL")'
    ws[f"F{footer_row}"] = f'=COUNTIF(G10:G{footer_row-2},"PENDING")'
    ws[f"G{footer_row}"] = f'=IFERROR(COUNTIF(G10:G{footer_row-2},"PASS")/{total_items},0)'
    ws[f"G{footer_row}"].number_format = "0%"

    for col in ["C","D","E","F","G","H"]:
        cell = ws[f"{col}{footer_row}"]
        cell.font = Font(name="Arial", bold=True, size=9, color="FF333333")
        cell.alignment = align("center","center")
        cell.fill = fill(LIGHT_GRAY)
        cell.border = border_thin()

    ws[f"H{footer_row}"] = ""

    # Freeze panes below header
    ws.freeze_panes = "B10"

    return ws


# Build all page sheets
for i, (name, url, slug) in enumerate(PAGES):
    make_page_sheet(wb, name, url, i + 1)


# ═══════════════════════════════════════════════
# SHEET LAST: SIGN-OFF
# ═══════════════════════════════════════════════
ws_sign = wb.create_sheet("Sign-off")
ws_sign.sheet_view.showGridLines = False
for col, w in {"A":2,"B":30,"C":30,"D":2}.items():
    ws_sign.column_dimensions[col].width = w

# Header
for r in range(1, 7):
    for c in range(1, 5):
        ws_sign.cell(r, c).fill = fill(BLACK)
ws_sign.row_dimensions[1].height = 6
ws_sign.row_dimensions[2].height = 32
ws_sign.row_dimensions[3].height = 16
ws_sign.row_dimensions[4].height = 8

ws_sign["B2"] = "SIGN-OFF & APPROVAL"
ws_sign["B2"].font = Font(name="Arial", bold=True, size=16, color=WHITE)
ws_sign["B2"].alignment = align("left", "center")

ws_sign["B3"] = "Selatox Global Website — User Acceptance Testing"
ws_sign["B3"].font = Font(name="Arial", size=9, color="FFAAAAAA")
ws_sign["B3"].alignment = align("left", "center")

ws_sign.row_dimensions[5].height = 4
for c in range(1,5): ws_sign.cell(5, c).fill = fill(GOLD)

ws_sign.row_dimensions[6].height = 12

# Summary stats
ws_sign.row_dimensions[7].height = 18
ws_sign["B7"] = "TEST RESULT SUMMARY"
ws_sign["B7"].font = Font(name="Arial", bold=True, size=8, color="FF999999")

for r in [8, 9, 10, 11]:
    ws_sign.row_dimensions[r].height = 22

data_rows = [
    ("Total Pages Tested",   f"=COUNTA(Index!B4:B{3+len(PAGES)})"),
    ("Total Test Items",     f"=SUM(Index!E4:E{3+len(PAGES)})"),
    ("Items Passed",         f'=SUMIF(Index!F4:F{3+len(PAGES)},"PASS",Index!E4:E{3+len(PAGES)})'),
    ("Items Failed",         f'=SUMIF(Index!F4:F{3+len(PAGES)},"FAIL",Index!E4:E{3+len(PAGES)})'),
    ("Items Pending",        f'=SUMIF(Index!F4:F{3+len(PAGES)},"PENDING",Index!E4:E{3+len(PAGES)})'),
    ("Overall Pass Rate",    f'=IFERROR(SUMIF(Index!F4:F{3+len(PAGES)},"PASS",Index!E4:E{3+len(PAGES)})/SUM(Index!E4:E{3+len(PAGES)}),0)'),
]
for i, (label, formula) in enumerate(data_rows):
    r = 8 + i
    ws_sign.row_dimensions[r].height = 20
    bg = LIGHT_GRAY if i % 2 == 0 else WHITE

    ws_sign[f"B{r}"] = label
    ws_sign[f"B{r}"].font = Font(name="Arial", size=9, color="FF555555")
    ws_sign[f"B{r}"].alignment = align("left", "center")
    ws_sign[f"B{r}"].fill = fill(bg)
    ws_sign[f"B{r}"].border = border_thin()

    ws_sign[f"C{r}"] = formula
    ws_sign[f"C{r}"].font = Font(name="Arial", bold=True, size=10, color="FF1A1A1A")
    ws_sign[f"C{r}"].alignment = align("center", "center")
    ws_sign[f"C{r}"].fill = fill(bg)
    ws_sign[f"C{r}"].border = border_thin()
    if i == 5:
        ws_sign[f"C{r}"].number_format = "0.0%"

sign_start = 8 + len(data_rows) + 2

# Signature blocks
def sig_block(ws, start_row, title, role_label):
    ws.row_dimensions[start_row].height = 22
    c = ws[f"B{start_row}"]
    c.value = title.upper()
    c.font = Font(name="Arial", bold=True, size=9, color=WHITE)
    c.fill = fill(DARK_GRAY)
    c.alignment = align("left", "center")
    c.border = border_thin()
    ws[f"C{start_row}"].fill = fill(DARK_GRAY)
    ws[f"C{start_row}"].border = border_thin()

    fields = ["Full Name", "Role / Title", "Signature", "Date"]
    for j, f_label in enumerate(fields):
        r = start_row + 1 + j
        ws.row_dimensions[r].height = 28 if f_label == "Signature" else 22
        ws[f"B{r}"] = f_label
        ws[f"B{r}"].font = Font(name="Arial", size=8, color="FF888888")
        ws[f"B{r}"].alignment = align("left", "center")
        ws[f"B{r}"].fill = fill(LIGHT_GRAY)
        ws[f"B{r}"].border = border_thin()
        ws[f"C{r}"] = ""
        ws[f"C{r}"].fill = fill(WHITE)
        ws[f"C{r}"].border = border_thin()
    return start_row + 5

next_row = sig_block(ws_sign, sign_start, "Prepared By — Development Team", "Developer")
ws_sign.row_dimensions[next_row].height = 12
next_row = sig_block(ws_sign, next_row + 1, "Approved By — Client / Stakeholder", "Stakeholder")

ws_sign.row_dimensions[next_row + 2].height = 16
ws_sign[f"B{next_row+3}"] = f"Selatox Global Website  ·  UAT Document v1.0  ·  Generated {today_str}  ·  www.selatox.com"
ws_sign[f"B{next_row+3}"].font = Font(name="Arial", size=7, color="FFBBBBBB", italic=True)
ws_sign[f"B{next_row+3}"].alignment = align("left", "center")


# ── Save ──
out_path = r"C:\Users\Indra\Documents\Codes\Selatox\Selatox_UAT_Document.xlsx"
wb.save(out_path)
print("Saved:", out_path)
