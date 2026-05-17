#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 15:
DEFENDANT'S APPLICATION AND CONDITIONAL MOTION TO SEAL THE COURT RECORD

Statutory Basis:
  Cal. Rules of Court, Rules 2.550, 2.551
  Cal. Welf. & Inst. Code § 15657.03 (Elder/Dependent Adult Protection)
  Cal. Rules of Court, Rule 2.251 (Electronic Service)

Case No.: CUD-26-682107 | Department 12
Filed By: DONALD ERNEST GILLSON, Defendant / Cross-Complainant, In Pro Per
NODE AUTHORITY: SGAU-7226.3461 // Saint Paul Node
"""
import sys
sys.path.insert(0, "/home/ubuntu/valoraiplus_core")
from pleading_base import (
    make_doc, make_styles, sp, hr, p, h, numbered_list,
    TEXT_W, CASE_UD, DEPT, FILING_DATE,
    DEFENDANT, DEF_ADDR1, DEF_ADDR2,
    NODE_AUTH, FRAMEWORK_ESIGN, JEFFREY_ESIGN, JEFFREY_ROLE, ORCID_ID,,
    safe_widths, safe_widths_abs,
)
from doc_helpers import (
    cell, caption_block, esign_block, pos_block, closing_signature,
    PLAINTIFF, LANDRUM, ZANGHI, WHITE, PROP_ADDR,
)
from reportlab.platypus import Paragraph, Table, TableStyle, PageBreak
from reportlab.lib import colors
from reportlab.lib.units import inch

OUTPUT = "/home/ubuntu/valoraiplus_core/CUD-26-682107_Doc15_MotionToSeal.pdf"
DOC_TITLE = ("DEFENDANT'S APPLICATION AND CONDITIONAL MOTION TO SEAL "
             "THE COURT RECORD")

def criteria_table(story, rows_data):
    rows = [[cell(n, bold=True), cell(lbl, bold=True), cell(val)]
            for n, lbl, val in rows_data]
    tbl = Table(rows, colWidths=safe_widths([0.06, 0.25, 0.69]))
    tbl.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 5),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 5),
        ("TOPPADDING",    (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("ROWBACKGROUNDS",(0, 0), (-1, -1),
         [colors.HexColor("#fff8f0"), colors.white]),
        ("BOX",           (0, 0), (-1, -1), 0.75, colors.black),
        ("INNERGRID",     (0, 0), (-1, -1), 0.25, colors.HexColor("#cccccc")),
    ]))
    story.append(tbl)

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"DEFENDANT'S APPLICATION AND CONDITIONAL MOTION TO SEAL THE "
        f"COURT RECORD\n\n"
        f"[Cal. Rules of Court, Rules 2.550, 2.551; "
        f"Cal. Welf. & Inst. Code § 15657.03]\n\n"
        f"Date: Per Court Calendar\nTime: Per Court Calendar\n"
        f"Dept.: 12\nJudge: Assigned"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)
    p(story, "TO THE HONORABLE PRESIDING JUDGE OF DEPARTMENT 12:", S, "heading")
    sp(story, 0.3)
    p(story,
      f"Defendant DONALD ERNEST GILLSON, appearing In Pro Per, hereby applies "
      f"to this Court for an order conditionally sealing the record of these "
      f"proceedings, including all attached exhibits, timeline node logs, and "
      f"companion civil pleadings, pursuant to California Rules of Court, "
      f"Rules 2.550 and 2.551, and the Elder and Dependent Adult Civil "
      f"Protection Act, California Welfare and Institutions Code section 15600 "
      f"et seq. This motion is brought on the grounds that this litigation "
      f"involves highly sensitive matters regarding elder and dependent adult "
      f"abuse, active federal and state regulatory civil rights investigations, "
      f"and the protection of vulnerable veteran tenants and material court "
      f"witnesses from documented physical retaliation and harassment.",
      S)
    sp(story)

    h(story, "I. STATUTORY AND RULES AUTHORITY", S)
    p(story,
      "California Rules of Court, Rule 2.550(d) provides that a court must "
      "not seal a record unless it expressly finds facts that establish all "
      "of the following criteria:",
      S)
    sp(story, 0.3)
    criteria_table(story, [
        ("1.", "Overriding Interest:",
         "There exists an overriding interest that supports sealing the record."),
        ("2.", "Substantial Probability:",
         "There is a substantial probability that the overriding interest will "
         "be prejudiced if the record is not sealed."),
        ("3.", "Narrowly Tailored:",
         "The proposed sealing is narrowly tailored to protect the overriding "
         "interest."),
        ("4.", "No Less Restrictive Means:",
         "No less restrictive means exist to achieve the overriding interest."),
    ])
    sp(story)
    p(story,
      "Each of these criteria is satisfied here, as set forth below.",
      S)
    sp(story)

    h(story, "II. MEMORANDUM OF POINTS AND AUTHORITIES", S)

    h(story, "A. Overriding Interest: Protection of Vulnerable Litigants "
             "and Active Civil Rights Investigations", S)
    p(story,
      "The record in this action contains explicit, unredacted data streams "
      "identifying dependent adult and elder class participants who are members "
      "of the 1030/1029 Girard Veterans Tenant Union. This tracking framework "
      "details open-court witness intimidation and active state and federal "
      "civil rights investigations under Evidence Node REG-04-HHS-INVESTIGATION "
      "(U.S. Department of Health and Human Services) and Evidence Node "
      "REG-05-CRD-INVESTIGATION (California Civil Rights Department). The "
      "public disclosure of these files exposes confidential, sensitive "
      "administrative tracking metrics that must be protected under state and "
      "federal privacy mandates to safeguard the systemic interactive process.",
      S)
    sp(story)

    h(story, "B. Substantial Probability of Prejudice: Documented Witness "
             "Retaliation and Physical Assault Torts", S)
    p(story,
      "A complete operational analysis demonstrates that this Unlawful Detainer "
      "action is not a routine property dispute, but rather a targeted "
      "administrative campaign to clear the facility of resident advocates and "
      "suppress evidence of systemic corruption. The probability of direct "
      "prejudice and danger to human safety is high if this record remains "
      "unsealed for the following reasons:",
      S)
    sp(story, 0.3)
    numbered_list(story, [
        "<b>Witness Suppression Logs:</b> Pleading documents establish that "
        "Plaintiff's agents issued retaliatory eviction notices targeting core "
        "witness advocates Jerome 'Jerry' Bartlett and Daniel Lucian (and his "
        "service animal, Rosey) following their appearance at the March 19, "
        "2026 elder abuse restraining order hearing against William Landrum. "
        "Public disclosure of these witness identities exposes them to further "
        "retaliation.",

        "<b>Physical Safety Breaches:</b> The record contains documented, "
        "actionable notifications regarding a physical resident assault "
        "perpetrated against tenant union leader Jeffrey Wright. Plaintiff's "
        "management infrastructure willfully ignored this physical security "
        "failure and focused resources on evicting the victim's support "
        "network. Public exposure of these tracking files places Mr. Wright, "
        "Mr. Gillson, and the surrounding veteran witness cadre at immediate "
        "risk of further physical confrontation and retributive housing actions.",

        "<b>Active Federal Investigation Confidentiality:</b> The HHS OCR "
        "investigation (REG-04-HHS-INVESTIGATION) involves confidential "
        "administrative proceedings. Public disclosure of the investigation "
        "details could compromise the federal agency's investigative process "
        "and prejudice Defendant's ability to obtain full relief.",
    ], S)
    sp(story)

    story.append(PageBreak())
    h(story, "C. Sealing is Narrowly Tailored to Prevent Exploitation of "
             "Financial and Academic Property", S)
    p(story,
      f"The application is narrowly tailored to seal the evidentiary nodes "
      f"containing proprietary data layouts, doctoral research manifests "
      f"registered under ORCID iD: {ORCID_ID}, and confidential resident "
      f"statements. No less restrictive means, such as simple line-redaction, "
      f"can safely protect the safety of the witness union or prevent the "
      f"strategic suppression of these underlying assets while federal and "
      f"state civil rights investigators complete their active corporate audits. "
      f"The proposed sealing order is limited to the specific evidentiary nodes "
      f"identified herein and does not seek to seal the entire record.",
      S)
    sp(story)

    h(story, "D. No Less Restrictive Means", S)
    p(story,
      "Defendant has considered less restrictive alternatives, including "
      "targeted redaction of witness names and investigation reference numbers. "
      "However, given the documented pattern of witness retaliation and the "
      "physical assault of Jeffrey Wright, redaction alone is insufficient to "
      "protect the safety of the witnesses and the integrity of the active "
      "federal and state investigations. A conditional sealing order, subject "
      "to in camera review by the Court, is the minimum necessary restriction.",
      S)
    sp(story)

    h(story, "III. PROPOSED ORDER", S)
    p(story,
      "Defendant respectfully requests that the Court issue an order:",
      S)
    sp(story, 0.3)
    numbered_list(story, [
        "Conditionally sealing the record of Case No. CUD-26-682107 to protect "
        "vulnerable dependent adult veterans and active state and federal case "
        "records from public disclosure, specifically including: (a) the "
        "identities and contact information of witness union members Jerome "
        "Bartlett, Daniel Lucian, and Jeffrey Wright; (b) the reference numbers "
        "and details of the active HHS OCR and CRD investigations; and "
        "(c) the ORCID iD, DOI registrations, and IPFS content identifiers "
        "associated with Defendant's proprietary academic and IP assets;",

        "Directing Plaintiff, its clinical property agents, and litigation "
        "counsel to maintain strict confidentiality regarding all files, names, "
        "and timeline logs during the pendency of this action;",

        "Scheduling an in camera hearing at which the Court may review the "
        "sealed materials and determine the appropriate scope of any permanent "
        "sealing order;",

        "Granting such other and further relief as the Court deems just "
        "and proper.",
    ], S)
    sp(story)

    h(story, "IV. CONCLUSION", S)
    p(story,
      f"For the foregoing reasons, Defendant DONALD ERNEST GILLSON respectfully "
      f"requests that this Court grant the conditional sealing order described "
      f"herein. The safety of veteran witnesses, the integrity of active federal "
      f"and state civil rights investigations, and the protection of Defendant's "
      f"proprietary academic and intellectual property assets all require the "
      f"narrowly tailored relief requested.",
      S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 15 generated: {OUTPUT}")

build()
