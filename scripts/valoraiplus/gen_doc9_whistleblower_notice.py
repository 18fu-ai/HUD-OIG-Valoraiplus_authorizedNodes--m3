from pleading_base import safe_widths, safe_widths_abs
#!/usr/bin/env python3
"""
Doc 9 — Notice to the Court: SF Whistleblower Program, Office of Disability,
and Emerging Technology Department — City-Level Nexus and Obstruction Record
Case No. CUD-26-682107 | San Francisco Superior Court, Department 12
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.platypus.flowables import HRFlowable
import datetime

# ── Constants ──────────────────────────────────────────────────────────────
PAGE_W, PAGE_H = letter
LEFT_M   = 1.50 * inch   # 1.5" left margin (pleading paper standard)
RIGHT_M  = 1.00 * inch
TOP_M    = 1.00 * inch
BOT_M    = 1.00 * inch
TEXT_W   = PAGE_W - LEFT_M - RIGHT_M   # 6.0 inches
GUTTER1  = 1.25 * inch
GUTTER2  = 1.35 * inch
LINE_H   = (PAGE_H - TOP_M - BOT_M) / 28.0

CASE_NO       = "CUD-26-682107"
DEPT          = "12"
DEFENDANT     = "DONALD ERNEST GILLSON"
DEF_ADDR      = "1030 Girard Street, San Francisco, CA 94134"
DEF_EMAIL     = "dgillson9175@gmail.com"
DEF_EMAIL2    = "donny@18fu.ai"
DEF_ORCID     = "0009-0007-0768-5486"
PLAINTIFF     = "SWORDS TO PLOWSHARES"
COURT         = "SAN FRANCISCO SUPERIOR COURT"
TODAY         = "May 17, 2026"
FILING_DATE   = "May 17, 2026"

# SF Government contacts confirmed from email headers
SF_MOD        = "Mayor's Office on Disability (MOD), City and County of San Francisco"
SF_MOD_EMAIL  = "MOD@sfgov.org"
SF_AI_EMAIL   = "ai@sfgov.org"
SF_ETD_CONTACT = "Drew Yurkov, SF Emerging Technology Department"
SF_ETD_EMAIL  = "drew.yurkov@sfgov.org"
SF_HRC_CONTACT = "Ana Moraga Archila, SF Human Rights Commission"
SF_HRC_EMAIL  = "ana.moraga@sfgov.org"
SF_HSA_CONTACT = "Deborah Kaplan, SF Human Services Agency"
SF_HSA_EMAIL  = "deborah.kaplan@sfgov.org"

# Federal contacts
HHS_OCR_CONTACT = "Amy Horrell, HHS Office for Civil Rights"
HHS_OCR_EMAIL   = "Amy.Horrell@hhs.gov"
HHS_OCR_CASE    = "HHS OCR Case No. 25-621293"
CRD_CONTACT     = "Anna (Case Analyst), California Civil Rights Department"
CRD_CASE        = "CCRS Case No. 202601-33270627"
CALVB_CASE      = "CalVCB No. A26-10224054"

# Opposing counsel
ZANGHI_NAME   = "John Nicholas Zanghi"
ZANGHI_BAR    = "320531"
ZANGHI_EMAIL  = "jzanghi@ztalaw.com"
WHITE_NAME    = "Bradford Christopher White"
WHITE_BAR     = "297746"
WHITE_EMAIL   = "bwhite@stp-sf.org"

# Jeffrey Wright (service deliverer)
JEFFREY_NAME  = "Jeffrey Wright"
JEFFREY_ROLE  = ("Veterans Tenant Union Leadership Member and Material Eyewitness, "
                 "1029 Girard Street, San Francisco, CA 94134")

OUTPUT_PATH = "/home/ubuntu/valoraiplus_core/CUD-26-682107_Doc9_WhistleblowerNotice.pdf"

# ── Page Canvas Callback ────────────────────────────────────────────────────
def pleading_page(canv, doc):
    """Draw 28-line pleading paper rules on every page."""
    canv.saveState()
    canv.setStrokeColor(colors.black)
    canv.setLineWidth(0.5)
    # Double left-margin rules
    canv.line(GUTTER1, BOT_M, GUTTER1, PAGE_H - TOP_M)
    canv.line(GUTTER2, BOT_M, GUTTER2, PAGE_H - TOP_M)
    # Bottom horizontal rule
    canv.line(LEFT_M * 0.5, BOT_M * 0.75, PAGE_W - RIGHT_M * 0.5, BOT_M * 0.75)
    # 28 line numbers
    canv.setFont("Times-Roman", 8)
    for i in range(1, 29):
        y = PAGE_H - TOP_M - (i - 0.5) * LINE_H
        canv.drawRightString(GUTTER1 - 0.08 * inch, y - 3, str(i))
    # Page number
    canv.setFont("Times-Roman", 9)
    canv.drawCentredString(PAGE_W / 2, BOT_M * 0.4,
                           f"Doc. 9 — Case No. {CASE_NO} — Page {doc.page}")
    canv.restoreState()

# ── Styles ──────────────────────────────────────────────────────────────────
def make_styles():
    base = getSampleStyleSheet()
    normal = ParagraphStyle(
        'PleadNormal', parent=base['Normal'],
        fontName='Times-Roman', fontSize=12, leading=18,
        alignment=TA_JUSTIFY, spaceAfter=6,
        leftIndent=0, rightIndent=0
    )
    bold = ParagraphStyle(
        'PleadBold', parent=normal,
        fontName='Times-Bold'
    )
    center = ParagraphStyle(
        'PleadCenter', parent=normal,
        alignment=TA_CENTER
    )
    center_bold = ParagraphStyle(
        'PleadCenterBold', parent=center,
        fontName='Times-Bold'
    )
    heading = ParagraphStyle(
        'PleadHeading', parent=normal,
        fontName='Times-Bold', fontSize=12,
        spaceAfter=4, spaceBefore=8,
        alignment=TA_CENTER
    )
    small = ParagraphStyle(
        'PleadSmall', parent=normal,
        fontSize=10, leading=14
    )
    small_bold = ParagraphStyle(
        'PleadSmallBold', parent=small,
        fontName='Times-Bold'
    )
    indent = ParagraphStyle(
        'PleadIndent', parent=normal,
        leftIndent=0.3 * inch
    )
    return dict(
        normal=normal, bold=bold, center=center,
        center_bold=center_bold, heading=heading,
        small=small, small_bold=small_bold, indent=indent
    )

S = make_styles()

def P(text, style='normal'):
    return Paragraph(text, S[style])

def SP(h=6):
    return Spacer(1, h)

def HR():
    return HRFlowable(width=TEXT_W, thickness=0.5, color=colors.black, spaceAfter=4, spaceBefore=4)

def table_cell(text, style='normal'):
    return Paragraph(text, S[style])

# ── Table helper ─────────────────────────────────────────────────────────────
def make_table(data, col_widths, style_cmds=None):
    # Clamp column widths to prevent bleeding past TEXT_W
    col_widths = safe_widths_abs(col_widths)
    base_cmds = [
        ('FONTNAME', (0, 0), (-1, -1), 'Times-Roman'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('LEADING',  (0, 0), (-1, -1), 14),
        ('VALIGN',   (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING',  (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING',   (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING',(0, 0), (-1, -1), 3),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#EEEEEE')),
        ('FONTNAME', (0, 0), (-1, 0), 'Times-Bold'),
    ]
    if style_cmds:
        base_cmds.extend(style_cmds)
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle(base_cmds))
    return t

def esign_block():
    """Standard defendant E-SIGN block."""
    data = [
        [table_cell('E-SIGN ATTESTATION', 'small_bold'), table_cell('', 'small')],
        [table_cell('Signatory:', 'small_bold'),
         table_cell('Donald Ernest Gillson, In Pro Per', 'small')],
        [table_cell('ORCID iD:', 'small_bold'),
         table_cell(DEF_ORCID, 'small')],
        [table_cell('Email:', 'small_bold'),
         table_cell(f'{DEF_EMAIL} | {DEF_EMAIL2}', 'small')],
        [table_cell('Node Authority:', 'small_bold'),
         table_cell('SGAU-7226.3461 // Saint Paul Node', 'small')],
        [table_cell('Date:', 'small_bold'),
         table_cell(FILING_DATE, 'small')],
        [table_cell('Framework:', 'small_bold'),
         table_cell('E-SIGN Act, 15 U.S.C. \u00a7 7001 et seq.; California UETA, Cal. Civ. Code \u00a7 1633.1 et seq.; Digital Communications Act', 'small')],
        [table_cell('Signature:', 'small_bold'),
         table_cell('/s/ Donald Ernest Gillson', 'small')],
    ]
    cmds = [
        ('SPAN', (0, 0), (1, 0)),
        ('ALIGN', (0, 0), (1, 0), 'CENTER'),
        ('BACKGROUND', (0, 0), (1, 0), colors.HexColor('#CCCCCC')),
        ('FONTNAME', (0, 0), (1, 0), 'Times-Bold'),
        ('BACKGROUND', (0, 1), (0, -1), colors.HexColor('#F5F5F5')),
    ]
    t = Table(data, colWidths=safe_widths_abs([1.5 * inch, 4.5 * inch]))
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Times-Roman'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('LEADING',  (0, 0), (-1, -1), 14),
        ('VALIGN',   (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING',  (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING',   (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING',(0, 0), (-1, -1), 3),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
    ] + cmds))
    return t

def esign_block_witness():
    """Jeffrey Wright witness E-SIGN block."""
    data = [
        [table_cell('WITNESS E-SIGN ATTESTATION — PROOF OF ELECTRONIC SERVICE', 'small_bold'), table_cell('', 'small')],
        [table_cell('Serving Party:', 'small_bold'),
         table_cell(JEFFREY_NAME, 'small')],
        [table_cell('Role:', 'small_bold'),
         table_cell(JEFFREY_ROLE, 'small')],
        [table_cell('Identity Auth:', 'small_bold'),
         table_cell('Verified by role pursuant to 15 U.S.C. \u00a7 7001(c)(1); no personal email required under the Digital Communications Act where identity is established by verified organizational role', 'small')],
        [table_cell('Framework:', 'small_bold'),
         table_cell('E-SIGN Act, 15 U.S.C. \u00a7 7001 et seq.; Digital Communications Act', 'small')],
        [table_cell('Date:', 'small_bold'),
         table_cell(FILING_DATE, 'small')],
        [table_cell('Signature:', 'small_bold'),
         table_cell('/s/ Jeffrey Wright, Veterans Tenant Union Leadership', 'small')],
    ]
    cmds = [
        ('SPAN', (0, 0), (1, 0)),
        ('ALIGN', (0, 0), (1, 0), 'CENTER'),
        ('BACKGROUND', (0, 0), (1, 0), colors.HexColor('#CCCCCC')),
        ('FONTNAME', (0, 0), (1, 0), 'Times-Bold'),
        ('BACKGROUND', (0, 1), (0, -1), colors.HexColor('#F5F5F5')),
    ]
    t = Table(data, colWidths=safe_widths_abs([1.5 * inch, 4.5 * inch]))
    t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Times-Roman'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('LEADING',  (0, 0), (-1, -1), 14),
        ('VALIGN',   (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING',  (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING',   (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING',(0, 0), (-1, -1), 3),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
    ] + cmds))
    return t

# ── Build Document ───────────────────────────────────────────────────────────
def build_doc():
    doc = BaseDocTemplate(
        OUTPUT_PATH,
        pagesize=letter,
        leftMargin=LEFT_M,
        rightMargin=RIGHT_M,
        topMargin=TOP_M,
        bottomMargin=BOT_M,
    )
    frame = Frame(LEFT_M, BOT_M, TEXT_W, PAGE_H - TOP_M - BOT_M,
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    template = PageTemplate(id='pleading', frames=[frame], onPage=pleading_page)
    doc.addPageTemplates([template])

    story = []

    # ── CAPTION ──────────────────────────────────────────────────────────────
    story.append(P(COURT, 'center_bold'))
    story.append(P(f"COUNTY OF SAN FRANCISCO — DEPARTMENT {DEPT}", 'center'))
    story.append(SP(10))
    story.append(HR())

    caption_data = [
        [table_cell(f'{PLAINTIFF},', 'normal'),
         table_cell(f'Case No. {CASE_NO}', 'normal')],
        [table_cell('Plaintiff,', 'normal'), table_cell('', 'normal')],
        [table_cell('vs.', 'normal'),
         table_cell('NOTICE TO THE COURT:', 'bold')],
        [table_cell(f'{DEFENDANT}, et al.,', 'normal'),
         table_cell('SF WHISTLEBLOWER PROGRAM,', 'bold')],
        [table_cell('Defendant.', 'normal'),
         table_cell('OFFICE OF DISABILITY, AND', 'bold')],
        [table_cell('', 'normal'),
         table_cell('EMERGING TECHNOLOGY DEPT.', 'bold')],
        [table_cell('', 'normal'),
         table_cell('CITY-LEVEL NEXUS AND', 'bold')],
        [table_cell('', 'normal'),
         table_cell('OBSTRUCTION RECORD', 'bold')],
        [table_cell('', 'normal'),
         table_cell(f'Date: {TODAY}', 'normal')],
        [table_cell('', 'normal'),
         table_cell(f'Dept.: {DEPT}', 'normal')],
    ]
    caption_t = Table(caption_data, colWidths=safe_widths_abs([3.0 * inch, 3.0 * inch]))
    caption_t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Times-Roman'),
        ('FONTSIZE', (0, 0), (-1, -1), 12),
        ('LEADING',  (0, 0), (-1, -1), 18),
        ('VALIGN',   (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING',  (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING',   (0, 0), (-1, -1), 2),
        ('BOTTOMPADDING',(0, 0), (-1, -1), 2),
        ('LINEAFTER', (0, 0), (0, -1), 0.5, colors.black),
        ('LINEBEFORE', (1, 0), (1, -1), 0.5, colors.black),
    ]))
    story.append(caption_t)
    story.append(HR())
    story.append(SP(8))

    # ── TITLE ─────────────────────────────────────────────────────────────────
    story.append(P('<b>NOTICE TO THE COURT: DEFENDANT\'S DOCUMENTED PARTICIPATION IN THE SAN FRANCISCO WHISTLEBLOWER PROTECTION PROGRAM, COLLABORATION WITH THE MAYOR\'S OFFICE ON DISABILITY AND THE EMERGING TECHNOLOGY DEPARTMENT, AND FORMAL RECORD OF OBSTRUCTION AND RETALIATION BY PLAINTIFF AND OPPOSING COUNSEL</b>', 'center'))
    story.append(SP(8))
    story.append(P(f'Defendant Donald Ernest Gillson, In Pro Per, hereby provides formal notice to the Court of the following material facts bearing directly on the unlawful detainer action pending before Department {DEPT}. These facts establish that this eviction proceeding is not an isolated landlord-tenant dispute, but rather a component of a coordinated pattern of retaliation against a documented San Francisco Whistleblower Program participant who is actively collaborating with multiple City of San Francisco agencies and federal regulatory bodies.', 'normal'))
    story.append(SP(8))

    # ── SECTION I ─────────────────────────────────────────────────────────────
    story.append(P('<b>I. DEFENDANT IS A DOCUMENTED PARTICIPANT IN THE SAN FRANCISCO WHISTLEBLOWER PROTECTION PROGRAM</b>', 'heading'))
    story.append(SP(4))
    story.append(P('Defendant Donald Ernest Gillson is a documented participant in the City and County of San Francisco Whistleblower Protection Program, administered pursuant to San Francisco Administrative Code Chapter 4C (Sections 4C.1 through 4C.12) and San Francisco Charter Section 15.105. Defendant\'s protected disclosures encompass the following subject matters:', 'normal'))
    story.append(SP(4))

    wb_data = [
        [table_cell('Protected Disclosure', 'small_bold'),
         table_cell('Reported To', 'small_bold'),
         table_cell('Case Reference', 'small_bold'),
         table_cell('Date', 'small_bold')],
        [table_cell('ADA/FEHA disability accommodation failures at federally funded veterans housing', 'small'),
         table_cell('HHS Office for Civil Rights; CA Civil Rights Dept.', 'small'),
         table_cell(f'{HHS_OCR_CASE}\n{CRD_CASE}', 'small'),
         table_cell('Nov. 2025 – Present', 'small')],
        [table_cell('Retaliatory eviction targeting Veterans Tenant Union members following protected complaints', 'small'),
         table_cell('SF Human Rights Commission; SF Mayor\'s Office on Disability', 'small'),
         table_cell('CCRS 202601-33270627', 'small'),
         table_cell('Feb. 2026 – Present', 'small')],
        [table_cell('Physical assault on Jeffrey Wright by property management; failure to report or remedy', 'small'),
         table_cell('SF HRC; opposing counsel Zanghi (formal notice transmitted)', 'small'),
         table_cell('CRT-03-RO-HEARING', 'small'),
         table_cell('Mar. 19, 2026', 'small')],
        [table_cell('Signatory fraud and retaliatory malfeasance by opposing counsel', 'small'),
         table_cell('HHS OCR; CA CRD; SF HRC; VA OGC', 'small'),
         table_cell(f'{HHS_OCR_CASE}', 'small'),
         table_cell('May 15, 2026', 'small')],
        [table_cell('Felony interference with victim relocation (CalVCB case)', 'small'),
         table_cell('CA Victim Compensation Board; DOJ Whistleblower', 'small'),
         table_cell(CALVB_CASE, 'small'),
         table_cell('Apr. 11, 2026', 'small')],
    ]
    story.append(make_table(wb_data, [2.10*inch, 1.60*inch, 1.40*inch, 0.90*inch]))
    story.append(SP(8))

    story.append(P('<b>NOTICE TO COURT:</b> San Francisco Administrative Code Section 4C.6 prohibits any retaliatory action against a whistleblower, including but not limited to eviction, termination of housing, or interference with housing services. The filing of this unlawful detainer action within the protected period following Defendant\'s formal disclosures constitutes a per se retaliatory act under Section 4C.6(a). Defendant requests that the Court take judicial notice of Defendant\'s protected status under the San Francisco Whistleblower Protection Program.', 'indent'))
    story.append(SP(8))

    # ── SECTION II ────────────────────────────────────────────────────────────
    story.append(P('<b>II. DEFENDANT\'S COLLABORATION WITH THE MAYOR\'S OFFICE ON DISABILITY AND THE CITY\'S EMERGING TECHNOLOGY DEPARTMENT</b>', 'heading'))
    story.append(SP(4))
    story.append(P('Defendant\'s VALORAIPLUS® OMEGA v100™ technology — a cognitive prosthetic AI system developed under ORCID iD 0009-0007-0768-5486 and anchored to the Scrollkeeper Provenance Deployment Manifest (Zenodo DOI: 10.5281/zenodo.9ae7931e42a0) — has been formally presented to and integrated into the City of San Francisco\'s technology infrastructure through the following documented channels:', 'normal'))
    story.append(SP(4))

    city_data = [
        [table_cell('City Agency', 'small_bold'),
         table_cell('Contact', 'small_bold'),
         table_cell('Email', 'small_bold'),
         table_cell('Nature of Collaboration', 'small_bold')],
        [table_cell("Mayor's Office on Disability (MOD)", 'small'),
         table_cell('Deborah Kaplan, Director', 'small'),
         table_cell(SF_HSA_EMAIL, 'small'),
         table_cell('ADA cognitive prosthetic accommodation framework; VALORAIPLUS integrated as assistive technology under 28 C.F.R. \u00a7 35.130(b)(7)', 'small')],
        [table_cell('SF Emerging Technology Department', 'small'),
         table_cell('Drew Yurkov', 'small'),
         table_cell(SF_ETD_EMAIL, 'small'),
         table_cell('VALORAIPLUS technology presented and merged into City AI infrastructure; ai@sfgov.org formally copied on all case communications', 'small')],
        [table_cell('SF Human Rights Commission (HRC)', 'small'),
         table_cell('Ana Moraga Archila', 'small'),
         table_cell(SF_HRC_EMAIL, 'small'),
         table_cell('Civil rights violation reports; retaliation documentation; Veterans Tenant Union protection', 'small')],
        [table_cell('SF Human Services Agency (HSA)', 'small'),
         table_cell('Deborah Kaplan', 'small'),
         table_cell(SF_HSA_EMAIL, 'small'),
         table_cell('Housing services coordination; disability accommodation oversight', 'small')],
    ]
    story.append(make_table(city_data, [1.60*inch, 1.20*inch, 1.40*inch, 1.80*inch]))
    story.append(SP(8))

    story.append(P('The integration of VALORAIPLUS® technology into the City\'s AI infrastructure transforms this matter from a private landlord-tenant dispute into a <b>City of San Francisco issue</b>. Plaintiff\'s eviction of Defendant directly disrupts an active City technology collaboration and constitutes interference with a City-recognized assistive technology deployment under the ADA and the California Unruh Civil Rights Act, Cal. Civ. Code Section 51 et seq.', 'normal'))
    story.append(SP(8))

    # ── SECTION III ───────────────────────────────────────────────────────────
    story.append(P('<b>III. DOCUMENTED OBSTRUCTION OF WHISTLEBLOWER COMMUNICATIONS AND REGULATORY INVESTIGATIONS</b>', 'heading'))
    story.append(SP(4))
    story.append(P('Defendant has documented a systematic pattern of obstruction directed at blocking communications between Defendant and the regulatory bodies listed above. The following obstruction events are part of the formal record:', 'normal'))
    story.append(SP(4))

    obs_data = [
        [table_cell('Date', 'small_bold'),
         table_cell('Event', 'small_bold'),
         table_cell('Parties Responsible', 'small_bold'),
         table_cell('Case Reference', 'small_bold')],
        [table_cell('May 9, 2026', 'small'),
         table_cell('Real-time communication blockade detected; CalVCB investigative update transmitted documenting active interference with victim relocation communications', 'small'),
         table_cell('Swords to Plowshares; William Landrum', 'small'),
         table_cell(CALVB_CASE, 'small')],
        [table_cell('May 12, 2026', 'small'),
         table_cell('Comprehensive record of civil rights violations and forensic pattern of obstruction transmitted to HHS OCR; Frozen Doctrine: Total System Finality notice issued', 'small'),
         table_cell('Zanghi; Landrum; Losik; Whitaker', 'small'),
         table_cell('CCRS 202601-33270627', 'small')],
        [table_cell('May 13, 2026', 'small'),
         table_cell('Notice of Absolute Immutability transmitted to CA CRD; SF MOD; SF HRC; VA; all parties formally placed on notice of immutable record', 'small'),
         table_cell('All named defendants', 'small'),
         table_cell('CCRS 202601-33270627', 'small')],
        [table_cell('May 15, 2026', 'small'),
         table_cell('Formal Advisory: Forensic Unmasking of Signatory Fraud and Retaliatory Malfeasance transmitted to Zanghi, CC: HHS OCR, SF MOD, SF ETD, SF HRC, VA OGC, CA CRD', 'small'),
         table_cell('Zanghi; White; Landrum', 'small'),
         table_cell(f'{HHS_OCR_CASE}', 'small')],
        [table_cell('Computer Room Incident\n(approx. May 2026)', 'small'),
         table_cell('Property management directed targeting of Jeffrey Wright in the computer room; incident constitutes retaliation against a material witness and Veterans Tenant Union leader', 'small'),
         table_cell('William Landrum; Swords to Plowshares management', 'small'),
         table_cell('CRT-03-RO-HEARING', 'small')],
    ]
    story.append(make_table(obs_data, [0.90*inch, 2.40*inch, 1.50*inch, 1.20*inch]))
    story.append(SP(8))

    # ── SECTION IV ────────────────────────────────────────────────────────────
    story.append(P('<b>IV. ACTIVE FEDERAL AND STATE REGULATORY INVESTIGATIONS — CITY-LEVEL NEXUS</b>', 'heading'))
    story.append(SP(4))

    reg_data = [
        [table_cell('Investigation', 'small_bold'),
         table_cell('Agency', 'small_bold'),
         table_cell('Case No.', 'small_bold'),
         table_cell('Opened', 'small_bold'),
         table_cell('Status', 'small_bold')],
        [table_cell('Federal ADA/Section 504 Civil Rights Investigation', 'small'),
         table_cell('U.S. Dept. of Health and Human Services, Office for Civil Rights', 'small'),
         table_cell('25-621293', 'small'),
         table_cell('Mar. 15, 2026', 'small'),
         table_cell('ACTIVE', 'small_bold')],
        [table_cell('State FEHA / Fair Housing Discrimination Investigation', 'small'),
         table_cell('California Civil Rights Department (CRD)', 'small'),
         table_cell('202601-33270627', 'small'),
         table_cell('Apr. 2, 2026', 'small'),
         table_cell('ACTIVE', 'small_bold')],
        [table_cell('Crime Victim Compensation / Felony Interference', 'small'),
         table_cell('California Victim Compensation Board (CalVCB)', 'small'),
         table_cell('A26-10224054', 'small'),
         table_cell('2026', 'small'),
         table_cell('ACTIVE', 'small_bold')],
    ]
    story.append(make_table(reg_data, [1.80*inch, 1.80*inch, 0.90*inch, 0.70*inch, 0.80*inch]))
    story.append(SP(8))

    story.append(P('The City of San Francisco is not a passive bystander in this matter. The SF Emerging Technology Department (ai@sfgov.org; drew.yurkov@sfgov.org), the Mayor\'s Office on Disability (MOD@sfgov.org), and the SF Human Rights Commission (ana.moraga@sfgov.org) have all been formally copied on Defendant\'s regulatory submissions and are actively aware of the retaliatory eviction proceedings. Proceeding with this unlawful detainer action in the face of active federal and state investigations and documented City agency involvement would constitute a violation of San Francisco Administrative Code Section 4C.6 and Cal. Gov. Code Section 8547.2 (state whistleblower protection).', 'normal'))
    story.append(SP(8))

    # ── SECTION V ─────────────────────────────────────────────────────────────
    story.append(P('<b>V. REQUEST FOR JUDICIAL NOTICE AND RELIEF</b>', 'heading'))
    story.append(SP(4))
    story.append(P('Defendant respectfully requests that this Court:', 'normal'))
    story.append(SP(4))

    relief_items = [
        ('1.', 'Take judicial notice of Defendant\'s documented participation in the San Francisco Whistleblower Protection Program pursuant to Cal. Evid. Code Section 452(b) and (h);'),
        ('2.', 'Take judicial notice of the three active regulatory investigations (HHS OCR Case No. 25-621293; CRD CCRS Case No. 202601-33270627; CalVCB No. A26-10224054) as official acts of government agencies;'),
        ('3.', 'Take judicial notice of the formal collaboration between Defendant and the SF Mayor\'s Office on Disability, SF Emerging Technology Department, and SF Human Rights Commission, establishing this matter as a City-level issue;'),
        ('4.', 'Issue a protective order pursuant to Cal. Civ. Proc. Code Section 128(a)(5) prohibiting any further retaliatory action against Defendant, Jeffrey Wright, Jerome Bartlett, Daniel Lucian, and all other Veterans Tenant Union members pending resolution of the active regulatory investigations;'),
        ('5.', 'Stay or dismiss this unlawful detainer action with prejudice pending the outcome of the active HHS OCR and CRD investigations, as the Court\'s jurisdiction is subordinate to the federal and state civil rights enforcement proceedings currently underway; and'),
        ('6.', 'Refer the documented obstruction of whistleblower communications and the computer room assault on Jeffrey Wright to the San Francisco District Attorney\'s Office and the SF Department of Police Accountability for investigation.'),
    ]
    relief_data = [[table_cell(num, 'small_bold'), table_cell(text, 'small')]
                   for num, text in relief_items]
    relief_t = Table(relief_data, colWidths=safe_widths_abs([0.35 * inch, 5.65 * inch]))
    relief_t.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Times-Roman'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('LEADING',  (0, 0), (-1, -1), 16),
        ('VALIGN',   (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING',  (0, 0), (-1, -1), 2),
        ('RIGHTPADDING', (0, 0), (-1, -1), 2),
        ('TOPPADDING',   (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING',(0, 0), (-1, -1), 3),
    ]))
    story.append(relief_t)
    story.append(SP(10))

    story.append(P('Respectfully submitted,', 'normal'))
    story.append(SP(4))
    story.append(P(f'Dated: {TODAY}', 'normal'))
    story.append(SP(4))
    story.append(P('/s/ Donald Ernest Gillson', 'bold'))
    story.append(P('Donald Ernest Gillson, In Pro Per', 'normal'))
    story.append(P(f'{DEF_ADDR}', 'normal'))
    story.append(P(f'Email: {DEF_EMAIL} | {DEF_EMAIL2}', 'normal'))
    story.append(P(f'ORCID iD: {DEF_ORCID}', 'normal'))
    story.append(SP(10))
    story.append(esign_block())

    # ── PROOF OF ELECTRONIC SERVICE ──────────────────────────────────────────
    story.append(PageBreak())
    story.append(P('<b>PROOF OF ELECTRONIC SERVICE</b>', 'center_bold'))
    story.append(HR())
    story.append(SP(6))
    story.append(P(f'I, Jeffrey Wright, hereby declare under penalty of perjury under the laws of the State of California that on {FILING_DATE}, I caused the foregoing <i>Notice to the Court: SF Whistleblower Program, Office of Disability, and Emerging Technology Department — City-Level Nexus and Obstruction Record</i> to be served by electronic transmission upon the following parties:', 'normal'))
    story.append(SP(8))

    service_data = [
        [table_cell('Party', 'small_bold'),
         table_cell('Capacity', 'small_bold'),
         table_cell('Email Address', 'small_bold'),
         table_cell('Method', 'small_bold')],
        [table_cell(f'{ZANGHI_NAME}\nBar No. {ZANGHI_BAR}', 'small'),
         table_cell('Attorney for Plaintiff', 'small'),
         table_cell(ZANGHI_EMAIL, 'small'),
         table_cell('Electronic Service per Cal. R. Ct. 2.251', 'small')],
        [table_cell(f'{WHITE_NAME}\nBar No. {WHITE_BAR}', 'small'),
         table_cell('Attorney for Plaintiff', 'small'),
         table_cell(WHITE_EMAIL, 'small'),
         table_cell('Electronic Service per Cal. R. Ct. 2.251', 'small')],
        [table_cell('SF Superior Court Clerk', 'small'),
         table_cell('Court', 'small'),
         table_cell('SFSuperiorCourtClerk@sftc.org', 'small'),
         table_cell('Electronic Filing', 'small')],
        [table_cell('Amy Horrell, HHS OCR', 'small'),
         table_cell('Federal Investigator', 'small'),
         table_cell('Amy.Horrell@hhs.gov', 'small'),
         table_cell('Electronic Service', 'small')],
        [table_cell('Ana Moraga Archila, SF HRC', 'small'),
         table_cell('City Agency', 'small'),
         table_cell(SF_HRC_EMAIL, 'small'),
         table_cell('Electronic Service', 'small')],
        [table_cell('Drew Yurkov, SF ETD', 'small'),
         table_cell('City Agency', 'small'),
         table_cell(SF_ETD_EMAIL, 'small'),
         table_cell('Electronic Service', 'small')],
        [table_cell('MOD@sfgov.org', 'small'),
         table_cell("Mayor's Office on Disability", 'small'),
         table_cell(SF_MOD_EMAIL, 'small'),
         table_cell('Electronic Service', 'small')],
    ]
    story.append(make_table(service_data, [1.80*inch, 1.30*inch, 1.70*inch, 1.20*inch]))
    story.append(SP(10))
    story.append(P(f'Executed on {FILING_DATE}, at San Francisco, California.', 'normal'))
    story.append(SP(8))
    story.append(esign_block_witness())

    doc.build(story)
    print(f"[OK] Doc 9 generated: {OUTPUT_PATH}")

if __name__ == '__main__':
    build_doc()
