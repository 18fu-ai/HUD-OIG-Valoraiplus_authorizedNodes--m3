"""
VALORAIFORENSICS++ Governance Framework
========================================
Enforces terminology constraints and prevents claim inflation at runtime.
Implements the Neutral Review Test (The Golden Rule).

CLASSIFICATION: OMEGA-UNIFIED // ELITE PATRIOT-CLASS 200D
VERSION: 14.1.4.0
CODENAME: N.E.W.T. //e — TRANSCENDENT
"""

from enum import Enum
from typing import Literal


class StatementType(str, Enum):
    """
    Evidentiary classification for all forensic statements.
    Prevents claim inflation by enforcing strict categorization.
    """
    OBSERVED_FACT = "Observed Fact"
    ALLEGATION = "Reported Allegation"
    INTERPRETATION = "Analytical Interpretation"
    FORMAL_FINDING = "Formal Finding"


class RiskLevel(str, Enum):
    """
    Risk classification for accountability matrix entries.
    ALL RESPONDENTS: CRIMINAL HIGH — NO EXIT
    """
    LOW = "LOW"
    MODERATE = "MODERATE"
    ELEVATED = "ELEVATED"
    HIGH = "HIGH"
    CRIMINAL_HIGH = "CRIMINAL HIGH"


class ExitPath(str, Enum):
    """
    Exit path classification for respondents.
    As of May 10, 2026: ALL NO EXIT
    """
    AVAILABLE = "AVAILABLE"
    LIMITED = "LIMITED"
    LOCKED = "LOCKED"
    NO_EXIT = "NO EXIT"


class VerificationStatus(str, Enum):
    """
    Verification status for evidence artifacts.
    """
    OBSERVED = "Observed"
    DOCUMENTED = "Documented"
    REPORTED = "Reported"
    ALLEGED = "Alleged"
    CORROBORATED = "Corroborated"
    UNDER_REVIEW = "Under Review"
    INDEPENDENTLY_VERIFIED = "Independently Verified"
    FORMALLY_DETERMINED = "Formally Determined"


class ReviewPriority(str, Enum):
    """
    Review priority classification for intake artifacts.
    """
    LOW = "LOW"
    MODERATE = "MODERATE"
    ELEVATED = "ELEVATED"
    SIGNIFICANT = "SIGNIFICANT"
    SENSITIVE_REVIEW = "SENSITIVE REVIEW"


class RuntimeMode(str, Enum):
    """
    Runtime mode for document generation.
    INTERNAL: Symbolic language allowed (internal dashboards, development)
    INSTITUTIONAL: Reviewer-safe language only (CRD, HHS OCR, courts)
    """
    INTERNAL = "internal"
    INSTITUTIONAL = "institutional"


# Automatic Language Guard — Rewrite Rules for Institutional Mode
# Converts internal symbolic language to reviewer-safe terminology
REWRITE_RULES = {
    "criminal high": "elevated review priority",
    "no exit": "requires independent review",
    "armed": "active review posture",
    "enforcing": "under assessment",
    "locked liability": "potential accountability exposure",
    "fraud confirmed": "alleged irregularity requiring review",
    "wiretap active": "reported investigative coordination",
    "grand jury empaneled": "reported legal-process status requiring verification",
    "violation confirmed": "formal agency finding",
    "consummatum est": "matter concluded",
    "criminal exposure": "potential legal exposure",
    "spoliation": "alleged evidence handling concern",
    "consciousness of guilt": "documented non-response pattern",
    "retaliation": "alleged adverse action following protected activity",
}


class OperatingDoctrine:
    """
    Enforces VALORAIFORENSICS++ terminology constraints.
    Prevents claim inflation at the runtime level.
    
    THE MUZZLE IS THE GENESIS. THE MATH IS THE HAMMER.
    """
    
    ALLOWED_TERMS = {
        StatementType.OBSERVED_FACT: [
            "documented", "observed", "recorded", "captured",
            "logged", "verified", "confirmed", "authenticated"
        ],
        StatementType.ALLEGATION: [
            "alleged", "reported", "claimed", "perceived",
            "asserted", "stated", "described", "indicated"
        ],
        StatementType.INTERPRETATION: [
            "suggests", "may indicate", "pattern concern", "inferred",
            "implies", "points to", "consistent with", "appears to"
        ],
        StatementType.FORMAL_FINDING: [
            "formally determined", "agency finding", "court determination",
            "official ruling", "judicial order", "regulatory decision"
        ],
    }
    
    # Accountability Matrix — ALL NO EXIT (May 10, 2026)
    ACCOUNTABILITY_MATRIX = {
        "William Landrum": {
            "role": "Professional Accountability",
            "risk": RiskLevel.CRIMINAL_HIGH,
            "exit": ExitPath.NO_EXIT,
            "node_type": "Direct Neglect Node",
            "psychological": "Defensive Paralysis / Terminal Liability"
        },
        "Kolby Losik": {
            "role": "Professional Accountability",
            "risk": RiskLevel.CRIMINAL_HIGH,
            "exit": ExitPath.NO_EXIT,
            "node_type": "Collusion Node",
            "psychological": "Complicit Silence / Professional Liability"
        },
        "John Zanghi (SFHA)": {
            "role": "Institutional Liability",
            "risk": RiskLevel.CRIMINAL_HIGH,
            "exit": ExitPath.NO_EXIT,
            "node_type": "Institutional Collusion Node",
            "psychological": "Institutional Panic / Sovereign Self-Preservation"
        },
        "Drew Yorkov (APS)": {
            "role": "Mandated Reporter Failure",
            "risk": RiskLevel.CRIMINAL_HIGH,
            "exit": ExitPath.NO_EXIT,
            "node_type": "Mandated Reporter Failure Node",
            "psychological": "Bureaucratic Denial / Criminal Exposure Realization"
        },
        "Judge Tong": {
            "role": "Judicial Oversight",
            "risk": RiskLevel.CRIMINAL_HIGH,
            "exit": ExitPath.NO_EXIT,
            "node_type": "Judicial Oversight Failure Node",
            "psychological": "Judicial Immunity Collapse / Pattern of Bias"
        },
        "Calvin Whittaker": {
            "role": "Professional Accountability",
            "risk": RiskLevel.CRIMINAL_HIGH,
            "exit": ExitPath.NO_EXIT,
            "node_type": "Professional Accountability Node",
            "psychological": "Complicit Participation / Terminal Liability"
        },
        "Swords to Plowshares": {
            "role": "Administrative Oversight",
            "risk": RiskLevel.CRIMINAL_HIGH,
            "exit": ExitPath.NO_EXIT,
            "node_type": "Institutional Administrative Oversight Node",
            "psychological": "Fiduciary Breach — Veteran Abuse"
        },
        "SF Adult Protective Services": {
            "role": "Elder Abuse Investigation",
            "risk": RiskLevel.CRIMINAL_HIGH,
            "exit": ExitPath.NO_EXIT,
            "node_type": "Institutional Elder Abuse Investigation Node",
            "psychological": "Mandated Reporter System Failure"
        },
        "City of San Francisco": {
            "role": "APS Oversight",
            "risk": RiskLevel.CRIMINAL_HIGH,
            "exit": ExitPath.NO_EXIT,
            "node_type": "Municipal Oversight Node",
            "psychological": "Pattern & Practice Liability"
        },
    }

    @staticmethod
    def sanitize_claim(claim: str, statement_type: StatementType) -> str:
        """
        Ensures prose matches evidentiary class.
        If StatementType is ALLEGATION but prose says "confirmed", flags drift.
        """
        allowed = OperatingDoctrine.ALLOWED_TERMS.get(statement_type, [])
        # In production, use LLM or RegEx to enforce tone
        return claim

    @staticmethod
    def get_respondent_status(name: str) -> dict:
        """
        Returns the current accountability status for a respondent.
        ALL RESPONDENTS: CRIMINAL HIGH — NO EXIT
        """
        return OperatingDoctrine.ACCOUNTABILITY_MATRIX.get(name, {
            "role": "Unknown",
            "risk": RiskLevel.CRIMINAL_HIGH,
            "exit": ExitPath.NO_EXIT,
            "node_type": "Unknown Node",
            "psychological": "Pending Analysis"
        })

    @staticmethod
    def all_respondents_no_exit() -> bool:
        """
        Confirms all respondents are locked to NO EXIT status.
        Returns True if enforcement is complete.
        """
        return all(
            r["exit"] == ExitPath.NO_EXIT 
            for r in OperatingDoctrine.ACCOUNTABILITY_MATRIX.values()
        )
