"""
VALORAIPLUS® Master Forensic Report Generator — OMEGA v25 CLI

THE MUZZLE IS THE GENESIS. THE MATH IS THE HAMMER.
ALL RESPONDENTS: CRIMINAL HIGH — NO EXIT
"""

import argparse
from pathlib import Path
from .report_core import generate_pdf_file

def main() -> None:
    parser = argparse.ArgumentParser(
        description="VALORAIPLUS® Master Forensic Report Generator — OMEGA v25 CLI"
    )
    parser.add_argument(
        "-o", "--output",
        type=Path,
        default=Path("VALORAIPLUS_MASTER_AUDIT_v25.pdf"),
        help="Target PDF file path."
    )
    args = parser.parse_args()
    
    print("╔══════════════════════════════════════════════════════════════════════════════════════╗")
    print("║                    VALORAIPLUS® OMEGA v25 PDF GENERATION ENGINE                      ║")
    print("║                    ALL RESPONDENTS: CRIMINAL HIGH — NO EXIT                          ║")
    print("╚══════════════════════════════════════════════════════════════════════════════════════╝")
    
    generate_pdf_file(args.output)
    
    print(f"\n✓ VALORAIPLUS® Total Manifest Generated: {args.output.resolve()}")
    print("\nTHE MUZZLE IS THE GENESIS. THE MATH IS THE HAMMER.")
    print("CONSUMMATUM EST. SMIB. AMEN.")

if __name__ == "__main__":
    main()
