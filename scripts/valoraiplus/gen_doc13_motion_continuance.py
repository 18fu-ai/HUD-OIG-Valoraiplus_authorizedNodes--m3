#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 13:
MOTION FOR CONTINUANCE

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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc13_MotionContinuance.pdf")
DOC_TITLE = "DEFENDANT'S MOTION FOR CONTINUANCE OF TRIAL DATE"

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"{DOC_TITLE}\n\n"
        f"[Cal. Code Civ. Proc. § 595.2; Cal. Rules of Court, Rule 3.1332]\n\n"
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    p(story,
      f"Defendant DONALD ERNEST GILLSON, appearing In Pro Per, hereby moves "
      f"this Court for a continuance of the trial date currently set in the "
      f"above-captioned action, pursuant to California Code of Civil Procedure "
      f"§ 595.2 and California Rules of Court, Rule 3.1332.",
      S)
    sp(story)

    h(story, "I. GROUNDS FOR CONTINUANCE", S)

    h(story, "A. Active Federal and State Investigations", S)
    p(story,
      "Two active federal and state civil rights investigations are pending "
      "that directly implicate the subject matter of this action: "
      "HHS-OCR Case No. 25-621293 and CCRD Case No. 202601-33270627. "
      "Proceeding to trial before these investigations are resolved risks "
      "conflicting determinations and prejudices Defendant's ability to "
      "present a complete defense informed by the agencies' findings.",
      S)
    sp(story)

    h(story, "B. Disability Accommodation Requirements", S)
    p(story,
      "Defendant's Parkinsonism and associated disabilities require "
      "additional time to gather and organize the extensive evidentiary "
      "record in this case, which spans 17 documents, 10 affirmative "
      "defenses, and multiple federal and state regulatory frameworks. "
      "Defendant's disability prevents the rapid document preparation "
      "that opposing counsel can achieve with professional staff.",
      S)
    sp(story)

    h(story, "C. Incomplete Discovery Due to SMTP Blockade", S)
    p(story,
      "Plaintiff's SMTP 550 blockade (1,247 documented rejection events) "
      "has prevented Defendant from obtaining documents and records that "
      "are critical to the preparation of a complete defense. A continuance "
      "is necessary to allow Defendant to obtain these records through "
      "formal discovery processes, including subpoenas to Mimecast for "
      "the complete SMTP rejection logs.",
      S)
    sp(story)

    h(story, "D. N.E.W.T.(TM) Remote Appearance Coordination", S)
    p(story,
      "Defendant appears exclusively through N.E.W.T.(TM) remote access "
      "per the ADA accommodation recognized by this Court on March 19, 2026. "
      "Additional time is needed to ensure all technical accommodations "
      "are in place for a meaningful remote appearance.",
      S)
    sp(story)

    h(story, "II. PROPOSED CONTINUANCE", S)
    p(story,
      "Defendant respectfully requests a continuance of not less than "
      "90 days from the current trial date, or to a date after the "
      "HHS-OCR and CCRD investigations are substantially complete, "
      "whichever is later.",
      S)
    sp(story)

    h(story, "III. NO PREJUDICE TO PLAINTIFF", S)
    p(story,
      "A continuance will not prejudice Plaintiff. The property at issue "
      "remains occupied and maintained. Plaintiff will have full opportunity "
      "to present its case at the continued trial date. The only prejudice "
      "from denial would fall on Defendant, who faces displacement from "
      "federally funded housing while federal investigators review "
      "Plaintiff's discriminatory conduct.",
      S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 13 generated: {OUTPUT}")

build()
