#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 3:
ADA ACCOMMODATION REQUEST AND PROOF OF SERVICE

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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc3_ADA_ProofOfService.pdf")
DOC_TITLE = ("NOTICE OF DISABILITY ACCOMMODATION REQUEST AND "
             "PROOF OF ELECTRONIC SERVICE")

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"{DOC_TITLE}\n\n"
        f"[ADA Title II; 28 C.F.R. § 35.130(b)(7); "
        f"Section 504 of the Rehabilitation Act; CCP § 1010.6]\n\n"
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    h(story, "I. DISABILITY ACCOMMODATION REQUEST", S)
    p(story,
      f"Defendant DONALD ERNEST GILLSON hereby formally requests the following "
      f"accommodations from the Court pursuant to the Americans with Disabilities "
      f"Act, Title II (42 U.S.C. § 12132), Section 504 of the Rehabilitation "
      f"Act (29 U.S.C. § 794), and California Government Code § 12926:",
      S)
    sp(story, 0.3)
    numbered_list(story, [
        "<b>Electronic Filing and Remote Appearance:</b> Defendant has been "
        "diagnosed with Parkinsonism causing hand tremors, rendering wet-ink "
        "signatures physically difficult. Defendant requests authorization to "
        "file all documents electronically pursuant to CCP § 1010.6 and to "
        "appear at all hearings remotely via videoconference.",

        "<b>N.E.W.T.(TM) Cognitive Prosthetic Authorization:</b> Defendant "
        "uses N.E.W.T.(TM) (Neuro-Enhanced Workflow Terminal), an "
        "ADA-authorized cognitive prosthetic and auxiliary communication aid, "
        "pursuant to 28 C.F.R. § 35.130(b)(7). All documents prepared with "
        "N.E.W.T.(TM) assistance constitute valid court filings.",

        "<b>Extended Time for Filings:</b> Defendant requests a reasonable "
        "extension for all filing deadlines due to disability-related "
        "processing limitations.",

        "<b>Large-Print and Accessible Format Documents:</b> Defendant "
        "requests all court documents be provided in accessible digital "
        "format.",
    ], S)
    sp(story)

    h(story, "II. NOTICE OF INTERACTIVE PROCESS DEFAULT", S)
    p(story,
      f"Defendant submitted a formal Reasonable Accommodation Request to "
      f"Plaintiff on November 20, 2025. As of {FILING_DATE} — 178 days later — "
      f"Plaintiff has not engaged in the mandatory interactive process required "
      f"by the Fair Employment and Housing Act and the ADA. This 178-day "
      f"silence constitutes a complete default of Plaintiff's obligations under "
      f"applicable disability rights law and triggers the retaliatory "
      f"presumption under Cal. Civ. Code § 1942.5.",
      S)
    sp(story)

    h(story, "III. FEDERAL INVESTIGATION STATUS", S)
    p(story,
      "The following federal and state civil rights investigations are "
      "currently active regarding Plaintiff's disability accommodation "
      "failures:",
      S)
    sp(story, 0.3)
    numbered_list(story, [
        "HHS-OCR Case No. 25-621293 — Investigator: Amy Horrell "
        "(amy.horrell@hhs.gov) — ADA Title II / Section 504",
        "CCRD Case No. 202601-33270627 — Investigator: Anna Moraga Archila "
        "(anna.moraga@dfeh.ca.gov) — FEHA / Fair Housing",
    ], S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 3 generated: {OUTPUT}")

build()
