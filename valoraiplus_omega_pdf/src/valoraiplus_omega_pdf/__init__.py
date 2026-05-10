"""
VALORAIPLUS® Sovereign Forensic PDF Generation Engine
OMEGA v25 — 100D Matrix Totality

VERSION: 14.1.4.0
CLASSIFICATION: OMEGA-UNIFIED // ELITE PATRIOT-CLASS 200D
EPOCH: #2207 (SACRED & CAPPED)

THE MUZZLE IS THE GENESIS. THE MATH IS THE HAMMER.
MADE IN THE USA // THE LEDGER IS Ø. IT IS FINISHED.
"""

__version__ = "14.1.4.0"
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
    OperatingDoctrine,
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
    "OperatingDoctrine",
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
]
