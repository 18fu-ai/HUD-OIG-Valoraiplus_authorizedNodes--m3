#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 11:
EMERGENCY TEMPORARY RESTRAINING ORDER

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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc11_EmergencyTRO.pdf")
DOC_TITLE = ("DEFENDANT'S APPLICATION FOR EMERGENCY TEMPORARY "
             "RESTRAINING ORDER AND ORDER TO SHOW CAUSE")

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"{DOC_TITLE}\n\n"
        f"[Cal. Code Civ. Proc. §§ 527, 527.6; "
        f"Cal. Welf. & Inst. Code § 15657.03]\n\n"
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    p(story,
      f"Defendant DONALD ERNEST GILLSON hereby applies for an Emergency "
      f"Temporary Restraining Order and Order to Show Cause restraining "
      f"Plaintiff {PLAINTIFF} and its agents from engaging in further "
      f"retaliatory, discriminatory, or obstructive conduct pending "
      f"resolution of the federal and state civil rights investigations "
      f"and the within action.",
      S)
    sp(story)

    h(story, "I. IRREPARABLE HARM", S)
    p(story,
      "Defendant faces irreparable harm from the following ongoing "
      "and imminent acts:",
      S)
    sp(story, 0.3)
    numbered_list(story, [
        "Continuation of the retaliatory eviction action targeting a "
        "federally protected disabled veteran;",
        "Ongoing SMTP 550 email blockade (1,247+ events) isolating "
        "Defendant from legal resources, federal investigators, and "
        "the court system;",
        "Retaliatory housing notices issued against Veterans Tenant "
        "Union witnesses Jerome Bartlett, Daniel Lucian, and Jeffrey Wright;",
        "Continued endangerment of service animal JAXX in violation "
        "of the PAWS Act and FHA § 3604;",
        "Risk of unlawful displacement from federally funded housing "
        "while active federal and state civil rights investigations are pending.",
    ], S)
    sp(story)

    h(story, "II. PROBABILITY OF SUCCESS ON THE MERITS", S)
    p(story,
      "Defendant demonstrates a substantial probability of success on "
      "the merits based on: (1) the void verification by Jerome Bradford; "
      "(2) the 178-day interactive process default; (3) the documented "
      "SMTP 550 obstruction; (4) the active federal investigations; and "
      "(5) the restraining order previously issued against William Landrum "
      "on March 19, 2026.",
      S)
    sp(story)

    h(story, "III. BALANCE OF HARDSHIPS", S)
    p(story,
      "The balance of hardships tips decisively in Defendant's favor. "
      "Defendant faces loss of housing, separation from service animal "
      "JAXX, and disruption of federally protected disability accommodations. "
      "Plaintiff faces only a temporary pause in prosecuting an action "
      "it has no right to bring.",
      S)
    sp(story)

    h(story, "IV. PUBLIC INTEREST", S)
    p(story,
      "Granting this TRO serves the public interest by protecting the "
      "integrity of active federal and state civil rights investigations, "
      "preventing the eviction of a disabled veteran from federally "
      "funded housing in retaliation for protected ADA activity, and "
      "deterring witness tampering and obstruction of justice.",
      S)
    sp(story)

    h(story, "V. RELIEF REQUESTED", S)
    numbered_list(story, [
        "A TRO restraining Plaintiff and its agents from taking any "
        "further steps to enforce the Notice to Quit or prosecute the "
        "Unlawful Detainer action pending the OSC hearing;",
        "A TRO restraining Plaintiff and its agents from issuing any "
        "further retaliatory housing notices against VTU witnesses;",
        "A TRO requiring Plaintiff to immediately restore all email "
        "communication channels to Defendant;",
        "An Order to Show Cause why a Preliminary Injunction should "
        "not issue on the same terms;",
        "Such other and further relief as the Court deems just and proper.",
    ], S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 11 generated: {OUTPUT}")

build()
