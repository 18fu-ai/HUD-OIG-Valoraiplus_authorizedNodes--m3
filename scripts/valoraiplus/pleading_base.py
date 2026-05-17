"""
pleading_base.py — Shared California Pleading Paper Base Module
VALORAIPLUS® OMEGA v100™ — NODE AUTHORITY: SGAU-7226.3461

California Rules of Court, Rule 2.100 et seq. compliant.
San Francisco Superior Court eCourt e-filing compatible.

GEOMETRY (8.5" × 11" letter):
  Left margin  : 1.5"  (text starts here — AFTER the gutter rules)
  Right margin : 1.0"
  Top margin   : 1.0"
  Bottom margin: 1.0"
  Text width   : 6.0"  (8.5 - 1.5 - 1.0)
  Text height  : 9.0"  (11 - 1.0 - 1.0)

GUTTER (left of text area):
  Rule 1 (inner): 1.25" from left edge
  Rule 2 (outer): 1.35" from left edge
  Line numbers  : right-aligned at 1.20" from left edge
  28 lines/page : standard California pleading paper
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak, KeepTogether
from reportlab.lib import colors
from reportlab.pdfgen import canvas as _canvas_mod
import os
import sys

# ── Config loader — reads config/valoraiplus/config.yaml if available ─────────
def load_executive_config():
    try:
        import yaml
        config_path = os.path.join(os.getcwd(), 'config', 'valoraiplus', 'config.yaml')
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                return yaml.safe_load(f)
    except ImportError:
        pass  # yaml not installed — fall back to hardcoded constants
    return {}

SYSTEM_CONFIG = load_executive_config()

def _cfg(keys, default=''):
    """Safely traverse nested config dict using dot-notation key list."""
    val = SYSTEM_CONFIG
    for k in keys:
        if not isinstance(val, dict):
            return default
        val = val.get(k, default)
    return val if val != '' else default

# ── Page geometry constants ───────────────────────────────────────────────────
PAGE_W, PAGE_H = letter          # 8.5 × 11 inches
LEFT_MARGIN    = 1.5  * inch     # text left edge
RIGHT_MARGIN   = 1.0  * inch     # text right edge
TOP_MARGIN     = 1.0  * inch
BOT_MARGIN     = 1.0  * inch
TEXT_W         = PAGE_W - LEFT_MARGIN - RIGHT_MARGIN   # 6.0 inches exactly
TEXT_H         = PAGE_H - TOP_MARGIN - BOT_MARGIN      # 9.0 inches exactly

# Gutter rule positions (left of text area)
RULE_INNER     = 1.25 * inch     # inner vertical rule
RULE_OUTER     = 1.35 * inch     # outer vertical rule
LINE_NUM_X     = 1.20 * inch     # right edge of line number column
LINES_PER_PAGE = 28

# ── Shared styles ─────────────────────────────────────────────────────────────
def make_styles(font_size=12):
    TF  = "Times-Roman"
    TB  = "Times-Bold"
    TI  = "Times-Italic"
    sz  = font_size
    lh  = sz + 6   # line height = font + 6pt leading

    return {
        "caption": ParagraphStyle("caption", fontName=TB, fontSize=sz,
                                  leading=lh, alignment=TA_CENTER, spaceAfter=4),
        "center":  ParagraphStyle("center",  fontName=TF, fontSize=sz,
                                  leading=lh, alignment=TA_CENTER, spaceAfter=4),
        "body":    ParagraphStyle("body",    fontName=TF, fontSize=sz,
                                  leading=lh, alignment=TA_JUSTIFY,
                                  leftIndent=0, rightIndent=0, spaceAfter=6),
        "heading": ParagraphStyle("heading", fontName=TB, fontSize=sz,
                                  leading=lh, alignment=TA_LEFT,
                                  spaceBefore=8, spaceAfter=4),
        "italic":  ParagraphStyle("italic",  fontName=TI, fontSize=sz,
                                  leading=lh, alignment=TA_LEFT, spaceAfter=4),
        "right":   ParagraphStyle("right",   fontName=TF, fontSize=sz,
                                  leading=lh, alignment=TA_RIGHT, spaceAfter=4),
        "bold_r":  ParagraphStyle("bold_r",  fontName=TB, fontSize=sz,
                                  leading=lh, alignment=TA_RIGHT, spaceAfter=4),
        "small":   ParagraphStyle("small",   fontName=TF, fontSize=10,
                                  leading=14, alignment=TA_JUSTIFY, spaceAfter=3),
        "small_b": ParagraphStyle("small_b", fontName=TB, fontSize=10,
                                  leading=14, alignment=TA_LEFT, spaceAfter=3),
        "small_c": ParagraphStyle("small_c", fontName=TF, fontSize=10,
                                  leading=14, alignment=TA_CENTER, spaceAfter=3),
        "bold_c":  ParagraphStyle("bold_c",  fontName=TB, fontSize=sz,
                                  leading=lh, alignment=TA_CENTER, spaceAfter=4),
        "esign_label": ParagraphStyle("esign_label", fontName=TB, fontSize=11,
                                      leading=15, alignment=TA_LEFT),
        "esign_value": ParagraphStyle("esign_value", fontName=TF, fontSize=11,
                                      leading=15, alignment=TA_LEFT),
    }

# ── Two-pass canvas for accurate "Page X of Y" footers ───────────────────────────
class _TwoPassCanvas(_canvas_mod.Canvas):
    """
    Captures all page states on the first pass, then stamps every page
    with the correct total-page-count footer on the second pass.
    Implements the double-pass pattern from the CourtDocumentCompiler spec.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._page_states = []

    def showPage(self):
        self._page_states.append(dict(self.__dict__.copy()))
        self._startPage()

    def save(self):
        total = len(self._page_states)
        for state in self._page_states:
            self.__dict__.update(state)
            self._draw_pleading_infrastructure(total)
            super().showPage()
        super().save()

    def _draw_pleading_infrastructure(self, total_pages):
        self.saveState()
        w, h = letter

        self.setStrokeColor(colors.black)
        self.setLineWidth(0.5)

        # Double vertical gutter rules
        self.line(RULE_INNER, BOT_MARGIN, RULE_INNER, h - TOP_MARGIN)
        self.line(RULE_OUTER, BOT_MARGIN, RULE_OUTER, h - TOP_MARGIN)

        # Bottom horizontal rule
        self.line(LEFT_MARGIN, BOT_MARGIN, w - RIGHT_MARGIN, BOT_MARGIN)

        # 28 line numbers
        line_height = TEXT_H / LINES_PER_PAGE
        self.setFont("Times-Roman", 9)
        for i in range(1, LINES_PER_PAGE + 1):
            y = h - TOP_MARGIN - (i - 0.5) * line_height
            self.drawRightString(LINE_NUM_X, y - 3, str(i))

        # Accurate "Page X of Y" footer
        self.setFont("Times-Roman", 10)
        page_num = self._pageNumber
        self.drawCentredString(w / 2, BOT_MARGIN - 0.35 * inch,
                               f"— {page_num} of {total_pages} —")
        self.restoreState()


# Keep backward-compat alias for any code that calls draw_pleading_page directly
def draw_pleading_page(canv, doc):
    """Legacy single-pass callback — used only if make_doc is bypassed."""
    canv.saveState()
    w, h = letter
    canv.setStrokeColor(colors.black)
    canv.setLineWidth(0.5)
    canv.line(RULE_INNER, BOT_MARGIN, RULE_INNER, h - TOP_MARGIN)
    canv.line(RULE_OUTER, BOT_MARGIN, RULE_OUTER, h - TOP_MARGIN)
    canv.line(LEFT_MARGIN, BOT_MARGIN, w - RIGHT_MARGIN, BOT_MARGIN)
    line_height = TEXT_H / LINES_PER_PAGE
    canv.setFont("Times-Roman", 9)
    for i in range(1, LINES_PER_PAGE + 1):
        y = h - TOP_MARGIN - (i - 0.5) * line_height
        canv.drawRightString(LINE_NUM_X, y - 3, str(i))
    canv.setFont("Times-Roman", 10)
    canv.drawCentredString(w / 2, BOT_MARGIN - 0.35 * inch, f"— {doc.page} —")
    canv.restoreState()

# ── Document factory ──────────────────────────────────────────────────────────
def make_doc(output_path):
    """Create a BaseDocTemplate with the correct pleading paper frame."""
    doc = BaseDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=LEFT_MARGIN,
        rightMargin=RIGHT_MARGIN,
        topMargin=TOP_MARGIN,
        bottomMargin=BOT_MARGIN,
    )
    frame = Frame(
        LEFT_MARGIN, BOT_MARGIN,
        TEXT_W, TEXT_H,
        id="main",
        leftPadding=0, rightPadding=0,
        topPadding=0,  bottomPadding=0,
    )
    # No onPage callback — infrastructure is drawn by _TwoPassCanvas on second pass
    template = PageTemplate(id="pleading", frames=[frame])
    doc.addPageTemplates([template])
    return doc


def build_doc(doc, story):
    """
    Build the document using the two-pass canvas so every page receives
    an accurate 'Page X of Y' footer and all pleading paper infrastructure
    (gutter rules, line numbers) is stamped correctly.
    Signature blocks wrapped in KeepTogether will not orphan across pages.
    """
    doc.build(story, canvasmaker=_TwoPassCanvas)

# ── Table geometry helpers ───────────────────────────────────────────────────
# Every table cell has 5pt left + 5pt right padding = 10pt per column.
# To prevent bleeding, subtract total horizontal padding from TEXT_W before
# distributing column widths, then add padding back via TableStyle.
CELL_PAD = 5   # points — left AND right padding per cell

def safe_widths(fractions, n_cols=None):
    """
    Convert a list of fractional column widths (summing to 1.0) into
    absolute point values that fit exactly within TEXT_W after accounting
    for cell padding.  Pass fractions as a list of floats, e.g.:
        safe_widths([0.44, 0.56])   -> two columns
        safe_widths([0.30, 0.50, 0.20]) -> three columns
    The returned list sums to TEXT_W exactly.
    """
    total_pad = 2 * CELL_PAD * len(fractions)   # left+right per column × ncols
    usable    = TEXT_W - total_pad               # net drawable width
    cols      = [usable * f for f in fractions]
    # distribute any rounding residual to the last column
    diff = TEXT_W - total_pad - sum(cols)
    cols[-1] += diff
    return cols


def safe_widths_abs(abs_pts):
    """
    Validate and clamp a list of absolute point column widths so they
    never exceed TEXT_W in total (including padding).  Scales proportionally
    if the sum would overflow.
    """
    total_pad = 2 * CELL_PAD * len(abs_pts)
    usable    = TEXT_W - total_pad
    raw_sum   = sum(abs_pts)
    if raw_sum <= usable:
        return list(abs_pts)
    scale = usable / raw_sum
    return [w * scale for w in abs_pts]


# ── Shared story helpers ──────────────────────────────────────────────────────
def sp(story, n=1):
    story.append(Spacer(1, n * 0.18 * inch))

def hr(story):
    story.append(HRFlowable(width="100%", thickness=0.5,
                            color=colors.black, spaceAfter=4))

def p(story, text, S, style="body"):
    story.append(Paragraph(text, S[style]))

def h(story, text, S):
    story.append(Paragraph(text, S["heading"]))

def numbered_list(story, items, S, style="body"):
    """
    Render a numbered list with proper two-column table alignment.
    Each item is a separate table so long items can split across pages.
    Column widths use safe_widths to prevent margin bleeding.
    """
    num_w, text_w = safe_widths([0.047, 0.953])   # ~0.28" number col, rest for text
    for i, item in enumerate(items, 1):
        row = [[
            Paragraph(f"{i}.", S[style]),
            Paragraph(item, S[style])
        ]]
        tbl = Table(row, colWidths=[num_w, text_w],
                    splitByRow=True)   # allow tall cells to split across pages
        tbl.setStyle(TableStyle([
            ("VALIGN",        (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING",   (0, 0), (-1, -1), 0),
            ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
            ("TOPPADDING",    (0, 0), (-1, -1), 2),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ]))
        story.append(tbl)
        sp(story, 0.15)

def esign_table(story, rows, S):
    """
    Render a shaded E-SIGN attestation table.
    All cell values are wrapped in Paragraph objects so long strings
    wrap inside the cell boundary instead of overflowing the right edge.
    """
    label_style = ParagraphStyle(
        "esign_label", fontName="Times-Bold", fontSize=11, leading=15,
        wordWrap="CJK",
    )
    value_style = ParagraphStyle(
        "esign_value", fontName="Times-Roman", fontSize=11, leading=15,
        wordWrap="CJK",
    )
    para_rows = []
    for row in rows:
        label = row[0] if isinstance(row[0], Paragraph) else Paragraph(str(row[0]), label_style)
        value = row[1] if isinstance(row[1], Paragraph) else Paragraph(str(row[1]), value_style)
        para_rows.append([label, value])
    tbl = Table(para_rows, colWidths=safe_widths([0.26, 0.74]))
    tbl.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 5),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 5),
        ("TOPPADDING",    (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("ROWBACKGROUNDS",(0, 0), (-1, -1),
         [colors.HexColor("#f2f2f2"), colors.white]),
        ("BOX",           (0, 0), (-1, -1), 0.75, colors.black),
        ("INNERGRID",     (0, 0), (-1, -1), 0.25, colors.HexColor("#cccccc")),
    ]))
    story.append(tbl)

def service_table(story, rows, S):
    """
    Render the Proof of Service recipients table.
    All cell values are wrapped in Paragraph objects so long strings
    wrap inside the cell boundary instead of overflowing the right edge.
    """
    hdr_style = ParagraphStyle(
        "svc_hdr", fontName="Times-Bold", fontSize=10, leading=14,
        textColor=colors.white, wordWrap="CJK",
    )
    cell_style = ParagraphStyle(
        "svc_cell", fontName="Times-Roman", fontSize=10, leading=14,
        wordWrap="CJK",
    )
    para_rows = []
    for r_idx, row in enumerate(rows):
        st = hdr_style if r_idx == 0 else cell_style
        para_rows.append([
            c if isinstance(c, Paragraph) else Paragraph(str(c), st)
            for c in row
        ])
    tbl = Table(para_rows, colWidths=safe_widths([0.36, 0.34, 0.30]))
    tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), colors.HexColor("#1a1a1a")),
        ("FONTSIZE",      (0, 0), (-1, -1), 10),
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1),
         [colors.HexColor("#f5f5f5"), colors.white]),
        ("BOX",           (0, 0), (-1, -1), 0.75, colors.black),
        ("INNERGRID",     (0, 0), (-1, -1), 0.25, colors.HexColor("#cccccc")),
        ("LEFTPADDING",   (0, 0), (-1, -1), 5),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 5),
        ("TOPPADDING",    (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(tbl)

# ── Shared filing constants (config.yaml → fallback to hardcoded) ─────────────
CASE_UD        = _cfg(['companion_case_tracking', 'case_number'],   "CUD-26-682107")
DEPT           = _cfg(['companion_case_tracking', 'court_department'], "Department 12")
FILING_DATE    = "May 17, 2026"
DEFENDANT      = _cfg(['litigant_identity_matrix', 'legal_name'],   "DONALD ERNEST GILLSON")
DEF_ADDR1      = "1030 Girard Road, Suite 301A"
DEF_ADDR2      = "San Francisco, California 94129"
DEF_EMAIL      = _cfg(['litigant_identity_matrix', 'channels', 'primary'], "dgillson9175@gmail.com")
DEF_ROLE       = "Defendant / Plaintiff, In Pro Per"
NODE_AUTH      = _cfg(['system_specification', 'node_authority'],   "SGAU-7226.3461 // Saint Paul Node")
FRAMEWORK_ESIGN= ("E-SIGN Act (15 U.S.C. Sec. 7001 et seq.) / "
                  "UETA (Cal. Civ. Code Sec. 1633.1 et seq.)")
JEFFREY_ESIGN  = ("/s/ Jeffrey Wright [Electronic Signature — "
                  "E-SIGN Act / Digital Communications Act Compliant]")
ORCID_ID       = _cfg(['litigant_identity_matrix', 'orcid_id'],     "0009-0007-0768-5486")
JEFFREY_ROLE   = ("Veterans Tenant Union Leadership Member and "
                  "Material Eyewitness — identity authenticated by "
                  "verified role pursuant to 15 U.S.C. Sec. 7001(c)(1); "
                  "no personal email required under the Digital "
                  "Communications Act")
