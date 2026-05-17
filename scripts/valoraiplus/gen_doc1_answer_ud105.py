#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 1:
UD-105 ANSWER — UNLAWFUL DETAINER

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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc1_Answer_UD105.pdf")
DOC_TITLE = "DEFENDANT'S ANSWER TO COMPLAINT — UNLAWFUL DETAINER (UD-105)"

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"{DOC_TITLE}\n\n"
        f"[Cal. Code Civ. Proc. §§ 1161, 1170.5; AB 2347]\n\n"
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    p(story,
      f"Defendant DONALD ERNEST GILLSON, appearing In Pro Per, hereby submits "
      f"this Answer to the Complaint for Unlawful Detainer filed by Plaintiff "
      f"{PLAINTIFF} in the above-captioned action.",
      S)
    sp(story)

    h(story, "I. DENIAL OF ALLEGATIONS", S)
    p(story,
      "Defendant generally and specifically denies each and every allegation "
      "contained in Plaintiff's Complaint and demands strict proof thereof.",
      S)
    sp(story)

    h(story, "II. AFFIRMATIVE DEFENSES", S)
    numbered_list(story, [
        "<b>Void Verification — Jerome Bradford Signatory Fraud (CCP § 446; "
        "Penal Code § 115):</b> The Complaint was verified by Jerome Bradford, "
        "Interim Property Manager, who falsely represented himself as having "
        "personal knowledge of the matters alleged. Mr. Bradford holds no "
        "doctoral credential and has no documented authority to verify "
        "pleadings on behalf of the corporate plaintiff. The verification is "
        "void on its face.",

        "<b>Retaliatory Eviction — 178-Day Interactive Process Default "
        "(Cal. Civ. Code § 1942.5):</b> Plaintiff failed to respond to "
        "Defendant's formal Reasonable Accommodation Request submitted "
        "November 20, 2025 for 178 days. This action was filed within the "
        "180-day protected window, creating a statutory presumption of "
        "retaliation under Cal. Civ. Code § 1942.5.",

        "<b>SMTP 550 Obstruction — Systemic Email Blockade "
        "(18 U.S.C. § 1512(c)):</b> Plaintiff's agents deployed a Mimecast "
        "email gateway resulting in 1,247+ SMTP 550 rejection events "
        "blocking Defendant's communications, including communications "
        "to the Court Clerk. Token: [N7uA_6IQOCiwQL2ibFQZog.us448].",

        "<b>Retaliatory Eviction — Service Animal JAXX (PAWS Act; "
        "FHA § 3604; ADA Title II):</b> Plaintiff's agents endangered "
        "Defendant's federally protected service animal JAXX on six "
        "documented occasions, constituting a pattern of discriminatory "
        "housing practices.",

        "<b>Federal Conflict of Interest (38 C.F.R. § 14.632; "
        "HUD 24 C.F.R. § 5.105):</b> Plaintiff operates federally funded "
        "permanent supportive housing. Active federal investigations are "
        "pending: HHS-OCR Case No. 25-621293 (Amy Horrell) and CCRD "
        "Case No. 202601-33270627 (Anna Moraga Archila).",

        "<b>Travis AFB Incident — Discharge of Retaliatory Instrument:</b> "
        "Plaintiff's attempt to weaponize Defendant's military service "
        "record backfired. Defendant's Travis AFB clearance is active "
        "and documented.",

        "<b>Breach of Warranty of Habitability — Biohazard "
        "(Cal. Civ. Code § 1941):</b> The subject premises contained "
        "documented mold, pest infestation, and biohazard conditions "
        "constituting a breach of the implied warranty of habitability.",

        "<b>HIPAA Double Standard — William Losik:</b> Plaintiff's agent "
        "William Losik unlawfully disclosed Defendant's protected health "
        "information while simultaneously demanding HIPAA compliance from "
        "Defendant.",

        "<b>Judicial Estoppel — 1,062-Email Trap (Zanghi Admission):</b> "
        "Plaintiff's counsel John Zanghi acknowledged receipt of 1,062 "
        "documented emails, creating a binding judicial admission "
        "inconsistent with Plaintiff's claim of no communication.",

        "<b>Obstruction of Court Access (18 U.S.C. § 1512(c); "
        "CA Penal Code § 182.5):</b> Plaintiff's blockade extended to "
        "the Court Clerk email (sfscclerk@sfgov.org), constituting "
        "obstruction of Defendant's access to the judicial system.",
    ], S)
    sp(story)

    h(story, "III. PRAYER FOR RELIEF", S)
    numbered_list(story, [
        "That judgment be entered in favor of Defendant;",
        "That Plaintiff's Complaint be dismissed with prejudice;",
        "That Defendant be awarded attorney fees and costs under "
        "Cal. Code Civ. Proc. § 1021.5;",
        "That the Court issue a protective order against further "
        "retaliatory housing actions;",
        "Such other and further relief as the Court deems just and proper.",
    ], S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 1 generated: {OUTPUT}")

build()
