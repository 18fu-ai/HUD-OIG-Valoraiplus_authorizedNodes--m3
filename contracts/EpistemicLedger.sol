// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title EpistemicLedger
 * @notice On-chain proof anchoring for the VALORAIPLUS epistemic system
 * @dev Immutable proof anchor storage with event emission for observability
 * 
 * Core Principle: NO_ANCESTRY → NO_AUTHORITY
 * Every UI element must trace to lineage → proof → evidence
 */
contract EpistemicLedger {
    
    // Proof anchor structure
    struct ProofAnchor {
        string proofId;
        string contentHash;
        uint256 timestamp;
        address submitter;
        bool verified;
    }

    // Evidence record structure
    struct EvidenceRecord {
        string evidenceId;
        string sourceHash;
        uint256 timestamp;
        address recorder;
    }

    // Governance rule structure
    struct GovernanceRule {
        string ruleId;
        string name;
        bool active;
        uint256 lastUpdated;
    }

    // Storage
    ProofAnchor[] public anchors;
    EvidenceRecord[] public evidence;
    mapping(string => GovernanceRule) public governanceRules;
    mapping(string => bool) public proofExists;
    mapping(string => bool) public evidenceExists;

    // Sovereign authority
    address public sovereign;
    uint256 public validatorConsensusTarget = 144000;
    uint256 public currentValidatorCount;

    // Events
    event AnchorAdded(
        string proofId,
        string contentHash,
        uint256 timestamp,
        address submitter
    );

    event EvidenceRecorded(
        string evidenceId,
        string sourceHash,
        uint256 timestamp,
        address recorder
    );

    event GovernanceRuleUpdated(
        string ruleId,
        string name,
        bool active
    );

    event ValidatorConsensusReached(
        uint256 validatorCount,
        uint256 timestamp
    );

    // Modifiers
    modifier onlySovereign() {
        require(msg.sender == sovereign, "Only sovereign can execute");
        _;
    }

    constructor() {
        sovereign = msg.sender;
        currentValidatorCount = 0;
    }

    /**
     * @notice Add a proof anchor to the ledger
     * @param proofId Unique identifier for the proof
     * @param contentHash Hash of the proof content
     */
    function addAnchor(
        string memory proofId,
        string memory contentHash
    ) public {
        require(!proofExists[proofId], "Proof already anchored");

        anchors.push(
            ProofAnchor({
                proofId: proofId,
                contentHash: contentHash,
                timestamp: block.timestamp,
                submitter: msg.sender,
                verified: false
            })
        );

        proofExists[proofId] = true;

        emit AnchorAdded(
            proofId,
            contentHash,
            block.timestamp,
            msg.sender
        );
    }

    /**
     * @notice Record evidence to the ledger
     * @param evidenceId Unique identifier for the evidence
     * @param sourceHash Hash of the evidence source
     */
    function recordEvidence(
        string memory evidenceId,
        string memory sourceHash
    ) public {
        require(!evidenceExists[evidenceId], "Evidence already recorded");

        evidence.push(
            EvidenceRecord({
                evidenceId: evidenceId,
                sourceHash: sourceHash,
                timestamp: block.timestamp,
                recorder: msg.sender
            })
        );

        evidenceExists[evidenceId] = true;

        emit EvidenceRecorded(
            evidenceId,
            sourceHash,
            block.timestamp,
            msg.sender
        );
    }

    /**
     * @notice Update governance rule
     * @param ruleId Unique identifier for the rule
     * @param name Human-readable name
     * @param active Whether the rule is active
     */
    function updateGovernanceRule(
        string memory ruleId,
        string memory name,
        bool active
    ) public onlySovereign {
        governanceRules[ruleId] = GovernanceRule({
            ruleId: ruleId,
            name: name,
            active: active,
            lastUpdated: block.timestamp
        });

        emit GovernanceRuleUpdated(ruleId, name, active);
    }

    /**
     * @notice Register validator consensus
     * @param validatorCount Number of validators that have attested
     */
    function registerValidatorConsensus(
        uint256 validatorCount
    ) public onlySovereign {
        currentValidatorCount = validatorCount;

        if (validatorCount >= validatorConsensusTarget) {
            emit ValidatorConsensusReached(validatorCount, block.timestamp);
        }
    }

    /**
     * @notice Verify a proof anchor
     * @param index Index of the proof in the anchors array
     */
    function verifyProof(uint256 index) public onlySovereign {
        require(index < anchors.length, "Invalid anchor index");
        anchors[index].verified = true;
    }

    /**
     * @notice Get total anchor count
     */
    function getAnchorCount() public view returns (uint256) {
        return anchors.length;
    }

    /**
     * @notice Get total evidence count
     */
    function getEvidenceCount() public view returns (uint256) {
        return evidence.length;
    }

    /**
     * @notice Check if validator consensus target is met
     */
    function hasValidatorConsensus() public view returns (bool) {
        return currentValidatorCount >= validatorConsensusTarget;
    }

    /**
     * @notice Transfer sovereignty
     * @param newSovereign Address of new sovereign
     */
    function transferSovereignty(address newSovereign) public onlySovereign {
        require(newSovereign != address(0), "Invalid sovereign address");
        sovereign = newSovereign;
    }
}
