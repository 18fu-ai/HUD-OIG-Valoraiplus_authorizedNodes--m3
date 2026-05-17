# scripts/valoraiplus/gen_doc1_answer_ud105.py
# ══════════════════════════════════════════════════════════════════════════════
# VALORAIPLUS® OMEGA v100™ | NODE AUTHORITY: SGAU-7226.3461 // Saint Paul Node®
# Generator: Doc 1 — Form UD-105 Answer to Complaint for Unlawful Detainer
# Enforces 13 Structured Affirmative Defenses, General Denial, and 24pt Grid.
# ══════════════════════════════════════════════════════════════════════════════

import os
import sys
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, KeepTogether, PageBreak
from reportlab.lib import colors

# Ensure local execution environment can import the base architecture module
sys.path.append(os.path.join(os.getcwd(), 'scripts', 'valoraiplus'))
try:
    import pleading_base as pb
except ImportError:
    raise ImportError("[!] Critical Error: 'pleading_base.py' must be initialized within the execution path.")

def generate_ud105_answer(output_pdf_path):
    doc    = pb.make_doc(output_pdf_path)
    styles = pb.make_styles(font_size=12)
    story  = []

    # ──────────────────────────────────────────────────────────────────────────
    # LAYER 1: ATTORNEY OF RECORD / IN PRO PER CAPTION HEADER BLOCK
    # ──────────────────────────────────────────────────────────────────────────
    pb.p(story, f"<b>{pb.DEFENDANT}</b>", styles, "body")
    pb.p(story, f"{pb.DEF_ADDR1}", styles, "body")
    pb.p(story, f"{pb.DEF_ADDR2}", styles, "body")
    pb.p(story, f"Electronic Service Endpoint: {pb.DEF_EMAIL}", styles, "body")
    pb.p(story, f"Sovereign Footprint Ident: ORCID {pb.ORCID_ID}", styles, "body")
    pb.p(story, "Defendant, In Pro Per", styles, "body")
    pb.sp(story, 1)

    # ──────────────────────────────────────────────────────────────────────────
    # LAYER 2: COURT CAPTION FORM FACTOR DESIGN
    # ──────────────────────────────────────────────────────────────────────────
    caption_data = [
        [
            Paragraph("<b>SUPERIOR COURT OF THE STATE OF CALIFORNIA</b><br/>"
                      "<b>FOR THE CITY AND COUNTY OF SAN FRANCISCO</b>", styles["center"]),
            Paragraph("", styles["body"])
        ],
        [
            Paragraph("<br/><b>SAN FRANCISCO TENANT RIGHTS COALITION / "
                      "ST. PETER'S HOUSING COMMITTEE, et al.</b>,<br/>"
                      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plaintiffs,<br/>"
                      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v.<br/>"
                      f"<b>{pb.DEFENDANT}</b>, an individual; and ALL OCCUPANTS,<br/>"
                      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Defendants.",
                      styles["body"]),
            Paragraph(f"<br/>Case No.: <b>{pb.CASE_ID}</b><br/>"
                      f"Department: <b>{pb.DEPT}</b><br/><br/>"
                      "<b>DEFENDANT'S VERIFIED ANSWER TO COMPLAINT FOR "
                      "UNLAWFUL DETAINER [FORM UD-105]</b><br/><br/>"
                      "Filing Date: May 18, 2026<br/>"
                      "Trial Date: None Set", styles["body"])
        ]
    ]

    col_w = pb.safe_widths([0.54, 0.46])
    caption_table = Table(caption_data, colWidths=col_w)
    caption_table.setStyle(TableStyle([
        ('VALIGN',        (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING',   (0, 0), (-1, -1), 0),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 4),
        ('TOPPADDING',    (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('LINEAFTER',     (0, 1), (0, 1), 1.0, colors.HexColor("#A0A0A0")),
    ]))
    story.append(caption_table)
    pb.sp(story, 1)

    # ──────────────────────────────────────────────────────────────────────────
    # LAYER 3: INTRODUCTORY DECLARATION & GENERAL DENIAL
    # ──────────────────────────────────────────────────────────────────────────
    pb.p(story,
         "<b>TO THE HONORABLE COURT, ALL PARTIES, AND THEIR ATTORNEYS OF RECORD:</b>",
         styles, "body")
    pb.p(story,
         f"Defendant, {pb.DEFENDANT}, answering the Unlawful Detainer Complaint of "
         "Plaintiffs on file herein in Pro Per, responds to the unverified allegations "
         "of the complaint pursuant to California Code of Civil Procedure Section "
         "431.30 as follows:",
         styles, "body")
    pb.sp(story, 1)

    pb.h(story, "<b>GENERAL DENIAL (Cal. Code Civ. Proc. § 431.30)</b>", styles)
    pb.p(story,
         "1. Pursuant to California Code of Civil Procedure Section 431.30(d), "
         "Defendant generally denies each and every material allegation contained "
         "within the Plaintiffs' Unlawful Detainer Complaint, and further denies that "
         "Plaintiffs have been damaged in any sum whatsoever, or that Plaintiffs are "
         "entitled to any relief, possession, rent, damages, or attorney's fees.",
         styles, "body")
    pb.sp(story, 1)

    # ──────────────────────────────────────────────────────────────────────────
    # LAYER 4: DEFINITIVE 13 AFFIRMATIVE DEFENSES CORE MATRIX
    # ──────────────────────────────────────────────────────────────────────────
    pb.h(story, "<b>AFFIRMATIVE DEFENSES (Cal. Code Civ. Proc. § 431.30)</b>", styles)
    pb.p(story,
         "As separate and distinct Affirmative Defenses to the allegations contained "
         "within Plaintiffs' Unlawful Detainer Complaint, Defendant alleges as follows:",
         styles, "body")
    pb.sp(story, 1)

    defenses = [
        "<b>FIRST AFFIRMATIVE DEFENSE: Total Breach of Implied Warranty of "
        "Habitability (Cal. Civ. Code § 1941.1).</b> Plaintiffs failed to maintain "
        "the premises in a habitable condition, specifically permitting a severe, "
        "unchecked cockroach and insect vector infestation that directly caused bodily "
        "injuries to Defendant's service animal, <b>JAXX</b>, and initiated a 3.5-week "
        "constructive eviction.",

        "<b>SECOND AFFIRMATIVE DEFENSE: Fair Housing Act Disability Discrimination "
        "(42 U.S.C. § 3604).</b> Plaintiffs discriminated against Defendant based on "
        "physical and psychological disability by intentionally failing to accommodate "
        "and actively interfering with Defendant's task-trained service dog, <b>JAXX</b>, "
        "in violation of federal statutory mandates.",

        "<b>THIRD AFFIRMATIVE DEFENSE: FEHA Housing Discrimination "
        "(Cal. Gov. Code § 12955).</b> Plaintiffs engaged in unlawful discriminatory "
        "housing practices under the California Fair Employment and Housing Act by "
        "creating a hostile housing environment, targeting Defendant's protected "
        "disabled veteran status and withdrawing supportive clinical assistance.",

        "<b>FOURTH AFFIRMATIVE DEFENSE: Presumptive Landlord Retaliation "
        "(Cal. Civ. Code § 1942.5).</b> Plaintiffs initiated these summary eviction "
        "proceedings within 180 days of Defendant filing formal complaints regarding "
        "building safety hazards, hallway drug contamination, and loose hazardous "
        "particulate matter, rendering the action presumptively retaliatory and void.",

        "<b>FIFTH AFFIRMATIVE DEFENSE: Forensic Server Communication Obstruction "
        "(18 U.S.C. § 1512(c)).</b> Plaintiffs intentionally engineered a 178-day "
        "administrative communications blockade by executing an SMTP 550 server-level "
        "rejection token against Defendant's primary digital endpoint "
        "(dgillson9175@gmail.com) to block notice of unsafe conditions. "
        "Token: N7uA_6IQOCiwQL2ibFQZog.us448.",

        "<b>SIXTH AFFIRMATIVE DEFENSE: Defective Verification under CCP § 2015.5 "
        "(The Bradford Nullity).</b> The underlying Unlawful Detainer Complaint lacks "
        "a legally sufficient verification executed under penalty of perjury within "
        "the State of California pursuant to Code of Civil Procedure Section 2015.5. "
        "A defect in verification deprives the summary action of its statutory basis.",

        "<b>SEVENTH AFFIRMATIVE DEFENSE: Strict Failure to Engage in the Interactive "
        "Accommodation Process.</b> Plaintiffs directly refused to participate in good "
        "faith in a timely interactive process after receiving clear, formal written "
        "requests for accommodation regarding Defendant's specialized communication "
        "aids and task-trained service animal.",

        "<b>EIGHTH AFFIRMATIVE DEFENSE: Unlawful Witness Intimidation and Coercion "
        "(18 U.S.C. § 1512).</b> Plaintiffs and their operational agents executed "
        "targeted retaliatory measures, physical harassment, and intimidation against "
        "Defendant's material eyewitnesses and leadership members of the Veterans "
        "Tenant Union, including Jeffrey Wright and Jerome Bartlett.",

        "<b>NINTH AFFIRMATIVE DEFENSE: Civil Rights Violations Under Color of Law "
        "(42 U.S.C. § 1983).</b> Plaintiffs, acting in concert with state-funded and "
        "municipal housing authorities under color of state law, deprived Defendant of "
        "due process and equal protection by deploying summary eviction machinery to "
        "cover up systemic statutory non-compliance.",

        "<b>TENTH AFFIRMATIVE DEFENSE: Continuous Breach of the Covenant of Quiet "
        "Enjoyment (Cal. Civ. Code § 1927).</b> Plaintiffs directly disrupted "
        "Defendant's peaceable possession by permitting pervasive vector infestations, "
        "security breakdowns, and targeted structural harassment, completely destroying "
        "the residential utility of the leasehold estate.",

        "<b>ELEVENTH AFFIRMATIVE DEFENSE: Absolute Territorial Jurisdiction Bar Under "
        "the Federal Enclave Doctrine (U.S. Const. Art. I, § 8, cl. 17).</b> The "
        "subject property located at 1030 Girard Road resides entirely within a federal "
        "enclave (The Presidio of San Francisco) under exclusive federal sovereignty. "
        "The state court lacks territorial or subject matter jurisdiction over summary "
        "property actions on this land.",

        "<b>TWELFTH AFFIRMATIVE DEFENSE: Arbitrary Public Exclusion and Discrimination "
        "Under the Unruh Civil Rights Act (Cal. Civ. Code § 51).</b> Plaintiffs "
        "practiced arbitrary discrimination by refusing to recognize the lawful "
        "operation of Defendant's authorized cognitive prosthetic assistant, N.E.W.T., "
        "systematically denying equal access to housing accommodations.",

        "<b>THIRTEENTH AFFIRMATIVE DEFENSE: Illegal Utility Disruption, Care "
        "Interruption, and Statutory Harassment (Cal. Civ. Code § 789.3).</b> "
        "Plaintiffs intentionally interfered with Defendant's tenancy by interrupting "
        "supportive case management services, manipulating access locks, and carrying "
        "out retaliatory structural blockades, triggering mandatory statutory damages "
        "of $100 per day per violation.",
    ]

    pb.numbered_list(story, defenses, styles, style="body")
    pb.sp(story, 1)

    # ──────────────────────────────────────────────────────────────────────────
    # LAYER 5: PRAYER FOR RELIEF & E-SIGN VERIFICATION BLOCK
    # ──────────────────────────────────────────────────────────────────────────
    pb.h(story, "<b>PRAYER FOR RELIEF</b>", styles)
    pb.p(story,
         "WHEREFORE, Defendant prays that Plaintiffs take nothing by their complaint; "
         "that judgment be rendered in favor of Defendant; that Defendant be awarded "
         "statutory damages pursuant to Civil Code Section 789.3; that Defendant be "
         "awarded reasonable costs and attorney's fees incurred herein; and for such "
         "other and further relief as the Court deems just and proper.",
         styles, "body")
    pb.sp(story, 1)

    sig_block = []
    pb.p(sig_block,
         "<b>VERIFICATION (Cal. Code Civ. Proc. § 446 / § 2015.5)</b>",
         styles, "bold_c")
    pb.p(sig_block,
         "I, DONALD ERNEST GILLSON, declare under penalty of perjury under the laws "
         "of the State of California that I am the Defendant in the above-entitled "
         "action; that I have read the foregoing Verified Answer and know the contents "
         "thereof; that the same is true of my own knowledge, except as to those "
         "matters stated on information and belief, and as to those matters, I believe "
         "them to be true.",
         styles, "body")
    pb.sp(sig_block, 1)

    esign_data = [
        ["Executed Date:",          "May 18, 2026"],
        ["Location:",               "San Francisco, California // Node SGAU-7226.3461"],
        ["Electronic Signature:",   f"/s/ {pb.DEFENDANT} [Authorized In Pro Per Litigant]"],
        ["Cryptographic Attestation:", f"Framework: {pb.FRAMEWORK_ESIGN} // Serial: 0UAK57S1BT"],
    ]
    pb.esign_table(sig_block, esign_data, styles)
    story.append(KeepTogether(sig_block))

    # ──────────────────────────────────────────────────────────────────────────
    # LAYER 6: PROOF OF ELECTRONIC SERVICE (CCP § 1010.6 / CRC Rule 2.251)
    # ──────────────────────────────────────────────────────────────────────────
    story.append(PageBreak())

    pos_block = []
    pb.p(pos_block,
         "<b>PROOF OF ELECTRONIC SERVICE "
         "(Cal. Code Civ. Proc. § 1010.6 / CRC Rule 2.251)</b>",
         styles, "bold_c")
    pb.p(pos_block,
         "I, Jeffrey Wright, declare as follows: I am over the age of 18 years, a "
         "member of the Veterans Tenant Union Leadership, and not a party to the "
         "within-entitled cause. My transmission node identifier is authenticated "
         "pursuant to 15 U.S.C. Sec. 7001(c)(1). On May 18, 2026, I served the "
         "attached <b>DEFENDANT'S VERIFIED ANSWER TO COMPLAINT FOR UNLAWFUL "
         "DETAINER</b> on the parties listed below by electronic transmission:",
         styles, "body")
    pb.sp(pos_block, 1)

    service_recipients = [
        ["Recipient Full Name & Role",          "Electronic Service Node",            "Timestamp"],
        ["Richard Zanghi, Esq.\nCounsel for Plaintiffs",
         "rzanghi@sftrc-law.org",               "May 18, 2026 08:00 AM PDT\n[TRANSMITTED]"],
        ["William Landrum\nProperty Manager",
         "(415) 748-7687\n[SMS Gateway]",        "May 18, 2026 08:00 AM PDT\n[DELIVERED]"],
        ["Amy Horrell / HHS-OCR\nFederal Civil Rights",
         "Amy.Horrell@hhs.gov\nCase #25-621293", "May 18, 2026 08:15 AM PDT\n[COURTESY COPY]"],
        ["Anna Moraga Archila / CRD\nState Civil Rights",
         "anna.archila@crd.ca.gov\nCase #202601-33270627",
         "May 18, 2026 08:15 AM PDT\n[COURTESY COPY]"],
    ]
    pb.service_table(pos_block, service_recipients, styles)
    pb.sp(pos_block, 1)

    pb.p(pos_block,
         "I declare under penalty of perjury under the laws of the State of California "
         "that the foregoing is true and correct, and that this electronic transmission "
         "was initiated with server validation token "
         "<b>N7uA_6IQOCiwQL2ibFQZog.us448</b>.",
         styles, "body")
    pb.sp(pos_block, 1)

    pos_esign = [
        ["Attestation Date:",    "May 18, 2026"],
        ["Witness Identity:",    f"{pb.JEFFREY_ROLE}"],
        ["Electronic Execution:", f"{pb.JEFFREY_ESIGN}"],
    ]
    pb.esign_table(pos_block, pos_esign, styles)
    story.append(KeepTogether(pos_block))

    # ── BUILD ─────────────────────────────────────────────────────────────────
    pb.build_doc(doc, story)


if __name__ == "__main__":
    target_output = "CUD-26-682107_Doc1_Answer_UD105_FINAL.pdf"
    print("[*] Initializing compilation sequence for primary defensive core...")
    generate_ud105_answer(target_output)
    print(f"[✓] SUCCESS: Conformed pleading output written to '{target_output}'.")
