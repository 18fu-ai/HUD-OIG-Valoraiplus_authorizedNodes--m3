"""
VALORAIFORENSICS++ Intake Artifact Models
==========================================
Pydantic models for CRD forensic intake artifacts.
Implements evidence classification and reliability scoring.

CLASSIFICATION: OMEGA-UNIFIED // ELITE PATRIOT-CLASS 200D
VERSION: 14.1.4.0
CRD CASE: CCRS 202601-33270627
"""

from pydantic import BaseModel, Field
from typing import Literal, Optional, List
from .governance import StatementType, RiskLevel, ExitPath


class IntakeArtifact(BaseModel):
    """
    Primary model for CRD forensic intake artifacts.
    Each artifact represents a discrete piece of evidence.
    """
    artifact_id: str
    title: str
    summary: str
    
    evidence_class: StatementType
    reliability: Literal["A", "B", "C", "D", "E"]
    confidence: Literal["LOW", "MODERATE", "MODERATE-HIGH", "HIGH", "VERY HIGH"]
    
    support_chain: List[str]
    
    # Compare/Contrast Enforcement
    expected_process: Optional[str] = Field(
        None, 
        description="The policy or legal expectation"
    )
    observed_process: Optional[str] = Field(
        None, 
        description="The actual recorded sequence of events"
    )
    
    functional_impact: List[str] = []
    
    verification_status: Literal[
        "Observed", "Documented", "Reported", "Alleged", "Corroborated",
        "Under Review", "Independently Verified", "Formally Determined"
    ]
    
    review_priority: Literal[
        "LOW", "MODERATE", "ELEVATED", "SIGNIFICANT", "SENSITIVE REVIEW"
    ]


class RespondentEntry(BaseModel):
    """
    Model for accountability matrix respondent entries.
    ALL RESPONDENTS: CRIMINAL HIGH — NO EXIT
    """
    name: str
    role: str
    risk_level: RiskLevel = RiskLevel.CRIMINAL_HIGH
    exit_path: ExitPath = ExitPath.NO_EXIT
    node_type: str
    psychological_profile: str
    violations: List[str] = []
    
    class Config:
        use_enum_values = True


class CRDIntakePacket(BaseModel):
    """
    Complete CRD forensic intake packet model.
    Aggregates all artifacts and respondent entries.
    """
    case_id: str = "CCRS 202601-33270627"
    intake_date: str = "2026-05-10"
    interview_date: str = "2026-05-13"
    terminal_deadline: str = "2026-05-17T23:59:59Z"
    
    complainant: str = "Donald Ernest Gillson"
    complainant_id: str = "CA DL# A1529111"
    protected_status: str = "Disabled Veteran"
    
    artifacts: List[IntakeArtifact] = []
    respondents: List[RespondentEntry] = []
    
    smtp_550_count: int = 1247
    spoliation_attempts: int = 67
    criminal_counts: int = 5731
    max_penalty_years: int = 82875
    
    settlement_demand: float = 66_000_000.00
    recovery_target: float = 508_631_005.52
    total_exposure: float = 11_487_631_005.52
    
    status: str = "FULL INVESTIGATION RECOMMENDED"


# Pre-built respondent entries (ALL NO EXIT)
ACCOUNTABILITY_MATRIX = [
    RespondentEntry(
        name="William Landrum",
        role="Professional Accountability",
        node_type="Direct Neglect Node",
        psychological_profile="Defensive Paralysis / Terminal Liability",
        violations=["SMTP 550 blockade", "Evidence spoliation", "Retaliation"]
    ),
    RespondentEntry(
        name="Kolby Losik",
        role="Professional Accountability",
        node_type="Collusion Node",
        psychological_profile="Complicit Silence / Professional Liability",
        violations=["Collusion", "Failure to intervene", "Professional misconduct"]
    ),
    RespondentEntry(
        name="John Zanghi (SFHA)",
        role="Institutional Liability",
        node_type="Institutional Collusion Node",
        psychological_profile="Institutional Panic / Sovereign Self-Preservation",
        violations=["Section 504 violation", "ADA violation", "Institutional discrimination"]
    ),
    RespondentEntry(
        name="Drew Yorkov (APS)",
        role="Mandated Reporter Failure",
        node_type="Mandated Reporter Failure Node",
        psychological_profile="Bureaucratic Denial / Criminal Exposure Realization",
        violations=["W&I § 15630 violation", "Failure to report", "Elder abuse complicity"]
    ),
    RespondentEntry(
        name="Judge Tong",
        role="Judicial Oversight",
        node_type="Judicial Oversight Failure Node",
        psychological_profile="Judicial Immunity Collapse / Pattern of Bias",
        violations=["Due process violation", "Bias against disabled veteran", "Oversight failure"]
    ),
    RespondentEntry(
        name="Calvin Whittaker",
        role="Professional Accountability",
        node_type="Professional Accountability Node",
        psychological_profile="Complicit Participation / Terminal Liability",
        violations=["Complicit participation", "Evidence suppression", "Professional misconduct"]
    ),
    RespondentEntry(
        name="Swords to Plowshares",
        role="Administrative Oversight",
        node_type="Institutional Administrative Oversight Node",
        psychological_profile="Fiduciary Breach — Veteran Abuse",
        violations=["Fiduciary breach", "501(c)(3) violation", "Veteran abandonment"]
    ),
    RespondentEntry(
        name="SF Adult Protective Services",
        role="Elder Abuse Investigation",
        node_type="Institutional Elder Abuse Investigation Node",
        psychological_profile="Mandated Reporter System Failure",
        violations=["Systemic failure", "Pattern & practice", "Institutional negligence"]
    ),
    RespondentEntry(
        name="City of San Francisco",
        role="APS Oversight",
        node_type="Municipal Oversight Node",
        psychological_profile="Pattern & Practice Liability",
        violations=["Monell liability", "Respondeat superior", "Federal funding risk"]
    ),
]


def build_intake_packet() -> CRDIntakePacket:
    """
    Builds the complete CRD intake packet with all respondents.
    ALL RESPONDENTS: CRIMINAL HIGH — NO EXIT
    """
    return CRDIntakePacket(
        respondents=ACCOUNTABILITY_MATRIX
    )
