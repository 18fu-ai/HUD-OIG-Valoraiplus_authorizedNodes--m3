#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 16:
AMENDED CIVIL COMPLAINT

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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc16_AmendedCivilComplaint.pdf")
DOC_TITLE = ("AMENDED CIVIL COMPLAINT — VETERANS TENANT UNION: "
             "SYSTEMIC CIVIL RIGHTS VIOLATIONS")

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"{DOC_TITLE}\n\n"
        f"[42 U.S.C. § 1983; FHA § 3604; ADA Title II; RICO 18 U.S.C. § 1962; "
        f"PAWS Act; Cal. Civ. Code § 1942.5]\n\n"
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    p(story,
      f"Cross-Complainant DONALD ERNEST GILLSON, Secretary of the "
      f"1030/1029 Girard Veterans Tenant Union, appearing In Pro Per, "
      f"hereby files this Amended Civil Complaint adding claims on behalf "
      f"of the Veterans Tenant Union membership, whose rights have been "
      f"systematically violated by Cross-Defendants' coordinated campaign "
      f"of retaliatory evictions, witness tampering, and disability "
      f"discrimination.",
      S)
    sp(story)

    h(story, "I. PARTIES", S)
    p(story,
      "Cross-Complainant incorporates by reference the party information "
      "from the original Civil Complaint (Doc 5). The following additional "
      "Veterans Tenant Union members are named as material witnesses whose "
      "rights have been violated:",
      S)
    sp(story, 0.3)
    rows = [
        [cell("MEMBER", bold=True), cell("ROLE", bold=True), cell("VIOLATION", bold=True)],
        [cell("Jerome Bartlett"), cell("VTU Member / Witness"),
         cell("Retaliatory eviction notice after email protests to management")],
        [cell("Daniel Lucian + Rosey"), cell("VTU Member + Service Animal"),
         cell("Retaliatory notice after union organizing; service animal PAWS Act violation")],
        [cell("Jeffrey Wright"), cell("VTU Leader / Witness"),
         cell("Physical assault; victim retaliation — retaliatory notices issued to support network")],
    ]
    tbl = Table(rows, colWidths=safe_widths([0.20, 0.22, 0.58]))
    tbl.setStyle(TableStyle([
        ("VALIGN",       (0,0),(-1,-1),"TOP"),
        ("FONTNAME",     (0,0),(-1,0),"Helvetica-Bold"),
        ("LEFTPADDING",  (0,0),(-1,-1),4),
        ("RIGHTPADDING", (0,0),(-1,-1),4),
        ("TOPPADDING",   (0,0),(-1,-1),4),
        ("BOTTOMPADDING",(0,0),(-1,-1),4),
        ("ROWBACKGROUNDS",(0,0),(-1,-1),[colors.HexColor("#fff8f0"),colors.white]),
        ("BOX",          (0,0),(-1,-1),0.75,colors.black),
        ("INNERGRID",    (0,0),(-1,-1),0.25,colors.HexColor("#cccccc")),
    ]))
    story.append(tbl)
    sp(story)

    h(story, "II. AMENDED CAUSES OF ACTION", S)

    h(story, "SIXTH CAUSE OF ACTION — RICO PREDICATE ACTS "
             "(18 U.S.C. § 1962(c))", S)
    p(story,
      "The pattern of retaliatory eviction notices, witness tampering, "
      "email obstruction, and suppression of federal investigations "
      "constitutes a pattern of racketeering activity under 18 U.S.C. "
      "§ 1961 et seq. The SMTP 550 blockade, the retaliatory housing "
      "notices, and the obstruction of court access constitute at least "
      "three predicate acts of wire fraud (18 U.S.C. § 1343) and "
      "obstruction of justice (18 U.S.C. § 1512) within a 10-year period.",
      S)
    sp(story)

    h(story, "SEVENTH CAUSE OF ACTION — PAWS ACT VIOLATIONS "
             "(49 U.S.C. § 30101 note)", S)
    p(story,
      "Cross-Defendants' endangerment of service animals JAXX (Defendant's) "
      "and Rosey (Daniel Lucian's) on multiple documented occasions "
      "constitutes violations of the Puppies Assisting Wounded Servicemembers "
      "for Veterans Therapy Act (PAWS Act) and the Fair Housing Act's "
      "service animal provisions.",
      S)
    sp(story)

    h(story, "EIGHTH CAUSE OF ACTION — VETERANS CIVIL RIGHTS "
             "(38 U.S.C. § 101; 38 C.F.R. § 14.632)", S)
    p(story,
      "Cross-Defendants' operation of VA/HUD VASH-funded housing while "
      "systematically evicting disabled veterans for exercising protected "
      "civil rights constitutes a violation of the terms of federal program "
      "participation and veterans civil rights protections.",
      S)
    sp(story)

    h(story, "III. AMENDED PRAYER FOR RELIEF", S)
    numbered_list(story, [
        "All relief requested in the original Civil Complaint (Doc 5);",
        "Treble damages under RICO § 1964(c);",
        "Class-wide injunctive relief protecting all VTU members from "
        "retaliatory housing actions;",
        "Referral to HUD OIG, VA OIG, and the U.S. Attorney's Office "
        "for investigation of federal program violations;",
        "Such other and further relief as the Court deems just and proper.",
    ], S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 16 generated: {OUTPUT}")

build()
