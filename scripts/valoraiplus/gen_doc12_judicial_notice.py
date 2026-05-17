#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 12:
DEFENDANT'S REQUEST FOR JUDICIAL NOTICE OF ACTIVE FEDERAL AND STATE INVESTIGATIONS
Pursuant to California Evidence Code §§ 452(c), 452(h), and 453

Investigations noticed:
  (1) REG-04-HHS-INVESTIGATION — U.S. Dept. of Health & Human Services,
      Office for Civil Rights, Region IX — Active ADA/Section 504 Investigation
  (2) REG-05-CRD-INVESTIGATION — California Civil Rights Department —
      Active FEHA/Fair Housing Investigation

Case No.: CUD-26-682107 | Department 12
Filed By: DONALD ERNEST GILLSON, Defendant / Cross-Complainant, In Pro Per
NODE AUTHORITY: SGAU-7226.3461 // Saint Paul Node
"""
import sys
sys.path.insert(0, "/home/ubuntu/valoraiplus_core")
from pleading_base import (
    make_doc, make_styles, sp, hr, p, h, numbered_list,
    esign_table, service_table,
    TEXT_W, CASE_UD, DEPT, FILING_DATE,
    DEFENDANT, DEF_ADDR1, DEF_ADDR2, DEF_EMAIL,
    NODE_AUTH, FRAMEWORK_ESIGN, JEFFREY_ESIGN, JEFFREY_ROLE,
    ORCID_ID,,
    safe_widths, safe_widths_abs,
)
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER

OUTPUT = "/home/ubuntu/valoraiplus_core/CUD-26-682107_Doc12_RequestJudicialNotice.pdf"

PLAINTIFF  = "SWORDS TO PLOWSHARES, a California Nonprofit Corporation"
LANDRUM    = "William Landrum"
ZANGHI     = "John Nicholas Zanghi, Esq. (Bar No. 320531)"
WHITE      = "Bradford Christopher White, Esq. (Bar No. 297746)"
PROP_ADDR  = "1030 Girard Road, San Francisco, California 94129"

def cell(text, font="Times-Roman", size=10, bold=False):
    fname = "Times-Bold" if bold else font
    style = ParagraphStyle(
        "cell", fontName=fname, fontSize=size, leading=size + 3,
        spaceAfter=0, spaceBefore=0, leftIndent=0, rightIndent=0,
        alignment=TA_LEFT,
    )
    return Paragraph(text, style)

def investigation_table(story, rows_data):
    rows = [[cell(lbl, bold=True), cell(val)] for lbl, val in rows_data]
    tbl = Table(rows, colWidths=safe_widths([0.27, 0.73]))
    tbl.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
        ("TOPPADDING",    (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("ROWBACKGROUNDS",(0, 0), (-1, -1),
         [colors.HexColor("#eef2f7"), colors.white]),
        ("BOX",           (0, 0), (-1, -1), 0.75, colors.black),
        ("INNERGRID",     (0, 0), (-1, -1), 0.25, colors.HexColor("#cccccc")),
    ]))
    story.append(tbl)

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    # ── CAPTION ──────────────────────────────────────────────────────────────
    story.append(Paragraph("SUPERIOR COURT OF THE STATE OF CALIFORNIA", S["caption"]))
    story.append(Paragraph("FOR THE COUNTY OF SAN FRANCISCO", S["caption"]))
    sp(story)
    hr(story)
    sp(story, 0.3)

    # Two-column caption block
    cap_rows = [[
        cell(f"{PLAINTIFF},\n\nPlaintiff,\n\nvs.\n\n{DEFENDANT},\n\nDefendant.",
             size=11),
        cell(f"Case No.: {CASE_UD}\n\n{DEPT}\n\nDEFENDANT'S REQUEST FOR "
             f"JUDICIAL NOTICE OF ACTIVE FEDERAL AND STATE INVESTIGATIONS\n\n"
             f"[Cal. Evid. Code §§ 452(c), 452(h), 453]\n\n"
             f"Date: Per Court Calendar\nTime: Per Court Calendar\n"
             f"Dept.: 12\nJudge: Assigned",
             size=11),
    ]]
    cap_tbl = Table(cap_rows, colWidths=safe_widths([0.44, 0.56]))
    cap_tbl.setStyle(TableStyle([
        ("VALIGN",      (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING",(0, 0), (-1, -1), 4),
        ("TOPPADDING",  (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING",(0,0), (-1, -1), 4),
        ("BOX",         (0, 0), (-1, -1), 0.75, colors.black),
        ("LINEAFTER",   (0, 0), (0, -1),  0.75, colors.black),
    ]))
    story.append(cap_tbl)
    sp(story)
    hr(story)

    # ── INTRODUCTION ─────────────────────────────────────────────────────────
    sp(story)
    story.append(Paragraph("REQUEST FOR JUDICIAL NOTICE", S["caption"]))
    sp(story)
    p(story,
      f"TO THE HONORABLE COURT, ALL PARTIES, AND THEIR COUNSEL OF RECORD:",
      S, "heading")
    sp(story, 0.3)
    p(story,
      f"Defendant DONALD ERNEST GILLSON, In Pro Per, hereby respectfully requests "
      f"that this Court take judicial notice, pursuant to California Evidence Code "
      f"sections 452(c) and 452(h), of the following official acts, records, and "
      f"facts of general notoriety: specifically, two active government investigations "
      f"directly arising from the same facts, parties, and property at issue in the "
      f"above-captioned unlawful detainer proceeding. These investigations are "
      f"material to Defendant's affirmative defenses and cross-claims, and their "
      f"existence constitutes a mandatory retaliation bar under California Civil Code "
      f"section 1942.5(d).",
      S)
    sp(story)

    # ── LEGAL STANDARD ───────────────────────────────────────────────────────
    h(story, "I. LEGAL STANDARD FOR JUDICIAL NOTICE", S)
    p(story,
      "California Evidence Code section 452 provides that judicial notice <i>may</i> "
      "be taken of: (c) official acts of the legislative, executive, and judicial "
      "departments of the United States and of any state of the United States; and "
      "(h) facts and propositions that are not reasonably subject to dispute and are "
      "capable of immediate and accurate determination by resort to sources of "
      "reasonably indisputable accuracy.",
      S)
    sp(story, 0.3)
    p(story,
      "Evidence Code section 453 provides that the trial court <i>shall</i> take "
      "judicial notice of any matter specified in section 452 if a party requests it "
      "and provides the court with sufficient information to enable it to take "
      "judicial notice of the matter. Defendant provides that information herein.",
      S)
    sp(story)

    # ── MATTER 1: HHS OCR ────────────────────────────────────────────────────
    h(story, "II. MATTER NO. 1 — ACTIVE HHS OFFICE FOR CIVIL RIGHTS INVESTIGATION", S)
    p(story,
      "Defendant requests judicial notice of the following official federal "
      "investigative proceeding:",
      S)
    sp(story, 0.3)
    investigation_table(story, [
        ("Agency:",          "U.S. Department of Health and Human Services (HHS), "
                             "Office for Civil Rights (OCR), Region IX — San Francisco"),
        ("Node Reference:",  "REG-04-HHS-INVESTIGATION"),
        ("Subject Matter:",  "Disability discrimination and failure to provide "
                             "reasonable accommodation in federally assisted housing "
                             "program, in violation of Section 504 of the "
                             "Rehabilitation Act of 1973 (29 U.S.C. § 794) and "
                             "Title II of the Americans with Disabilities Act "
                             "(42 U.S.C. § 12132)"),
        ("Respondent:",      f"{PLAINTIFF}; {LANDRUM}, Property Manager"),
        ("Property:",        PROP_ADDR),
        ("Status:",          "ACTIVE — Investigation opened and pending as of "
                             f"{FILING_DATE}"),
        ("Complainant:",     f"{DEFENDANT}, ORCID iD: {ORCID_ID}"),
        ("Relevance:",       "The same disability accommodation requests denied "
                             "by Respondents that form the basis of this federal "
                             "investigation are the identical requests that "
                             "Plaintiff's counsel has cited as grounds for the "
                             "unlawful detainer. The filing of this UD action "
                             "during a pending federal investigation constitutes "
                             "retaliatory eviction per se under Cal. Civ. Code "
                             "§ 1942.5(d)."),
    ])
    sp(story)

    # ── MATTER 2: CRD ────────────────────────────────────────────────────────
    h(story, "III. MATTER NO. 2 — ACTIVE CALIFORNIA CIVIL RIGHTS DEPARTMENT INVESTIGATION", S)
    p(story,
      "Defendant requests judicial notice of the following official state "
      "investigative proceeding:",
      S)
    sp(story, 0.3)
    investigation_table(story, [
        ("Agency:",          "California Civil Rights Department (CRD), formerly "
                             "the Department of Fair Employment and Housing (DFEH)"),
        ("Node Reference:",  "REG-05-CRD-INVESTIGATION"),
        ("Subject Matter:",  "Housing discrimination on the basis of disability "
                             "and source of income, in violation of the California "
                             "Fair Employment and Housing Act (Gov. Code § 12955 "
                             "et seq.) and the Unruh Civil Rights Act "
                             "(Cal. Civ. Code § 51 et seq.)"),
        ("Respondent:",      f"{PLAINTIFF}; {LANDRUM}, Property Manager"),
        ("Property:",        PROP_ADDR),
        ("Status:",          "ACTIVE — Complaint accepted and investigation pending "
                             f"as of {FILING_DATE}"),
        ("Complainant:",     f"{DEFENDANT}, ORCID iD: {ORCID_ID}"),
        ("Relevance:",       "The CRD investigation directly overlaps with the "
                             "factual predicate of Plaintiff's unlawful detainer "
                             "complaint. Under California Government Code section "
                             "12955(f), any eviction that is motivated in whole or "
                             "in part by a tenant's exercise of fair housing rights "
                             "is unlawful. The pendency of this investigation "
                             "creates a presumption of retaliatory motive."),
    ])
    sp(story)

    # ── LEGAL EFFECT ─────────────────────────────────────────────────────────
    story.append(PageBreak())
    h(story, "IV. LEGAL EFFECT OF JUDICIAL NOTICE ON THIS PROCEEDING", S)
    p(story,
      "The existence of these two active government investigations has the following "
      "direct legal consequences for this unlawful detainer proceeding:",
      S)
    sp(story, 0.3)
    numbered_list(story, [
        "<b>Mandatory Retaliation Bar — Cal. Civ. Code § 1942.5(d):</b> "
        "A landlord may not bring or maintain an action for possession within "
        "180 days after a tenant has exercised any right under law, including "
        "filing a complaint with a government agency. Both investigations were "
        "opened as a direct result of Defendant's exercise of housing rights. "
        "This action is therefore barred as a matter of law.",

        "<b>Federal Preemption — Section 504 / ADA:</b> "
        "Where a federal civil rights investigation is pending concerning the "
        "same subject matter and parties, state court proceedings that would "
        "effectively adjudicate the federal claim are subject to stay or "
        "deference under principles of federal-state comity.",

        "<b>Affirmative Defense — FEHA § 12955(f):</b> "
        "The pendency of the CRD investigation raises a presumption of "
        "discriminatory and retaliatory motive that Plaintiff must rebut by "
        "clear and convincing evidence before this Court may enter judgment "
        "for possession.",

        "<b>Judicial Economy:</b> "
        "Proceeding to judgment in this UD action while two government "
        "investigations are pending risks inconsistent adjudications and "
        "wastes judicial resources. A continuance or stay is warranted "
        "pending resolution of the administrative proceedings.",

        "<b>Evidentiary Weight:</b> "
        "The official acts of the HHS OCR and CRD in accepting these "
        "complaints for investigation constitute official government "
        "determinations that the allegations are facially sufficient to "
        "support a finding of discrimination — a fact this Court may "
        "consider in evaluating Defendant's affirmative defenses.",
    ], S)
    sp(story)

    # ── PROPOSED ORDER ───────────────────────────────────────────────────────
    h(story, "V. PROPOSED ORDER", S)
    p(story,
      "Defendant respectfully requests that the Court issue the following order:",
      S)
    sp(story, 0.3)
    order_rows = [
        [cell("ORDER RE: JUDICIAL NOTICE", bold=True, size=11)],
        [cell(
            f"The Court hereby takes judicial notice of the following:\n\n"
            f"1. The active investigation by the U.S. Department of Health and "
            f"Human Services, Office for Civil Rights, Region IX (Node Ref.: "
            f"REG-04-HHS-INVESTIGATION), concerning disability discrimination "
            f"and failure to accommodate at {PROP_ADDR}.\n\n"
            f"2. The active investigation by the California Civil Rights "
            f"Department (Node Ref.: REG-05-CRD-INVESTIGATION), concerning "
            f"housing discrimination on the basis of disability and source of "
            f"income at {PROP_ADDR}.\n\n"
            f"The Court further finds that the pendency of these investigations "
            f"is material to Defendant's affirmative defenses and shall be "
            f"considered in all further proceedings in this action.",
            size=11
        )],
        [cell(
            f"IT IS SO ORDERED.\n\n"
            f"Date: ___________________     "
            f"Judge, San Francisco Superior Court, {DEPT}",
            size=11
        )],
    ]
    order_tbl = Table(order_rows, colWidths=[TEXT_W])
    order_tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), colors.HexColor("#1a1a2e")),
        ("TEXTCOLOR",     (0, 0), (-1, 0), colors.white),
        ("FONTNAME",      (0, 0), (-1, 0), "Times-Bold"),
        ("FONTSIZE",      (0, 0), (-1, -1), 11),
        ("LEADING",       (0, 0), (-1, -1), 15),
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",   (0, 0), (-1, -1), 8),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 8),
        ("TOPPADDING",    (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("BOX",           (0, 0), (-1, -1), 1.0, colors.black),
        ("INNERGRID",     (0, 0), (-1, -1), 0.5, colors.HexColor("#cccccc")),
        ("ROWBACKGROUNDS",(0, 1), (-1, -1),
         [colors.HexColor("#f5f8ff"), colors.white]),
    ]))
    story.append(order_tbl)
    sp(story)

    # ── CONCLUSION ───────────────────────────────────────────────────────────
    h(story, "VI. CONCLUSION", S)
    p(story,
      f"For the foregoing reasons, Defendant DONALD ERNEST GILLSON respectfully "
      f"requests that this Court take judicial notice of the two active government "
      f"investigations identified herein, and that the Court give full legal effect "
      f"to those investigations in all further proceedings in this action, including "
      f"but not limited to the mandatory retaliation bar of California Civil Code "
      f"section 1942.5(d) and the affirmative defenses raised in Defendant's "
      f"Answer filed herein.",
      S)
    sp(story)
    p(story,
      f"Respectfully submitted,",
      S)
    sp(story, 0.3)
    p(story,
      f"Dated: {FILING_DATE}",
      S)
    sp(story, 0.3)
    p(story,
      f"/s/ Donald Ernest Gillson<br/>"
      f"DONALD ERNEST GILLSON<br/>"
      f"Defendant / Cross-Complainant, In Pro Per<br/>"
      f"{DEF_ADDR1}<br/>{DEF_ADDR2}<br/>"
      f"ORCID iD: {ORCID_ID}<br/>"
      f"Node Authority: {NODE_AUTH}",
      S)
    sp(story)
    hr(story)

    # ── E-SIGN ATTESTATION ───────────────────────────────────────────────────
    sp(story)
    story.append(Paragraph("ELECTRONIC SIGNATURE ATTESTATION", S["caption"]))
    sp(story, 0.3)
    p(story,
      f"This document has been electronically signed pursuant to the Electronic "
      f"Signatures in Global and National Commerce Act (E-SIGN Act), 15 U.S.C. "
      f"§ 7001 et seq., and the California Uniform Electronic Transactions Act "
      f"(UETA), California Civil Code § 1633.1 et seq. The electronic signature "
      f"of the filing party and the witness e-service signer constitutes a legally "
      f"binding signature equivalent to a handwritten signature for all purposes "
      f"under California and federal law.",
      S, "small")
    sp(story, 0.3)
    esign_table(story, [
        [Paragraph("Filing Party:", S["esign_label"]),
         Paragraph(f"/s/ Donald Ernest Gillson — {DEFENDANT}, In Pro Per",
                   S["esign_value"])],
        [Paragraph("Authority:", S["esign_label"]),
         Paragraph(f"{FRAMEWORK_ESIGN}", S["esign_value"])],
        [Paragraph("ORCID iD:", S["esign_label"]),
         Paragraph(ORCID_ID, S["esign_value"])],
        [Paragraph("Node Auth:", S["esign_label"]),
         Paragraph(NODE_AUTH, S["esign_value"])],
        [Paragraph("Witness Signer:", S["esign_label"]),
         Paragraph(JEFFREY_ESIGN, S["esign_value"])],
        [Paragraph("Witness Role:", S["esign_label"]),
         Paragraph(JEFFREY_ROLE, S["esign_value"])],
        [Paragraph("Date:", S["esign_label"]),
         Paragraph(FILING_DATE, S["esign_value"])],
    ], S)
    sp(story)
    hr(story)

    # ── PROOF OF ELECTRONIC SERVICE ──────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("PROOF OF ELECTRONIC SERVICE", S["caption"]))
    sp(story, 0.3)
    p(story,
      f"I, Jeffrey Wright, am a member of the Veterans Tenant Union and a material "
      f"eyewitness in the above-captioned matter. I am over the age of 18 and not "
      f"a party to this action. On {FILING_DATE}, I served the foregoing "
      f"DEFENDANT'S REQUEST FOR JUDICIAL NOTICE OF ACTIVE FEDERAL AND STATE "
      f"INVESTIGATIONS on the following parties by electronic transmission "
      f"pursuant to California Code of Civil Procedure section 1010.6 and "
      f"California Rules of Court, Rule 2.251:",
      S, "small")
    sp(story, 0.3)
    service_table(story, [
        [cell("Party / Counsel", bold=True),
         cell("Service Method", bold=True),
         cell("Address / Reference", bold=True)],
        [cell("John Nicholas Zanghi, Esq.\nBar No. 320531\nCounsel for Plaintiff"),
         cell("Electronic Service\nCCP § 1010.6"),
         cell("Via eCourt Electronic\nService Portal —\nSF Superior Court")],
        [cell("Bradford Christopher White, Esq.\nBar No. 297746\nCounsel for Plaintiff"),
         cell("Electronic Service\nCCP § 1010.6"),
         cell("Via eCourt Electronic\nService Portal —\nSF Superior Court")],
        [cell(f"San Francisco Superior Court\n{DEPT}"),
         cell("eCourt E-Filing"),
         cell("courtinfo.ca.gov/\nsfsuperiorcourt")],
    ], S)
    sp(story, 0.3)
    p(story,
      f"I declare under penalty of perjury under the laws of the State of "
      f"California that the foregoing is true and correct.",
      S, "small")
    sp(story, 0.3)
    p(story,
      f"Executed on {FILING_DATE}, in San Francisco, California.",
      S, "small")
    sp(story, 0.3)
    p(story,
      f"{JEFFREY_ESIGN}<br/>"
      f"Jeffrey Wright<br/>"
      f"{JEFFREY_ROLE}",
      S, "small")

    doc.build(story)
    print(f"✓ Doc 12 generated: {OUTPUT}")

build()
