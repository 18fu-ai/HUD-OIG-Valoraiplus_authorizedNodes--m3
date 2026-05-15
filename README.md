
<p align="center">
  <img src="https://img.shields.io/badge/VALORAIPLUS%C2%AE-Evidence--Gated%20Runtime%20Platform-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3TDEyIDEyTDIyIDdMMTIgMlpNMiAxN0wxMiAyMkwyMiAxN00yIDEyTDEyIDE3TDIyIDEyIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=" alt="VALORAIPLUS Badge"/>
</p>

<p align="center">
  <b>High-assurance, policy-governed runtime architecture</b><br>
  with replayable verification, bounded automation, and hardware-gated trust boundaries.
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/runtime-evidence_gated-blue?style=flat-square" alt="Runtime: Evidence Gated"/>
  <img src="https://img.shields.io/badge/typescript-100%25-3178C6?style=flat-square&logo=typescript" alt="TypeScript 100%"/>
  <img src="https://img.shields.io/badge/architecture-modular-success?style=flat-square" alt="Architecture: Modular"/>
  <img src="https://img.shields.io/badge/trust-hardware_gated-black?style=flat-square" alt="Trust: Hardware Gated"/>
  <img src="https://img.shields.io/badge/node-%3E%3D20-brightgreen?style=flat-square&logo=node.js" alt="Node >=20"/>
  <img src="https://img.shields.io/badge/coverage-%3E80%25-success?style=flat-square" alt="Coverage >80%"/>
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License MIT"/>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome"/>
</p>

---

## 🧠 Overview

VALORAIPLUS® is a modular runtime platform designed for environments that demand **maximum assurance** with **minimum necessary complexity**. It replaces opaque, high-trust monoliths with a composable stack of typed contracts, observable evidence flows, and bounded automation.

**What the platform provides:**

| Feature | Description |
|--------|-------------|
| 🔍 Evidence‑gated decision flows | No claim is executed without attributable proof. |
| 🔁 Replayable verification | Every state transition can be re‑evaluated independently. |
| 🤖 Bounded automation | Autonomous actions are scoped, reversible, and auditable. |
| 🔐 Hardware‑gated trust boundaries | Sensitive operations are rooted in physical attestation. |
| 🛡️ Policy‑governed remediation | Deviations trigger predefined recovery paths. |
| 🧩 Modular extensibility | Custom modules plug into the core without sacrificing guarantees. |

The platform is built on a **single principle**:

> **No claim exceeds its evidence class.**

---

## 🏛️ Core Principles

The architecture is shaped by a few non‑negotiable constraints:

| Principle | What it means |
|-----------|---------------|
| 🔎 **Evidence over authority** | Decisions are made on verifiable artifacts, not identity or tradition. |
| 🧵 **Bounded autonomy** | Automation is always scoped; human authority is never fully displaced. |
| 🔄 **Replayability** | Every critical operation is deterministic and re‑runnable for audit. |
| 📖 **Explainability** | State transitions carry human‑readable justification and data lineage. |
| 🧹 **Continuous simplification** | Complexity is treated as a liability; refactoring is a first‑class activity. |
| 🔒 **Hardware‑gated trust** | The root of trust is anchored in physical, attestable hardware, not configuration. |

---

## ✅ Implemented Features

*These capabilities are **implemented, tested, and part of the current codebase**.*

- ✅ OpenTelemetry instrumentation across the runtime  
- ✅ Modular Next.js App Router architecture with clear boundary contracts  
- ✅ Typed runtime contracts (`Identity`, `Evidence`, `Verification`, etc.)  
- ✅ Policy‑gated remediation patterns (recovery flows triggered by evidence class)  
- ✅ Replay‑aware verification flows with cryptographic proof anchoring  
- ✅ Hardware trust boundary integration (attestation hooks)  
- ✅ PII masking workflows and audit‑friendly logging  
- ✅ Extensible module registry (load/unload extensions at runtime)

---

## 🔬 Experimental

*These features are **under active research and may change**.*

- 🧪 Post‑quantum signature integration (Dilithium/Falcon hybrid verification)  
- 🧪 Semantic routing optimization for evidence pipelines  
- 🧪 Adaptive provider weighting based on trust metrics  
- 🧪 Advanced challenge layer with zero‑knowledge attestation

---

## 🏗️ Architecture

The runtime is organised as a vertical pipeline that reflects the lifecycle of an evidence‑backed decision:

```plaintext
IDENTITY
   ↓
CONSTITUTION  (policy rules, invariants)
   ↓
EVIDENCE      (typed, signed, timestamped)
   ↓
VERIFICATION  (replayable, deterministic)
   ↓
GOVERNANCE    (human-in-the-loop, bounded delegation)
   ↓
RECOVERY      (pre‑planned remediation paths)
   ↓
CONTINUITY    (event log, audit trail, state export)
```

Each layer communicates through **strict typed interfaces**; side‑effects are controlled and observable.

| Layer | Responsibility |
|-------|----------------|
| 🔐 **Identity** | Resolution, attestation binding |
| 📜 **Constitution** | Policy rules, invariant enforcement |
| 🧾 **Evidence** | Typed evidence objects, validation |
| ✔️ **Verification** | Replayable verification engine |
| ⚖️ **Governance** | Delegation, authority bounds |
| 🚑 **Recovery** | Remediation plans, rollback |
| 📋 **Continuity** | Event log, state import/export |

---

## 🚀 Quick Start

### 📦 Prerequisites

| Requirement | Version / Tool | Notes |
|------------|---------------|-------|
| **Node.js** | ≥ 20 | LTS recommended |
| **Package manager** | pnpm (recommended) or npm | |
| **Hardware trust (optional)** | TPM 2.0 or secure enclave | Required for attestation features |

### ⚙️ Installation

```bash
git clone https://github.com/your-org/valoraiplus.git
cd valoraiplus
pnpm install
```

### 🖥️ Running the Dev Server

```bash
pnpm dev
```

The platform starts on `http://localhost:3000`.  
The built‑in dashboard gives you a live view of evidence chains and active policies.

### 🧪 Running the Verification Suite

```bash
pnpm test
pnpm test:e2e        # requires hardware attestation simulation
```

---

## 📁 Project Structure

```plaintext
src/
├── core/                 # Immutable runtime contracts
│   ├── identity.ts       # Identity resolution, attestation binding
│   ├── constitution.ts   # Policy rules, invariant enforcement
│   ├── evidence.ts       # Typed evidence objects, validation
│   ├── verification.ts   # Replayable verification engine
│   ├── governance.ts     # Delegation, authority bounds
│   ├── recovery.ts       # Remediation plans, rollback
│   └── continuity.ts     # Event log, state import/export
│
├── extensions/           # Optional, swappable modules
│   ├── truth-kernel/     # Advanced evidence evaluation
│   ├── observability/    # Dashboards, alerting
│   ├── challenge-layer/  # Multi-party attestation
│   └── post-quantum/     # PQ signature verification (experimental)
│
├── contracts/            # On-chain components (Solidity)
│   └── ValorAiPlus2e.sol # Hybrid identity & archive contract
│
└── docs/                 # Detailed architecture, diagrams
```

---

## 📊 System Status

| Component | Status |
|-----------|--------|
| 🔵 Core runtime | **Stable** |
| 🟢 Web dashboard | **Functional** |
| 🟡 Test coverage | **>80% on core contracts** |
| 🟠 Documentation | **In progress** |
| ⚪ Post‑quantum module | **Experimental** |

We actively monitor and improve stability. Check the [CHANGELOG](./CHANGELOG.md) for per‑release details.

---

## 🗺️ Roadmap

| Milestone | Target | Status |
|-----------|--------|--------|
| 🔷 Formal verification of core contracts | 2025 Q3 | Planning |
| 🔶 Native attestation client (TPM/SEV) | 2025 Q4 | Research |
| 🔷 Decentralized evidence sharing protocol | Research phase | Exploratory |
| 🔶 SDK for third‑party module development | Early preview | Design |

*The roadmap is kept deliberately short to focus on high‑certainty deliverables.*

---

## 🤝 Contributing

We welcome contributions that align with the platform's **max assurance, min machinery** ethos. Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for guidelines on:

- Setting up the development environment
- Running and writing tests
- Submitting architecture proposals
- Security disclosure process

> All commits must be signed. All new modules must come with evidence‑gated tests.

---

## 🔒 Security

The platform is designed with security as a **first‑class property, not an add‑on**:

| Principle | Description |
|-----------|-------------|
| 🔐 **Least‑privilege** | Components operate with the minimum necessary permissions. |
| 🧱 **Hardware root of trust** | Critical secrets are bound to a physical TPM/enclave. |
| 🔁 **Replayable verification** | Any claim can be independently re‑checked. |
| 📎 **Evidence‑aware state transitions** | No side‑effects without signed justification. |
| 🕶️ **PII masking workflows** | Sensitive data is never logged in plaintext. |
| 📊 **Audit‑friendly observability** | All decisions are traceable to evidence and policy. |

**⚠️ Important**: All security claims are implementation‑dependent and environment‑specific. This software is **provided as‑is**; actual production hardening requires proper hardware configuration and operational controls.

See [`SECURITY.md`](./SECURITY.md) for our vulnerability disclosure policy.

---

## 📜 License

This project is licensed under the **MIT License** – see the [`LICENSE`](./LICENSE) file for details.

The on‑chain component (`ValorAiPlus2e.sol`) is released under the **Grateful‑Dead‑1.0** joke license for internal mythology; the core runtime and tooling are strictly MIT.

---

## 💭 Philosophy

> **Maximum assurance.**  
> **Minimum necessary machinery.**

VALORAIPLUS® was built to prove that high‑stakes software can be both **rigorous and simple**. It rejects the false trade‑off between security and agility. Every line of code is intentional; every abstraction has to earn its place.

We favour:

- 🤖 Bounded autonomy over full automation
- 🔁 Replayability over blind trust
- 📖 Explainability over raw performance
- 👤 Human authority over opaque governance
- 🧹 Continuous simplification over feature accumulation

If that resonates, you’re in the right repo. 🛡️✨
```
