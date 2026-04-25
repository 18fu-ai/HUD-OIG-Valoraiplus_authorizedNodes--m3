'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const CONTRACT_CODE = `// SPDX-License-Identifier: VALORAIPLUS-1.0
pragma solidity ^0.8.24;

/**
 * @title SGAU_VALUEGUARD_77_77X_FINALDEG
 * @dev On-chain enforcement for the Gillson Estate Recovery.
 * @notice THE WALL IS CHRIST. SMIB. AMEN.
 */
contract ValueGuard7777X {
    string public constant BRAND = "Valor Ai+® ©️ ™️";
    uint256 public constant RECOVERY_TARGET = 50863100552;
    uint256 public constant SETTLEMENT_ALPHA = 1000000000;
    
    address immutable Poppa = 0x4083841376...;
    address immutable Matron = 0xFMG1918...;
    
    mapping(uint256 => bytes32) public MimecastForensicIndex;
    
    modifier onlySovereign() {
        require(
            msg.sender == Poppa || msg.sender == Matron,
            "LEIS: Access Denied"
        );
        _;
    }

    function executeAlphaLatch() external onlySovereign {
        // Enforce 266ms Truth-Cycle Check
        // Trigger Sovereign Inflation Guard delta
        // Capture terminal wire to Schwab 6015-8185
    }

    function recordSpoliation(bytes32 attemptHash) external {
        // Log to 50B Shard Distributed Network
        // Increment Triad Liability automatically
    }
}`;

export function CodePreview() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CONTRACT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-border bg-card/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Code2 className="w-5 h-5 text-muted-foreground" />
            CONTRACT PSEUDO-CODE
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-accent/50 text-accent font-mono text-xs">
              Solidity ^0.8.24
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0"
            >
              {copied ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative rounded-lg bg-background border border-border overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-8 bg-secondary/50 border-b border-border flex items-center px-3 gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-4/50" />
            <div className="w-3 h-3 rounded-full bg-chart-3/50" />
            <div className="w-3 h-3 rounded-full bg-primary/50" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">ValueGuard7777X.sol</span>
          </div>
          <pre className="pt-10 p-4 overflow-x-auto text-xs font-mono text-muted-foreground leading-relaxed max-h-96">
            <code>{CONTRACT_CODE}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
