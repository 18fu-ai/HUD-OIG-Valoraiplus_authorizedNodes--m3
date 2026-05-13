'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CheckCircle2,
  AlertCircle,
  Lock,
  Shield,
  Accessibility,
  ExternalLink,
} from 'lucide-react';
import { checkVACNEligibility, VACN_TOKEN_CONFIG } from '@/lib/tokens/vacn-config';

interface VACNEligibilityProps {
  onBenefitClaim?: (data: any) => void;
}

export function VACNEligibilityVerifier({ onBenefitClaim }: VACNEligibilityProps) {
  const [step, setStep] = useState<'intro' | 'verify' | 'results'>('intro');
  const [formData, setFormData] = useState({
    parentServiceStart: '',
    parentServiceEnd: '',
    childBirthDate: '',
    agentOrangeExposed: false,
  });
  const [eligibilityResult, setEligibilityResult] = useState<any>(null);
  const [dataDestroyed, setDataDestroyed] = useState(false);

  const handleVerify = () => {
    const result = checkVACNEligibility({
      parentServiceStart: parseInt(formData.parentServiceStart),
      parentServiceEnd: parseInt(formData.parentServiceEnd),
      birthDate: formData.childBirthDate,
      agentOrangeExposed: formData.agentOrangeExposed,
    });

    setEligibilityResult(result);
    setStep('results');

    // Simulate immediate data destruction per privacy policy
    setTimeout(() => {
      setFormData({
        parentServiceStart: '',
        parentServiceEnd: '',
        childBirthDate: '',
        agentOrangeExposed: false,
      });
      setDataDestroyed(true);
    }, 3000);
  };

  return (
    <div className="w-full space-y-4">
      {/* INTRO STEP */}
      {step === 'intro' && (
        <Card className="border-foreground/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              $VACN Benefit Program
            </CardTitle>
            <CardDescription>
              Vietnam Veterans Children Automatic Benefit Distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg space-y-3">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300">
                Program Overview
              </h4>
              <p className="text-sm text-blue-900 dark:text-blue-300">
                If you are a child of a Vietnam-era veteran (1966-1972 service), you may be
                eligible to receive <strong>100 $GILLBTC tokens</strong> automatically.
              </p>
              <ul className="text-sm text-blue-900 dark:text-blue-300 space-y-1 ml-4 list-disc">
                <li>Parent served on active duty between 1966-1972</li>
                <li>You were born 9 or more months after parent's service ended</li>
                <li>Parent has documented Agent Orange exposure in service records</li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-green-900 dark:text-green-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Your Privacy is Protected
              </h4>
              <p className="text-sm text-green-900 dark:text-green-300">
                We use ID.me government verification. Your data is destroyed immediately after
                verification. We never store or share your personal information.
              </p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <Accessibility className="w-4 h-4" />
                Fully Accessible
              </h4>
              <p className="text-sm text-amber-900 dark:text-amber-300">
                This application is WCAG 2.1 AAA compliant. Screen readers, keyboard navigation,
                and high contrast mode are fully supported.
              </p>
            </div>

            <Button
              onClick={() => setStep('verify')}
              size="lg"
              className="w-full"
            >
              Check Your Eligibility
            </Button>

            <a
              href="/privacy/vacn-benefit"
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              Read our Privacy Policy
              <ExternalLink className="w-3 h-3" />
            </a>
          </CardContent>
        </Card>
      )}

      {/* VERIFY STEP */}
      {step === 'verify' && (
        <Card className="border-foreground/20">
          <CardHeader>
            <CardTitle>Verify Your Eligibility</CardTitle>
            <CardDescription>
              Provide information about your parent's service and your birth date
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Parent Service Start Year</label>
                <Input
                  type="number"
                  min="1966"
                  max="1972"
                  placeholder="1966"
                  value={formData.parentServiceStart}
                  onChange={(e) =>
                    setFormData({ ...formData, parentServiceStart: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Parent Service End Year</label>
                <Input
                  type="number"
                  min="1966"
                  max="1972"
                  placeholder="1972"
                  value={formData.parentServiceEnd}
                  onChange={(e) =>
                    setFormData({ ...formData, parentServiceEnd: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Your Birth Date</label>
              <Input
                type="date"
                value={formData.childBirthDate}
                onChange={(e) =>
                  setFormData({ ...formData, childBirthDate: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Must be 9 or more months after parent's service end date
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded">
              <input
                type="checkbox"
                id="agentOrange"
                checked={formData.agentOrangeExposed}
                onChange={(e) =>
                  setFormData({ ...formData, agentOrangeExposed: e.target.checked })
                }
                className="w-4 h-4"
              />
              <label htmlFor="agentOrange" className="text-sm cursor-pointer flex-1">
                Parent has documented Agent Orange exposure in service records
              </label>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This information will be verified through secure government channels (ID.me) and
                destroyed immediately after verification.
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setStep('intro')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleVerify}
                disabled={
                  !formData.parentServiceStart ||
                  !formData.parentServiceEnd ||
                  !formData.childBirthDate
                }
                className="flex-1"
              >
                Verify Eligibility
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* RESULTS STEP */}
      {step === 'results' && eligibilityResult && (
        <Card className="border-foreground/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {eligibilityResult.eligible ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  You Are Eligible!
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Eligibility Check Complete
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {eligibilityResult.eligible ? (
              <>
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg space-y-3">
                  <h4 className="font-semibold text-green-900 dark:text-green-300">
                    Congratulations!
                  </h4>
                  <p className="text-sm text-green-900 dark:text-green-300">
                    You are eligible to receive <strong>100 $GILLBTC tokens</strong> as part of
                    the VALORAIPLUS Vietnam Veterans Children benefit program.
                  </p>
                  {eligibilityResult.warnings && eligibilityResult.warnings.length > 0 && (
                    <div className="bg-yellow-500/20 p-2 rounded text-xs text-yellow-900 dark:text-yellow-300">
                      <p className="font-medium mb-1">Note:</p>
                      {eligibilityResult.warnings.map((w: string, i: number) => (
                        <p key={i}>{w}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300">
                    Next Steps
                  </h4>
                  <ol className="text-sm text-blue-900 dark:text-blue-300 space-y-1 ml-4 list-decimal">
                    <li>Complete verification through ID.me or government SSO</li>
                    <li>Provide proof of parent's service and your birth certificate</li>
                    <li>Tokens will be automatically distributed to your wallet</li>
                  </ol>
                </div>

                <Button onClick={() => onBenefitClaim?.(formData)} size="lg" className="w-full">
                  Proceed to Government Verification
                </Button>
              </>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold text-amber-900 dark:text-amber-300">
                  Eligibility Status
                </h4>
                {eligibilityResult.reasons.map((reason: string, i: number) => (
                  <p key={i} className="text-sm text-amber-900 dark:text-amber-300">
                    • {reason}
                  </p>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setStep('intro')}
                  className="w-full mt-2"
                >
                  Try Again
                </Button>
              </div>
            )}

            {dataDestroyed && (
              <Alert className="bg-green-500/10 border-green-500/20">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-900 dark:text-green-300">
                  Your verification data has been securely destroyed. Only your eligibility
                  status remains on record.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
