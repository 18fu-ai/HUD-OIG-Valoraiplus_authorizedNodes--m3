"""
doc_helpers.py — Shared helpers for Docs 12–17
VALORAIPLUS® OMEGA v100™ | NODE AUTHORITY: SGAU-7226.3461
"""
import os
import sys

# Add the scripts/valoraiplus directory to path for local imports
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, SCRIPT_DIR)

from pleading_base import (
    TEXT_W, FILING_DATE, CASE_UD, DEPT,
    DEFENDANT, DEF_ADDR1, DEF_ADDR2,
    NODE_AUTH, FRAMEWORK_ESIGN, JEFFREY_ESIGN, JEFFREY_ROLE, ORCID_ID,
    esign_table, service_table, make_styles, sp, hr, p, h, numbered_list,
    safe_widths, safe_widths_abs,
)
from reportlab.platypus import Paragraph, Table, TableStyle, PageBreak
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

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


def caption_block(story, S, right_text):
    """Standard two-column caption for all docs."""
    from pleading_base import hr as _hr
    story.append(Paragraph("SUPERIOR COURT OF THE STATE OF CALIFORNIA", S["caption"]))
    story.append(Paragraph("FOR THE COUNTY OF SAN FRANCISCO", S["caption"]))
    sp(story)
    _hr(story)
    sp(story, 0.3)
    cap_rows = [[
        cell(f"{PLAINTIFF},\n\nPlaintiff,\n\nvs.\n\n{DEFENDANT},\n\nDefendant.", size=11),
        cell(right_text, size=11),
    ]]
    cap_tbl = Table(cap_rows, colWidths=safe_widths([0.44, 0.56]))
    cap_tbl.setStyle(TableStyle([
        ("VALIGN",       (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",  (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING",   (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 4),
        ("BOX",          (0, 0), (-1, -1), 0.75, colors.black),
        ("LINEAFTER",    (0, 0), (0, -1),  0.75, colors.black),
    ]))
    story.append(cap_tbl)
    sp(story)
    _hr(story)


def esign_block(story, S, doc_title):
    """Standard E-SIGN / Digital Communications Act attestation block."""
    from pleading_base import hr as _hr
    sp(story)
    story.append(Paragraph("ELECTRONIC SIGNATURE ATTESTATION", S["caption"]))
    sp(story, 0.3)
    p(story,
      "This document has been electronically signed pursuant to the Electronic "
      "Signatures in Global and National Commerce Act (E-SIGN Act), 15 U.S.C. "
      "§ 7001 et seq., and the California Uniform Electronic Transactions Act "
      "(UETA), California Civil Code § 1633.1 et seq. (the 'Digital Communications "
      "Act framework'). The electronic signature of the filing party and the "
      "witness e-service signer each constitute a legally binding signature "
      "equivalent to a handwritten signature for all purposes under California "
      "and federal law. Where a personal email address is unavailable, a Veterans "
      "Tenant Union leadership member may authenticate identity by verified role "
      "pursuant to 15 U.S.C. § 7001(c)(1).",
      S, "small")
    sp(story, 0.3)
    esign_table(story, [
        [Paragraph("Filing Party:", S["esign_label"]),
         Paragraph(f"/s/ Donald Ernest Gillson — {DEFENDANT}, In Pro Per",
                   S["esign_value"])],
        [Paragraph("Authority:", S["esign_label"]),
         Paragraph(FRAMEWORK_ESIGN, S["esign_value"])],
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
    _hr(story)


def pos_block(story, S, doc_title):
    """Standard Proof of Electronic Service block."""
    story.append(PageBreak())
    story.append(Paragraph("PROOF OF ELECTRONIC SERVICE", S["caption"]))
    sp(story, 0.3)
    p(story,
      f"I, Jeffrey Wright, am a member of the Veterans Tenant Union and a material "
      f"eyewitness in the above-captioned matter. I am over the age of 18 and not "
      f"a party to this action. On {FILING_DATE}, I served the foregoing "
      f"{doc_title} on the following parties by electronic transmission pursuant "
      f"to California Code of Civil Procedure section 1010.6 and California Rules "
      f"of Court, Rule 2.251:",
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
      "I declare under penalty of perjury under the laws of the State of "
      "California that the foregoing is true and correct.",
      S, "small")
    sp(story, 0.3)
    p(story,
      f"Executed on {FILING_DATE}, in San Francisco, California.<br/><br/>"
      f"{JEFFREY_ESIGN}<br/>Jeffrey Wright<br/>{JEFFREY_ROLE}",
      S, "small")


def closing_signature(story, S):
    """Standard closing signature block."""
    p(story, "Respectfully submitted,", S)
    sp(story, 0.3)
    p(story,
      f"Dated: {FILING_DATE}<br/><br/>"
      f"/s/ Donald Ernest Gillson<br/>"
      f"DONALD ERNEST GILLSON<br/>"
      f"Defendant / Cross-Complainant, In Pro Per<br/>"
      f"{DEF_ADDR1}<br/>{DEF_ADDR2}<br/>"
      f"ORCID iD: {ORCID_ID}<br/>"
      f"Node Authority: {NODE_AUTH}",
      S)
    sp(story)
    hr(story)
