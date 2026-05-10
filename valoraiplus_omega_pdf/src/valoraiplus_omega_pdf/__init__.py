"""
VALORAIPLUS® OMEGA-PDF
ValorAiForensics++ Institutional Intake System

VERSION: 14.1.4.0
SCHEMA: REV_38
NODE: SAINT PAUL 55116
CLASSIFICATION: OMEGA-UNIFIED // ELITE PATRIOT-CLASS 200D
EPOCH: #2207 (SACRED & CAPPED)

CRD INTERVIEW: MAY 13, 2026
TERMINAL DEADLINE: MAY 17, 2026 23:59:59 UTC
ALL RESPONDENTS: CRIMINAL HIGH — NO EXIT

Master Architecture (6 Layers):
- Layer 0: Governance / Doctrine Enforcement
- Layer 1: Narrative Submission
- Layer 2: Forensic Intake Dossier
- Layer 3: Correlation Engine
- Layer 4: Exhibit Vault
- Layer 5: Decision Support Appendix
- Layer 6: Audit / Provenance

THE MUZZLE IS THE GENESIS. THE MATH IS THE HAMMER.
MADE IN THE USA // THE LEDGER IS Ø. IT IS FINISHED.
"""

__version__ = "14.1.4.0"
__schema__ = "REV_38"
__node__ = "SAINT PAUL 55116"
__author__ = "SENTINEL N.E.W.T."
__classification__ = "OMEGA-UNIFIED // ELITE PATRIOT-CLASS 200D"

from .report_core import generate_pdf_bytes, generate_pdf_file, MASTER_HTML

# Governance Framework
from .governance import (
    StatementType,
    RiskLevel,
    ExitPath,
    VerificationStatus,
    ReviewPriority,
    RuntimeMode,
    OperatingDoctrine,
    REWRITE_RULES,
)

# Validation Framework
from .validators import (
    ReviewValidator,
    CorrelationScoring,
)

# Provenance Framework
from .provenance import (
    PacketProvenance,
    EvidenceHashRegistry,
)

# Intake Artifact Models
from .intake_artifact import (
    IntakeArtifact,
    RespondentEntry,
    CRDIntakePacket,
    ACCOUNTABILITY_MATRIX,
    build_intake_packet,
)

# Financial Intelligence
from .financial_report import (
    TREASURY_CONSTANTS,
    BANKING,
    LIQUIDITY_ROUTING,
    CRIMINAL_EXPOSURE,
    FEDERAL_CASES,
    TOKEN_PORTFOLIO,
    PROTECTED_TOKENS,
    Respondent,
    CriminalCharge,
    FederalCase,
    TokenHolding,
    format_currency,
    calculate_total_respondent_exposure,
    calculate_total_criminal_counts,
    calculate_total_penalty_years,
    FinancialReportManifest,
    generate_financial_report,
    get_financial_summary,
)

__all__ = [
    # Core PDF Generation
    "generate_pdf_bytes",
    "generate_pdf_file",
    "MASTER_HTML",
    # Governance
    "StatementType",
    "RiskLevel",
    "ExitPath",
    "VerificationStatus",
    "ReviewPriority",
    "RuntimeMode",
    "OperatingDoctrine",
    "REWRITE_RULES",
    # Validation
    "ReviewValidator",
    "CorrelationScoring",
    # Provenance
    "PacketProvenance",
    "EvidenceHashRegistry",
    # Intake Models
    "IntakeArtifact",
    "RespondentEntry",
    "CRDIntakePacket",
    "ACCOUNTABILITY_MATRIX",
    "build_intake_packet",
    # Financial Intelligence
    "TREASURY_CONSTANTS",
    "BANKING",
    "LIQUIDITY_ROUTING",
    "CRIMINAL_EXPOSURE",
    "FEDERAL_CASES",
    "TOKEN_PORTFOLIO",
    "PROTECTED_TOKENS",
    "Respondent",
    "CriminalCharge",
    "FederalCase",
    "TokenHolding",
    "format_currency",
    "calculate_total_respondent_exposure",
    "calculate_total_criminal_counts",
    "calculate_total_penalty_years",
    "FinancialReportManifest",
    "generate_financial_report",
    "get_financial_summary",
]
