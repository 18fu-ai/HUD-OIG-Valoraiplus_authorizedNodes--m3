#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 7: NOTICE OF ATTORNEY MISCONDUCT AND STATE BAR COMPLAINT
Dual submission:
  (1) Notice to Presiding Judge — San Francisco Superior Court, Dept. 12
  (2) Formal Complaint — State Bar of California
Covers: John Nicholas Zanghi (Bar No. 320531) and Bradford Christopher White (Bar No. 297746)
NODE AUTHORITY: SGAU-7226.3461 // Saint Paul Node

FIX LOG (v2):
  - All table cells converted to Paragraph objects for proper word wrap
  - Attorney table reduced to 3 columns (merged Role + Firm)
  - E-SIGN table value column uses Paragraph with font size 10 for long rows
  - Service table uses Paragraph objects in all cells, font size 9
  - Witness E-SIGN table uses Paragraph objects for long Role and Signature rows
  - colWidths recalculated to fit within TEXT_W = 6.0 inches exactly
"""

import os
import sys

# Add the scripts/valoraiplus directory to path for local imports
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, SCRIPT_DIR)
OUTPUT_DIR = os.environ.get("VALORAIPLUS_OUTPUT_DIR", SCRIPT_DIR)

from pleading_base import (
    make_doc, make_styles, sp, hr, p, h, numbered_list,
    TEXT_W, CASE_UD, DEPT, FILING_DATE,
    DEFENDANT, DEF_ADDR1, DEF_ADDR2, DEF_EMAIL,
    NODE_AUTH, FRAMEWORK_ESIGN, JEFFREY_ESIGN, JEFFREY_ROLE, ORCID_ID,
    safe_widths, safe_widths_abs,
)
from reportlab.platypus import (
    Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
)
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER

OUTPUT       = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc7_AttorneyMisconduct_StateBar.pdf")
CIVIL_CASE   = "[New Civil Case — To Be Assigned by Clerk]"
ZANGHI       = "John Nicholas Zanghi, Esq."
ZANGHI_BAR   = "State Bar No. 320531"
WHITE        = "Bradford Christopher White, Esq."
WHITE_BAR    = "State Bar No. 297746"
FIRM         = "Counsel for Swords to Plowshares"
STATE_BAR    = "State Bar of California, Office of Chief Trial Counsel"
STATE_BAR_ADDR = "845 South Figueroa Street, Los Angeles, California 90017"


def cell(text, font="Times-Roman", size=10, bold=False):
    """Return a Paragraph suitable for use inside a Table cell."""
    fname = "Times-Bold" if bold else font
    style = ParagraphStyle(
        "cell",
        fontName=fname,
        fontSize=size,
        leading=size + 4,
        alignment=TA_LEFT,
        wordWrap="CJK",
    )
    return Paragraph(text, style)


def cell_c(text, font="Times-Bold", size=10):
    """Return a centered bold Paragraph for table header cells."""
    style = ParagraphStyle(
        "cell_c",
        fontName=font,
        fontSize=size,
        leading=size + 4,
        alignment=TA_CENTER,
        wordWrap="CJK",
    )
    return Paragraph(text, style)


def tbl_style_dark_header():
    return TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), colors.HexColor("#1a1a1a")),
        ("TEXTCOLOR",     (0, 0), (-1, 0), colors.white),
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1),
         [colors.HexColor("#f5f5f5"), colors.white]),
        ("BOX",           (0, 0), (-1, -1), 0.75, colors.black),
        ("INNERGRID",     (0, 0), (-1, -1), 0.25, colors.HexColor("#cccccc")),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
        ("TOPPADDING",    (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ])


def esign_table_fixed(story, rows_data):
    """
    Render E-SIGN table with Paragraph objects in every cell.
    Label col: 1.5", Value col: 4.5" — total 6.0" = TEXT_W exactly.
    """
    rows = []
    for label, value in rows_data:
        rows.append([
            cell(label, font="Times-Bold", size=10),
            cell(value, font="Times-Roman", size=10),
        ])

    tbl = Table(rows, colWidths=safe_widths([0.25, 0.75]))
    tbl.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
        ("TOPPADDING",    (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("ROWBACKGROUNDS",(0, 0), (-1, -1),
         [colors.HexColor("#f2f2f2"), colors.white]),
        ("BOX",           (0, 0), (-1, -1), 0.75, colors.black),
        ("INNERGRID",     (0, 0), (-1, -1), 0.25, colors.HexColor("#cccccc")),
    ]))
    story.append(tbl)


def build():
    S = make_styles(12)
    doc = make_doc(OUTPUT)
    story = []

    # ── DUAL CAPTION ─────────────────────────────────────────────────────────
    p(story, "SUPERIOR COURT OF THE STATE OF CALIFORNIA", S, "caption")
    p(story, "FOR THE COUNTY OF SAN FRANCISCO", S, "caption")
    sp(story, 0.3)

    caption_data = [[
        Paragraph(
            "<b>SWORDS TO PLOWSHARES</b>, a California 501(c)(3) "
            "Corporation,<br/><i>Plaintiff,</i><br/><br/>vs.<br/><br/>"
            "<b>DONALD ERNEST GILLSON</b>,<br/><i>Defendant.</i>",
            make_styles(11)["body"]
        ),
        Paragraph(
            f"<b>CASE NO. (UD):</b> {CASE_UD}<br/>"
            f"<b>DEPARTMENT:</b> {DEPT}<br/><br/>"
            "<b>DOCUMENT TYPE:</b><br/>"
            "NOTICE OF ATTORNEY MISCONDUCT TO THE COURT AND "
            "FORMAL COMPLAINT TO THE STATE BAR OF CALIFORNIA<br/><br/>"
            "<b>FILED BY:</b> Donald Ernest Gillson, "
            "Defendant, In Pro Per<br/><br/>"
            f"<b>DATE:</b> {FILING_DATE}",
            make_styles(11)["body"]
        ),
    ]]
    caption_tbl = Table(caption_data, colWidths=safe_widths([0.50, 0.50]))
    caption_tbl.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LINEAFTER",     (0, 0), (0, -1),  0.75, colors.black),
        ("LEFTPADDING",   (0, 0), (-1, -1), 4),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 4),
        ("TOPPADDING",    (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(caption_tbl)
    sp(story)
    hr(story)

    # ── TITLE ─────────────────────────────────────────────────────────────────
    p(story,
      "<b>NOTICE OF ATTORNEY MISCONDUCT TO THE PRESIDING JUDGE AND "
      "FORMAL COMPLAINT TO THE STATE BAR OF CALIFORNIA</b>",
      S, "bold_c")
    p(story,
      "<i>Submitted by Donald Ernest Gillson, Defendant, In Pro Per — "
      "Filed as a Court Record and Transmitted Concurrently to the "
      "State Bar of California, Office of Chief Trial Counsel</i>",
      S, "center")
    sp(story)
    hr(story)

    # ── ATTORNEYS IDENTIFIED ─────────────────────────────────────────────────
    h(story, "I. ATTORNEYS SUBJECT TO THIS COMPLAINT", S)
    sp(story, 0.2)

    # 3-column table: Attorney Name | Bar No. | Role and Firm
    # Widths: 2.30" | 1.20" | 2.50" = 6.00" exactly
    atty_rows = [
        [
            cell_c("Attorney"),
            cell_c("State Bar No."),
            cell_c("Role / Firm"),
        ],
        [
            cell(ZANGHI),
            cell(ZANGHI_BAR),
            cell(f"Lead Litigation Counsel\n{FIRM}"),
        ],
        [
            cell(WHITE),
            cell(WHITE_BAR),
            cell(f"Associated Counsel\n{FIRM}"),
        ],
    ]
    tbl = Table(atty_rows, colWidths=safe_widths_abs([2.30 * inch, 1.20 * inch, 2.50 * inch]))
    tbl.setStyle(tbl_style_dark_header())
    story.append(tbl)
    sp(story)

    # ── INTRODUCTION ─────────────────────────────────────────────────────────
    h(story, "II. INTRODUCTION AND PROCEDURAL CONTEXT", S)
    p(story,
      "Defendant Donald Ernest Gillson, appearing In Pro Per, hereby "
      "submits this formal notice to the presiding judge of Department 12 "
      "and concurrent formal complaint to the State Bar of California "
      "regarding the professional misconduct of Lead Litigation Counsel "
      f"{ZANGHI} ({ZANGHI_BAR}) and Associated Counsel {WHITE} "
      f"({WHITE_BAR}), both appearing on behalf of Plaintiff Swords to "
      "Plowshares in the above-captioned Unlawful Detainer action.", S)
    sp(story, 0.3)
    p(story,
      "The conduct described herein constitutes violations of the "
      "California Rules of Professional Conduct (CRPC) and the State "
      "Bar Act, including but not limited to: Rule 3.1 (Meritorious "
      "Claims and Contentions), Rule 3.3 (Candor Toward the Tribunal), "
      "Rule 3.4 (Fairness to Opposing Party and Counsel), Rule 4.4 "
      "(Respect for Rights of Third Persons), Rule 8.4(c) (Misconduct — "
      "Moral Turpitude, Dishonesty, Fraud, Deceit), and Rule 8.4(d) "
      "(Conduct Prejudicial to the Administration of Justice).", S)
    sp(story)

    # ── GROUNDS FOR COMPLAINT ────────────────────────────────────────────────
    h(story, "III. SPECIFIC GROUNDS FOR MISCONDUCT COMPLAINT", S)
    sp(story, 0.3)

    grounds = [
        (
            "Ground 1 — Filing a Procedurally Defective Notice to Quit "
            "in Violation of CRPC Rule 3.1 (Meritorious Claims)",
            "Plaintiff's counsel filed and prosecuted an Unlawful Detainer "
            "action premised on a Notice to Quit that contains conflicting, "
            "mismatched, and back-dated clerical signatures. The notice "
            "contains structural service defects that render it void on its "
            "face under Cal. Code of Civil Procedure Section 1161. Counsel "
            "had a professional obligation to investigate the validity of "
            "the notice before filing. Proceeding with a facially defective "
            "notice constitutes the filing of a meritless claim in violation "
            "of CRPC Rule 3.1."
        ),
        (
            "Ground 2 — Prosecuting a Retaliatory Eviction in Violation "
            "of CRPC Rule 3.4 and Cal. Civ. Code Section 1942.5",
            "Counsel filed and prosecuted this Unlawful Detainer action "
            "within the 180-day protected window following Defendant's "
            "formal Reasonable Accommodation Request (November 20, 2025, "
            "Evidence Node GMAIL-02-RAR) and formal habitability complaints. "
            "Cal. Civ. Code Section 1942.5 creates a rebuttable presumption "
            "of retaliation when an eviction is filed within 180 days of "
            "protected activity. Counsel's prosecution of this action with "
            "knowledge of the protected activity constitutes conduct "
            "prejudicial to the administration of justice under CRPC "
            "Rule 8.4(d)."
        ),
        (
            "Ground 3 — Failure to Disclose Active Federal and State "
            "Investigations in Violation of CRPC Rule 3.3 (Candor "
            "Toward the Tribunal)",
            "At the time of filing and throughout the prosecution of this "
            "action, Defendant's housing situation was the subject of an "
            "active federal investigation by the U.S. Department of Health "
            "and Human Services, Office for Civil Rights (Evidence Node "
            "REG-04-HHS-INVESTIGATION, opened March 15, 2026), and an "
            "active state investigation by the California Civil Rights "
            "Department (Evidence Node REG-05-CRD-INVESTIGATION, opened "
            "April 2, 2026). Counsel's failure to disclose these active "
            "regulatory investigations to the Court constitutes a violation "
            "of the duty of candor to the tribunal under CRPC Rule 3.3."
        ),
        (
            "Ground 4 — Retaliatory Targeting of Witness Network in "
            "Violation of CRPC Rule 4.4 and 42 U.S.C. Section 1512",
            "Following Defendant's assertion of legal rights and the "
            "appearance of material witnesses, Plaintiff's counsel "
            "authorized or acquiesced in the issuance of retaliatory "
            "adverse housing notices against Defendant's witness network, "
            "including: (a) Jerome 'Jerry' Bartlett "
            "(jeromebartlett1955@gmail.com), served after his documented "
            "email protests to management; and (b) Daniel Lucian and his "
            "service animal Rosey, served in retaliation for union "
            "organizing activities. This conduct constitutes witness "
            "tampering under 42 U.S.C. Section 1512 and a violation of "
            "CRPC Rule 4.4 (Respect for Rights of Third Persons)."
        ),
        (
            "Ground 5 — Failure to Protect Resident After Notice of "
            "Physical Assault in Violation of CRPC Rule 8.4(c)",
            "Counsel received actionable written notice of a physical "
            "resident assault against Jeffrey Wright, a Veterans Tenant "
            "Union leadership member and material eyewitness. Rather than "
            "addressing the safety failure, counsel's office subsequently "
            "issued adverse housing notices to Mr. Wright's support network. "
            "This conduct — using the legal process to retaliate against a "
            "victim of violence who is also a material witness — constitutes "
            "conduct involving moral turpitude and dishonesty in violation "
            "of CRPC Rule 8.4(c)."
        ),
        (
            "Ground 6 — Open-Court Conduct Prejudicial to the "
            "Administration of Justice (CRPC Rule 8.4(d))",
            "Counsel engaged in conduct before the Court that was designed "
            "to demean, isolate, and mock a disabled veteran appearing "
            "In Pro Per, including conduct that Defendant characterizes as "
            "'open-court mocking' and 'systemic isolation.' Such conduct "
            "toward a self-represented disabled veteran litigant constitutes "
            "conduct prejudicial to the administration of justice in "
            "violation of CRPC Rule 8.4(d) and the duty of civility "
            "established by the California Attorney Guidelines of Civility "
            "and Professionalism."
        ),
        (
            "Ground 7 — Prosecution of Action on Behalf of a Client "
            "Engaged in Active Federal Housing Program Violations "
            "(CRPC Rule 1.2(d))",
            "Plaintiff Swords to Plowshares operates federally funded "
            "permanent supportive housing under HUD and McKinney-Vento "
            "program requirements. The prosecution of this eviction action "
            "against a disabled veteran in a federally funded housing "
            "program, while active federal and state civil rights "
            "investigations are pending, constitutes counsel's assistance "
            "to a client in conduct that counsel knows or reasonably should "
            "know is criminal or fraudulent, in violation of CRPC Rule "
            "1.2(d)."
        ),
    ]

    for i, (title, body) in enumerate(grounds, 1):
        row = [[
            Paragraph(f"{i}.", S["body"]),
            Paragraph(f"<b>{title}.</b> {body}", S["body"])
        ]]
        tbl = Table(row, colWidths=safe_widths_abs([0.28 * inch, 0.28 * inch]))
        tbl.setStyle(TableStyle([
            ("VALIGN",        (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING",   (0, 0), (-1, -1), 0),
            ("RIGHTPADDING",  (0, 0), (-1, -1), 0),
            ("TOPPADDING",    (0, 0), (-1, -1), 2),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ]))
        story.append(tbl)
        sp(story, 0.15)

    sp(story)
    story.append(PageBreak())

    # ── RULE VIOLATIONS SUMMARY TABLE ────────────────────────────────────────
    h(story, "IV. SUMMARY OF RULE VIOLATIONS", S)
    sp(story, 0.3)

    # 3 columns: Rule (1.20") | Title (3.60") | Ground(s) (1.20") = 6.00"
    rule_header = [
        cell_c("CRPC Rule"),
        cell_c("Rule Title"),
        cell_c("Ground(s)"),
    ]
    rule_data = [
        ["Rule 1.2(d)", "Assisting Client in Criminal or Fraudulent Conduct", "7"],
        ["Rule 3.1",    "Meritorious Claims and Contentions",                 "1"],
        ["Rule 3.3",    "Candor Toward the Tribunal",                         "3"],
        ["Rule 3.4",    "Fairness to Opposing Party and Counsel",             "2"],
        ["Rule 4.4",    "Respect for Rights of Third Persons",                "4"],
        ["Rule 8.4(c)", "Misconduct — Moral Turpitude / Dishonesty",          "5"],
        ["Rule 8.4(d)", "Conduct Prejudicial to Administration of Justice",   "2, 6"],
        ["42 U.S.C. Section 1512", "Federal Witness Tampering Statute",       "4"],
    ]

    tbl_rows = [rule_header] + [
        [cell(r), cell(t), cell(g)] for r, t, g in rule_data
    ]
    tbl = Table(tbl_rows, colWidths=safe_widths_abs([1.20 * inch, 3.60 * inch, 1.20 * inch]))
    tbl.setStyle(tbl_style_dark_header())
    story.append(tbl)
    sp(story)

    # ── RELIEF REQUESTED ─────────────────────────────────────────────────────
    h(story, "V. RELIEF REQUESTED FROM THE COURT AND THE STATE BAR", S)
    p(story,
      "Defendant respectfully requests the following relief:", S)
    sp(story, 0.3)

    relief_court = [
        "That the Court take judicial notice of the attorney misconduct "
        "described herein and consider it in evaluating the procedural "
        "posture and equities of the above-captioned action;",
        "That the Court issue an order to show cause directed to "
        f"{ZANGHI} and {WHITE} requiring them to demonstrate why "
        "sanctions should not be imposed under Cal. Code of Civil "
        "Procedure Section 128.7 for filing and prosecuting a "
        "procedurally defective and retaliatory action;",
        "That the Court refer this matter to the State Bar of California "
        "for investigation pursuant to Cal. Bus. and Prof. Code "
        "Section 6086.7(a)(2) (mandatory referral for attorney "
        "misconduct affecting administration of justice);",
        "That the Court issue a protective order pursuant to Cal. Code "
        "of Civil Procedure Section 128(a)(5) prohibiting any further "
        "retaliatory housing actions against Defendant's witness network "
        "pending resolution of this matter.",
    ]
    numbered_list(story, relief_court, S)
    sp(story, 0.3)

    p(story,
      "Defendant further requests that the State Bar of California, "
      "Office of Chief Trial Counsel, open a formal disciplinary "
      "investigation into the conduct of both above-named attorneys "
      "and take such disciplinary action as the evidence warrants, "
      "up to and including suspension or disbarment.", S)
    sp(story)
    hr(story)

    # ── DECLARATION ──────────────────────────────────────────────────────────
    h(story, "VI. DECLARATION OF DONALD ERNEST GILLSON", S)
    p(story,
      "I, Donald Ernest Gillson, declare as follows:", S)
    sp(story, 0.3)
    numbered_list(story, [
        "I am the Defendant in the above-captioned Unlawful Detainer "
        "action, Case No. CUD-26-682107, San Francisco Superior Court, "
        "Department 12. I appear In Pro Per.",
        "I have personal knowledge of all facts stated in this "
        "declaration and, if called as a witness, I could and would "
        "testify competently thereto.",
        "All factual representations in this Notice of Attorney "
        "Misconduct are true and correct to the best of my knowledge "
        "and belief.",
        "This document was prepared with the assistance of N.E.W.T.(TM) "
        "(Neuro-Enhanced Workflow Terminal), an ADA-authorized cognitive "
        "prosthetic and auxiliary communication aid, pursuant to 28 "
        "C.F.R. Section 35.130(b)(7) and Section 504 of the "
        "Rehabilitation Act of 1973.",
        "I declare under penalty of perjury under the laws of the State "
        "of California that the foregoing is true and correct.",
    ], S)
    sp(story)
    p(story, f"Executed on {FILING_DATE}, at San Francisco, California.", S)
    sp(story, 0.5)
    p(story, f"<b>{DEFENDANT}</b>", S, "right")
    p(story, "Secretary, 1030/1029 Girard Veterans Tenant Union", S, "right")
    p(story, "Defendant, In Pro Per", S, "right")
    p(story, DEF_ADDR1, S, "right")
    p(story, DEF_ADDR2, S, "right")
    p(story, f"{DEF_EMAIL} | donny@18fu.ai", S, "right")
    p(story, f"ORCID iD: {ORCID_ID}", S, "right")
    p(story, f"Node Authority: {NODE_AUTH}", S, "right")
    sp(story)
    hr(story)

    # ── E-SIGN ATTESTATION ────────────────────────────────────────────────────
    story.append(PageBreak())
    h(story, "ELECTRONIC SIGNATURE ATTESTATION", S)
    p(story,
      "Pursuant to the Electronic Signatures in Global and National "
      "Commerce Act (E-SIGN Act, 15 U.S.C. Section 7001 et seq.), the "
      "Digital Communications Act, and the California Uniform Electronic "
      "Transactions Act (UETA, Cal. Civ. Code Section 1633.1 et seq.), "
      "the undersigned hereby attests that this document constitutes a "
      "legally valid and binding court filing with the same legal force "
      "and effect as a handwritten signature.", S)
    sp(story)

    esign_table_fixed(story, [
        ("Signatory:",
         DEFENDANT),
        ("Role:",
         "Defendant, In Pro Per; Secretary, 1030/1029 Girard Veterans Tenant Union"),
        ("Digital Identity:",
         f"{DEF_EMAIL} | donny@18fu.ai | donadams1969.eth"),
        ("Node Authority:",
         NODE_AUTH),
        ("Timestamp:",
         f"{FILING_DATE} — Pacific Daylight Time"),
        ("Document ID:",
         "CUD-26-682107-DOC7-ATTORNEY-MISCONDUCT-STATEBAR"),
        ("Framework:",
         "E-SIGN Act (15 U.S.C. Section 7001 et seq.) / "
         "UETA (Cal. Civ. Code Section 1633.1 et seq.) / "
         "Digital Communications Act"),
        ("Submitted To:",
         f"(1) Presiding Judge, {DEPT}, San Francisco Superior Court, "
         f"Case No. {CASE_UD}; "
         f"(2) {STATE_BAR}, {STATE_BAR_ADDR}"),
    ])
    sp(story)
    hr(story)

    # ── PROOF OF ELECTRONIC SERVICE ───────────────────────────────────────────
    story.append(PageBreak())
    p(story, "SUPERIOR COURT OF THE STATE OF CALIFORNIA", S, "caption")
    p(story, "FOR THE COUNTY OF SAN FRANCISCO", S, "caption")
    sp(story)
    p(story, "<b>PROOF OF ELECTRONIC SERVICE</b>", S, "bold_c")
    p(story, f"Case No.: {CASE_UD}", S, "center")
    sp(story)
    hr(story)
    sp(story, 0.3)

    p(story, "I, <b>Jeffrey Wright</b>, declare as follows:", S)
    sp(story, 0.3)
    numbered_list(story, [
        "I am over the age of eighteen (18) years and am not a party to "
        "the within action. I am a leadership member of the 1030/1029 "
        "Girard Veterans Tenant Union and a material eyewitness to the "
        "retaliatory acts described in this Notice of Attorney Misconduct.",
        f"On {FILING_DATE}, I served the following document by "
        "electronic transmission pursuant to California Rules of Court, "
        "Rule 2.251, the E-SIGN Act (15 U.S.C. Section 7001 et seq.), "
        "and the Digital Communications Act:",
        "Document served: <b>NOTICE OF ATTORNEY MISCONDUCT TO THE "
        "PRESIDING JUDGE AND FORMAL COMPLAINT TO THE STATE BAR OF "
        "CALIFORNIA</b> — Document ID: "
        "CUD-26-682107-DOC7-ATTORNEY-MISCONDUCT-STATEBAR.",
        "Service was effected by electronic transmission to all parties "
        "at the email addresses on file with the Court and/or as "
        "provided by opposing counsel of record, and by separate "
        "transmission to the State Bar of California, Office of Chief "
        "Trial Counsel. The serving party's identity is established by "
        "verified role pursuant to 15 U.S.C. Section 7001(c)(1) and "
        "the Digital Communications Act.",
    ], S)
    sp(story, 0.3)

    # Service table — 3 cols: Party (2.40") | Role (1.80") | Method (1.80") = 6.00"
    svc_header = [
        cell_c("Party Served"),
        cell_c("Role"),
        cell_c("Service Method"),
    ]
    svc_data = [
        [
            cell(f"{ZANGHI}\n{ZANGHI_BAR}", size=9),
            cell("Lead Litigation Counsel for Plaintiff", size=9),
            cell("Electronic — eFiling Portal and Direct Email", size=9),
        ],
        [
            cell(f"{WHITE}\n{WHITE_BAR}", size=9),
            cell("Associated Counsel for Plaintiff", size=9),
            cell("Electronic — eFiling Portal and Direct Email", size=9),
        ],
        [
            cell("San Francisco Superior Court\nDepartment 12", size=9),
            cell("Court of Record", size=9),
            cell("Electronic — eCourt Filing System", size=9),
        ],
        [
            cell(STATE_BAR, size=9),
            cell("Disciplinary Authority", size=9),
            cell(f"Electronic — State Bar Complaint Portal\n{STATE_BAR_ADDR}", size=9),
        ],
    ]
    svc_rows = [svc_header] + svc_data
    tbl = Table(svc_rows, colWidths=safe_widths_abs([2.40 * inch, 1.80 * inch, 1.80 * inch]))
    tbl.setStyle(tbl_style_dark_header())
    story.append(tbl)
    sp(story)

    p(story,
      "I declare under penalty of perjury under the laws of the State "
      "of California that the foregoing is true and correct.", S)
    sp(story)
    p(story,
      f"Executed on {FILING_DATE}, at San Francisco, California.", S)
    sp(story, 0.6)

    # Witness E-SIGN table — label 1.50" | value 4.50" = 6.00"
    esign_table_fixed(story, [
        ("Serving Party:",  "Jeffrey Wright"),
        ("Role:",
         "Veterans Tenant Union Leadership Member and Material Eyewitness — "
         "identity authenticated by verified role pursuant to "
         "15 U.S.C. Section 7001(c)(1); no personal email required "
         "under the Digital Communications Act"),
        ("Signature:",
         "/s/ Jeffrey Wright [Electronic Signature — E-SIGN Act / "
         "Digital Communications Act Compliant]"),
        ("Timestamp:",      f"{FILING_DATE} — Pacific Daylight Time"),
        ("Node Authority:", NODE_AUTH),
    ])

    doc.build(story)
    print(f"[✓] Doc7 v2 generated: {OUTPUT}")


if __name__ == "__main__":
    build()
