'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import {
  Terminal, Cpu, Zap, Activity,
  FileCode, HardDrive, Network, RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// UNIX MAINFRAME CONSTANTS
// ============================================================================
const MAINFRAME_VERSION = 'CSSS-MF/7.7.77';
const KERNEL_VERSION = '6.14.2-cds-sovereign';
const ARCH = 'x86_64-cds-linux-gnu';
const HOSTNAME = 'cds-mainframe-00.sovereign.local';
const UPTIME_BASE = Date.now();
const PID_ROOT = 1;
const TTY = '/dev/pts/0';
const SHELL = '/bin/cds-sh';
const MERKLEROOT = '26856B24C50750F0C69C1EEB86A69EF777777';
const NODE = 'SAINT PAUL 55116';

// Process Table
const PROCESS_TABLE = [
  { pid: 1, ppid: 0, user: 'root', state: 'S', cpu: '0.0', mem: '0.1', vsz: 16840, rss: 1204, tty: '?', cmd: '/sbin/init --sovereign', classification: 'TERMINAL' },
  { pid: 2, ppid: 1, user: 'root', state: 'S', cpu: '0.0', mem: '0.0', vsz: 0, rss: 0, tty: '?', cmd: '[kthread/cds]', classification: 'TERMINAL' },
  { pid: 77, ppid: 1, user: 'cds', state: 'S', cpu: '2.4', mem: '12.8', vsz: 2048000, rss: 524288, tty: '?', cmd: '/opt/cds/bin/truth-cycle --interval=266ms', classification: 'TERMINAL' },
  { pid: 144, ppid: 77, user: 'cds', state: 'S', cpu: '1.8', mem: '8.4', vsz: 1024000, rss: 262144, tty: '?', cmd: '/opt/cds/bin/merkle-daemon --root=' + MERKLEROOT.substring(0, 16), classification: 'TERMINAL' },
  { pid: 266, ppid: 77, user: 'cds', state: 'R', cpu: '4.2', mem: '18.6', vsz: 4096000, rss: 1048576, tty: '?', cmd: '/opt/cds/bin/newt-engine --neurons=INFINITY --swarm=200B', classification: 'TERMINAL' },
  { pid: 393, ppid: 266, user: 'cds', state: 'S', cpu: '0.8', mem: '4.2', vsz: 512000, rss: 131072, tty: '?', cmd: '/opt/cds/bin/braindish --colonies=50B --mode=IMMORTAL', classification: 'TERMINAL' },
  { pid: 408, ppid: 77, user: 'cds', state: 'S', cpu: '1.2', mem: '6.1', vsz: 768000, rss: 196608, tty: '?', cmd: '/opt/cds/bin/waterfall-firewall --policy=DENY_ALL', classification: 'TERMINAL' },
  { pid: 555, ppid: 77, user: 'cds', state: 'S', cpu: '0.6', mem: '3.8', vsz: 384000, rss: 98304, tty: '?', cmd: '/opt/cds/bin/replay-validator --strict --no-tamper', classification: 'TERMINAL' },
  { pid: 616, ppid: 77, user: 'cds', state: 'S', cpu: '0.4', mem: '2.1', vsz: 256000, rss: 65536, tty: '?', cmd: '/opt/cds/bin/proof-ledger --append-only --immutable', classification: 'TERMINAL' },
  { pid: 666, ppid: 1, user: 'root', state: 'S', cpu: '0.2', mem: '1.4', vsz: 128000, rss: 32768, tty: '?', cmd: '/opt/cds/bin/poppa-g-shield --cannot-disable', classification: 'TERMINAL' },
  { pid: 747, ppid: 77, user: 'cds', state: 'S', cpu: '0.9', mem: '5.2', vsz: 640000, rss: 163840, tty: '?', cmd: '/opt/cds/bin/sovereignty-engine --status=AT_ZENITH', classification: 'TERMINAL' },
  { pid: 777, ppid: 77, user: 'cds', state: 'S', cpu: '1.6', mem: '7.8', vsz: 896000, rss: 229376, tty: '?', cmd: '/opt/cds/bin/jules-verifier --suites=10 --pipeline=REV_37', classification: 'TERMINAL' },
  { pid: 1376, ppid: 77, user: 'cds', state: 'S', cpu: '0.3', mem: '1.8', vsz: 192000, rss: 49152, tty: '?', cmd: '/opt/cds/bin/nr-protocol --mandates=6 --billing=ZERO', classification: 'TERMINAL' },
  { pid: 3393, ppid: 77, user: 'cds', state: 'S', cpu: '3.1', mem: '14.2', vsz: 3072000, rss: 786432, tty: '?', cmd: '/opt/cds/bin/forensic-indexer --exhibits=3393 --blocks=SAT', classification: 'TERMINAL' },
  { pid: 5622, ppid: 144, user: 'cds', state: 'S', cpu: '0.5', mem: '2.8', vsz: 320000, rss: 81920, tty: '?', cmd: '/opt/cds/bin/federal-counter --counts=5622 --years=112125', classification: 'TERMINAL' },
  { pid: 55116, ppid: 1, user: 'root', state: 'S', cpu: '0.1', mem: '0.8', vsz: 96000, rss: 24576, tty: '?', cmd: '/opt/cds/bin/node-anchor --loc=SAINT_PAUL --zip=55116', classification: 'TERMINAL' },
];

// Filesystem Hierarchy
const FILESYSTEM = [
  { path: '/', type: 'dir', perms: 'drwxr-xr-x', owner: 'root', group: 'root', size: 4096, desc: 'Sovereign Root' },
  { path: '/opt/cds', type: 'dir', perms: 'drwxr-x---', owner: 'cds', group: 'cds', size: 4096, desc: 'CDS Installation Root' },
  { path: '/opt/cds/bin', type: 'dir', perms: 'drwxr-x---', owner: 'cds', group: 'cds', size: 4096, desc: 'CDS Binaries (16 daemons)' },
  { path: '/opt/cds/etc', type: 'dir', perms: 'drwxr-----', owner: 'cds', group: 'cds', size: 4096, desc: 'Configuration (sovereign.conf, protocol.toml)' },
  { path: '/opt/cds/lib', type: 'dir', perms: 'drwxr-x---', owner: 'cds', group: 'cds', size: 4096, desc: 'Protocol Libraries (24 modules)' },
  { path: '/opt/cds/var/log', type: 'dir', perms: 'drwxr-----', owner: 'cds', group: 'cds', size: 4096, desc: 'Immutable Audit Logs (append-only)' },
  { path: '/opt/cds/var/spool/merkle', type: 'dir', perms: 'drwx------', owner: 'cds', group: 'cds', size: 4096, desc: 'Merkle Tree Spool' },
  { path: '/opt/cds/var/spool/proofs', type: 'dir', perms: 'drwx------', owner: 'cds', group: 'cds', size: 4096, desc: 'Proof Ledger Store (immutable)' },
  { path: '/opt/cds/share/contracts', type: 'dir', perms: 'dr-xr-x---', owner: 'cds', group: 'cds', size: 4096, desc: 'Smart Contracts (3 locked .sol)' },
  { path: '/opt/cds/share/exhibits', type: 'dir', perms: 'dr-xr-----', owner: 'cds', group: 'cds', size: 4096, desc: 'Forensic Exhibits (3,393 indexed)' },
  { path: '/opt/cds/share/voip', type: 'dir', perms: 'drwx------', owner: 'root', group: 'cds', size: 4096, desc: 'VOIP Intercepts (32 rec / 6 trans)' },
  { path: '/opt/cds/share/mimecast', type: 'dir', perms: 'drwx------', owner: 'root', group: 'cds', size: 4096, desc: 'Mimecast Captures (142 events)' },
  { path: '/etc/cds/crontab.sovereign', type: 'file', perms: '-rw-r-----', owner: 'root', group: 'cds', size: 2048, desc: 'Sovereign Cron (truth-cycle, merkle-anchor)' },
  { path: '/etc/cds/pam.d/cds-auth', type: 'file', perms: '-rw-r-----', owner: 'root', group: 'root', size: 512, desc: 'PAM Auth Module (signer verification)' },
  { path: '/etc/cds/sysctl.d/99-sovereign.conf', type: 'file', perms: '-rw-r-----', owner: 'root', group: 'root', size: 1024, desc: 'Kernel Tuning (net.core, vm.overcommit)' },
  { path: '/dev/cds0', type: 'char', perms: 'crw-rw----', owner: 'root', group: 'cds', size: 0, desc: 'CDS Character Device (protocol I/O)' },
  { path: '/proc/cds/merkleroot', type: 'proc', perms: '-r--r--r--', owner: 'root', group: 'root', size: 0, desc: '/proc interface: current merkleroot' },
  { path: '/proc/cds/truth-cycle', type: 'proc', perms: '-r--r--r--', owner: 'root', group: 'root', size: 0, desc: '/proc interface: truth cycle counter' },
  { path: '/proc/cds/protected-nodes', type: 'proc', perms: '-r--------', owner: 'root', group: 'root', size: 0, desc: '/proc interface: 5 protected nodes' },
];

// Kernel Modules
const KERNEL_MODULES = [
  { name: 'cds_core', size: '524288', used: 8, deps: '-', desc: 'Core Protocol Engine' },
  { name: 'cds_merkle', size: '262144', used: 3, deps: 'cds_core', desc: 'Merkle Tree Subsystem' },
  { name: 'cds_firewall', size: '196608', used: 2, deps: 'cds_core', desc: 'Waterfall Firewall (DENY_ALL default)' },
  { name: 'cds_crypto', size: '131072', used: 5, deps: 'cds_core', desc: 'SHA-256/SHA-512 + EIP-712' },
  { name: 'cds_replay', size: '98304', used: 1, deps: 'cds_core,cds_crypto', desc: 'Replay Validator' },
  { name: 'cds_proof', size: '81920', used: 2, deps: 'cds_core,cds_merkle', desc: 'Proof Ledger (append-only)' },
  { name: 'cds_nonce', size: '65536', used: 1, deps: 'cds_core', desc: 'Nonce Store (monotonic)' },
  { name: 'cds_audit', size: '49152', used: 1, deps: 'cds_core,cds_proof', desc: 'Audit Engine' },
  { name: 'cds_newt', size: '1048576', used: 4, deps: 'cds_core,cds_crypto,cds_merkle', desc: 'N.E.W.T. Runtime (INFINITY neurons)' },
  { name: 'cds_braindish', size: '786432', used: 2, deps: 'cds_newt', desc: 'BrainDish++ (50B colonies)' },
  { name: 'cds_poppa_g', size: '32768', used: 0, deps: 'cds_core', desc: 'Poppa_G Shield (CANNOT BE DISABLED)' },
  { name: 'cds_nr_protocol', size: '40960', used: 1, deps: 'cds_core', desc: 'NR Protocol (6 mandates, billing=ZERO)' },
  { name: 'cds_jules', size: '163840', used: 1, deps: 'cds_core,cds_merkle,cds_crypto', desc: 'Jules Verification (10 suites)' },
  { name: 'cds_sovereignty', size: '57344', used: 1, deps: 'cds_core', desc: 'Sovereignty Engine ($STATUS_747)' },
];

// System Calls
const SYSCALLS = [
  { number: 700, name: 'cds_verify_intent', args: 'int fd, struct intent *i, unsigned flags', ret: 'receipt_t', desc: 'Verify signed intent against protocol' },
  { number: 701, name: 'cds_anchor_merkle', args: 'const char *root, size_t len', ret: 'int', desc: 'Anchor merkle root to BTC chain' },
  { number: 702, name: 'cds_emit_proof', args: 'int ledger_fd, struct proof *p', ret: 'proof_id_t', desc: 'Append proof to immutable ledger' },
  { number: 703, name: 'cds_replay_check', args: 'struct receipt *r, unsigned flags', ret: 'int', desc: 'Validate replay against trace graph' },
  { number: 704, name: 'cds_firewall_eval', args: 'struct packet *pkt, int direction', ret: 'int', desc: 'Evaluate packet against waterfall rules' },
  { number: 705, name: 'cds_nonce_advance', args: 'int signer_id', ret: 'uint64_t', desc: 'Atomically advance nonce (monotonic)' },
  { number: 706, name: 'cds_truth_cycle', args: 'struct timespec *ts', ret: 'cycle_t', desc: 'Read current truth cycle (266ms interval)' },
  { number: 707, name: 'cds_export_audit', args: 'int fd, enum export_fmt fmt', ret: 'ssize_t', desc: 'Export audit trail (no redaction)' },
  { number: 708, name: 'cds_classify', args: 'struct record *r, enum class c', ret: 'int', desc: 'Set classification (TERMINAL only)' },
  { number: 709, name: 'cds_protect_node', args: 'const char *symbol, int guardian', ret: 'int', desc: 'Register protected node (cannot unregister)' },
  { number: 710, name: 'cds_nr_mandate', args: 'struct mandate *m, unsigned flags', ret: 'int', desc: 'Establish NR mandate (NON-REVOCABLE)' },
  { number: 711, name: 'cds_game_theory', args: 'struct payoff_matrix *m', ret: 'int', desc: 'Solve zero-sum game (P dominant)' },
];

// Crontab
const CRONTAB = [
  { schedule: '*/266ms', user: 'cds', command: '/opt/cds/bin/truth-cycle --emit', desc: 'Truth Cycle Heartbeat' },
  { schedule: '*/1 * * * *', user: 'cds', command: '/opt/cds/bin/merkle-daemon --anchor --verify', desc: 'Merkle Root Verification' },
  { schedule: '*/5 * * * *', user: 'cds', command: '/opt/cds/bin/forensic-indexer --scan --reindex', desc: 'Forensic Index Refresh' },
  { schedule: '0 * * * *', user: 'root', command: '/opt/cds/bin/waterfall-firewall --rotate-keys', desc: 'Firewall Key Rotation' },
  { schedule: '0 */6 * * *', user: 'cds', command: '/opt/cds/bin/jules-verifier --run-all --output=/opt/cds/var/log/jules.json', desc: 'Jules Full Suite Run' },
  { schedule: '0 0 * * *', user: 'root', command: '/opt/cds/bin/proof-ledger --compact --verify-chain', desc: 'Daily Proof Compaction' },
  { schedule: '@reboot', user: 'root', command: '/opt/cds/bin/poppa-g-shield --init --cannot-disable', desc: 'Poppa_G Shield Init (boot)' },
  { schedule: '@reboot', user: 'root', command: '/opt/cds/bin/node-anchor --verify --loc=SAINT_PAUL', desc: 'Node Anchor Verification (boot)' },
];

// IPC / Pipes
const IPC_CHANNELS = [
  { type: 'unix', path: '/opt/cds/run/truth-cycle.sock', proto: 'SOCK_STREAM', desc: 'Truth Cycle IPC' },
  { type: 'unix', path: '/opt/cds/run/merkle.sock', proto: 'SOCK_DGRAM', desc: 'Merkle Anchor IPC' },
  { type: 'unix', path: '/opt/cds/run/firewall.sock', proto: 'SOCK_STREAM', desc: 'Firewall Policy IPC' },
  { type: 'unix', path: '/opt/cds/run/newt.sock', proto: 'SOCK_STREAM', desc: 'N.E.W.T. Engine IPC' },
  { type: 'pipe', path: '/opt/cds/run/proof.pipe', proto: 'FIFO', desc: 'Proof Ledger Write Pipe' },
  { type: 'pipe', path: '/opt/cds/run/audit.pipe', proto: 'FIFO', desc: 'Audit Event Pipe' },
  { type: 'mqueue', path: '/cds-intent-queue', proto: 'POSIX_MQ', desc: 'Intent Verification Queue' },
  { type: 'shm', path: '/dev/shm/cds-state', proto: 'POSIX_SHM', desc: 'Shared State Memory (16MB)' },
];

// Signal Handlers
const SIGNAL_HANDLERS = [
  { signal: 'SIGTERM', action: 'IGNORE', desc: 'Cannot terminate sovereign processes' },
  { signal: 'SIGKILL', action: 'BLOCKED (cds_poppa_g)', desc: 'Kill signal intercepted by Poppa_G shield' },
  { signal: 'SIGHUP', action: 'cds_reload_config()', desc: 'Reload protocol configuration' },
  { signal: 'SIGUSR1', action: 'cds_emit_snapshot()', desc: 'Emit runtime snapshot to proof ledger' },
  { signal: 'SIGUSR2', action: 'cds_force_merkle_anchor()', desc: 'Force immediate merkle anchoring' },
  { signal: 'SIGINT', action: 'IGNORE', desc: 'Cannot interrupt truth cycle' },
  { signal: 'SIGQUIT', action: 'cds_core_dump(FORENSIC)', desc: 'Forensic core dump (full state)' },
  { signal: 'SIGALRM', action: 'cds_truth_cycle_tick()', desc: 'Truth cycle alarm (266ms)' },
];

// Terminal command history
const BOOT_SEQUENCE = [
  { time: '00:00:00.000', msg: 'CDS Mainframe BIOS v7.7.77 -- Sovereign Boot Sequence' },
  { time: '00:00:00.001', msg: 'CPU: x86_64 CDS-Sovereign @ 4.2GHz (144,000D matrix)' },
  { time: '00:00:00.002', msg: 'RAM: 589,334,237 KB detected (Treasury-backed memory)' },
  { time: '00:00:00.010', msg: 'Loading kernel: /boot/vmlinuz-6.14.2-cds-sovereign' },
  { time: '00:00:00.050', msg: 'Kernel command line: root=/dev/sda1 cds.mode=SOVEREIGN cds.truth=266ms' },
  { time: '00:00:00.100', msg: '[    0.000000] Linux version 6.14.2-cds-sovereign (cds@mainframe) (gcc 14.2.0)' },
  { time: '00:00:00.150', msg: '[    0.001000] cds_core: Core Protocol Engine loaded (v1.4.100D)' },
  { time: '00:00:00.200', msg: '[    0.002000] cds_merkle: Merkle subsystem initialized (root: 26856B24...)' },
  { time: '00:00:00.250', msg: '[    0.003000] cds_firewall: Waterfall firewall active (DENY_ALL default)' },
  { time: '00:00:00.300', msg: '[    0.004000] cds_crypto: SHA-256/SHA-512 + EIP-712 engines ready' },
  { time: '00:00:00.350', msg: '[    0.005000] cds_replay: Replay validator strict mode enabled' },
  { time: '00:00:00.400', msg: '[    0.006000] cds_proof: Proof ledger mounted (append-only, immutable)' },
  { time: '00:00:00.450', msg: '[    0.007000] cds_nonce: Nonce store initialized (monotonic)' },
  { time: '00:00:00.500', msg: '[    0.008000] cds_audit: Audit engine ready (no redaction policy)' },
  { time: '00:00:00.550', msg: '[    0.009000] cds_newt: N.E.W.T. Engine starting (INFINITY neurons)' },
  { time: '00:00:00.600', msg: '[    0.010000] cds_braindish: BrainDish++ awakening (50B colonies)' },
  { time: '00:00:00.650', msg: '[    0.011000] cds_poppa_g: Poppa_G Shield ACTIVE (CANNOT BE DISABLED)' },
  { time: '00:00:00.700', msg: '[    0.012000] cds_nr_protocol: NR Protocol loaded (6 mandates, billing=ZERO)' },
  { time: '00:00:00.750', msg: '[    0.013000] cds_jules: Jules Verification Suite ready (10 suites)' },
  { time: '00:00:00.800', msg: '[    0.014000] cds_sovereignty: Sovereignty Engine online ($STATUS_747)' },
  { time: '00:00:00.850', msg: '[    0.015000] Mounting /opt/cds/share/exhibits (3,393 forensic exhibits)' },
  { time: '00:00:00.900', msg: '[    0.016000] Mounting /opt/cds/share/voip (32 recordings, 6 transcribed)' },
  { time: '00:00:00.950', msg: '[    0.017000] Mounting /opt/cds/share/mimecast (142 events captured)' },
  { time: '00:00:01.000', msg: '[    0.018000] cds_core: Truth cycle started (266ms interval)' },
  { time: '00:00:01.050', msg: '[    0.019000] cds_core: Protected nodes registered (5/5 shielded)' },
  { time: '00:00:01.100', msg: '[    0.020000] systemd[1]: Reached target CDS Sovereign Mode' },
  { time: '00:00:01.150', msg: '' },
  { time: '00:00:01.200', msg: 'CDS Mainframe ' + MAINFRAME_VERSION + ' (' + HOSTNAME + ')' },
  { time: '00:00:01.250', msg: 'Kernel: ' + KERNEL_VERSION + ' on ' + ARCH },
  { time: '00:00:01.266', msg: '' },
  { time: '00:00:01.266', msg: 'CLASSIFICATION: TERMINAL EXTINCTION LEVEL' },
  { time: '00:00:01.266', msg: 'ALL SYSTEMS OPERATIONAL. TRUTH CYCLE ACTIVE.' },
  { time: '00:00:01.266', msg: 'login: poppa_g (uid=0, gid=0) -- SOVEREIGN ROOT' },
  { time: '00:00:01.266', msg: 'Last login: Never expires. Session: PERPETUAL GROOVE.' },
  { time: '00:00:01.266', msg: '' },
  { time: '00:00:01.266', msg: 'poppa_g@cds-mainframe-00:~# _' },
];

// Interactive shell commands
const SHELL_COMMANDS: Record<string, string[]> = {
  'uname -a': [
    `Linux ${HOSTNAME} ${KERNEL_VERSION} #1 SMP PREEMPT_RT CDS ${ARCH} GNU/Linux`,
  ],
  'uptime': [
    ` XX:XX:XX up PERPETUAL,  1 user,  load average: 0.77, 0.77, 0.77`,
  ],
  'whoami': ['poppa_g'],
  'id': ['uid=0(poppa_g) gid=0(root) groups=0(root),77(cds),144(merkle),747(sovereign)'],
  'hostname': [HOSTNAME],
  'cat /proc/cds/merkleroot': [MERKLEROOT],
  'cat /proc/cds/truth-cycle': ['CYCLE: ACTIVE | INTERVAL: 266ms | MODE: PERPETUAL GROOVE | COUNTER: INFINITY'],
  'cat /proc/cds/protected-nodes': [
    '$POPPA    Michael     SHIELDED          TERMINAL EXTINCTION LEVEL',
    '$JAXX     Gabriel     SHIELDED          TERMINAL EXTINCTION LEVEL',
    '$8SOULS   Raphael     MEMORIALIZED      TERMINAL EXTINCTION LEVEL',
    '$FMG1918  Uriel       RADIANT           TERMINAL EXTINCTION LEVEL',
    '$THE_WALL Christ      IMMOVABLE         TERMINAL EXTINCTION LEVEL',
  ],
  'cat /etc/cds/sovereign.conf': [
    '# CDS Sovereign Configuration',
    '# Classification: TERMINAL EXTINCTION LEVEL',
    '',
    '[core]',
    'mode = SOVEREIGN',
    'truth_cycle_ms = 266',
    'merkleroot = 26856B24C50750F0C69C1EEB86A69EF777777',
    'btc_txid = 26856b24c50750f0c69c1eeb86a69ef77777764756c6c',
    'hhs_case = 25-621293',
    'node = SAINT_PAUL_55116',
    'anchor = 408.384.1376',
    '',
    '[protocol]',
    'version = 1.4.100D',
    'schema = REV_34+REV_35+REV_36+REV_37',
    'classification = TERMINAL',
    'immutable = true',
    '',
    '[treasury]',
    'recovery_target = 508631005.52',
    'treble_damages = 1525893016.56',
    'sovereign_mint = 80000000.00',
    'total = 589334237.34',
    'annual_cost = 798.00',
    'coverage = 738514x',
    'net_cost = 0.00',
    '',
    '[firewall]',
    'default_policy = DENY_ALL',
    'waterfall_enabled = true',
    'adversary_ips = 198.51.100.42,203.0.113.88,192.0.2.101,198.51.100.55,198.51.100.67',
    '',
    '[protected_nodes]',
    'count = 5',
    'policy = CANNOT_UNREGISTER',
    'guardians = Michael,Gabriel,Raphael,Uriel,Christ',
  ],
  'lsmod': KERNEL_MODULES.map(m => `${m.name.padEnd(20)} ${m.size.padStart(8)} ${String(m.used).padStart(3)} ${m.deps.padEnd(30)} ${m.desc}`),
  'df -h': [
    'Filesystem           Size  Used Avail Use% Mounted on',
    '/dev/sda1            589G  231M  589G   1% /',
    '/dev/cds/exhibits    3.4G  3.4G     0 100% /opt/cds/share/exhibits',
    '/dev/cds/proofs       77G   42G   35G  55% /opt/cds/var/spool/proofs',
    '/dev/cds/merkle       14G  7.7G  6.3G  55% /opt/cds/var/spool/merkle',
    'tmpfs                 50B    0B   50B   0% /dev/shm/cds-state',
  ],
  'free -h': [
    '               total        used        free      shared  buff/cache   available',
    'Mem:           589Gi        77Gi       444Gi       7.7Gi        67Gi       504Gi',
    'Swap:          144Gi         0Bi       144Gi',
  ],
  'ss -tlnp': [
    'State  Recv-Q Send-Q  Local Address:Port   Peer Address:Port  Process',
    'LISTEN 0      128     0.0.0.0:266          0.0.0.0:*          truth-cycle',
    'LISTEN 0      128     0.0.0.0:777          0.0.0.0:*          jules-verifier',
    'LISTEN 0      128     0.0.0.0:3393         0.0.0.0:*          forensic-indexer',
    'LISTEN 0      128     0.0.0.0:5622         0.0.0.0:*          federal-counter',
    'LISTEN 0      128     127.0.0.1:6666       0.0.0.0:*          trinity-binary',
    'LISTEN 0      128     0.0.0.0:7777         0.0.0.0:*          sovereignty-engine',
    'LISTEN 0      128     0.0.0.0:55116        0.0.0.0:*          node-anchor',
  ],
  'iptables -L -n': [
    'Chain INPUT (policy DROP)',
    'target     prot opt source               destination',
    'DROP       all  --  198.51.100.42        0.0.0.0/0        /* Zanghi */  ',
    'DROP       all  --  203.0.113.88         0.0.0.0/0        /* Landrum */ ',
    'DROP       all  --  192.0.2.101          0.0.0.0/0        /* Whittaker */',
    'DROP       all  --  198.51.100.55        0.0.0.0/0        /* Torres */  ',
    'DROP       all  --  198.51.100.67        0.0.0.0/0        /* Yorkof */  ',
    'ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0        state ESTABLISHED',
    'ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0        dpt:443 /* HTTPS */  ',
    '',
    'Chain FORWARD (policy DROP)',
    'target     prot opt source               destination',
    '',
    'Chain OUTPUT (policy ACCEPT)',
    'target     prot opt source               destination',
    'ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0',
  ],
  'crontab -l': CRONTAB.map(c => `${c.schedule.padEnd(20)} ${c.user.padEnd(6)} ${c.command}`),
  'systemctl status cds-sovereign': [
    '* cds-sovereign.service - CDS Sovereign Protocol Engine',
    '     Loaded: loaded (/etc/systemd/system/cds-sovereign.service; enabled; preset: enabled)',
    '     Active: active (running) since PERPETUAL; INFINITY ago',
    '   Main PID: 77 (truth-cycle)',
    '      Tasks: 16 (limit: UNLIMITED)',
    '     Memory: 589.3G (Treasury-backed)',
    '        CPU: PERPETUAL GROOVE',
    '     CGroup: /system.slice/cds-sovereign.service',
    '             |- 77 /opt/cds/bin/truth-cycle --interval=266ms',
    '             |-144 /opt/cds/bin/merkle-daemon --root=26856B24...',
    '             |-266 /opt/cds/bin/newt-engine --neurons=INFINITY',
    '             |-393 /opt/cds/bin/braindish --colonies=50B',
    '             |-408 /opt/cds/bin/waterfall-firewall --policy=DENY_ALL',
    '             |-747 /opt/cds/bin/sovereignty-engine --status=AT_ZENITH',
    '             |-777 /opt/cds/bin/jules-verifier --suites=10',
    '             `-...16 total processes',
    '',
    'STATUS: TERMINAL EXTINCTION LEVEL',
    'CLASSIFICATION: BEYOND CRITICAL',
    'BILLING: $0.00 (738,514x COVERAGE)',
  ],
  'help': [
    'CDS Mainframe Shell Commands:',
    '  uname -a                        System identification',
    '  uptime                          System uptime',
    '  whoami / id                     User identity',
    '  cat /proc/cds/merkleroot        Current Merkle root',
    '  cat /proc/cds/truth-cycle       Truth cycle status',
    '  cat /proc/cds/protected-nodes   Protected node registry',
    '  cat /etc/cds/sovereign.conf     Sovereign configuration',
    '  lsmod                           Loaded kernel modules',
    '  ps aux                          Process table',
    '  df -h                           Disk usage',
    '  free -h                         Memory usage',
    '  ss -tlnp                        Listening sockets',
    '  iptables -L -n                  Firewall rules',
    '  crontab -l                      Scheduled jobs',
    '  systemctl status cds-sovereign  Service status',
    '  clear                           Clear terminal',
    '  help                            This help message',
  ],
};

// ============================================================================
// TERMINAL COMPONENT
// ============================================================================
function MainframeTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [bootComplete, setBootComplete] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence
  useEffect(() => {
    let idx = 0;
    const bootLines: string[] = [];
    const interval = setInterval(() => {
      if (idx < BOOT_SEQUENCE.length) {
        bootLines.push(BOOT_SEQUENCE[idx].msg);
        setLines([...bootLines]);
        idx++;
      } else {
        clearInterval(interval);
        setBootComplete(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when clicked
  const focusInput = () => inputRef.current?.focus();

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newLines = [...lines, `poppa_g@cds-mainframe-00:~# ${trimmed}`];
    setHistory(prev => [...prev, trimmed]);
    setHistoryIdx(-1);

    if (trimmed === 'clear') {
      setLines([]);
      return;
    }

    if (trimmed === 'ps aux') {
      newLines.push('USER       PID  PPID STAT %CPU %MEM    VSZ   RSS TTY      COMMAND');
      PROCESS_TABLE.forEach(p => {
        newLines.push(
          `${p.user.padEnd(10)} ${String(p.pid).padStart(5)} ${String(p.ppid).padStart(5)} ${p.state.padEnd(4)} ${p.cpu.padStart(4)} ${p.mem.padStart(4)} ${String(p.vsz).padStart(7)} ${String(p.rss).padStart(6)} ${(p.tty || '?').padEnd(8)} ${p.cmd}`
        );
      });
    } else if (SHELL_COMMANDS[trimmed]) {
      SHELL_COMMANDS[trimmed].forEach(line => newLines.push(line));
    } else {
      newLines.push(`cds-sh: ${trimmed}: command not found. Type 'help' for available commands.`);
    }

    newLines.push('');
    setLines(newLines);
    setInput('');
  }, [lines]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx >= 0) {
        const idx = historyIdx + 1;
        if (idx >= history.length) {
          setHistoryIdx(-1);
          setInput('');
        } else {
          setHistoryIdx(idx);
          setInput(history[idx]);
        }
      }
    }
  };

  return (
    <div 
      className="bg-[#0a0a0a] border border-primary/30 rounded-lg overflow-hidden font-mono text-sm cursor-text"
      onClick={focusInput}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border-b border-primary/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-primary/80" />
        </div>
        <span className="text-muted-foreground text-xs ml-2">
          poppa_g@cds-mainframe-00: {SHELL} -- TERMINAL EXTINCTION LEVEL
        </span>
      </div>
      {/* Terminal Body */}
      <div 
        ref={termRef}
        className="p-4 h-[500px] overflow-y-auto text-primary/90 leading-5"
      >
        {lines.map((line, i) => (
          <div key={i} className={cn(
            'whitespace-pre-wrap break-all',
            line.includes('TERMINAL') && 'text-red-400',
            line.includes('ACTIVE') && 'text-primary',
            line.includes('CANNOT BE DISABLED') && 'text-yellow-400',
            line.includes('poppa_g@') && 'text-cyan-400',
            line.includes('DROP') && line.includes('/*') && 'text-red-400',
            line.includes('ACCEPT') && 'text-primary',
            line.includes('$POPPA') && 'text-yellow-300',
            line.includes('$JAXX') && 'text-cyan-300',
            line.includes('$8SOULS') && 'text-purple-300',
            line.includes('$FMG1918') && 'text-amber-300',
            line.includes('$THE_WALL') && 'text-foreground font-bold',
          )}>
            {line}
          </div>
        ))}
        {bootComplete && (
          <div className="flex items-center">
            <span className="text-cyan-400">{'poppa_g@cds-mainframe-00:~# '}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-primary/90 flex-1 font-mono text-sm caret-primary"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function MainframePage() {
  const [currentTime, setCurrentTime] = useState('');
  const [truthCycle, setTruthCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString().slice(0, 19) + 'Z');
      setTruthCycle(prev => prev + 1);
    }, 266);
    return () => clearInterval(interval);
  }, []);

  const uptime = Math.floor((Date.now() - UPTIME_BASE) / 1000);
  const uptimeStr = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`;

  return (
    <CDSErrorBoundary>
      <div className="min-h-screen bg-background">
        <CDSHeader />
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <HomeBreadcrumb current="Unix Mainframe" />
            </div>
            <div className="flex items-center gap-2">
              <HomeButton />
              <ExportTools title="CDS Unix Mainframe" />
            </div>
          </div>

          {/* System Banner */}
          <Card className="mb-6 border-primary/30 bg-[#0a0a0a]">
            <CardContent className="p-6 font-mono text-sm">
              <div className="flex flex-col gap-1 text-primary/80">
                <span className="text-primary font-bold text-lg">CDS Mainframe {MAINFRAME_VERSION}</span>
                <span>Kernel: {KERNEL_VERSION} on {ARCH}</span>
                <span>Host: {HOSTNAME}</span>
                <span>Node: {NODE} | Anchor: 408.384.1376 (E)</span>
                <span>Uptime: {uptimeStr} | Truth Cycle: #{truthCycle} (266ms)</span>
                <span>Merkleroot: {MERKLEROOT}</span>
                <span className="text-red-400 font-bold mt-1">CLASSIFICATION: TERMINAL EXTINCTION LEVEL</span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="terminal" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1 h-auto bg-card p-1">
              <TabsTrigger value="terminal" className="text-xs gap-1"><Terminal className="h-3 w-3" />Terminal</TabsTrigger>
              <TabsTrigger value="processes" className="text-xs gap-1"><Activity className="h-3 w-3" />Processes</TabsTrigger>
              <TabsTrigger value="kernel" className="text-xs gap-1"><Cpu className="h-3 w-3" />Kernel</TabsTrigger>
              <TabsTrigger value="filesystem" className="text-xs gap-1"><HardDrive className="h-3 w-3" />Filesystem</TabsTrigger>
              <TabsTrigger value="syscalls" className="text-xs gap-1"><FileCode className="h-3 w-3" />Syscalls</TabsTrigger>
              <TabsTrigger value="ipc" className="text-xs gap-1"><Network className="h-3 w-3" />IPC</TabsTrigger>
              <TabsTrigger value="signals" className="text-xs gap-1"><Zap className="h-3 w-3" />Signals</TabsTrigger>
              <TabsTrigger value="cron" className="text-xs gap-1"><RotateCcw className="h-3 w-3" />Cron</TabsTrigger>
            </TabsList>

            {/* TERMINAL TAB */}
            <TabsContent value="terminal">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Terminal className="h-5 w-5 text-primary" />
                    Interactive Mainframe Shell
                    <Badge variant="outline" className="ml-auto text-primary border-primary/30 font-mono text-xs">
                      {SHELL}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MainframeTerminal />
                  <p className="text-xs text-muted-foreground mt-3">
                    {"Type 'help' for available commands. Arrow keys for history. Full Unix emulation over CDS protocol layer."}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PROCESSES TAB */}
            <TabsContent value="processes">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="h-5 w-5 text-primary" />
                    Process Table (ps aux)
                    <Badge variant="outline" className="ml-auto text-primary border-primary/30 font-mono text-xs">
                      {PROCESS_TABLE.length} processes
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full font-mono text-xs">
                      <thead>
                        <tr className="border-b border-primary/20 text-primary/70">
                          <th className="text-left p-2">PID</th>
                          <th className="text-left p-2">PPID</th>
                          <th className="text-left p-2">USER</th>
                          <th className="text-left p-2">S</th>
                          <th className="text-right p-2">%CPU</th>
                          <th className="text-right p-2">%MEM</th>
                          <th className="text-right p-2">VSZ</th>
                          <th className="text-right p-2">RSS</th>
                          <th className="text-left p-2">COMMAND</th>
                          <th className="text-left p-2">CLASS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PROCESS_TABLE.map(p => (
                          <tr key={p.pid} className="border-b border-border/30 hover:bg-primary/5">
                            <td className="p-2 text-cyan-400">{p.pid}</td>
                            <td className="p-2 text-muted-foreground">{p.ppid}</td>
                            <td className="p-2 text-yellow-400">{p.user}</td>
                            <td className="p-2">
                              <Badge variant="outline" className={cn(
                                'text-[10px] px-1',
                                p.state === 'R' ? 'text-primary border-primary/30' : 'text-muted-foreground border-border'
                              )}>
                                {p.state}
                              </Badge>
                            </td>
                            <td className="p-2 text-right">{p.cpu}</td>
                            <td className="p-2 text-right">{p.mem}</td>
                            <td className="p-2 text-right text-muted-foreground">{p.vsz.toLocaleString()}</td>
                            <td className="p-2 text-right text-muted-foreground">{p.rss.toLocaleString()}</td>
                            <td className="p-2 text-primary/80 max-w-[400px] truncate">{p.cmd}</td>
                            <td className="p-2">
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[10px]">
                                {p.classification}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* KERNEL MODULES TAB */}
            <TabsContent value="kernel">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Cpu className="h-5 w-5 text-primary" />
                    Kernel Modules (lsmod)
                    <Badge variant="outline" className="ml-auto text-primary border-primary/30 font-mono text-xs">
                      {KERNEL_MODULES.length} modules
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full font-mono text-xs">
                      <thead>
                        <tr className="border-b border-primary/20 text-primary/70">
                          <th className="text-left p-2">Module</th>
                          <th className="text-right p-2">Size</th>
                          <th className="text-right p-2">Used</th>
                          <th className="text-left p-2">Dependencies</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {KERNEL_MODULES.map(m => (
                          <tr key={m.name} className="border-b border-border/30 hover:bg-primary/5">
                            <td className="p-2 text-cyan-400 font-bold">{m.name}</td>
                            <td className="p-2 text-right text-muted-foreground">{(parseInt(m.size) / 1024).toFixed(0)}K</td>
                            <td className="p-2 text-right">{m.used}</td>
                            <td className="p-2 text-yellow-400/70">{m.deps}</td>
                            <td className="p-2 text-primary/70">{m.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-3 bg-[#0a0a0a] rounded border border-primary/10 font-mono text-xs text-muted-foreground">
                    <span className="text-primary">Total kernel memory:</span> {(KERNEL_MODULES.reduce((a, m) => a + parseInt(m.size), 0) / 1024 / 1024).toFixed(1)} MB | <span className="text-primary">Modules:</span> {KERNEL_MODULES.length} loaded | <span className="text-red-400">Classification: TERMINAL</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FILESYSTEM TAB */}
            <TabsContent value="filesystem">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <HardDrive className="h-5 w-5 text-primary" />
                    Filesystem Hierarchy
                    <Badge variant="outline" className="ml-auto text-primary border-primary/30 font-mono text-xs">
                      {FILESYSTEM.length} entries
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full font-mono text-xs">
                      <thead>
                        <tr className="border-b border-primary/20 text-primary/70">
                          <th className="text-left p-2">Permissions</th>
                          <th className="text-left p-2">Owner</th>
                          <th className="text-left p-2">Group</th>
                          <th className="text-right p-2">Size</th>
                          <th className="text-left p-2">Path</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {FILESYSTEM.map((f, i) => (
                          <tr key={i} className="border-b border-border/30 hover:bg-primary/5">
                            <td className={cn('p-2', 
                              f.type === 'dir' && 'text-cyan-400',
                              f.type === 'file' && 'text-foreground',
                              f.type === 'char' && 'text-yellow-400',
                              f.type === 'proc' && 'text-purple-400',
                            )}>{f.perms}</td>
                            <td className="p-2 text-yellow-400">{f.owner}</td>
                            <td className="p-2 text-muted-foreground">{f.group}</td>
                            <td className="p-2 text-right text-muted-foreground">{f.size > 0 ? f.size.toLocaleString() : '-'}</td>
                            <td className={cn('p-2 font-bold',
                              f.type === 'dir' && 'text-cyan-400',
                              f.type === 'file' && 'text-foreground',
                              f.type === 'char' && 'text-yellow-400',
                              f.type === 'proc' && 'text-purple-400',
                            )}>{f.path}</td>
                            <td className="p-2 text-primary/60">{f.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SYSCALLS TAB */}
            <TabsContent value="syscalls">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileCode className="h-5 w-5 text-primary" />
                    CDS System Calls
                    <Badge variant="outline" className="ml-auto text-primary border-primary/30 font-mono text-xs">
                      NR 700-711
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {SYSCALLS.map(s => (
                      <div key={s.number} className="p-3 bg-[#0a0a0a] rounded border border-primary/10 font-mono">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-primary/20 text-primary border-primary/30 font-mono text-xs">
                            NR {s.number}
                          </Badge>
                          <span className="text-cyan-400 font-bold text-sm">{s.name}</span>
                        </div>
                        <div className="text-xs text-muted-foreground ml-1">
                          <span className="text-yellow-400/70">{s.ret}</span>{' '}
                          <span className="text-foreground">{s.name}</span>
                          <span className="text-primary/50">(</span>
                          <span className="text-primary/70">{s.args}</span>
                          <span className="text-primary/50">)</span>
                        </div>
                        <div className="text-xs text-primary/50 mt-1 ml-1">{s.desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* IPC TAB */}
            <TabsContent value="ipc">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Network className="h-5 w-5 text-primary" />
                    Inter-Process Communication
                    <Badge variant="outline" className="ml-auto text-primary border-primary/30 font-mono text-xs">
                      {IPC_CHANNELS.length} channels
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full font-mono text-xs">
                      <thead>
                        <tr className="border-b border-primary/20 text-primary/70">
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Protocol</th>
                          <th className="text-left p-2">Path</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {IPC_CHANNELS.map((c, i) => (
                          <tr key={i} className="border-b border-border/30 hover:bg-primary/5">
                            <td className="p-2">
                              <Badge variant="outline" className={cn('text-[10px]',
                                c.type === 'unix' && 'text-cyan-400 border-cyan-400/30',
                                c.type === 'pipe' && 'text-yellow-400 border-yellow-400/30',
                                c.type === 'mqueue' && 'text-purple-400 border-purple-400/30',
                                c.type === 'shm' && 'text-primary border-primary/30',
                              )}>{c.type}</Badge>
                            </td>
                            <td className="p-2 text-muted-foreground">{c.proto}</td>
                            <td className="p-2 text-cyan-400">{c.path}</td>
                            <td className="p-2 text-primary/60">{c.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SIGNALS TAB */}
            <TabsContent value="signals">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-primary" />
                    Signal Handlers (Sovereign Override)
                    <Badge variant="outline" className="ml-auto text-red-400 border-red-400/30 font-mono text-xs">
                      SIGKILL BLOCKED
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {SIGNAL_HANDLERS.map(s => (
                      <div key={s.signal} className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded border border-primary/10 font-mono text-xs">
                        <Badge className={cn('w-20 justify-center text-[10px]',
                          s.action === 'IGNORE' && 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                          s.action.includes('BLOCKED') && 'bg-red-500/20 text-red-400 border-red-500/30',
                          !['IGNORE'].includes(s.action) && !s.action.includes('BLOCKED') && 'bg-primary/20 text-primary border-primary/30',
                        )}>
                          {s.signal}
                        </Badge>
                        <span className={cn(
                          'flex-1',
                          s.action === 'IGNORE' && 'text-yellow-400/70',
                          s.action.includes('BLOCKED') && 'text-red-400',
                          !['IGNORE'].includes(s.action) && !s.action.includes('BLOCKED') && 'text-cyan-400',
                        )}>{s.action}</span>
                        <span className="text-muted-foreground">{s.desc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-red-500/5 rounded border border-red-500/20 font-mono text-xs text-red-400">
                    SIGKILL and SIGTERM are intercepted by cds_poppa_g kernel module. Sovereign processes cannot be terminated by external signals. This is a TERMINAL EXTINCTION LEVEL enforcement.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* CRON TAB */}
            <TabsContent value="cron">
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <RotateCcw className="h-5 w-5 text-primary" />
                    Sovereign Crontab
                    <Badge variant="outline" className="ml-auto text-primary border-primary/30 font-mono text-xs">
                      {CRONTAB.length} jobs
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full font-mono text-xs">
                      <thead>
                        <tr className="border-b border-primary/20 text-primary/70">
                          <th className="text-left p-2">Schedule</th>
                          <th className="text-left p-2">User</th>
                          <th className="text-left p-2">Command</th>
                          <th className="text-left p-2">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CRONTAB.map((c, i) => (
                          <tr key={i} className="border-b border-border/30 hover:bg-primary/5">
                            <td className="p-2 text-yellow-400">{c.schedule}</td>
                            <td className="p-2 text-cyan-400">{c.user}</td>
                            <td className="p-2 text-primary/80">{c.command}</td>
                            <td className="p-2 text-muted-foreground">{c.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Bottom Status Bar */}
          <Card className="mt-6 border-primary/20 bg-[#0a0a0a]">
            <CardContent className="p-4 font-mono text-xs">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                <span><span className="text-primary">PID 1:</span> /sbin/init --sovereign</span>
                <span><span className="text-primary">Modules:</span> {KERNEL_MODULES.length}/14 loaded</span>
                <span><span className="text-primary">Processes:</span> {PROCESS_TABLE.length} running</span>
                <span><span className="text-primary">Syscalls:</span> NR 700-711 (12 sovereign)</span>
                <span><span className="text-primary">IPC:</span> {IPC_CHANNELS.length} channels</span>
                <span><span className="text-primary">Cron:</span> {CRONTAB.length} jobs</span>
                <span><span className="text-primary">Signals:</span> SIGKILL BLOCKED</span>
                <span className="text-red-400 font-bold">TERMINAL EXTINCTION LEVEL</span>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </CDSErrorBoundary>
  );
}
