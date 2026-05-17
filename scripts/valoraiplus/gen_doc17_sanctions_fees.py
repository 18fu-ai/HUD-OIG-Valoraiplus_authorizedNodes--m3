#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 17:
MOTION FOR SANCTIONS AND ATTORNEY FEES

Case No.: CUD-26-682107 | Department 12
Filed By: DONALD ERNEST GILLSON, Defendant, In Pro Per
NODE AUTHORITY: SGAU-7226.3461 // Saint Paul Node
"""
import os, sys
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, SCRIPT_DIR)
OUTPUT_DIR = os.environ.get("VALORAIPLUS_OUTPUT_DIR", SCRIPT_DIR)

from pleading_base import (
    make_doc, make_styles, sp, hr, p, h, numbered_list,
    TEXT_W, CASE_UD, DEPT, FILING_DATE,
    DEFENDANT, DEF_ADDR1, DEF_ADDR2,
    NODE_AUTH, safe_widths,
)
from doc_helpers import (
    cell, caption_block, esign_block, pos_block, closing_signature,
    PLAINTIFF, LANDRUM, ZANGHI, WHITE, PROP_ADDR,
)
from reportlab.platypus import Paragraph, Table, TableStyle, PageBreak
from reportlab.lib import colors

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc17_SanctionsFees.pdf")
DOC_TITLE = ("DEFENDANT'S MOTION FOR SANCTIONS AND ATTORNEY FEES "
             "PURSUANT TO CCP § 128.7, ADA § 12205, AND FHA § 3613(c)(2)")

def sanctions_table(story, S, rows):
    data = [[cell(a, bold=True), cell(b), cell(c)]
            for a, b, c in rows]
    tbl = Table(data, colWidths=safe_widths([0.10, 0.45, 0.45]))
    tbl.setStyle(TableStyle([
        ("VALIGN",       (0,0),(-1,-1),"TOP"),
        ("LEFTPADDING",  (0,0),(-1,-1),4),
        ("RIGHTPADDING", (0,0),(-1,-1),4),
        ("TOPPADDING",   (0,0),(-1,-1),4),
        ("BOTTOMPADDING",(0,0),(-1,-1),4),
        ("ROWBACKGROUNDS",(0,0),(-1,-1),[colors.HexColor("#fff8f0"),colors.white]),
        ("BOX",          (0,0),(-1,-1),0.75,colors.black),
        ("INNERGRID",    (0,0),(-1,-1),0.25,colors.HexColor("#cccccc")),
    ]))
    story.append(tbl)

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"{DOC_TITLE}\n\n"
        f"[CCP § 128.7; ADA § 12205; FHA § 3613(c)(2); "
        f"Cal. Code Civ. Proc. § 1021.5]\n\n"
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    p(story,
      f"Defendant DONALD ERNEST GILLSON hereby moves for sanctions and "
      f"attorney fees against Plaintiff {PLAINTIFF} and its counsel "
      f"John Nicholas Zanghi, Esq. (SB No. 320531) and Bradford "
      f"Christopher White, Esq. (SB No. 297746), pursuant to California "
      f"Code of Civil Procedure § 128.7, the Americans with Disabilities "
      f"Act § 12205, and the Fair Housing Act § 3613(c)(2).",
      S)
    sp(story)

    h(story, "I. STATUTORY BASES FOR SANCTIONS", S)
    sanctions_table(story, S, [
        ("BASIS", "STATUTE", "CONDUCT"),
        ("1.", "CCP § 128.7",
         "Filing and maintaining a procedurally defective, retaliatory action "
         "with a void verification signed by Jerome Bradford"),
        ("2.", "ADA § 12205",
         "Retaliating against Defendant's ADA accommodation requests; "
         "178-day interactive process default"),
        ("3.", "FHA § 3613(c)(2)",
         "Discriminatory housing practices; service animal endangerment; "
         "retaliatory eviction within protected window"),
        ("4.", "CCP § 1021.5",
         "Enforcement of important rights affecting the public interest — "
         "disabled veteran housing, federal program accountability"),
        ("5.", "18 U.S.C. § 1512",
         "Witness tampering against Jerome Bartlett, Daniel Lucian, "
         "and Jeffrey Wright; obstruction of court clerk email access"),
    ])
    sp(story)

    h(story, "II. SPECIFIC SANCTIONABLE CONDUCT", S)
    numbered_list(story, [
        "<b>Filing a Void Complaint:</b> Plaintiff filed this Unlawful "
        "Detainer on a verification signed by Jerome Bradford, who lacked "
        "personal knowledge and authority. Counsel had an obligation to "
        "verify the validity of the verification before filing.",

        "<b>Prosecuting a Retaliatory Action:</b> Counsel filed and "
        "continued this action with actual knowledge that it was filed "
        "within 178 days of Defendant's protected ADA accommodation "
        "request, triggering the § 1942.5 retaliatory presumption.",

        "<b>Concealing Federal Investigations:</b> Counsel failed to "
        "disclose to the Court that active HHS-OCR and CCRD investigations "
        "were pending at the time of filing, in violation of CRPC Rule 3.3.",

        "<b>Authorizing Witness Retaliation:</b> Following the appearance "
        "of material witnesses, retaliatory housing notices were issued "
        "to VTU members Jerome Bartlett, Daniel Lucian, and Jeffrey Wright.",

        "<b>Obstructing Court Access:</b> The SMTP 550 blockade was "
        "extended to the Court Clerk email address "
        "(sfscclerk@sfgov.org), constituting obstruction of Defendant's "
        "access to the judicial system.",
    ], S)
    sp(story)

    h(story, "III. AMOUNT OF SANCTIONS REQUESTED", S)
    p(story,
      "Defendant requests the following sanctions and fees:",
      S)
    sp(story, 0.3)
    fee_rows = [
        [cell("CATEGORY", bold=True), cell("BASIS", bold=True), cell("AMOUNT", bold=True)],
        [cell("CCP § 128.7 Sanctions"), cell("Void verification + retaliatory filing"),
         cell("$10,000 per defendant")],
        [cell("ADA Attorney Fees"),    cell("ADA § 12205 — prevailing party"),
         cell("Lodestar to be calculated")],
        [cell("FHA Attorney Fees"),    cell("FHA § 3613(c)(2) — prevailing party"),
         cell("Lodestar to be calculated")],
        [cell("CCP § 1021.5"),         cell("Public interest enforcement"),
         cell("Lodestar to be calculated")],
        [cell("Emotional Distress"),   cell("Retaliatory campaign against disabled vet"),
         cell("$50,000 minimum")],
    ]
    fee_tbl = Table(fee_rows, colWidths=safe_widths([0.28, 0.44, 0.28]))
    fee_tbl.setStyle(TableStyle([
        ("VALIGN",       (0,0),(-1,-1),"TOP"),
        ("FONTNAME",     (0,0),(-1,0),"Helvetica-Bold"),
        ("LEFTPADDING",  (0,0),(-1,-1),4),
        ("RIGHTPADDING", (0,0),(-1,-1),4),
        ("TOPPADDING",   (0,0),(-1,-1),4),
        ("BOTTOMPADDING",(0,0),(-1,-1),4),
        ("ROWBACKGROUNDS",(0,0),(-1,-1),[colors.HexColor("#fff8f0"),colors.white]),
        ("BOX",          (0,0),(-1,-1),0.75,colors.black),
        ("INNERGRID",    (0,0),(-1,-1),0.25,colors.HexColor("#cccccc")),
    ]))
    story.append(fee_tbl)
    sp(story)

    h(story, "IV. SAFE HARBOR NOTICE", S)
    p(story,
      "Pursuant to CCP § 128.7(c)(1), Defendant hereby provides 21 days "
      "safe harbor notice to Plaintiff and its counsel to withdraw the "
      "Complaint before this motion is filed with the Court. If the "
      "Complaint is not withdrawn within 21 days, this motion will be "
      "filed and Defendant will seek all sanctions described herein.",
      S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 17 generated: {OUTPUT}")

build()
