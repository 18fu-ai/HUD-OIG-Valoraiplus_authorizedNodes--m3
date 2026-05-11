// SPDX-License-Identifier: VALORAIPLUS-1.0
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ValorToken
 * @author SOVEREIGN-AUDITOR-Ω & NEWT //e v2.1
 * @notice ERC-20 Token for VALORAIPLUS 51-Token Canon
 * @dev Each token in the canon is deployed via the factory
 * NOTE: $VALOR is NULLIFIED - only $VALORAIPLUS and $VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED exist
 */
contract ValorToken is ERC20, ERC20Burnable, ERC20Permit, AccessControl {
    
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant SOVEREIGN_ROLE = keccak256("SOVEREIGN_ROLE");
    
    uint8 private immutable _decimals;
    bool public immutable isProtected;
    string public category;
    
    // Metadata
    string public constant PROTOCOL = "VALORAIPLUS";
    string public constant NODE = "SAINT PAUL 55116";
    string public constant SGAU_REF = "7226.3461";
    
    event TokenInitialized(string name, string symbol, uint256 totalSupply, bool protected);
    
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_,
        address sovereign_,
        uint8 decimals_,
        bool isProtected_,
        string memory category_
    ) ERC20(name_, symbol_) ERC20Permit(name_) {
        _decimals = decimals_;
        isProtected = isProtected_;
        category = category_;
        
        _grantRole(DEFAULT_ADMIN_ROLE, sovereign_);
        _grantRole(SOVEREIGN_ROLE, sovereign_);
        _grantRole(MINTER_ROLE, sovereign_);
        
        _mint(sovereign_, initialSupply_ * (10 ** decimals_));
        
        emit TokenInitialized(name_, symbol_, initialSupply_, isProtected_);
    }
    
    function decimals() public view override returns (uint8) {
        return _decimals;
    }
    
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
    
    /**
     * @dev Protected tokens cannot be burned by non-sovereign addresses
     */
    function burn(uint256 amount) public override {
        if (isProtected) {
            require(hasRole(SOVEREIGN_ROLE, msg.sender), "PROTECTED: SOVEREIGN ONLY");
        }
        super.burn(amount);
    }
    
    function burnFrom(address account, uint256 amount) public override {
        if (isProtected) {
            require(hasRole(SOVEREIGN_ROLE, msg.sender), "PROTECTED: SOVEREIGN ONLY");
        }
        super.burnFrom(account, amount);
    }
}

/**
 * @title ValorTokenFactory
 * @author SOVEREIGN-AUDITOR-Ω & NEWT //e v2.1
 * @notice Factory contract for deploying all 51 tokens in the VALORAIPLUS Canon
 * @dev Deploys ERC-20 tokens with consistent configuration
 * 
 * LATCH STATUS:
 * Schema: REV_40
 * Canon: 51 TOKENS ($VALOR=NULL)
 * Merkleroot: 0x8f3a567d2e8f1a4b9c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f1a2b
 * Anchor: Saint Paul Node 55116
 */
contract ValorTokenFactory is AccessControl, ReentrancyGuard {
    
    // ═══════════════════════════════════════════════════════
    // ROLES
    // ═══════════════════════════════════════════════════════
    
    bytes32 public constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");
    bytes32 public constant SOVEREIGN_ROLE = keccak256("SOVEREIGN_ROLE");
    
    // ═══════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════
    
    uint256 public constant CANON_SIZE = 51;
    uint256 public constant DEFAULT_SUPPLY = 1_000_000_000; // 1 Billion per token
    uint8 public constant DEFAULT_DECIMALS = 18;
    
    string public constant BRAND = "VALORAIPLUS";
    string public constant MERKLE_ROOT = "0x8f3a567d2e8f1a4b9c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f1a2b";
    string public constant BTC_ANCHOR = "Block 847234";
    
    // ═══════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════
    
    address public immutable sovereignAddress;
    
    mapping(string => address) public tokenAddresses;
    mapping(address => bool) public isValorToken;
    string[] public deployedTokens;
    
    // Token metadata
    struct TokenMeta {
        string name;
        string symbol;
        string category;
        bool isProtected;
        uint256 supply;
    }
    
    // ═══════════════════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════════════════
    
    event TokenDeployed(
        string indexed symbol,
        address tokenAddress,
        string category,
        bool isProtected,
        uint256 supply
    );
    
    event CanonComplete(uint256 totalTokens, uint256 timestamp);
    
    // ═══════════════════════════════════════════════════════
    // CONSTRUCTOR
    // ═══════════════════════════════════════════════════════
    
    constructor(address _sovereign) {
        require(_sovereign != address(0), "FACTORY: INVALID SOVEREIGN");
        
        sovereignAddress = _sovereign;
        
        _grantRole(DEFAULT_ADMIN_ROLE, _sovereign);
        _grantRole(DEPLOYER_ROLE, _sovereign);
        _grantRole(SOVEREIGN_ROLE, _sovereign);
    }
    
    // ═══════════════════════════════════════════════════════
    // DEPLOYMENT FUNCTIONS
    // ═══════════════════════════════════════════════════════
    
    /**
     * @dev Deploy a single token
     */
    function deployToken(
        string memory name_,
        string memory symbol_,
        uint256 supply_,
        string memory category_,
        bool isProtected_
    ) external onlyRole(DEPLOYER_ROLE) nonReentrant returns (address) {
        require(tokenAddresses[symbol_] == address(0), "FACTORY: TOKEN EXISTS");
        
        ValorToken token = new ValorToken(
            name_,
            symbol_,
            supply_,
            sovereignAddress,
            DEFAULT_DECIMALS,
            isProtected_,
            category_
        );
        
        address tokenAddr = address(token);
        tokenAddresses[symbol_] = tokenAddr;
        isValorToken[tokenAddr] = true;
        deployedTokens.push(symbol_);
        
        emit TokenDeployed(symbol_, tokenAddr, category_, isProtected_, supply_);
        
        return tokenAddr;
    }
    
    /**
     * @dev Deploy all 51 tokens in the canon
     * NOTE: $VALOR is NULLIFIED - use $VALORAIPLUS instead
     */
    function deployFullCanon() external onlyRole(SOVEREIGN_ROLE) nonReentrant {
        // CORE tokens
        _deployIfNotExists("Valor Core", "VCORE", "CORE", false);
        _deployIfNotExists("Valor AI", "VAI", "CORE", false);
        _deployIfNotExists("Valor Security", "VSEC", "CORE", false);
        _deployIfNotExists("Valor Max", "VMAX", "CORE", false);
        _deployIfNotExists("Valor Block", "VBLK", "CORE", false);
        _deployIfNotExists("Dead Block", "DBLK", "CORE", false);
        _deployIfNotExists("Valor Governance", "VGOV", "CORE", false);
        _deployIfNotExists("Valor X", "VALX", "CORE", false);
        
        // BTC tokens
        _deployIfNotExists("Gillson BTC", "GILLBTC", "BTC", false);
        _deployIfNotExists("BTC 2.0", "BTC2.0", "BTC", false);
        
        // FLAME tokens
        _deployIfNotExists("Flame", "FLM", "FLAME", false);
        _deployIfNotExists("Flame Core", "FLAME", "FLAME", false);
        _deployIfNotExists("Flare", "FLR", "FLAME", false);
        
        // SOUL tokens
        _deployIfNotExists("Valor Soul", "VSoul", "SOUL", false);
        _deployIfNotExists("Soul", "SOUL", "SOUL", false);
        _deployIfNotExists("Ghost", "GHOST", "SOUL", false);
        _deployIfNotExists("Dead", "DEAD", "SOUL", false);
        
        // INTEL tokens
        _deployIfNotExists("Intel Secure", "INTL-S", "INTEL", false);
        _deployIfNotExists("Intel", "INTL", "INTEL", false);
        _deployIfNotExists("Intelit", "INTELIT", "INTEL", false);
        
        // BRAIN tokens
        _deployIfNotExists("VMware Plus", "VMWARE+", "BRAIN", false);
        _deployIfNotExists("Brain Plus", "BRAIN+", "BRAIN", false);
        _deployIfNotExists("Edutain", "EDUTAIN", "BRAIN", false);
        _deployIfNotExists("Math Plus", "MATH+", "BRAIN", false);
        
        // VALORAIPLUS tokens (NOTE: $VALOR is NULLIFIED)
        _deployIfNotExists("ValorAI Plus", "$VALORAIPLUS", "VALOR", false);
        _deployIfNotExists("ValorAI Plus DAO 2035", "$VALORAIPLUS2E_DAO_GOVERNANCE_2035_CLOSED", "VALOR", false);
        _deployIfNotExists("Valor ACN", "VACN", "VALOR", false);
        _deployIfNotExists("Valor DAO", "VALORDAO", "VALOR", false);
        _deployIfNotExists("Valor Utility", "VALUTL", "VALOR", false);
        
        // GOVERNANCE tokens
        _deployIfNotExists("Valor DAO Gov", "VDAO", "GOVERNANCE", false);
        _deployIfNotExists("Vault", "VLT", "GOVERNANCE", false);
        _deployIfNotExists("Valor Net", "VNET", "GOVERNANCE", false);
        
        // SCROLL tokens
        _deployIfNotExists("Skroll", "SKROLL", "SCROLL", false);
        _deployIfNotExists("Skoll", "SKOLL", "SCROLL", false);
        _deployIfNotExists("Skrol", "SKROL", "SCROLL", false);
        
        // ANCHOR tokens
        _deployIfNotExists("DG Gravity", "DG77.77X_GRAVITY_ACTIVE", "ANCHOR", false);
        _deployIfNotExists("SGAU Token", "SGAU", "ANCHOR", false);
        _deployIfNotExists("Angel", "$ANGL", "ANCHOR", false);
        _deployIfNotExists("Angel 2026", "ANGL2026", "ANCHOR", false);
        
        // TIME tokens
        _deployIfNotExists("DG 1969", "DG1969", "TIME", false);
        _deployIfNotExists("DJ Time", "DJTIME", "TIME", false);
        _deployIfNotExists("Time", "TIME", "TIME", false);
        
        // SOVEREIGN (Protected) tokens
        _deployIfNotExists("Newt 2026", "$NEWT2026", "SOVEREIGN", true);
        _deployIfNotExists("Donny", "$DONNY", "SOVEREIGN", true);
        _deployIfNotExists("Gillson", "$GILLSON", "SOVEREIGN", true);
        _deployIfNotExists("Gillson Gold", "$GILLGOLD", "SOVEREIGN", true);
        _deployIfNotExists("Poppa", "$POPPA", "SOVEREIGN", true);
        _deployIfNotExists("Jaxx", "JAXX", "SOVEREIGN", true);
        _deployIfNotExists("Potter", "$POTTER", "SOVEREIGN", true);
        _deployIfNotExists("Braden 168", "$BRADEN168", "SOVEREIGN", true);
        _deployIfNotExists("Mason", "$MASON", "SOVEREIGN", true);
        
        emit CanonComplete(deployedTokens.length, block.timestamp);
    }
    
    /**
     * @dev Internal deployment helper
     */
    function _deployIfNotExists(
        string memory name_,
        string memory symbol_,
        string memory category_,
        bool isProtected_
    ) internal {
        if (tokenAddresses[symbol_] == address(0)) {
            ValorToken token = new ValorToken(
                name_,
                symbol_,
                DEFAULT_SUPPLY,
                sovereignAddress,
                DEFAULT_DECIMALS,
                isProtected_,
                category_
            );
            
            address tokenAddr = address(token);
            tokenAddresses[symbol_] = tokenAddr;
            isValorToken[tokenAddr] = true;
            deployedTokens.push(symbol_);
            
            emit TokenDeployed(symbol_, tokenAddr, category_, isProtected_, DEFAULT_SUPPLY);
        }
    }
    
    // ═══════════════════════════════════════════════════════
    // VIEW FUNCTIONS
    // ═══════════════════════════════════════════════════════
    
    function getTokenAddress(string memory symbol_) external view returns (address) {
        return tokenAddresses[symbol_];
    }
    
    function getDeployedTokenCount() external view returns (uint256) {
        return deployedTokens.length;
    }
    
    function getAllDeployedTokens() external view returns (string[] memory) {
        return deployedTokens;
    }
    
    function isCanonComplete() external view returns (bool) {
        return deployedTokens.length == CANON_SIZE;
    }
    
    function getFactoryStatus() external view returns (
        uint256 deployed,
        uint256 remaining,
        bool complete,
        address sovereign
    ) {
        deployed = deployedTokens.length;
        remaining = CANON_SIZE - deployed;
        complete = deployed == CANON_SIZE;
        sovereign = sovereignAddress;
    }
}
