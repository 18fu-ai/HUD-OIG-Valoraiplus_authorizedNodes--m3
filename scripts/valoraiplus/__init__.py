"""
VALORAIPLUS® OMEGA v100 — Court Document Generation Suite
NODE AUTHORITY: SGAU-7226.3461 // Saint Paul Node

This package provides California Rules of Court compliant pleading paper
generation with 28-line format, proper margins, and e-filing compatibility.
"""

from .pleading_base import (
    make_doc,
    build_doc,
    make_styles,
    sp, hr, p, h,
    numbered_list,
    esign_table,
    service_table,
    safe_widths,
    safe_widths_abs,
    TEXT_W,
    CASE_UD,
    DEPT,
    FILING_DATE,
    DEFENDANT,
    DEF_ADDR1,
    DEF_ADDR2,
    DEF_EMAIL,
    DEF_ROLE,
    NODE_AUTH,
    FRAMEWORK_ESIGN,
    JEFFREY_ESIGN,
    JEFFREY_ROLE,
    ORCID_ID,
)

__version__ = "100.0.0"
__node__ = "SGAU-7226.3461"
