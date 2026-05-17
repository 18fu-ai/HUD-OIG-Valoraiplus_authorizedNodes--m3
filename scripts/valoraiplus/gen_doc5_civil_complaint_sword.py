#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 5:
CIVIL COMPLAINT — THE SWORD (COUNTER-COMPLAINT)

Case No.: CUD-26-682107 | Department 12
Filed By: DONALD ERNEST GILLSON, Defendant / Cross-Complainant, In Pro Per
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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc5_CivilComplaint_TheSword.pdf")
DOC_TITLE = ("DEFENDANT'S CIVIL COUNTER-COMPLAINT — "
             "THE SWORD: CROSS-COMPLAINT FOR DAMAGES")

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"{DOC_TITLE}\n\n"
        f"[Cal. Code Civ. Proc. § 428.10; FHA § 3613; "
        f"ADA Title II; Cal. Civ. Code § 1942.5]\n\n"
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    p(story,
      f"Cross-Complainant DONALD ERNEST GILLSON, appearing In Pro Per, "
      f"hereby files this Civil Counter-Complaint against Cross-Defendant "
      f"{PLAINTIFF}, William Landrum, William Losik, Jerome Bradford, and "
      f"John Nicholas Zanghi, Esq., for damages arising from the systematic "
      f"disability discrimination, retaliatory eviction, witness tampering, "
      f"and obstruction of justice described herein.",
      S)
    sp(story)

    h(story, "CAUSES OF ACTION", S)

    h(story, "FIRST CAUSE OF ACTION — RETALIATORY EVICTION "
             "(Cal. Civ. Code § 1942.5)", S)
    p(story,
      "Cross-Defendants filed and prosecuted this Unlawful Detainer action "
      "within 178 days of Defendant's protected Reasonable Accommodation "
      "Request, establishing a statutory presumption of retaliation. "
      "Cross-Complainant seeks actual damages, punitive damages, and "
      "attorney fees under § 1942.5(h).",
      S)
    sp(story)

    h(story, "SECOND CAUSE OF ACTION — DISABILITY DISCRIMINATION "
             "(ADA Title II; FHA § 3604; FEHA)", S)
    p(story,
      "Cross-Defendants failed to engage in the mandatory interactive "
      "accommodation process for 178 days, deployed an email blockade "
      "to suppress Defendant's disability-related communications, and "
      "endangered Defendant's federally protected service animal JAXX "
      "on six documented occasions.",
      S)
    sp(story)

    h(story, "THIRD CAUSE OF ACTION — BREACH OF WARRANTY OF "
             "HABITABILITY (Cal. Civ. Code § 1941)", S)
    p(story,
      "Cross-Defendants failed to maintain the subject premises in a "
      "habitable condition, allowing documented mold, pest infestation, "
      "and biohazard conditions to persist after proper written notice.",
      S)
    sp(story)

    h(story, "FOURTH CAUSE OF ACTION — ELDER AND DEPENDENT ADULT "
             "ABUSE (Cal. Welf. & Inst. Code § 15600 et seq.)", S)
    p(story,
      "Cross-Defendant William Landrum engaged in financial abuse and "
      "isolation tactics against Defendant, a veteran and dependent adult, "
      "resulting in a restraining order issued on March 19, 2026. "
      "Cross-Defendants failed to protect Defendant from documented "
      "physical threats within the facility.",
      S)
    sp(story)

    h(story, "FIFTH CAUSE OF ACTION — INTENTIONAL INFLICTION OF "
             "EMOTIONAL DISTRESS", S)
    p(story,
      "Cross-Defendants' systematic campaign of retaliatory housing actions, "
      "email blockades, open-court mocking of a disabled veteran, and "
      "endangerment of service animal JAXX constitutes extreme and outrageous "
      "conduct causing severe emotional distress.",
      S)
    sp(story)

    h(story, "PRAYER FOR RELIEF", S)
    numbered_list(story, [
        "General and special damages in an amount to be proven at trial;",
        "Punitive damages under Cal. Civ. Code § 3294;",
        "Injunctive relief prohibiting further retaliatory housing actions;",
        "Attorney fees under Cal. Code Civ. Proc. § 1021.5, "
        "FHA § 3613(c)(2), and ADA § 12205;",
        "Costs of suit;",
        "Such other and further relief as the Court deems just and proper.",
    ], S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 5 generated: {OUTPUT}")

build()
