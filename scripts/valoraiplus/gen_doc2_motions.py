#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 2:
OMNIBUS MOTIONS IN LIMINE AND PROCEDURAL MOTIONS

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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc2_Motions.pdf")
DOC_TITLE = "DEFENDANT'S OMNIBUS MOTIONS IN LIMINE AND PROCEDURAL MOTIONS"

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"{DOC_TITLE}\n\n"
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    h(story, "MOTION NO. 1 — MOTION TO STRIKE VERIFICATION", S)
    p(story,
      "Defendant moves to strike the verification of the Complaint on the "
      "grounds that it was executed by Jerome Bradford, Interim Property "
      "Manager, who lacks personal knowledge of the matters alleged and "
      "lacked authority to execute the verification. CCP § 446 requires "
      "the verification to be made by a party with personal knowledge. "
      "Because Bradford's verification is void, the Complaint itself is "
      "procedurally defective and subject to dismissal.",
      S)
    sp(story)

    h(story, "MOTION NO. 2 — MOTION TO DISMISS FOR RETALIATORY FILING", S)
    p(story,
      "Defendant moves to dismiss this action pursuant to Cal. Civ. Code "
      "§ 1942.5 on the grounds that this action was filed within the "
      "180-day protected window following Defendant's formal Reasonable "
      "Accommodation Request (November 20, 2025). The 178-day gap between "
      "the accommodation request and the filing of this action triggers "
      "the statutory presumption of retaliatory eviction under § 1942.5.",
      S)
    sp(story)

    h(story, "MOTION NO. 3 — MOTION IN LIMINE TO EXCLUDE "
             "UNVERIFIED COMMUNICATIONS", S)
    p(story,
      "Defendant moves in limine to exclude any evidence of alleged "
      "communications or notices that were transmitted through the "
      "Mimecast email gateway system, which generated 1,247+ documented "
      "SMTP 550 rejection events. Any notices purportedly sent through "
      "this system were not received by Defendant and cannot be admitted "
      "as evidence of valid service or notice.",
      S)
    sp(story)

    h(story, "MOTION NO. 4 — MOTION FOR JUDICIAL NOTICE OF "
             "FEDERAL INVESTIGATIONS", S)
    p(story,
      "Defendant moves for judicial notice of the following active federal "
      "and state investigations pursuant to Cal. Evid. Code § 452(d): "
      "(1) HHS-OCR Case No. 25-621293 (Amy Horrell, Investigator); and "
      "(2) CCRD Case No. 202601-33270627 (Anna Moraga Archila, "
      "Investigator). These investigations are directly relevant to the "
      "equities of this proceeding.",
      S)
    sp(story)

    h(story, "MOTION NO. 5 — MOTION FOR CONTINUANCE PENDING "
             "FEDERAL RESOLUTION", S)
    p(story,
      "In the alternative, Defendant moves for a continuance of all "
      "proceedings pending resolution of the active HHS-OCR and CCRD "
      "investigations. Proceeding with this eviction while federal civil "
      "rights investigations are active would prejudice Defendant's ability "
      "to present a complete defense and risk conflicting outcomes between "
      "state and federal proceedings.",
      S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 2 generated: {OUTPUT}")

build()
