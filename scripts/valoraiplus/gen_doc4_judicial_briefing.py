#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 4:
JUDICIAL BRIEFING — EVIDENTIARY FRAMEWORK AND CASE OVERVIEW

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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc4_JudicialBriefing.pdf")
DOC_TITLE = ("DEFENDANT'S JUDICIAL BRIEFING — "
             "EVIDENTIARY FRAMEWORK AND CASE OVERVIEW")

def evidence_table(story, S, rows, col_widths=None):
    if col_widths is None:
        col_widths = safe_widths([0.12, 0.30, 0.58])
    data = [[cell(a, bold=True), cell(b, bold=True), cell(c)]
            for a, b, c in rows]
    tbl = Table(data, colWidths=col_widths)
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
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    p(story,
      "This briefing is submitted to orient the Court to the evidentiary "
      "framework underlying Defendant's Answer and companion filings. This "
      "is not a routine unlawful detainer. It is a retaliatory eviction "
      "campaign against a disabled veteran operating within a federally "
      "funded housing program, filed while active federal and state civil "
      "rights investigations are pending.",
      S)
    sp(story)

    h(story, "I. KEY PERSONNEL", S)
    evidence_table(story, S, [
        ("ROLE", "NAME", "RELEVANCE"),
        ("Plaintiff", "Swords to Plowshares", "501(c)(3) — federally funded PSH operator"),
        ("Verifier", "Jerome Bradford", "Interim PM — void verification (no personal knowledge)"),
        ("Agent", "William Losik", "HIPAA double standard — Dept. Director"),
        ("Agent", "William Landrum", "Property Manager — restraining order March 19, 2026"),
        ("Agent", "Graciela Reyes", "Assigned case manager — documented failures"),
        ("Counsel", "John Zanghi, Esq.", "Lead counsel — SB No. 320531 — misconduct documented"),
        ("Counsel", "Bradford White, Esq.", "Associated counsel — SB No. 297746"),
    ], col_widths=safe_widths([0.15, 0.25, 0.60]))
    sp(story)

    h(story, "II. EVIDENCE NODE MATRIX", S)
    evidence_table(story, S, [
        ("NODE", "CATEGORY", "DESCRIPTION"),
        ("GMAIL-02-RAR",     "Accommodation", "Reasonable Accommodation Request — Nov 20, 2025"),
        ("SMTP-03-BLOCK",    "Obstruction",   "1,247 SMTP 550 events — token [N7uA_6IQOCiwQL2ibFQZog.us448]"),
        ("REG-04-HHS",       "Federal",       "HHS-OCR Case No. 25-621293 — Amy Horrell"),
        ("REG-05-CRD",       "State",         "CCRD Case No. 202601-33270627 — Anna Moraga Archila"),
        ("JAXX-06-PAWS",     "Service Animal","6 endangerment incidents — PAWS Act / FHA § 3604"),
        ("LTR-07-ZANGHI",    "Admission",     "1,062-email judicial admission — Zanghi"),
        ("FRAUD-08-BRADFORD","Fraud",         "Void verification — no doctorate, no personal knowledge"),
        ("ASSAULT-09-WRIGHT","Witness",       "Physical assault of Jeffrey Wright — VTU leader"),
        ("TRO-10-LANDRUM",   "Restraining",   "Elder abuse TRO against William Landrum — March 19, 2026"),
    ], col_widths=safe_widths([0.17, 0.15, 0.68]))
    sp(story)

    h(story, "III. TIMELINE OF KEY EVENTS", S)
    numbered_list(story, [
        "<b>Nov 20, 2025:</b> Defendant submits formal Reasonable Accommodation Request.",
        "<b>Nov 20 – May 19, 2026 (178 days):</b> Plaintiff fails to engage in interactive process.",
        "<b>Jan 26, 2026:</b> 178-day silence clock begins on accommodation default.",
        "<b>Mar 19, 2026:</b> Restraining order hearing — N.E.W.T.(TM) recognized by Court.",
        "<b>Mar 15, 2026:</b> HHS-OCR investigation opened (REG-04-HHS).",
        "<b>Apr 2, 2026:</b> CCRD investigation opened (REG-05-CRD).",
        "<b>May 12–15, 2026:</b> SMTP 550 blockade deployed — 1,247 events captured.",
        "<b>May 15, 2026:</b> Court clerk email (sfscclerk@sfgov.org) also blocked.",
        "<b>May 19, 2026:</b> Defendant files complete 17-document response package.",
    ], S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 4 generated: {OUTPUT}")

build()
