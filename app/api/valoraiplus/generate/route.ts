import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'

const execAsync = promisify(exec)

// Available document generators
const GENERATORS: Record<string, string> = {
  'doc7': 'gen_doc7_attorney_misconduct.py',
  'doc9': 'gen_doc9_whistleblower_notice.py',
  'doc12': 'gen_doc12_judicial_notice.py',
  'doc14': 'gen_doc14_academic_theft_notice.py',
  'doc15': 'gen_doc15_motion_to_seal.py',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { docType, outputDir } = body

    if (!docType || !GENERATORS[docType]) {
      return NextResponse.json(
        { 
          error: 'Invalid document type',
          available: Object.keys(GENERATORS)
        },
        { status: 400 }
      )
    }

    const scriptPath = path.join(process.cwd(), 'scripts', 'valoraiplus', GENERATORS[docType])
    const targetOutputDir = outputDir || path.join(process.cwd(), 'public', 'generated-docs')

    // Ensure output directory exists
    await fs.mkdir(targetOutputDir, { recursive: true })

    // Execute the Python script with output directory env var
    const { stdout, stderr } = await execAsync(
      `python3 "${scriptPath}"`,
      {
        env: {
          ...process.env,
          VALORAIPLUS_OUTPUT_DIR: targetOutputDir,
        },
        timeout: 60000, // 60 second timeout
      }
    )

    // Find the generated PDF
    const files = await fs.readdir(targetOutputDir)
    const generatedPdf = files.find(f => f.endsWith('.pdf') && f.includes(docType.replace('doc', 'Doc')))

    return NextResponse.json({
      success: true,
      docType,
      output: stdout,
      stderr: stderr || null,
      generatedFile: generatedPdf ? `/generated-docs/${generatedPdf}` : null,
    })

  } catch (error) {
    console.error('[v0] Document generation error:', error)
    return NextResponse.json(
      { 
        error: 'Document generation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    available: Object.entries(GENERATORS).map(([key, file]) => ({
      docType: key,
      script: file,
      description: getDocDescription(key),
    })),
  })
}

function getDocDescription(docType: string): string {
  const descriptions: Record<string, string> = {
    'doc7': 'State Bar Attorney Misconduct Complaint',
    'doc9': 'Whistleblower Notice',
    'doc12': 'Request for Judicial Notice',
    'doc14': 'Academic IP Theft Notice',
    'doc15': 'Motion to Seal',
  }
  return descriptions[docType] || 'Unknown document type'
}
