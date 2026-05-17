#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 10:
CIVIL AND HUMAN RIGHTS COMPLAINT

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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc10_CivilHumanRights.pdf")
DOC_TITLE = ("CIVIL AND HUMAN RIGHTS COMPLAINT — "
             "DISCRIMINATION, RETALIATION, AND FEDERAL HOUSING VIOLATIONS")

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"{DOC_TITLE}\n\n"
        f"[42 U.S.C. § 1983; FHA § 3604; ADA Title II; "
        f"Section 504; FEHA; 42 U.S.C. § 1512]\n\n"
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    h(story, "I. FEDERAL AND STATE CIVIL RIGHTS VIOLATIONS", S)

    h(story, "A. Fair Housing Act — 42 U.S.C. § 3604", S)
    p(story,
      f"Plaintiff {PLAINTIFF} discriminated against Defendant on the basis "
      f"of disability by: (1) failing to provide reasonable accommodations "
      f"for 178 days; (2) endangering service animal JAXX on six documented "
      f"occasions; (3) filing a retaliatory eviction within the 180-day "
      f"protected window; and (4) deploying a communication blockade that "
      f"isolated Defendant from legal resources and the court system.",
      S)
    sp(story)

    h(story, "B. ADA Title II — 42 U.S.C. § 12132", S)
    p(story,
      f"Plaintiff operates a HUD-funded Permanent Supportive Housing "
      f"program and functions as a public entity for ADA Title II purposes. "
      f"Plaintiff denied Defendant meaningful access to housing services "
      f"by refusing to engage in the interactive accommodation process, "
      f"failing to provide auxiliary aids and services, and retaliating "
      f"against Defendant's protected ADA activity.",
      S)
    sp(story)

    h(story, "C. 42 U.S.C. § 1983 — Color of Law Violations", S)
    p(story,
      "Plaintiff's receipt of federal HUD and VA/HUD VASH program funding "
      "and its operation of a federally mandated housing program brings "
      "its discriminatory conduct within the scope of 42 U.S.C. § 1983. "
      "Plaintiff and its agents, acting under color of federal program "
      "authority, deprived Defendant of rights secured by the Constitution "
      "and federal law.",
      S)
    sp(story)

    h(story, "D. 42 U.S.C. § 1512 — Witness Tampering", S)
    p(story,
      "Following Defendant's assertion of legal rights and the appearance "
      "of material witnesses — Jerome Bartlett, Daniel Lucian, and Jeffrey "
      "Wright — Plaintiff's agents issued retaliatory housing notices "
      "against each witness. This coordinated retaliatory campaign "
      "constitutes federal witness tampering under 42 U.S.C. § 1512.",
      S)
    sp(story)

    h(story, "E. FEHA — Government Code § 12955", S)
    p(story,
      "Plaintiff's 178-day failure to engage in the interactive "
      "accommodation process, combined with the filing of this retaliatory "
      "eviction, constitutes disability discrimination in housing under "
      "California Government Code § 12955 and the Fair Employment and "
      "Housing Act.",
      S)
    sp(story)

    h(story, "II. ACTIVE FEDERAL INVESTIGATIONS", S)
    numbered_list(story, [
        "HHS-OCR Case No. 25-621293 — Investigator: Amy Horrell "
        "(amy.horrell@hhs.gov) — ADA Title II / Section 504 "
        "— Opened March 15, 2026",
        "CCRD Case No. 202601-33270627 — Investigator: Anna Moraga Archila "
        "(anna.moraga@dfeh.ca.gov) — FEHA / Fair Housing "
        "— Opened April 2, 2026",
    ], S)
    sp(story)

    h(story, "III. RELIEF REQUESTED", S)
    numbered_list(story, [
        "Compensatory damages for housing discrimination and emotional distress;",
        "Punitive damages under 42 U.S.C. § 3613(c)(1) and Cal. Civ. Code § 3294;",
        "Injunctive relief requiring Plaintiff to implement ADA-compliant "
        "accommodation procedures;",
        "Attorney fees under 42 U.S.C. § 3613(c)(2), ADA § 12205, "
        "and Cal. Code Civ. Proc. § 1021.5;",
        "Referral to HUD Office of Fair Housing and Equal Opportunity;",
        "Such other and further relief as the Court deems just and proper.",
    ], S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 10 generated: {OUTPUT}")

build()
