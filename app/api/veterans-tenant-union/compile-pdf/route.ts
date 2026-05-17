import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'
import os from 'os'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { document_title, text_blocks, signature_data } = body

    if (!document_title || !text_blocks || !signature_data) {
      return NextResponse.json(
        { error: 'Missing required fields: document_title, text_blocks, signature_data' },
        { status: 400 }
      )
    }

    // Write output to a temp file
    const tmpDir = os.tmpdir()
    const outputFilename = path.join(
      tmpDir,
      `CUD-26-682107_${Date.now()}.pdf`
    )

    const scriptPath = path.join(process.cwd(), 'scripts', 'court_pdf_compiler.py')

    const payload = JSON.stringify({
      output_filename: outputFilename,
      document_title,
      text_blocks,
      signature_data,
    })

    // Run the Python compiler
    const { stdout, stderr } = await execAsync(
      `python3 ${scriptPath} '${payload.replace(/'/g, "'\\''")}'`
    )

    if (stderr && !stderr.includes('UserWarning')) {
      console.error('[v0] PDF compiler stderr:', stderr)
    }

    // Read the generated PDF
    const pdfBuffer = await fs.readFile(outputFilename)

    // Clean up temp file
    await fs.unlink(outputFilename).catch(() => {})

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="CUD-26-682107_${document_title.replace(/\s+/g, '_')}.pdf"`,
      },
    })
  } catch (err) {
    console.error('[v0] PDF compiler error:', err)
    return NextResponse.json(
      {
        error: 'PDF compilation failed',
        detail: err instanceof Error ? err.message : String(err),
        hint: 'Ensure python3 and reportlab are installed: pip install reportlab',
      },
      { status: 500 }
    )
  }
}
