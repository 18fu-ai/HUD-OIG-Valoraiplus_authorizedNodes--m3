// SGAU-VALUEGUARD Registry Contract ABI
// Protocol State Layer - OpenZeppelin-compatible

export const REGISTRY_ABI = [
  // Events
  {
    type: 'event',
    name: 'NodeLatched',
    inputs: [
      { name: 'nodeId', type: 'bytes32', indexed: true },
      { name: 'category', type: 'string', indexed: false },
      { name: 'logicHash', type: 'bytes32', indexed: false },
      { name: 'truthCycle', type: 'uint256', indexed: false },
      { name: 'signer', type: 'address', indexed: true },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'RevisionCreated',
    inputs: [
      { name: 'nodeId', type: 'bytes32', indexed: true },
      { name: 'revision', type: 'uint256', indexed: false },
      { name: 'logicHash', type: 'bytes32', indexed: false },
      { name: 'signer', type: 'address', indexed: true },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'NodeNullified',
    inputs: [
      { name: 'nodeId', type: 'bytes32', indexed: true },
      { name: 'reason', type: 'string', indexed: false },
      { name: 'nullifier', type: 'address', indexed: true },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'AnchorUpdated',
    inputs: [
      { name: 'anchorId', type: 'bytes32', indexed: true },
      { name: 'merkleRoot', type: 'bytes32', indexed: false },
      { name: 'blockHeight', type: 'uint256', indexed: false },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'VerifierApproved',
    inputs: [
      { name: 'verifier', type: 'address', indexed: true },
      { name: 'role', type: 'bytes32', indexed: false },
      { name: 'approver', type: 'address', indexed: true },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
  },
  // Functions
  {
    type: 'function',
    name: 'latchExhibit',
    inputs: [
      { name: 'nodeId', type: 'bytes32' },
      { name: 'category', type: 'string' },
      { name: 'logicHash', type: 'bytes32' },
      { name: 'truthCycle', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'expiration', type: 'uint256' },
      { name: 'signature', type: 'bytes' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createRevision',
    inputs: [
      { name: 'nodeId', type: 'bytes32' },
      { name: 'logicHash', type: 'bytes32' },
      { name: 'nonce', type: 'uint256' },
      { name: 'expiration', type: 'uint256' },
      { name: 'signature', type: 'bytes' },
    ],
    outputs: [{ name: 'revision', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'nullifyNode',
    inputs: [
      { name: 'nodeId', type: 'bytes32' },
      { name: 'reason', type: 'string' },
      { name: 'nonce', type: 'uint256' },
      { name: 'expiration', type: 'uint256' },
      { name: 'signature', type: 'bytes' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateAnchor',
    inputs: [
      { name: 'anchorId', type: 'bytes32' },
      { name: 'merkleRoot', type: 'bytes32' },
      { name: 'nonce', type: 'uint256' },
      { name: 'expiration', type: 'uint256' },
      { name: 'signature', type: 'bytes' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'approveVerifier',
    inputs: [
      { name: 'verifier', type: 'address' },
      { name: 'role', type: 'bytes32' },
      { name: 'nonce', type: 'uint256' },
      { name: 'expiration', type: 'uint256' },
      { name: 'signature', type: 'bytes' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  // View Functions
  {
    type: 'function',
    name: 'getNode',
    inputs: [{ name: 'nodeId', type: 'bytes32' }],
    outputs: [
      { name: 'category', type: 'string' },
      { name: 'logicHash', type: 'bytes32' },
      { name: 'truthCycle', type: 'uint256' },
      { name: 'revision', type: 'uint256' },
      { name: 'signer', type: 'address' },
      { name: 'timestamp', type: 'uint256' },
      { name: 'nullified', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getNonce',
    inputs: [{ name: 'signer', type: 'address' }],
    outputs: [{ name: 'nonce', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isVerifier',
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'role', type: 'bytes32' },
    ],
    outputs: [{ name: 'authorized', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAnchor',
    inputs: [{ name: 'anchorId', type: 'bytes32' }],
    outputs: [
      { name: 'merkleRoot', type: 'bytes32' },
      { name: 'blockHeight', type: 'uint256' },
      { name: 'timestamp', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
] as const;

// Contract addresses per chain
export const REGISTRY_ADDRESSES: Record<number, `0x${string}`> = {
  1: '0x0000000000000000000000000000000000000000', // Ethereum Mainnet (placeholder)
  11155111: '0x0000000000000000000000000000000000000000', // Sepolia (placeholder)
  137: '0x0000000000000000000000000000000000000000', // Polygon (placeholder)
  42161: '0x0000000000000000000000000000000000000000', // Arbitrum (placeholder)
};

// Role definitions
export const ROLES = {
  ADMIN: '0x0000000000000000000000000000000000000000000000000000000000000000' as `0x${string}`,
  AUDITOR: '0x4155444954000000000000000000000000000000000000000000000000000000' as `0x${string}`,
  ENFORCER: '0x454e464f52434500000000000000000000000000000000000000000000000000' as `0x${string}`,
  VERIFIER: '0x5645524946494552000000000000000000000000000000000000000000000000' as `0x${string}`,
  RECOVERY: '0x5245434f56455259000000000000000000000000000000000000000000000000' as `0x${string}`,
} as const;

// Event type names
export type RegistryEventName = 
  | 'NodeLatched'
  | 'RevisionCreated'
  | 'NodeNullified'
  | 'AnchorUpdated'
  | 'VerifierApproved';
