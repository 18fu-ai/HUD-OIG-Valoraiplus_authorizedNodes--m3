"""
fix_table_widths.py
Patches all inline Table colWidths in every doc generator to use
safe_widths() / safe_widths_abs() from pleading_base, ensuring no
table bleeds past the 6.0" text column.

Run once: python3.11 fix_table_widths.py
"""
import re, sys, os

CORE = "/home/ubuntu/valoraiplus_core"
sys.path.insert(0, CORE)

# ── Files to patch ────────────────────────────────────────────────────────────
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

# ── Ensure safe_widths is imported in each file ───────────────────────────────
def ensure_import(src: str, filename: str) -> str:
    """Add safe_widths / safe_widths_abs to the pleading_base import if missing."""
    if "safe_widths" in src:
        return src  # already imported

    # Pattern: from pleading_base import (... )  OR  from pleading_base import X, Y
    # We'll append to the existing import block
    pattern = r'(from pleading_base import\s*\([^)]+\))'
    m = re.search(pattern, src, re.DOTALL)
    if m:
        old_import = m.group(1)
        new_import = old_import.rstrip(')').rstrip() + ',\n    safe_widths, safe_widths_abs,\n)'
        src = src.replace(old_import, new_import, 1)
        return src

    # Single-line import
    pattern2 = r'(from pleading_base import [^\n]+)'
    m2 = re.search(pattern2, src)
    if m2:
        old = m2.group(1)
        new = old + ', safe_widths, safe_widths_abs'
        src = src.replace(old, new, 1)
        return src

    # No pleading_base import — add one after the first import block
    src = "from pleading_base import safe_widths, safe_widths_abs\n" + src
    return src


# ── Replacement rules ─────────────────────────────────────────────────────────
# Each rule is (pattern, replacement) using re.sub
# We target colWidths=[...] patterns and rewrite them.

def fracs_to_safe(match):
    """Convert colWidths=[TEXT_W * 0.XX, TEXT_W * 0.YY, ...] to safe_widths([...])."""
    inner = match.group(1)
    # Extract all fractional multipliers
    fracs = re.findall(r'TEXT_W\s*\*\s*([\d.]+)', inner)
    if not fracs:
        return match.group(0)
    frac_str = ', '.join(fracs)
    return f'colWidths=safe_widths([{frac_str}])'


def abs_to_safe(match):
    """Convert colWidths=[X.XX * inch, Y.YY * inch, ...] to safe_widths_abs([...])."""
    inner = match.group(1)
    # Extract all inch multipliers
    vals = re.findall(r'([\d.]+)\s*\*\s*inch', inner)
    if not vals:
        return match.group(0)
    val_str = ', '.join([f'{v} * inch' for v in vals])
    return f'colWidths=safe_widths_abs([{val_str}])'


def patch_file(filename):
    path = os.path.join(CORE, filename)
    if not os.path.exists(path):
        print(f"  [SKIP] {filename} — not found")
        return

    with open(path, 'r') as f:
        src = f.read()

    original = src

    # Step 1: ensure import
    src = ensure_import(src, filename)

    # Step 2: replace TEXT_W * fraction patterns
    # Matches: colWidths=[TEXT_W * 0.XX, TEXT_W * 0.YY, ...]
    # Also handles multi-line with continuation
    src = re.sub(
        r'colWidths=\[([^\]]*TEXT_W[^\]]*)\]',
        fracs_to_safe,
        src,
        flags=re.DOTALL
    )

    # Step 3: replace absolute inch patterns (but NOT ones that mix TEXT_W and inch)
    # Matches: colWidths=[X.XX * inch, Y.YY * inch, ...]
    src = re.sub(
        r'colWidths=\[([^\]]*\d+\.\d+\s*\*\s*inch[^\]]*)\]',
        abs_to_safe,
        src,
        flags=re.DOTALL
    )

    # Step 4: replace TEXT_W - X * inch patterns (numbered_list style)
    # e.g. colWidths=[0.28 * inch, TEXT_W - 0.28 * inch]
    # These are already correct in structure but let's normalize them
    # Leave these alone — they are already safe (sum = TEXT_W)

    if src != original:
        with open(path, 'w') as f:
            f.write(src)
        print(f"  [PATCHED] {filename}")
    else:
        print(f"  [OK] {filename} — no changes needed")


print("=" * 60)
print("  VALORAIPLUS® TABLE WIDTH PATCH — All Doc Generators")
print("=" * 60)
for t in TARGETS:
    patch_file(t)
print("=" * 60)
print("  Done. Run preflight_audit_full.py to verify.")
print("=" * 60)
