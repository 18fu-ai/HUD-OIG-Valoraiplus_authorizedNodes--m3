/**
 * VALORAIPLUS Protocol — Trace Graph
 * 
 * Constructs a decision trace graph for every claim.
 * Enables full reconstructability of admission decisions.
 */

import { type ReasonAssignment } from './reasonCodes';

// ============================================================
// TRACE NODE TYPES
// ============================================================

export type TraceNodeType =
  | 'CLAIM'           // Initial claim submission
  | 'EVIDENCE'        // Evidence binding step
  | 'FORMULA'         // Formula resolution
  | 'SCORE'           // Score computation
  | 'RULE'            // Rule evaluation
  | 'REPLAY'          // Replay validation
  | 'REASON'          // Reason code assignment
  | 'POLICY'          // Policy gate
  | 'DECISION';       // Final visibility decision

export interface TraceNode {
  id: string;
  type: TraceNodeType;
  timestamp: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  duration: number; // milliseconds
  parentId?: string;
}

export interface TraceEdge {
  from: string;
  to: string;
  label: string;
}

export interface TraceGraph {
  id: string;
  claimId: string;
  nodes: TraceNode[];
  edges: TraceEdge[];
  rootNodeId: string;
  leafNodeId: string;
  totalDuration: number;
  createdAt: string;
}

// ============================================================
// TRACE GRAPH BUILDER
// ============================================================

export class TraceGraphBuilder {
  private nodes: TraceNode[] = [];
  private edges: TraceEdge[] = [];
  private claimId: string;
  private graphId: string;
  private startTime: number;

  constructor(claimId: string) {
    this.claimId = claimId;
    this.graphId = `trace_${claimId}_${Date.now()}`;
    this.startTime = Date.now();
  }

  /**
   * Add a trace node
   */
  addNode(
    type: TraceNodeType,
    input: Record<string, unknown>,
    output: Record<string, unknown>,
    parentId?: string
  ): string {
    const nodeId = `${this.graphId}_${type}_${this.nodes.length}`;
    const node: TraceNode = {
      id: nodeId,
      type,
      timestamp: new Date().toISOString(),
      input,
      output,
      duration: Date.now() - this.startTime,
      parentId,
    };
    this.nodes.push(node);

    if (parentId) {
      this.edges.push({
        from: parentId,
        to: nodeId,
        label: `${type}`,
      });
    }

    return nodeId;
  }

  /**
   * Build the final trace graph
   */
  build(): TraceGraph {
    return {
      id: this.graphId,
      claimId: this.claimId,
      nodes: this.nodes,
      edges: this.edges,
      rootNodeId: this.nodes[0]?.id || '',
      leafNodeId: this.nodes[this.nodes.length - 1]?.id || '',
      totalDuration: Date.now() - this.startTime,
      createdAt: new Date().toISOString(),
    };
  }
}

// ============================================================
// TRACE GRAPH CONSTRUCTION
// ============================================================

export interface TraceInput {
  claimId: string;
  statement: string;
  sourceRef?: string;
  proofScore: number;
  confidenceScore: number;
  validationScore: number;
  hardViolations: string[];
  softViolations: string[];
  replayConsistent: boolean;
  reasonAssignment: ReasonAssignment;
  admitted: boolean;
  exportEligible: boolean;
}

/**
 * Construct a full trace graph from admission inputs
 */
export function constructTraceGraph(input: TraceInput): TraceGraph {
  const builder = new TraceGraphBuilder(input.claimId);

  // Node 1: Claim submission
  const claimNodeId = builder.addNode('CLAIM', {
    claimId: input.claimId,
    statement: input.statement,
  }, {
    received: true,
  });

  // Node 2: Evidence binding
  const evidenceNodeId = builder.addNode('EVIDENCE', {
    sourceRef: input.sourceRef,
  }, {
    hasSource: !!input.sourceRef,
    evidenceBound: !!input.sourceRef,
  }, claimNodeId);

  // Node 3: Formula resolution
  const formulaNodeId = builder.addNode('FORMULA', {
    proofFormula: 'P = (E × P × R × D)^0.25',
    confidenceFormula: 'C = (A + T + C) / 3',
    validationFormula: 'V = (P + C) / 2',
  }, {
    formulasApplied: true,
  }, evidenceNodeId);

  // Node 4: Score computation
  const scoreNodeId = builder.addNode('SCORE', {
    proofScore: input.proofScore,
    confidenceScore: input.confidenceScore,
  }, {
    validationScore: input.validationScore,
    threshold: 0.75,
    meetsThreshold: input.validationScore >= 0.75,
  }, formulaNodeId);

  // Node 5: Rule evaluation
  const ruleNodeId = builder.addNode('RULE', {
    hardViolations: input.hardViolations,
    softViolations: input.softViolations,
  }, {
    hardViolationCount: input.hardViolations.length,
    softViolationCount: input.softViolations.length,
    rulesPass: input.hardViolations.length === 0,
  }, scoreNodeId);

  // Node 6: Replay validation
  const replayNodeId = builder.addNode('REPLAY', {
    replayConsistent: input.replayConsistent,
  }, {
    replayValidated: input.replayConsistent,
    deterministic: input.replayConsistent,
  }, ruleNodeId);

  // Node 7: Reason code assignment
  const reasonNodeId = builder.addNode('REASON', {
    primaryCode: input.reasonAssignment.primaryCode.code,
  }, {
    primaryCode: input.reasonAssignment.primaryCode.code,
    primaryMessage: input.reasonAssignment.primaryCode.message,
    secondaryCodes: input.reasonAssignment.secondaryCodes.map(c => c.code),
  }, replayNodeId);

  // Node 8: Policy gate
  const policyNodeId = builder.addNode('POLICY', {
    admitted: input.admitted,
    validationScore: input.validationScore,
    hardViolations: input.hardViolations.length,
  }, {
    policyPass: input.admitted,
    exportEligible: input.exportEligible,
  }, reasonNodeId);

  // Node 9: Final decision
  builder.addNode('DECISION', {
    admitted: input.admitted,
    exportEligible: input.exportEligible,
  }, {
    visibility: input.admitted ? 'GRANTED' : 'DENIED',
    exportStatus: input.exportEligible ? 'ELIGIBLE' : 'BLOCKED',
    finalDecision: input.admitted ? 'ADMIT' : 'REJECT',
  }, policyNodeId);

  return builder.build();
}

// ============================================================
// TRACE GRAPH QUERIES
// ============================================================

/**
 * Get the decision path through the trace graph
 */
export function getDecisionPath(graph: TraceGraph): TraceNode[] {
  const path: TraceNode[] = [];
  let currentId: string | undefined = graph.rootNodeId;

  while (currentId) {
    const node = graph.nodes.find(n => n.id === currentId);
    if (node) {
      path.push(node);
      const edge = graph.edges.find(e => e.from === currentId);
      currentId = edge?.to;
    } else {
      break;
    }
  }

  return path;
}

/**
 * Get nodes by type
 */
export function getNodesByType(graph: TraceGraph, type: TraceNodeType): TraceNode[] {
  return graph.nodes.filter(n => n.type === type);
}

/**
 * Generate a human-readable trace summary
 */
export function generateTraceSummary(graph: TraceGraph): string {
  const path = getDecisionPath(graph);
  const lines: string[] = [
    `Trace Graph: ${graph.id}`,
    `Claim: ${graph.claimId}`,
    `Duration: ${graph.totalDuration}ms`,
    ``,
    `Decision Path:`,
  ];

  for (const node of path) {
    const outputSummary = Object.entries(node.output)
      .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
      .join(', ');
    lines.push(`  [${node.type}] ${outputSummary}`);
  }

  return lines.join('\n');
}

/**
 * Serialize trace graph for storage
 */
export function serializeTraceGraph(graph: TraceGraph): string {
  return JSON.stringify(graph, null, 2);
}

/**
 * Deserialize trace graph from storage
 */
export function deserializeTraceGraph(json: string): TraceGraph {
  return JSON.parse(json) as TraceGraph;
}
