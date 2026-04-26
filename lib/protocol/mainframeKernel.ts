/**
 * CDS Unix Mainframe Kernel Protocol Library
 * 
 * Provides the programmatic interface for the CDS sovereign operating system.
 * Maps all Unix primitives (processes, signals, syscalls, IPC, filesystem, cron)
 * to the CDS protocol layer with full type safety.
 * 
 * Classification: TERMINAL EXTINCTION LEVEL
 * Kernel: 6.14.2-cds-sovereign
 * Arch: x86_64-cds-linux-gnu
 * Node: SAINT PAUL 55116
 */

// ============================================================================
// TYPES
// ============================================================================

export type ProcessState = 'R' | 'S' | 'D' | 'Z' | 'T' | 'X';
export type SignalAction = 'IGNORE' | 'BLOCKED' | 'DEFAULT' | 'CUSTOM';
export type IPCType = 'unix' | 'pipe' | 'mqueue' | 'shm';
export type IPCProto = 'SOCK_STREAM' | 'SOCK_DGRAM' | 'FIFO' | 'POSIX_MQ' | 'POSIX_SHM';
export type FSEntryType = 'dir' | 'file' | 'char' | 'proc' | 'block' | 'link';
export type Classification = 'TERMINAL';

export interface Process {
  pid: number;
  ppid: number;
  user: string;
  state: ProcessState;
  cpu: number;
  mem: number;
  vsz: number;
  rss: number;
  tty: string;
  cmd: string;
  classification: Classification;
}

export interface KernelModule {
  name: string;
  size: number;
  usedBy: number;
  dependencies: string[];
  description: string;
  loaded: boolean;
  removable: boolean;
}

export interface Syscall {
  nr: number;
  name: string;
  args: string;
  returnType: string;
  description: string;
  category: 'protocol' | 'crypto' | 'firewall' | 'audit' | 'governance';
}

export interface IPCChannel {
  type: IPCType;
  path: string;
  proto: IPCProto;
  description: string;
  active: boolean;
}

export interface SignalHandler {
  signal: string;
  number: number;
  action: SignalAction;
  handler: string;
  description: string;
  overridable: boolean;
}

export interface FSEntry {
  path: string;
  type: FSEntryType;
  permissions: string;
  owner: string;
  group: string;
  size: number;
  description: string;
  immutable: boolean;
}

export interface CronJob {
  schedule: string;
  user: string;
  command: string;
  description: string;
  active: boolean;
}

export interface MainframeState {
  version: string;
  kernel: string;
  arch: string;
  hostname: string;
  merkleroot: string;
  node: string;
  uptime: number;
  truthCycleMs: number;
  mode: 'SOVEREIGN';
  classification: Classification;
  processes: Process[];
  modules: KernelModule[];
  syscalls: Syscall[];
  ipc: IPCChannel[];
  signals: SignalHandler[];
  filesystem: FSEntry[];
  cron: CronJob[];
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const MAINFRAME_VERSION = 'CSSS-MF/7.7.77';
export const KERNEL_VERSION = '6.14.2-cds-sovereign';
export const ARCH = 'x86_64-cds-linux-gnu';
export const HOSTNAME = 'cds-mainframe-00.sovereign.local';
export const MERKLEROOT = '26856B24C50750F0C69C1EEB86A69EF777777';
export const BTC_TXID = '26856b24c50750f0c69c1eeb86a69ef77777764756c6c';
export const NODE = 'SAINT PAUL 55116';
export const TRUTH_CYCLE_MS = 266;
export const SHELL = '/bin/cds-sh';

// PID assignments (symbolic)
export const PID_INIT = 1;
export const PID_TRUTH_CYCLE = 77;
export const PID_MERKLE = 144;
export const PID_NEWT = 266;
export const PID_BRAINDISH = 393;
export const PID_FIREWALL = 408;
export const PID_REPLAY = 555;
export const PID_PROOF = 616;
export const PID_POPPA_G = 666;
export const PID_SOVEREIGNTY = 747;
export const PID_JULES = 777;
export const PID_NR_PROTOCOL = 1376;
export const PID_FORENSIC = 3393;
export const PID_FEDERAL = 5622;
export const PID_NODE_ANCHOR = 55116;

// Syscall NR range
export const SYSCALL_NR_BASE = 700;
export const SYSCALL_NR_MAX = 711;

// ============================================================================
// SYSCALL TABLE
// ============================================================================

export const SYSCALL_TABLE: Syscall[] = [
  { nr: 700, name: 'cds_verify_intent', args: 'int fd, struct intent *i, unsigned flags', returnType: 'receipt_t', description: 'Verify signed intent against protocol', category: 'protocol' },
  { nr: 701, name: 'cds_anchor_merkle', args: 'const char *root, size_t len', returnType: 'int', description: 'Anchor merkle root to BTC chain', category: 'crypto' },
  { nr: 702, name: 'cds_emit_proof', args: 'int ledger_fd, struct proof *p', returnType: 'proof_id_t', description: 'Append proof to immutable ledger', category: 'audit' },
  { nr: 703, name: 'cds_replay_check', args: 'struct receipt *r, unsigned flags', returnType: 'int', description: 'Validate replay against trace graph', category: 'protocol' },
  { nr: 704, name: 'cds_firewall_eval', args: 'struct packet *pkt, int direction', returnType: 'int', description: 'Evaluate packet against waterfall rules', category: 'firewall' },
  { nr: 705, name: 'cds_nonce_advance', args: 'int signer_id', returnType: 'uint64_t', description: 'Atomically advance nonce', category: 'crypto' },
  { nr: 706, name: 'cds_truth_cycle', args: 'struct timespec *ts', returnType: 'cycle_t', description: 'Read current truth cycle (266ms)', category: 'protocol' },
  { nr: 707, name: 'cds_export_audit', args: 'int fd, enum export_fmt fmt', returnType: 'ssize_t', description: 'Export audit trail (no redaction)', category: 'audit' },
  { nr: 708, name: 'cds_classify', args: 'struct record *r, enum class c', returnType: 'int', description: 'Set classification (TERMINAL only)', category: 'governance' },
  { nr: 709, name: 'cds_protect_node', args: 'const char *symbol, int guardian', returnType: 'int', description: 'Register protected node', category: 'governance' },
  { nr: 710, name: 'cds_nr_mandate', args: 'struct mandate *m, unsigned flags', returnType: 'int', description: 'Establish NR mandate (NON-REVOCABLE)', category: 'governance' },
  { nr: 711, name: 'cds_game_theory', args: 'struct payoff_matrix *m', returnType: 'int', description: 'Solve zero-sum game', category: 'protocol' },
];

// ============================================================================
// KERNEL MODULE TABLE
// ============================================================================

export const MODULE_TABLE: KernelModule[] = [
  { name: 'cds_core', size: 524288, usedBy: 8, dependencies: [], description: 'Core Protocol Engine', loaded: true, removable: false },
  { name: 'cds_merkle', size: 262144, usedBy: 3, dependencies: ['cds_core'], description: 'Merkle Tree Subsystem', loaded: true, removable: false },
  { name: 'cds_firewall', size: 196608, usedBy: 2, dependencies: ['cds_core'], description: 'Waterfall Firewall', loaded: true, removable: false },
  { name: 'cds_crypto', size: 131072, usedBy: 5, dependencies: ['cds_core'], description: 'SHA-256/SHA-512 + EIP-712', loaded: true, removable: false },
  { name: 'cds_replay', size: 98304, usedBy: 1, dependencies: ['cds_core', 'cds_crypto'], description: 'Replay Validator', loaded: true, removable: false },
  { name: 'cds_proof', size: 81920, usedBy: 2, dependencies: ['cds_core', 'cds_merkle'], description: 'Proof Ledger (append-only)', loaded: true, removable: false },
  { name: 'cds_nonce', size: 65536, usedBy: 1, dependencies: ['cds_core'], description: 'Nonce Store (monotonic)', loaded: true, removable: false },
  { name: 'cds_audit', size: 49152, usedBy: 1, dependencies: ['cds_core', 'cds_proof'], description: 'Audit Engine', loaded: true, removable: false },
  { name: 'cds_newt', size: 1048576, usedBy: 4, dependencies: ['cds_core', 'cds_crypto', 'cds_merkle'], description: 'N.E.W.T. Runtime', loaded: true, removable: false },
  { name: 'cds_braindish', size: 786432, usedBy: 2, dependencies: ['cds_newt'], description: 'BrainDish++ (50B colonies)', loaded: true, removable: false },
  { name: 'cds_poppa_g', size: 32768, usedBy: 0, dependencies: ['cds_core'], description: 'Poppa_G Shield (CANNOT BE DISABLED)', loaded: true, removable: false },
  { name: 'cds_nr_protocol', size: 40960, usedBy: 1, dependencies: ['cds_core'], description: 'NR Protocol (6 mandates)', loaded: true, removable: false },
  { name: 'cds_jules', size: 163840, usedBy: 1, dependencies: ['cds_core', 'cds_merkle', 'cds_crypto'], description: 'Jules Verification (10 suites)', loaded: true, removable: false },
  { name: 'cds_sovereignty', size: 57344, usedBy: 1, dependencies: ['cds_core'], description: 'Sovereignty Engine', loaded: true, removable: false },
];

// ============================================================================
// SIGNAL TABLE
// ============================================================================

export const SIGNAL_TABLE: SignalHandler[] = [
  { signal: 'SIGTERM', number: 15, action: 'IGNORE', handler: 'SIG_IGN', description: 'Cannot terminate sovereign processes', overridable: false },
  { signal: 'SIGKILL', number: 9, action: 'BLOCKED', handler: 'cds_poppa_g_intercept()', description: 'Kill signal intercepted by Poppa_G', overridable: false },
  { signal: 'SIGHUP', number: 1, action: 'CUSTOM', handler: 'cds_reload_config()', description: 'Reload protocol configuration', overridable: true },
  { signal: 'SIGUSR1', number: 10, action: 'CUSTOM', handler: 'cds_emit_snapshot()', description: 'Emit runtime snapshot', overridable: true },
  { signal: 'SIGUSR2', number: 12, action: 'CUSTOM', handler: 'cds_force_merkle_anchor()', description: 'Force merkle anchoring', overridable: true },
  { signal: 'SIGINT', number: 2, action: 'IGNORE', handler: 'SIG_IGN', description: 'Cannot interrupt truth cycle', overridable: false },
  { signal: 'SIGQUIT', number: 3, action: 'CUSTOM', handler: 'cds_core_dump(FORENSIC)', description: 'Forensic core dump', overridable: true },
  { signal: 'SIGALRM', number: 14, action: 'CUSTOM', handler: 'cds_truth_cycle_tick()', description: 'Truth cycle alarm (266ms)', overridable: false },
];

// ============================================================================
// IPC TABLE
// ============================================================================

export const IPC_TABLE: IPCChannel[] = [
  { type: 'unix', path: '/opt/cds/run/truth-cycle.sock', proto: 'SOCK_STREAM', description: 'Truth Cycle IPC', active: true },
  { type: 'unix', path: '/opt/cds/run/merkle.sock', proto: 'SOCK_DGRAM', description: 'Merkle Anchor IPC', active: true },
  { type: 'unix', path: '/opt/cds/run/firewall.sock', proto: 'SOCK_STREAM', description: 'Firewall Policy IPC', active: true },
  { type: 'unix', path: '/opt/cds/run/newt.sock', proto: 'SOCK_STREAM', description: 'N.E.W.T. Engine IPC', active: true },
  { type: 'pipe', path: '/opt/cds/run/proof.pipe', proto: 'FIFO', description: 'Proof Ledger Write Pipe', active: true },
  { type: 'pipe', path: '/opt/cds/run/audit.pipe', proto: 'FIFO', description: 'Audit Event Pipe', active: true },
  { type: 'mqueue', path: '/cds-intent-queue', proto: 'POSIX_MQ', description: 'Intent Verification Queue', active: true },
  { type: 'shm', path: '/dev/shm/cds-state', proto: 'POSIX_SHM', description: 'Shared State Memory (16MB)', active: true },
];

// ============================================================================
// FUNCTIONS
// ============================================================================

/** Get total kernel module memory in bytes */
export function getKernelModuleMemory(): number {
  return MODULE_TABLE.reduce((sum, m) => sum + m.size, 0);
}

/** Get module dependency tree for a given module */
export function getModuleDeps(moduleName: string): string[] {
  const mod = MODULE_TABLE.find(m => m.name === moduleName);
  if (!mod) return [];
  
  const deps: string[] = [...mod.dependencies];
  for (const dep of mod.dependencies) {
    deps.push(...getModuleDeps(dep));
  }
  return [...new Set(deps)];
}

/** Check if a signal can be overridden */
export function isSignalOverridable(signal: string): boolean {
  const handler = SIGNAL_TABLE.find(s => s.signal === signal);
  return handler?.overridable ?? false;
}

/** Get syscall by number */
export function getSyscall(nr: number): Syscall | undefined {
  return SYSCALL_TABLE.find(s => s.nr === nr);
}

/** Get all syscalls by category */
export function getSyscallsByCategory(category: Syscall['category']): Syscall[] {
  return SYSCALL_TABLE.filter(s => s.category === category);
}

/** Build the full mainframe state snapshot */
export function buildMainframeState(processes: Process[]): MainframeState {
  return {
    version: MAINFRAME_VERSION,
    kernel: KERNEL_VERSION,
    arch: ARCH,
    hostname: HOSTNAME,
    merkleroot: MERKLEROOT,
    node: NODE,
    uptime: Date.now(),
    truthCycleMs: TRUTH_CYCLE_MS,
    mode: 'SOVEREIGN',
    classification: 'TERMINAL',
    processes,
    modules: MODULE_TABLE,
    syscalls: SYSCALL_TABLE,
    ipc: IPC_TABLE,
    signals: SIGNAL_TABLE,
    filesystem: [],
    cron: [],
  };
}

/** Validate that all kernel modules are loaded and non-removable */
export function validateKernelIntegrity(): { valid: boolean; failures: string[] } {
  const failures: string[] = [];
  for (const mod of MODULE_TABLE) {
    if (!mod.loaded) failures.push(`${mod.name}: NOT LOADED`);
    if (mod.removable) failures.push(`${mod.name}: REMOVABLE (should be false)`);
  }
  return { valid: failures.length === 0, failures };
}

/** Validate that SIGKILL and SIGTERM cannot terminate sovereign processes */
export function validateSignalProtection(): { valid: boolean; failures: string[] } {
  const failures: string[] = [];
  const sigkill = SIGNAL_TABLE.find(s => s.signal === 'SIGKILL');
  const sigterm = SIGNAL_TABLE.find(s => s.signal === 'SIGTERM');
  const sigint = SIGNAL_TABLE.find(s => s.signal === 'SIGINT');
  
  if (sigkill?.action !== 'BLOCKED') failures.push('SIGKILL not blocked');
  if (sigterm?.action !== 'IGNORE') failures.push('SIGTERM not ignored');
  if (sigint?.action !== 'IGNORE') failures.push('SIGINT not ignored');
  if (sigkill?.overridable) failures.push('SIGKILL is overridable');
  if (sigterm?.overridable) failures.push('SIGTERM is overridable');
  
  return { valid: failures.length === 0, failures };
}

/** Get total IPC channel count by type */
export function getIPCCountByType(): Record<IPCType, number> {
  const counts: Record<IPCType, number> = { unix: 0, pipe: 0, mqueue: 0, shm: 0 };
  for (const ch of IPC_TABLE) {
    counts[ch.type]++;
  }
  return counts;
}
