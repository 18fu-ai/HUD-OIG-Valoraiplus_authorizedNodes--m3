"""
patch_build_calls.py
Updates every doc generator to:
1. Import build_doc from pleading_base
2. Replace doc.build(story) with build_doc(doc, story)
3. Ensure KeepTogether is imported where needed

Run once: python3.11 patch_build_calls.py
"""
import re, os

CORE = "/home/ubuntu/valoraiplus_core"

TARGETS = [
    "gen_all_docs.py",
    "gen_doc5_civil_complaint.py",
    "gen_doc6_transmittal.py",
    "gen_doc7_attorney_misconduct.py",
    "gen_doc8_evidentiary_proffer.py",
    "gen_doc9_whistleblower_notice.py",
    "gen_doc10_civil_human_rights.py",
    "gen_doc11_tro_motion.py",
    "gen_doc12_judicial_notice.py",
    "gen_doc13_motion_continuance.py",
    "gen_doc14_academic_theft_notice.py",
    "gen_doc15_motion_to_seal.py",
    "gen_doc16_amended_civil_complaint.py",
    "gen_doc17_sanctions_fees.py",
]


def patch_file(filename):
    path = os.path.join(CORE, filename)
    if not os.path.exists(path):
        print(f"  [SKIP] {filename}")
        return

    with open(path) as f:
        src = f.read()

    original = src

    # 1. Add build_doc to pleading_base import if not already there
    if "build_doc" not in src:
        # Find the pleading_base import block and add build_doc
        src = re.sub(
            r'(from pleading_base import\s*\([^)]+\))',
            lambda m: m.group(1).rstrip(')').rstrip() + ',\n    build_doc,\n)',
            src,
            count=1,
            flags=re.DOTALL
        )
        # Single-line import fallback
        if "build_doc" not in src:
            src = re.sub(
                r'(from pleading_base import [^\n]+)',
                r'\1, build_doc',
                src,
                count=1
            )

    # 2. Replace doc.build(story) with build_doc(doc, story)
    # Handles: doc.build(story) and doc.build(story, canvasmaker=...)
    src = re.sub(
        r'\bdoc\.build\(story(?:,\s*canvasmaker=[^\)]+)?\)',
        'build_doc(doc, story)',
        src
    )

    # 3. Add KeepTogether to platypus import if not already there
    if "KeepTogether" not in src and "from reportlab.platypus import" in src:
        src = re.sub(
            r'(from reportlab\.platypus import\s*\([^)]+\))',
            lambda m: m.group(1).rstrip(')').rstrip() + ', KeepTogether\n)',
            src,
            count=1,
            flags=re.DOTALL
        )
        # Single-line platypus import fallback
        if "KeepTogether" not in src:
            src = re.sub(
                r'(from reportlab\.platypus import [^\n]+)',
                r'\1, KeepTogether',
                src,
                count=1
            )

    if src != original:
        with open(path, 'w') as f:
            f.write(src)
        print(f"  [PATCHED] {filename}")
    else:
        print(f"  [OK] {filename}")


print("=" * 60)
print("  VALORAIPLUS® BUILD_DOC + KEEPTOGETHER PATCH")
print("=" * 60)
for t in TARGETS:
    patch_file(t)
print("=" * 60)
print("  Done.")
print("=" * 60)
