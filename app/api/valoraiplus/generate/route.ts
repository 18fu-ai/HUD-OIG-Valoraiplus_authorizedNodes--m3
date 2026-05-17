import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'

const execAsync = promisify(exec)

// Available document generators — full 17-document suite
const GENERATORS: Record<string, { script: string; description: string }> = {
  doc1:  { script: 'gen_doc1_answer_ud105.py',                   description: 'UD-105 Answer — Unlawful Detainer' },
  doc2:  { script: 'gen_doc2_motions.py',                        description: 'Omnibus Motions In Limine and Procedural Motions' },
  doc3:  { script: 'gen_doc3_ada_proof_of_service.py',           description: 'ADA Accommodation Request and Proof of Service' },
  doc4:  { script: 'gen_doc4_judicial_briefing.py',              description: 'Judicial Briefing — Evidentiary Framework' },
  doc5:  { script: 'gen_doc5_civil_complaint_sword.py',          description: 'Civil Counter-Complaint — The Sword' },
  doc6:  { script: 'gen_doc6_transmittal_demand.py',             description: 'Transmittal and Demand Letter' },
  doc7:  { script: 'gen_doc7_attorney_misconduct.py',            description: 'State Bar Attorney Misconduct Complaint' },
  doc8:  { script: 'gen_doc8_supplemental_evidentiary_proffer.py', description: 'Supplemental Notice — Evidentiary Proffer' },
  doc9:  { script: 'gen_doc9_whistleblower_notice.py',           description: 'Whistleblower Notice' },
  doc10: { script: 'gen_doc10_civil_human_rights.py',            description: 'Civil and Human Rights Complaint' },
  doc11: { script: 'gen_doc11_emergency_tro.py',                 description: 'Emergency Temporary Restraining Order' },
  doc12: { script: 'gen_doc12_judicial_notice.py',               description: 'Request for Judicial Notice' },
  doc13: { script: 'gen_doc13_motion_continuance.py',            description: 'Motion for Continuance' },
  doc14: { script: 'gen_doc14_academic_theft_notice.py',         description: 'Academic IP Theft Notice' },
  doc15: { script: 'gen_doc15_motion_to_seal.py',                description: 'Motion to Seal' },
  doc16: { script: 'gen_doc16_amended_civil_complaint.py',       description: 'Amended Civil Complaint — Veterans Tenant Union' },
  doc17: { script: 'gen_doc17_sanctions_fees.py',                description: 'Motion for Sanctions and Attorney Fees' },
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

    const scriptPath = path.join(process.cwd(), 'scripts', 'valoraiplus', GENERATORS[docType].script)
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

    // Find the generated PDF — use _DocN_ pattern to handle CUD prefix variations
    const files = await fs.readdir(targetOutputDir)
    const docNumber = docType.replace('doc', '')
    const targetPattern = `_Doc${docNumber}_`
    const generatedPdf = files.find(f =>
      f.endsWith('.pdf') &&
      (f.includes(targetPattern) || f.toLowerCase().includes(`doc${docNumber}`))
    )

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
    available: Object.entries(GENERATORS).map(([key, val]) => ({
      docType: key,
      script: val.script,
      description: val.description,
    })),
  })
}
