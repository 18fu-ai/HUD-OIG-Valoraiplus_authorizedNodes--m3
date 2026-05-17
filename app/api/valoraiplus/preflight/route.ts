import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const scriptPath = path.join(process.cwd(), 'scripts', 'valoraiplus', 'preflight_audit_full.py')
    
    const { stdout, stderr } = await execAsync(
      `python3 "${scriptPath}"`,
      {
        env: process.env,
        timeout: 120000, // 2 minute timeout for full audit
      }
    )

    // Parse the audit results
    const lines = stdout.split('\n')
    const results: { check: string; status: string; details?: string }[] = []
    
    for (const line of lines) {
      if (line.includes('[PASS]')) {
        results.push({ check: line.replace('[PASS]', '').trim(), status: 'pass' })
      } else if (line.includes('[FAIL]')) {
        results.push({ check: line.replace('[FAIL]', '').trim(), status: 'fail' })
      } else if (line.includes('[WARN]')) {
        results.push({ check: line.replace('[WARN]', '').trim(), status: 'warn' })
      }
    }

    const passCount = results.filter(r => r.status === 'pass').length
    const failCount = results.filter(r => r.status === 'fail').length
    const warnCount = results.filter(r => r.status === 'warn').length

    return NextResponse.json({
      success: failCount === 0,
      summary: {
        passed: passCount,
        failed: failCount,
        warnings: warnCount,
        total: results.length,
      },
      results,
      rawOutput: stdout,
      stderr: stderr || null,
    })

  } catch (error) {
    console.error('[v0] Preflight audit error:', error)
    return NextResponse.json(
      { 
        error: 'Preflight audit failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/valoraiplus/preflight',
    method: 'POST',
    description: 'Runs the full preflight audit across all 17 document templates',
  })
}
