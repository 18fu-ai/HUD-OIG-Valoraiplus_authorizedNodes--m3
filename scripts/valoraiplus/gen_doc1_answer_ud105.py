#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — DOC 1:
UD-105 ANSWER — UNLAWFUL DETAINER

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

OUTPUT = os.path.join(OUTPUT_DIR, "CUD-26-682107_Doc1_Answer_UD105.pdf")
DOC_TITLE = "DEFENDANT'S ANSWER TO COMPLAINT — UNLAWFUL DETAINER (UD-105)"

def build():
    doc   = make_doc(OUTPUT)
    S     = make_styles(12)
    story = []

    caption_block(story, S,
        f"Case No.: {CASE_UD}\n\n{DEPT}\n\n"
        f"{DOC_TITLE}\n\n"
        f"[Cal. Code Civ. Proc. §§ 1161, 1170.5; AB 2347]\n\n"
        f"Filed: {FILING_DATE}"
    )

    sp(story)
    story.append(Paragraph(DOC_TITLE, S["caption"]))
    sp(story)

    p(story,
      f"Defendant DONALD ERNEST GILLSON, appearing In Pro Per, hereby submits "
      f"this Answer to the Complaint for Unlawful Detainer filed by Plaintiff "
      f"{PLAINTIFF} in the above-captioned action.",
      S)
    sp(story)

    h(story, "I. DENIAL OF ALLEGATIONS", S)
    p(story,
      "Defendant generally and specifically denies each and every allegation "
      "contained in Plaintiff's Complaint and demands strict proof thereof.",
      S)
    sp(story)

    h(story, "II. AFFIRMATIVE DEFENSES", S)
    numbered_list(story, [
        # ── Defense 1 ───────────────────────────────────────────────────────
        "<b>DEF-NODE-01 — Void Verification / Bradford Signatory Fraud "
        "(CCP § 446; Penal Code § 115):</b> The Complaint was verified by "
        "Jerome Bradford, Interim Property Manager, who falsely represented "
        "personal knowledge of the matters alleged. Bradford holds no "
        "credential authorizing him to verify pleadings on behalf of the "
        "corporate plaintiff. The verification is void on its face and the "
        "entire complaint must be stricken.",

        # ── Defense 2 ───────────────────────────────────────────────────────
        "<b>DEF-NODE-02 — Retaliatory Eviction / 178-Day Interactive Process "
        "Default (Cal. Civ. Code § 1942.5):</b> Plaintiff failed to respond "
        "to Defendant's formal Reasonable Accommodation Request for 178 days "
        "(November 20, 2025 to May 19, 2026). This action was filed within "
        "the 180-day protected window, creating a statutory presumption of "
        "retaliation under Cal. Civ. Code § 1942.5.",

        # ── Defense 3 ───────────────────────────────────────────────────────
        "<b>DEF-NODE-03 — SMTP 550 Obstruction / Systemic Email Blockade "
        "(18 U.S.C. § 1512(c)):</b> Plaintiff's agents deployed a Mimecast "
        "email gateway resulting in 1,247+ SMTP 550 rejection events blocking "
        "Defendant's communications including communications to the Court "
        "Clerk. Cryptographic token: N7uA_6IQOCiwQL2ibFQZog.us448. This "
        "constitutes federal obstruction of justice.",

        # ── Defense 4 ───────────────────────────────────────────────────────
        "<b>DEF-NODE-04 — ADA Title II / FHA Disability Discrimination — "
        "Service Animal JAXX (42 U.S.C. § 12132; 42 U.S.C. § 3604(f); "
        "PAWS Act):</b> Plaintiff's agents endangered Defendant's federally "
        "protected service animal JAXX on six documented occasions. "
        "Refusal to accommodate a service animal constitutes per se "
        "discrimination under both the ADA and the Fair Housing Act.",

        # ── Defense 5 ───────────────────────────────────────────────────────
        "<b>DEF-NODE-05 — Federal Conflict of Interest "
        "(38 C.F.R. § 14.632; HUD 24 C.F.R. § 5.105):</b> Plaintiff "
        "operates federally funded permanent supportive housing. Active "
        "federal investigations are pending: HHS-OCR Case No. 25-621293 "
        "(Amy Horrell) and CCRD Case No. 202601-33270627 (Anna Moraga "
        "Archila). Plaintiff's eviction action violates federal program "
        "requirements.",

        # ── Defense 6 ───────────────────────────────────────────────────────
        "<b>DEF-NODE-06 — Travis AFB / Retaliatory Military Record "
        "Exploitation (38 U.S.C. § 4311; USERRA):</b> Plaintiff's attempt "
        "to weaponize Defendant's military service record constitutes "
        "unlawful discrimination against a veteran. Defendant's Travis AFB "
        "clearance and service record are active, documented, and protected "
        "under USERRA.",

        # ── Defense 7 ───────────────────────────────────────────────────────
        "<b>DEF-NODE-07 — Breach of Warranty of Habitability / Biohazard "
        "Vector Infestation (Cal. Civ. Code § 1941):</b> The subject "
        "premises contained documented cockroach vector infestation that "
        "injured service animal JAXX's lower extremities and caused a "
        "3.5-week constructive eviction block. This constitutes a breach "
        "of the implied warranty of habitability and bars rent collection.",

        # ── Defense 8 ───────────────────────────────────────────────────────
        "<b>DEF-NODE-08 — HIPAA Violation / William Losik PHI Disclosure "
        "(45 C.F.R. § 164.502):</b> Plaintiff's agent William Losik "
        "unlawfully disclosed Defendant's protected health information "
        "to third parties while simultaneously demanding HIPAA compliance "
        "from Defendant, constituting a willful HIPAA violation.",

        # ── Defense 9 ───────────────────────────────────────────────────────
        "<b>DEF-NODE-09 — Judicial Estoppel / 1,062-Email Trap — Zanghi "
        "Admission (42 U.S.C. § 1983):</b> Plaintiff's counsel John Zanghi "
        "acknowledged receipt of 1,062 documented emails, creating a binding "
        "judicial admission directly contradicting Plaintiff's claim of "
        "non-communication. Plaintiff is judicially estopped from asserting "
        "Defendant failed to communicate.",

        # ── Defense 10 ──────────────────────────────────────────────────────
        "<b>DEF-NODE-10 — Breach of Covenant of Quiet Enjoyment "
        "(Cal. Civ. Code § 1927):</b> Plaintiff's documented cockroach "
        "vector infestation causing injury to service animal JAXX and "
        "constituting a 3.5-week constructive eviction block constitutes "
        "a material breach of the covenant of quiet enjoyment. This breach "
        "creates an absolute statutory bar against rent collection and "
        "extinguishes Plaintiff's right to possession.",

        # ── Defense 11 ──────────────────────────────────────────────────────
        "<b>DEF-NODE-11 — Federal Enclave Doctrine / Jurisdictional Bar "
        "(U.S. Const. Art. I, § 8, cl. 17):</b> The subject property at "
        "1030 Girard Road is located within the boundaries of the Presidio "
        "of San Francisco, a federal enclave under exclusive federal "
        "sovereignty. This state court lacks subject matter jurisdiction "
        "over land disputes on the federal enclave, mandating immediate "
        "dismissal with prejudice.",

        # ── Defense 12 ──────────────────────────────────────────────────────
        "<b>DEF-NODE-12 — Unruh Civil Rights Act Violation "
        "(Cal. Civ. Code § 51):</b> Plaintiff's arbitrary refusal to "
        "permit Defendant's authorized cognitive prosthetic assistant "
        "constitutes discriminatory exclusion under the Unruh Civil Rights "
        "Act, expanding coverage from housing protections into general "
        "public accommodation civil rights violations.",

        # ── Defense 13 ──────────────────────────────────────────────────────
        "<b>DEF-NODE-13 — Illegal Lockout, Utility Disruption, and Tenant "
        "Harassment (Cal. Civ. Code § 789.3):</b> Plaintiff's agents "
        "intentionally withdrew clinical supportive housing care, tampered "
        "with Defendant's access card, and conducted targeted physical "
        "intimidation of Veterans Tenant Union members Jeffrey Wright and "
        "Jerome Bartlett. This triggers statutory liquidated damages of "
        "$100 per day per violation under Cal. Civ. Code § 789.3.",
    ], S)
    sp(story)

    h(story, "III. PRAYER FOR RELIEF", S)
    numbered_list(story, [
        "That judgment be entered in favor of Defendant;",
        "That Plaintiff's Complaint be dismissed with prejudice;",
        "That Defendant be awarded attorney fees and costs under "
        "Cal. Code Civ. Proc. § 1021.5;",
        "That the Court issue a protective order against further "
        "retaliatory housing actions;",
        "Such other and further relief as the Court deems just and proper.",
    ], S)
    sp(story)

    closing_signature(story, S)
    esign_block(story, S, DOC_TITLE)
    pos_block(story, S, DOC_TITLE)

    doc.build(story)
    print(f"✓ Doc 1 generated: {OUTPUT}")

build()
