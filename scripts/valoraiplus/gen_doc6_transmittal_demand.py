#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 6:
TRANSMITTAL AND DEMAND LETTER

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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc6_Transmittal_Demand.pdf")
DOC_TITLE = "NOTICE OF TRANSMITTAL AND FORMAL DEMAND FOR DISMISSAL"

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

    p(story,
      f"TO: John Nicholas Zanghi, Esq. (jzanghi@ztalaw.com); "
      f"Bradford Christopher White, Esq.; "
      f"{PLAINTIFF}; William Landrum (william.landrum@stp-sf.org); "
      f"San Francisco Superior Court, Department 12",
      S)
    sp(story)

    p(story,
      f"FROM: Donald Ernest Gillson, Defendant In Pro Per\n"
      f"DATE: {FILING_DATE}\n"
      f"RE: Case No. {CASE_UD} — Formal Demand for Voluntary Dismissal",
      S)
    sp(story)
    hr(story)
    sp(story)

    h(story, "I. FORMAL DEMAND FOR VOLUNTARY DISMISSAL", S)
    p(story,
      f"Defendant DONALD ERNEST GILLSON hereby formally demands that "
      f"Plaintiff {PLAINTIFF}, through its counsel, file a Request for "
      f"Dismissal with prejudice within 24 hours of receipt of this "
      f"Transmittal Notice.",
      S)
    sp(story)

    h(story, "II. GROUNDS FOR DISMISSAL DEMAND", S)
    numbered_list(story, [
        "The Complaint's verification is void — executed by Jerome Bradford "
        "who lacked personal knowledge and authority (CCP § 446; PC § 115);",

        "The action is retaliatory — filed within 178 days of Defendant's "
        "protected accommodation request (Cal. Civ. Code § 1942.5);",

        "Active federal investigations are pending: HHS-OCR No. 25-621293 "
        "and CCRD No. 202601-33270627, both directly implicating Plaintiff's "
        "conduct in this eviction;",

        "The SMTP 550 blockade (1,247 events, token [N7uA_6IQOCiwQL2ibFQZog.us448]) "
        "constitutes independent evidence of 18 U.S.C. § 1512(c) obstruction;",

        "Plaintiff's agents engaged in witness tampering against VTU members "
        "Jerome Bartlett, Daniel Lucian, and Jeffrey Wright;",

        "Continuation of this action in the face of this evidence exposes "
        "Plaintiff and its counsel to sanctions under CCP § 128.7 and "
        "professional discipline under CRPC Rules 3.1 and 8.4.",
    ], S)
    sp(story)

    h(story, "III. CONSEQUENCES OF NON-COMPLIANCE", S)
    p(story,
      "If Plaintiff fails to voluntarily dismiss this action within 24 hours "
      "of receipt of this Transmittal Notice, Defendant will: (1) proceed "
      "with the full 17-document filing package; (2) transmit the complete "
      "evidence matrix to HHS-OCR and CCRD investigators; (3) file the "
      "State Bar complaint against Zanghi and White; and (4) seek sanctions "
      "and attorney fees under CCP § 128.7, the ADA, and the FHA.",
      S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 6 generated: {OUTPUT}")

build()
