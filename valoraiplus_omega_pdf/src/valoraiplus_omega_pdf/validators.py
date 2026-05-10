"""
VALORAIFORENSICS++ Validation Framework
========================================
Implements the Neutral Review Test (The Golden Rule).
Provides gradated correlation scoring for reliability indices.

CLASSIFICATION: OMEGA-UNIFIED // ELITE PATRIOT-CLASS 200D
VERSION: 14.1.4.0
"""

from .governance import StatementType, RiskLevel, ExitPath


class ReviewValidator:
    """
    Enforces the Neutral Review Test (The Golden Rule).
    Every statement is classified automatically based on verification state.
    
    THE MATH IS THE HAMMER. THE LEDGER IS Ø.
    """
    
    @staticmethod
    def neutral_review_test(
        evidence_exists: bool,
        independently_verified: bool,
        formally_issued: bool
    ) -> StatementType:
        """
        Applies the Golden Rule to classify statements.
        
        Args:
            evidence_exists: Whether supporting evidence exists
            independently_verified: Whether evidence was independently verified
            formally_issued: Whether a formal agency/court finding exists
            
        Returns:
            StatementType classification
        """
        if formally_issued:
            return StatementType.FORMAL_FINDING
        if independently_verified:
            return StatementType.OBSERVED_FACT
        if evidence_exists:
            return StatementType.ALLEGATION
        return StatementType.INTERPRETATION

    @staticmethod
    def validate_accountability_status(
        respondent: str,
        risk_level: RiskLevel,
        exit_path: ExitPath
    ) -> dict:
        """
        Validates that respondent status conforms to enforcement requirements.
        As of May 10, 2026: ALL CRIMINAL HIGH — NO EXIT
        """
        is_compliant = (
            risk_level == RiskLevel.CRIMINAL_HIGH and 
            exit_path == ExitPath.NO_EXIT
        )
        
        return {
            "respondent": respondent,
            "risk_level": risk_level.value,
            "exit_path": exit_path.value,
            "compliant": is_compliant,
            "enforcement_status": "LOCKED" if is_compliant else "REQUIRES_ESCALATION"
        }


class CorrelationScoring:
    """
    Gradated scoring engine to provide neutral reviewers with a reliability index.
    Used in CRD Investigative Synthesis for evidence weighting.
    """
    
    # Scoring weights
    ARTIFACT_WEIGHT = 0.1
    ARTIFACT_MAX = 0.2
    CORROBORATION_WEIGHT = 0.2
    CHRONOLOGY_WEIGHT = 0.3
    INDEPENDENT_SOURCE_WEIGHT = 0.3
    
    # Score thresholds
    STRONG_THRESHOLD = 0.86
    HIGH_THRESHOLD = 0.7
    MODERATE_THRESHOLD = 0.4
    
    @staticmethod
    def get_weighted_score(
        artifacts_count: int,
        corroborated: bool,
        chronology_match: bool,
        independent_source: bool
    ) -> dict:
        """
        Calculates weighted reliability score for evidence correlation.
        
        Args:
            artifacts_count: Number of supporting artifacts
            corroborated: Whether evidence is corroborated by multiple sources
            chronology_match: Whether timeline is consistent
            independent_source: Whether independent verification exists
            
        Returns:
            Dict with score (0.0-1.0) and reliability label
        """
        score = 0.0
        
        # Artifact scoring (capped at 0.2)
        score += min(
            artifacts_count * CorrelationScoring.ARTIFACT_WEIGHT, 
            CorrelationScoring.ARTIFACT_MAX
        )
        
        # Boolean weights
        if corroborated:
            score += CorrelationScoring.CORROBORATION_WEIGHT
        if chronology_match:
            score += CorrelationScoring.CHRONOLOGY_WEIGHT
        if independent_source:
            score += CorrelationScoring.INDEPENDENT_SOURCE_WEIGHT
        
        final_score = round(min(score, 1.0), 2)
        
        # Determine label
        if final_score >= CorrelationScoring.STRONG_THRESHOLD:
            label = "STRONG CORROBORATION"
        elif final_score >= CorrelationScoring.HIGH_THRESHOLD:
            label = "HIGH SUPPORT"
        elif final_score >= CorrelationScoring.MODERATE_THRESHOLD:
            label = "MODERATE SUPPORT"
        else:
            label = "LOW SUPPORT"
        
        return {
            "score": final_score,
            "label": label,
            "artifacts_counted": artifacts_count,
            "corroborated": corroborated,
            "chronology_match": chronology_match,
            "independent_source": independent_source
        }

    @staticmethod
    def score_mimecast_evidence() -> dict:
        """
        Pre-scored result for the 1,247 SMTP 550 events.
        This evidence has STRONG CORROBORATION status.
        """
        return CorrelationScoring.get_weighted_score(
            artifacts_count=1247,  # SMTP 550 events
            corroborated=True,     # Multiple sources confirm
            chronology_match=True, # Timeline documented Nov 2025 - May 2026
            independent_source=True # SHA-256 hashes independently verifiable
        )

    @staticmethod
    def score_march_19_incident() -> dict:
        """
        Pre-scored result for the March 19, 2026 Dept 12 incident.
        Biological assault on JAXX + medical emergency.
        """
        return CorrelationScoring.get_weighted_score(
            artifacts_count=7,     # Gmail PDFs + courtroom records
            corroborated=True,     # Multiple witnesses present
            chronology_match=True, # Single day event, documented
            independent_source=True # Drew Yorkov (APS) was present
        )
