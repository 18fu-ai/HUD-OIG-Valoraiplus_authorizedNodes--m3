#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 8:
SUPPLEMENTAL NOTICE — EVIDENTIARY PROFFER

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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc8_SupplementalNotice_EvidentiaryProffer.pdf")
DOC_TITLE = ("SUPPLEMENTAL NOTICE — EVIDENTIARY PROFFER AND "
             "AUTHENTICATION OF DIGITAL EVIDENCE NODES")

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"{DOC_TITLE}\n\n"
        f"[Cal. Evid. Code §§ 1552, 1553; E-SIGN Act 15 U.S.C. § 7001]\n\n"
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    p(story,
      "Defendant DONALD ERNEST GILLSON hereby submits this Supplemental "
      "Notice to proffer and authenticate the digital evidence nodes "
      "referenced throughout Defendant's 17-document filing package, "
      "pursuant to California Evidence Code sections 1552 and 1553 "
      "(authentication of electronic records) and the E-SIGN Act.",
      S)
    sp(story)

    h(story, "I. SMTP 550 TOKEN AUTHENTICATION", S)
    p(story,
      "The following SMTP 550 rejection token is proffered as authenticated "
      "digital evidence of Plaintiff's email blockade campaign:",
      S)
    sp(story, 0.3)
    tbl = Table(
        [[cell("TOKEN ID", bold=True),
          cell("[N7uA_6IQOCiwQL2ibFQZog.us448]")]],
        colWidths=safe_widths([0.20, 0.80])
    )
    tbl.setStyle(TableStyle([
        ("BOX",          (0,0),(-1,-1),0.75,colors.black),
        ("INNERGRID",    (0,0),(-1,-1),0.25,colors.HexColor("#cccccc")),
        ("LEFTPADDING",  (0,0),(-1,-1),6),
        ("RIGHTPADDING", (0,0),(-1,-1),6),
        ("TOPPADDING",   (0,0),(-1,-1),6),
        ("BOTTOMPADDING",(0,0),(-1,-1),6),
        ("BACKGROUND",   (0,0),(0,-1),colors.HexColor("#fff8f0")),
    ]))
    story.append(tbl)
    sp(story)

    p(story,
      "Total SMTP 550 rejection events documented: 1,247. These events "
      "span the period May 12–15, 2026, and include rejection of "
      "communications to the San Francisco Superior Court Clerk "
      "(sfscclerk@sfgov.org), constituting obstruction of court access "
      "under 18 U.S.C. § 1512(c).",
      S)
    sp(story)

    h(story, "II. HARDWARE AUTHENTICATION — LEDGER NODE", S)
    p(story,
      "All digital evidence nodes referenced in this filing package have "
      "been registered and authenticated against the following hardware "
      "verification node:",
      S)
    sp(story, 0.3)
    tbl2 = Table(
        [[cell("DEVICE", bold=True), cell("Ledger Nano Gen5")],
         [cell("SERIAL", bold=True), cell("0UAK57S1BT")],
         [cell("NODE",   bold=True), cell(f"{NODE_AUTH}")],
         [cell("ORCID",  bold=True), cell("0009-0007-0768-5486")]],
        colWidths=safe_widths([0.20, 0.80])
    )
    tbl2.setStyle(TableStyle([
        ("BOX",          (0,0),(-1,-1),0.75,colors.black),
        ("INNERGRID",    (0,0),(-1,-1),0.25,colors.HexColor("#cccccc")),
        ("LEFTPADDING",  (0,0),(-1,-1),6),
        ("RIGHTPADDING", (0,0),(-1,-1),6),
        ("TOPPADDING",   (0,0),(-1,-1),6),
        ("BOTTOMPADDING",(0,0),(-1,-1),6),
        ("BACKGROUND",   (0,0),(0,-1),colors.HexColor("#fff8f0")),
    ]))
    story.append(tbl2)
    sp(story)

    h(story, "III. DECLARATION OF AUTHENTICITY", S)
    p(story,
      "I, Donald Ernest Gillson, declare under penalty of perjury that "
      "all digital evidence nodes, SMTP rejection tokens, email records, "
      "and timestamp logs referenced in this filing package are true and "
      "accurate copies of records maintained in the ordinary course of "
      "business and digital communications, and that the SMTP 550 token "
      "and evidence node identifiers are authentic and unaltered.",
      S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 8 generated: {OUTPUT}")

build()
