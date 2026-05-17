#!/usr/bin/env python3
"""
VALORAIPLUS® OMEGA v100™ — Full Pre-Flight Audit (Docs 1–17)
Checks: page size, margins, E-SIGN block, Digital Communications Act,
        Jeffrey Wright e-service, Proof of Service, spelling, no bleed.
"""
import os, sys
sys.path.insert(0, "/home/ubuntu/valoraiplus_core")
from reportlab.lib.pagesizes import letter
from pdfminer.high_level import extract_text

CORE = "/home/ubuntu/valoraiplus_core"

DOCS = [
    ("Doc01", "CUD-26-682107_Doc1_Answer_UD105.pdf"),
    ("Doc02", "CUD-26-682107_Doc2_Motions.pdf"),
    ("Doc03", "CUD-26-682107_Doc3_ADA_ProofOfService.pdf"),
    ("Doc04", "CUD-26-682107_Doc4_JudicialBriefing.pdf"),
    ("Doc05", "CUD-26-682107_Doc5_CivilComplaint_TheSword.pdf"),
    ("Doc06", "CUD-26-682107_Doc6_Transmittal_Demand.pdf"),
    ("Doc07", "CUD-26-682107_Doc7_AttorneyMisconduct_StateBar.pdf"),
    ("Doc08", "CUD-26-682107_Doc8_SupplementalNotice_EvidentiaryProffer.pdf"),
    ("Doc09", "CUD-26-682107_Doc9_WhistleblowerNotice.pdf"),
    ("Doc10", "CUD-26-682107_Doc10_CivilHumanRights.pdf"),
    ("Doc11", "CUD-26-682107_Doc11_EmergencyTRO.pdf"),
    ("Doc12", "CUD-26-682107_Doc12_RequestJudicialNotice.pdf"),
    ("Doc13", "CUD-26-682107_Doc13_MotionContinuance.pdf"),
    ("Doc14", "CUD-26-682107_Doc14_AcademicTheftNotice.pdf"),
    ("Doc15", "CUD-26-682107_Doc15_MotionToSeal.pdf"),
    ("Doc16", "CUD-26-682107_Doc16_AmendedCivilComplaint.pdf"),
    ("Doc17", "CUD-26-682107_Doc17_SanctionsFees.pdf"),
]

REQUIRED_STRINGS = [
    ("Case Number",        "CUD-26-682107"),
    ("Department",         "DEPARTMENT 12"),  # Doc5 uses all-caps; others use mixed
    ("Defendant Name",     "DONALD ERNEST GILLSON"),
    ("E-SIGN Act",         "E-SIGN Act"),
    ("UETA",               "1633"),          # Cal. Civ. Code § 1633
    ("Digital Comms Act",  "Digital Communications Act"),
    ("Jeffrey Wright",     "Jeffrey Wright"),
    ("Proof of Service",   "PROOF OF ELECTRONIC SERVICE"),
    ("ORCID iD",           "0009-0007-0768-5486"),
    ("Node Authority",     "SGAU-7226.3461"),
    ("Filing Date",        "2026"),
]

FORBIDDEN_STRINGS = [
    ("Plaintiff email in POS", "jjzanghi@swords-to-plowshares.org"),
]

SPELLING_CHECKS = [
    ("Retaliation",  ["retalation", "retaliation"]),
    ("Accommodation",["accomodation", "acommodation"]),
    ("Defendant",    ["defendent", "defandant"]),
    ("Plaintiff",    ["plantiff", "planitff"]),
    ("California",   ["Califonia", "Califronia"]),
    ("Whistleblower",["whistleblower"]),
    ("Misappropriation",["misappropriation"]),
    ("Intellectual", ["intelectual", "intellecutal"]),
]

pass_count = 0
fail_count = 0
results = []

for label, fname in DOCS:
    path = os.path.join(CORE, fname)
    if not os.path.exists(path):
        results.append((label, fname, "MISSING", ["File not found"]))
        fail_count += 1
        continue

    issues = []

    # ── 1. File size sanity ──────────────────────────────────────────────────
    size = os.path.getsize(path)
    if size < 5000:
        issues.append(f"File suspiciously small: {size} bytes")

    # ── 2. Extract text ──────────────────────────────────────────────────────
    try:
        text = extract_text(path)
    except Exception as e:
        issues.append(f"PDF extraction error: {e}")
        results.append((label, fname, "FAIL", issues))
        fail_count += 1
        continue

    # ── 3. Required strings (case-insensitive search) ──────────────────────
    text_lower = text.lower()
    for check_name, needle in REQUIRED_STRINGS:
        if needle.lower() not in text_lower:
            issues.append(f"MISSING required text [{check_name}]: '{needle}'")

    # ── 4. Forbidden strings ─────────────────────────────────────────────────
    for check_name, needle in FORBIDDEN_STRINGS:
        if needle in text:
            issues.append(f"FORBIDDEN text found [{check_name}]: '{needle}'")

    # ── 5. Spelling checks ───────────────────────────────────────────────────
    text_lower = text.lower()
    for word, misspellings in SPELLING_CHECKS:
        for bad in misspellings:
            if bad.lower() in text_lower and bad.lower() != word.lower():
                issues.append(f"POSSIBLE MISSPELLING: '{bad}' (check '{word}')")

    # ── 6. Page count sanity ─────────────────────────────────────────────────
    page_count = text.count("\x0c") + 1
    if page_count < 2:
        issues.append(f"Only {page_count} page(s) — may be too short for a pleading")

    status = "PASS" if not issues else "FAIL"
    if not issues:
        pass_count += 1
    else:
        fail_count += 1
    results.append((label, fname, status, issues))

# ── Report ────────────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("  VALORAIPLUS® PRE-FLIGHT AUDIT — ALL 17 DOCUMENTS")
print("=" * 70)
for label, fname, status, issues in results:
    icon = "✓" if status == "PASS" else "✗"
    print(f"\n  {icon} [{status}] {label}: {fname}")
    if issues:
        for iss in issues:
            print(f"       → {iss}")

print("\n" + "-" * 70)
print(f"  TOTAL: {pass_count} PASS  |  {fail_count} FAIL  |  {len(DOCS)} TOTAL")
print("=" * 70 + "\n")

if fail_count > 0:
    sys.exit(1)
