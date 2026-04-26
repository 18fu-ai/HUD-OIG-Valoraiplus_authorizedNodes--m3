// SPDX-License-Identifier: VALORAIPLUS-1.0
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title VALORAIPLUS_CSSS_NegativeCaveat_SBT
 * @author Poppa Donny Gillson & NEWT //e v2.1
 * @notice Enforces non-transferable Identity by Computation.
 * @dev Soulbound Reputation NFT with DAO-enforced exclusion
 * LATCH STATUS:
 * Schema: REV_34
 * Merkleroot: 26856B24C50750F0C69C1EEB86A69EF777777
 * Anchor: Saint Paul Node 55116
 */
contract CSSS_NegativeCaveat is ERC721, Ownable {

    // ===============================================================
    // ERRORS (REV_34 Protocol)
    // ===============================================================

    error Soulbound_NoTransferAllowed();
    error Protocol_DriftDetected();
    
    // ═══════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════
    
    string public constant BRAND = "Valor Ai+ CSSS";
    int256 public constant EXCLUSION_THRESHOLD = -100;
    uint256 public constant TOTAL_SUPPLY = 50_000_000_000;
    
    // ═══════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════
    
    mapping(address => int256) public reputationScore;
    mapping(address => bool) public isExcluded;
    mapping(address => string[]) public violations;
    
    // ═══════════════════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════════════════
    
    event ReputationUpdated(address indexed user, int256 newScore);
    event UserExcluded(address indexed user, string reason);
    event SoulboundMinted(address indexed user, uint256 tokenId);
    
    // ══��════════════════════════════════════════════════════
    // MODIFIERS
    // ═══════════════════════════════════════════════════════
    
    modifier notExcluded(address user) {
        require(!isExcluded[user], "CSSS: USER EXCLUDED FOR LIFE");
        _;
    }
    
    // ═══════════════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════════════
    
    constructor() ERC721("CSSS Reputation NFT", "CSSS") Ownable(msg.sender) {}
    
    // ═══════════════════════════════════════════════════════
    // CORE FUNCTIONS
    // ═══════════════════════════════════════════════════════
    
    /**
     * @dev Mint soulbound reputation NFT
     */
    function mintSoulbound(address to, uint256 tokenId) 
        external 
        onlyOwner 
        notExcluded(to) 
    {
        _safeMint(to, tokenId);
        reputationScore[to] = 100; // Start aligned
        emit SoulboundMinted(to, tokenId);
    }
    
    /**
     * @dev Apply negative caveat — permanent exclusion
     */
    function applyNegativeCaveat(
        address user, 
        string memory violation
    ) external onlyOwner {
        reputationScore[user] = type(int256).min;
        isExcluded[user] = true;
        violations[user].push(violation);
        
        // Burn their NFT if exists
        uint256 tokenId = uint256(uint160(user));
        if (_ownerOf(tokenId) == user) {
            _burn(tokenId);
        }
        
        emit UserExcluded(user, violation);
    }
    
    /**
     * @dev Check UHI eligibility
     */
    function isUHIEligible(address user) external view returns (bool) {
        return !isExcluded[user] && reputationScore[user] > EXCLUSION_THRESHOLD;
    }
    
    /**
     * @dev Override transfer to enforce soulbound
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Allow minting and burning, block transfers
        if (from != address(0) && to != address(0)) {
            revert("CSSS: SOULBOUND - NO TRANSFER");
        }
        
        return super._update(to, tokenId, auth);
    }
}
