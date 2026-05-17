# scripts/valoraiplus/pleading_base.py
# ══════════════════════════════════════════════════════════════════════════════
# VALORAIPLUS® OMEGA v100™ | NODE AUTHORITY: SGAU-7226.3461 // Saint Paul Node®
# CA 28-Line Pleading Paper Engine with Two-Pass Canvas, config.yaml Loader,
# 24pt Line Grid Registration, and Shared Story Helpers.
# ══════════════════════════════════════════════════════════════════════════════

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak, KeepTogether
from reportlab.lib import colors
from reportlab.pdfgen import canvas as _canvas_mod
import os
import sys

# ── Config Loader — Reads config/valoraiplus/config.yaml If Available ─────────
def load_executive_config():
    try:
        import yaml
        config_path = os.path.join(os.getcwd(), 'config', 'valoraiplus', 'config.yaml')
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                return yaml.safe_load(f)
    except ImportError:
        pass  # yaml library not installed — fall back to hardcoded system defaults
    return {}

SYSTEM_CONFIG = load_executive_config()

def _cfg(keys, default=''):
    """Safely traverse nested configuration dictionary using a dot-notation key list."""
    val = SYSTEM_CONFIG
    for k in keys:
        if not isinstance(val, dict):
            return default
        val = val.get(k, default)
    return val if val != '' else default

# ── Page Geometry Constants — CRC Rule 2.100 Compliance Lock ──────────────────
PAGE_W, PAGE_H = letter          # 8.5 × 11 inches standard layout medium
LEFT_MARGIN    = 1.5  * inch     # Text left boundary (Absolute 108 points constraint)
RIGHT_MARGIN   = 1.0  * inch     # Text right boundary (72 points)
TOP_MARGIN     = 1.0  * inch
BOT_MARGIN     = 1.0  * inch
TEXT_W         = PAGE_W - LEFT_MARGIN - RIGHT_MARGIN   # 6.0 inches exactly (432 points)
TEXT_H         = PAGE_H - TOP_MARGIN - BOT_MARGIN      # 9.0 inches exactly (648 points)

# Gutter rule alignment metrics (positioned within the left gutter buffer)
RULE_INNER     = 1.25 * inch     # Inner vertical line boundary rule
RULE_OUTER     = 1.35 * inch     # Outer vertical line boundary rule
LINE_NUM_X     = 1.20 * inch     # Target coordinate anchor for alignment numbers
LINES_PER_PAGE = 28
LINE_GRID_Y    = 24.0            # Exact 24pt double-spaced row height leading tracking

# ── Shared Style Framework Registration ───────────────────────────────────────
def make_styles(font_size=12):
    TF  = "Times-Roman"
    TB  = "Times-Bold"
    TI  = "Times-Italic"
    sz  = font_size
    lh  = LINE_GRID_Y  # Core leading hack bound to grid metric to prevent vertical line drift

    return {
        "caption": ParagraphStyle("caption", fontName=TB, fontSize=sz,
                                  leading=lh, alignment=TA_CENTER, spaceBefore=0, spaceAfter=0),
        "center":  ParagraphStyle("center",  fontName=TF, fontSize=sz,
                                  leading=lh, alignment=TA_CENTER, spaceBefore=0, spaceAfter=0),
        "body":    ParagraphStyle("body",    fontName=TF, fontSize=sz,
                                  leading=lh, alignment=TA_JUSTIFY,
                                  leftIndent=0, rightIndent=0, spaceBefore=0, spaceAfter=0),
        "heading": ParagraphStyle("heading", fontName=TB, fontSize=sz,
                                  leading=lh, alignment=TA_LEFT,
                                  spaceBefore=0, spaceAfter=0),
        "italic":  ParagraphStyle("italic",  fontName=TI, fontSize=sz,
                                  leading=lh, alignment=TA_LEFT, spaceBefore=0, spaceAfter=0),
        "right":   ParagraphStyle("right",   fontName=TF, fontSize=sz,
                                  leading=lh, alignment=TA_RIGHT, spaceBefore=0, spaceAfter=0),
        "bold_r":  ParagraphStyle("bold_r",  fontName=TB, fontSize=sz,
                                  leading=lh, alignment=TA_RIGHT, spaceBefore=0, spaceAfter=0),
        "small":   ParagraphStyle("small",   fontName=TF, fontSize=10,
                                  leading=14, alignment=TA_JUSTIFY, spaceBefore=0, spaceAfter=0),
        "small_b": ParagraphStyle("small_b", fontName=TB, fontSize=10,
                                  leading=14, alignment=TA_LEFT, spaceBefore=0, spaceAfter=0),
        "small_c": ParagraphStyle("small_c", fontName=TF, fontSize=10,
                                  leading=14, alignment=TA_CENTER, spaceBefore=0, spaceAfter=0),
        "bold_c":  ParagraphStyle("bold_c",  fontName=TB, fontSize=sz,
                                  leading=lh, alignment=TA_CENTER, spaceBefore=0, spaceAfter=0),
        "esign_label": ParagraphStyle("esign_label", fontName=TB, fontSize=11,
                                      leading=15, alignment=TA_LEFT),
        "esign_value": ParagraphStyle("esign_value", fontName=TF, fontSize=11,
                                      leading=15, alignment=TA_LEFT),
    }

# ── Two-Pass Canvas Pipeline For Total Page Count Calculations ─────────────────
class _TwoPassCanvas(_canvas_mod.Canvas):
    """
    First pass: Captures the flowable layout bounds and page configuration targets.
    Second pass: Draws vertical infrastructure, alignment lines, and stamps footers
    with an accurate total page tally to prevent text alignment boundaries from drifting.
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

        self.setStrokeColor(colors.HexColor("#A0A0A0"))
        self.setLineWidth(1.0)

        # Draw left double vertical bounding lines
        self.line(RULE_INNER, BOT_MARGIN, RULE_INNER, h - TOP_MARGIN)
        self.line(RULE_OUTER, BOT_MARGIN, RULE_OUTER, h - TOP_MARGIN)

        # Draw right vertical boundary line
        self.line(w - RIGHT_MARGIN, BOT_MARGIN, w - RIGHT_MARGIN, h - TOP_MARGIN)

        # Draw bottom horizontal frame line
        self.line(LEFT_MARGIN, BOT_MARGIN, w - RIGHT_MARGIN, BOT_MARGIN)

        # Draw left 28 numerical index digits inside gutter boundaries
        self.setFont("Times-Bold", 10)
        self.setFillColor(colors.HexColor("#333333"))
        start_y = h - TOP_MARGIN

        for i in range(1, LINES_PER_PAGE + 1):
            y = start_y - ((i - 0.5) * LINE_GRID_Y)
            self.drawCentredString(RULE_INNER - 12, y - 3, str(i))
            # Subtle row alignment markers to ensure absolute grid continuity
            self.setStrokeColor(colors.HexColor("#F9F9F9"))
            self.setLineWidth(0.5)
            self.line(LEFT_MARGIN, y - 8, w - RIGHT_MARGIN, y - 8)

        # Reset rendering boundaries for primary text baseline blocks
        self.setStrokeColor(colors.HexColor("#A0A0A0"))
        self.setLineWidth(1.0)

        # Stamp accurate total page string over the forensic footer layer
        self.setFont("Times-Roman", 10)
        self.setFillColor(colors.HexColor("#444444"))
        page_num    = self._pageNumber
        footer_text = f"Node Auth: {NODE_AUTH} | Case No. {CASE_ID}"
        page_string = f"Page {page_num} of {total_pages}"
        self.drawString(LEFT_MARGIN, BOT_MARGIN - 24, footer_text)
        self.drawRightString(w - RIGHT_MARGIN, BOT_MARGIN - 24, page_string)
        self.restoreState()


# ── Legacy Single-Pass Callback (Maintained for backwards safety overrides) ────
def draw_pleading_page(canv, doc):
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


# ── Document Factory Initialization Methods ────────────────────────────────────
def make_doc(output_path):
    """Instantiate a BaseDocTemplate calibrated to strict physical tracking boundaries."""
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
    template = PageTemplate(id="pleading", frames=[frame])
    doc.addPageTemplates([template])
    return doc


def build_doc(doc, story):
    """Compile document story vectors through the Two-Pass layout rendering track."""
    doc.build(story, canvasmaker=_TwoPassCanvas)


# ── Column Dimension Geometry Helpers ──────────────────────────────────────────
CELL_PAD = 5  # Left and right vertical cell boundaries (expressed in points)

def safe_widths(fractions):
    """Convert absolute decimal fractions into specific cell point widths within TEXT_W bounds."""
    total_pad = 2 * CELL_PAD * len(fractions)
    usable    = TEXT_W - total_pad
    cols      = [usable * f for f in fractions]
    diff      = TEXT_W - total_pad - sum(cols)
    cols[-1] += diff  # Injects fractional division rounding residual into the rightmost node
    return cols


def safe_widths_abs(abs_pts):
    """Verify and scale raw cell widths to guarantee absolute layout boundary retention."""
    total_pad = 2 * CELL_PAD * len(abs_pts)
    usable    = TEXT_W - total_pad
    raw_sum   = sum(abs_pts)
    if raw_sum <= usable:
        return list(abs_pts)
    scale = usable / raw_sum
    return [w * scale for w in abs_pts]


# ── Shared Story Layout Macro Helpers ───────────────────────────────────────────
def sp(story, n=1):
    """Inject a clean vertical separator locked onto specific multi-grid metrics."""
    story.append(Spacer(1, n * LINE_GRID_Y))

def hr(story):
    """Draw a thin horizontal separation line across the usable width field."""
    story.append(HRFlowable(width="100%", thickness=0.5,
                            color=colors.HexColor("#A0A0A0"), spaceAfter=0, spaceBefore=0))

def p(story, text, S, style="body"):
    """Format and insert text content paragraphs."""
    story.append(Paragraph(text, S[style]))

def h(story, text, S):
    """Format and insert standard header blocks."""
    story.append(Paragraph(text, S["heading"]))

def numbered_list(story, items, S, style="body"):
    """Compile item lines sequentially into multi-column formatting frames."""
    num_w, text_w = safe_widths([0.05, 0.95])
    for i, item in enumerate(items, 1):
        row = [[Paragraph(f"{i}.", S[style]), Paragraph(item, S[style])]]
        tbl = Table(row, colWidths=[num_w, text_w], splitByRow=True)
        tbl.setStyle(TableStyle([
            ("VALIGN",        (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING",   (0, 0), (-1, -1), 0),
            ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
            ("TOPPADDING",    (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]))
        story.append(tbl)
        story.append(Spacer(1, 4))

def esign_table(story, rows, S):
    """Compile structured electronic attestation text into distinct shaded display table formats."""
    label_style = ParagraphStyle("esign_label", fontName="Times-Bold",
                                  fontSize=11, leading=15, wordWrap="CJK")
    value_style = ParagraphStyle("esign_value", fontName="Times-Roman",
                                  fontSize=11, leading=15, wordWrap="CJK")
    para_rows = []
    for row in rows:
        label = row[0] if isinstance(row[0], Paragraph) else Paragraph(str(row[0]), label_style)
        value = row[1] if isinstance(row[1], Paragraph) else Paragraph(str(row[1]), value_style)
        para_rows.append([label, value])
    tbl = Table(para_rows, colWidths=safe_widths([0.26, 0.74]))
    tbl.setStyle(TableStyle([
        ("VALIGN",         (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",    (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",   (0, 0), (-1, -1), 6),
        ("TOPPADDING",     (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING",  (0, 0), (-1, -1), 4),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.HexColor("#F9F9F9"), colors.white]),
        ("BOX",            (0, 0), (-1, -1), 0.75, colors.HexColor("#888888")),
        ("INNERGRID",      (0, 0), (-1, -1), 0.25, colors.HexColor("#DDDDDD")),
    ]))
    story.append(tbl)

def service_table(story, rows, S):
    """Compile legal recipient proof data sequences directly into bordered tabular grids."""
    hdr_style  = ParagraphStyle("svc_hdr",  fontName="Times-Bold",  fontSize=10,
                                 leading=14, textColor=colors.white, wordWrap="CJK")
    cell_style = ParagraphStyle("svc_cell", fontName="Times-Roman", fontSize=10,
                                 leading=14, wordWrap="CJK")
    para_rows = []
    for r_idx, row in enumerate(rows):
        st = hdr_style if r_idx == 0 else cell_style
        para_rows.append([
            c if isinstance(c, Paragraph) else Paragraph(str(c), st)
            for c in row
        ])
    tbl = Table(para_rows, colWidths=safe_widths([0.36, 0.34, 0.30]))
    tbl.setStyle(TableStyle([
        ("BACKGROUND",     (0, 0), (-1, 0),  colors.HexColor("#1A1A1A")),
        ("FONTSIZE",       (0, 0), (-1, -1), 10),
        ("VALIGN",         (0, 0), (-1, -1), "TOP"),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#F5F5F5"), colors.white]),
        ("BOX",            (0, 0), (-1, -1), 0.75, colors.black),
        ("INNERGRID",      (0, 0), (-1, -1), 0.25, colors.HexColor("#CCCCCC")),
        ("LEFTPADDING",    (0, 0), (-1, -1), 5),
        ("RIGHTPADDING",   (0, 0), (-1, -1), 5),
        ("TOPPADDING",     (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING",  (0, 0), (-1, -1), 4),
    ]))
    story.append(tbl)


# ── Configuration Mapping Node Overrides — Case Tracker Integrations ───────────
CASE_ID         = _cfg(['companion_case_tracking', 'case_number'],          "CUD-26-682107")
CASE_UD         = CASE_ID   # Legacy coordinate alias matching structural templates
DEPT            = _cfg(['companion_case_tracking', 'court_department'],      "Department 12")
FILING_DATE     = "May 17, 2026"
DEFENDANT       = _cfg(['litigant_identity_matrix', 'legal_name'],           "DONALD ERNEST GILLSON")
DEF_ADDR1       = "1030 Girard Road, Suite 301A"
DEF_ADDR2       = "San Francisco, California 94129"
DEF_EMAIL       = _cfg(['litigant_identity_matrix', 'channels', 'primary'],  "dgillson9175@gmail.com")
DEF_ROLE        = "Defendant / Plaintiff, In Pro Per"
NODE_AUTH       = _cfg(['system_specification', 'node_authority'],           "SGAU-7226.3461 // Saint Paul Node")
FRAMEWORK_ESIGN = ("E-SIGN Act (15 U.S.C. Sec. 7001 et seq.) / "
                   "UETA (Cal. Civ. Code Sec. 1633.1 et seq.)")
JEFFREY_ESIGN   = ("/s/ Jeffrey Wright [Electronic Signature — "
                   "E-SIGN Act / Digital Communications Act Compliant]")
ORCID_ID        = _cfg(['litigant_identity_matrix', 'orcid_id'],             "0009-0007-0768-5486")
JEFFREY_ROLE    = ("Veterans Tenant Union Leadership Member and "
                   "Material Eyewitness — identity authenticated by "
                   "verified role pursuant to 15 U.S.C. Sec. 7001(c)(1); "
                   "no personal email required under the Digital "
                   "Communications Act")
