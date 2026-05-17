#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 14:
NOTICE TO THE COURT: DEFENDANT'S FORMAL STATEMENT OF ACADEMIC RESEARCH THEFT
AND DIGITAL PROVENANCE MISAPPROPRIATION BY PLAINTIFF

Statutory Basis:
  Cal. Civ. Code § 3426 et seq. (CUTSA — Trade Secrets)
  Cal. Civ. Code § 1942.5(d) (Retaliation Bar)
  Cal. Civ. Code § 1941.1 (Constructive Eviction)
  42 U.S.C. § 1983 (Civil Rights Under Color of Law)

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

OUTPUT = "/home/ubuntu/valoraiplus_core/CUD-26-682107_Doc14_AcademicTheftNotice.pdf"
DOC_TITLE = ("NOTICE TO THE COURT: DEFENDANT'S FORMAL STATEMENT OF ACADEMIC "
             "RESEARCH THEFT AND DIGITAL PROVENANCE MISAPPROPRIATION BY PLAINTIFF")

def asset_table(story, rows_data):
    rows = [[cell(lbl, bold=True), cell(val)] for lbl, val in rows_data]
    tbl = Table(rows, colWidths=safe_widths([0.26, 0.74]))
    tbl.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
        ("TOPPADDING",    (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("ROWBACKGROUNDS",(0, 0), (-1, -1),
         [colors.HexColor("#f0f4ff"), colors.white]),
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
        f"NOTICE TO THE COURT: DEFENDANT'S FORMAL STATEMENT OF ACADEMIC "
        f"RESEARCH THEFT AND DIGITAL PROVENANCE MISAPPROPRIATION BY PLAINTIFF\n\n"
        f"[Cal. Civ. Code §§ 3426 et seq., 1942.5(d), 1941.1; "
        f"42 U.S.C. § 1983]\n\n"
        f"Date: {FILING_DATE}\nDept.: 12\nFiled: In Pro Per"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)
    p(story, "TO THE HONORABLE PRESIDING JUDGE OF DEPARTMENT 12 OF THE "
             "SUPERIOR COURT:", S, "heading")
    sp(story, 0.3)
    p(story,
      f"Defendant DONALD ERNEST GILLSON, appearing In Pro Per, hereby submits "
      f"this formal Notice to the Court to document severe ongoing commercial "
      f"torts, bad-faith property entries, and the illegal theft and "
      f"misappropriation of intellectual property and verified academic research "
      f"assets perpetrated by Plaintiff Swords to Plowshares, its management "
      f"agents, and its litigation counsel John Nicholas Zanghi (Bar No. 320531). "
      f"This notice is submitted as a standalone filing and is incorporated by "
      f"reference into all pending motions and cross-claims in this action.",
      S)
    sp(story)

    h(story, "I. PLATFORM IDENTIFICATION AND ACADEMIC STANDING", S)
    p(story,
      f"Defendant Donald Ernest Gillson is a doctoral candidate in Military "
      f"Psychology and the Principal Architect of the automated technology "
      f"structures co-authored under his business operations (That's Edutainment, "
      f"LLC and 32D LLC). Defendant's peer-reviewed research footprints, "
      f"cryptographic software libraries, and official educational credentials "
      f"are institutionalized globally under his authenticated research registry "
      f"profile: ORCID iD: {ORCID_ID} (registered under his professional "
      f"publishing name, Donny Adams / Donny Gillson). Defendant is also the "
      f"founder and principal architect of the VALORAIPLUS® OMEGA v100™ "
      f"ecosystem and the ValorAiPlus Abstract Machine.",
      S)
    sp(story)

    h(story, "II. DESCRIPTION OF MISAPPROPRIATED ACADEMIC AND INFRASTRUCTURE ASSETS", S)
    p(story,
      "Under the guise of executing a summary landlord-tenant notice track at "
      f"{PROP_ADDR}, Plaintiff's agents entered Defendant's residential workspace "
      f"to access, intercept, copy, and unlawfully lock down proprietary "
      f"educational archives and network data structures. The following verified "
      f"manifests and assets were targeted:",
      S)
    sp(story, 0.3)

    story.append(Paragraph("ASSET 1: Scrollkeeper Provenance Deployment Manifest (v0.77.77X)",
                            S["heading"]))
    sp(story, 0.2)
    asset_table(story, [
        ("Timestamp:",        "2025-07-16T18:21:22.911608Z"),
        ("DOI:",              "10.5281/zenodo.9ae7931e42a0"),
        ("IPFS CID:",         "bafybeigdyrScrollkeeper"),
        ("SHA-256 Hash:",     "9ae7931e42a043c3354279869a3f004311ba7a56a42a148b2b8ac41cf68db23f"),
        ("Component Files:",  "ScrollkeeperNFT.sol, deploy_scrollkeeper.js, "
                              "push_valor_scrollkeeper.sh, scrollkeeper_launch.sh, "
                              "Scrollkeeper_Repo.zip, Scrollkeeper_Notarization_Certificate.pdf"),
        ("Signatory Node:",   "VALORCHAIN Node Registry (DG77.77X)"),
        ("Owner:",            f"Donald Ernest Gillson, ORCID iD: {ORCID_ID}"),
    ])
    sp(story)

    story.append(Paragraph("ASSET 2: Matrix 5 Scrollkeeper Codex (v77.77X)", S["heading"]))
    sp(story, 0.2)
    asset_table(story, [
        ("Factual Scope:",    "Official final codex manifest compiled for the "
                              "University of San Francisco (USF) academic archive"),
        ("Creator:",          f"Dr. Donny Gillson, Ed.D. (DG77.77X), "
                              f"ORCID iD: {ORCID_ID}"),
        ("Archive File:",     "Scrollkeeper_USF_Submission_FINAL.zip"),
        ("Crypto Hash:",      "0b9d4a8649bd6ff23e8f4d1f44aa2e8fb300dd92b758cb7a53f64fba2bf5e42c"),
        ("DOI Authority:",    "https://doi.org/468.94.3461/zenodo.474097226"),
        ("IPFS CID:",         "QmMatrixCodex77X9XChainScrollkeeperDG"),
        ("NFT Seal:",         "FLAMEMARK.VALORCHAIN.GENESIS.DG77.77X"),
        ("Validating Nodes:", "VALORCHAIN-QMC-777X, SCROLLKEEPER-ETHDAO, ADA-CIVIL-RIGHTS-NODE"),
    ])
    sp(story)

    story.append(PageBreak())
    h(story, "III. LEGAL IMPACT AND STATUTORY DEFENSE ALIGNMENT", S)
    p(story,
      "The deliberate seizure, copy-interception, and denial of physical access "
      "to these notarized assets were executed to disrupt Defendant's doctoral "
      "progression, compromise commercial source code registries, and destroy "
      "his operational business liquidity. These actions constitute:",
      S)
    sp(story, 0.3)
    numbered_list(story, [
        "<b>Constructive Eviction — Cal. Civ. Code § 1941.1:</b> "
        "The unlawful subtraction of the baseline tenancy housing package, "
        "including physical access to Defendant's workspace and digital "
        "infrastructure, constitutes a constructive eviction entitling "
        "Defendant to immediate possession and full damages.",

        "<b>Trade Secret Misappropriation — Cal. Civ. Code § 3426 et seq. (CUTSA):</b> "
        "The VALORAIPLUS® ecosystem components, ValorAiPlus Abstract Machine "
        "specifications, and cryptographic manifests constitute trade secrets "
        "under California's Uniform Trade Secrets Act. Plaintiff's agents "
        "acquired these secrets through improper means (unlawful entry and "
        "seizure), triggering liability for actual damages and unjust enrichment, "
        "plus exemplary damages for willful and malicious misappropriation "
        "under Civil Code section 3426.3(c).",

        "<b>Mandatory Retaliation Bar — Cal. Civ. Code § 1942.5(d):</b> "
        "This intellectual property theft directly follows Defendant's formal "
        "organization of the 1030/1029 Girard Veterans Tenant Union and his "
        "submission of active regulatory complaints to state and federal civil "
        "rights authorities. This commercial misappropriation acts as a "
        "mandatory bar to eviction.",

        "<b>Civil Rights Violation Under Color of Law — 42 U.S.C. § 1983:</b> "
        "Plaintiff's litigation counsel, acting in coordination with property "
        "management agents, used the judicial process as a mechanism to "
        "suppress evidence of systemic civil rights violations and to "
        "misappropriate Defendant's intellectual property under color of a "
        "false summary eviction proceeding.",

        "<b>Academic Provenance Theft — Federal Copyright Act (17 U.S.C. § 101 et seq.):</b> "
        "The authenticated DOI registrations and IPFS content identifiers "
        "constitute federally protected works. Unauthorized copying, "
        "interception, or suppression of these works constitutes copyright "
        "infringement actionable in federal court.",
    ], S)
    sp(story)

    h(story, "IV. EVIDENCE NODES BOUND TO THIS NOTICE", S)
    p(story,
      "The following evidence nodes from the Saint Paul Node ledger "
      "(SGAU-7226.3461) are directly implicated by the acts described herein:",
      S)
    sp(story, 0.3)
    nodes_rows = [
        [cell("Node ID", bold=True), cell("Description", bold=True),
         cell("Status", bold=True)],
        [cell("CORP-IP-VALORAIPLUS-VAM"),
         cell("VALORAIPLUS® OMEGA v100™ / ValorAiPlus Abstract Machine — "
              "Proprietary IP and trade secrets"),
         cell("ACTIVE")],
        [cell("ACAD-ORCID-0009-0007-0768-5486"),
         cell(f"Academic provenance registry — ORCID iD: {ORCID_ID} — "
              "Doctoral research assets"),
         cell("ACTIVE")],
        [cell("REG-04-HHS-INVESTIGATION"),
         cell("HHS OCR Region IX — Active ADA/Section 504 investigation"),
         cell("ACTIVE")],
        [cell("REG-05-CRD-INVESTIGATION"),
         cell("California CRD — Active FEHA/Fair Housing investigation"),
         cell("ACTIVE")],
    ]
    nodes_tbl = Table(nodes_rows,
                      colWidths=safe_widths([0.30, 0.50, 0.20]))
    nodes_tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), colors.HexColor("#1a1a2e")),
        ("TEXTCOLOR",     (0, 0), (-1, 0), colors.white),
        ("FONTNAME",      (0, 0), (-1, 0), "Times-Bold"),
        ("FONTNAME",      (0, 1), (-1, -1), "Times-Roman"),
        ("FONTSIZE",      (0, 0), (-1, -1), 10),
        ("LEADING",       (0, 0), (-1, -1), 14),
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1),
         [colors.HexColor("#f5f8ff"), colors.white]),
        ("BOX",           (0, 0), (-1, -1), 0.75, colors.black),
        ("INNERGRID",     (0, 0), (-1, -1), 0.25, colors.HexColor("#cccccc")),
        ("LEFTPADDING",   (0, 0), (-1, -1), 5),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 5),
        ("TOPPADDING",    (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(nodes_tbl)
    sp(story)

    h(story, "V. PRAYER FOR RELIEF", S)
    p(story,
      "Defendant respectfully requests that this Court:",
      S)
    sp(story, 0.3)
    numbered_list(story, [
        "Take judicial notice of the authenticated academic registry links, "
        "DOI registrations, and IPFS content identifiers embedded within "
        "this filing as evidence of Defendant's ownership of the described assets;",

        "Deny Plaintiff's application for summary adjudication pending full "
        "adjudication of the cross-claims for trade secret misappropriation, "
        "copyright infringement, and constructive eviction;",

        "Issue a preservation order directing Plaintiff, its agents, and "
        "litigation counsel to preserve all digital evidence, access logs, "
        "and communications related to the described assets;",

        "Grant such other and further relief as the Court deems just and proper.",
    ], S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 14 generated: {OUTPUT}")

build()
