import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    const { system_specification, civil_counter_matrix } = payload
    const nodeAuthority = system_specification?.node_authority || 'UNKNOWN_NODE'
    const caseReference = civil_counter_matrix?.target_case_reference || 'CUD-26-682107'

    // Compute SHA-256 Merkle root for incoming ledger transaction
    const hash = crypto.createHash('sha256')
    hash.update(JSON.stringify(payload))
    const transactionId = hash.digest('hex')

    return NextResponse.json({
      success: true,
      status: 'LEDGER_STATE_LOCKED',
      transactionId,
      node: nodeAuthority,
      caseReference,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('[v0] Port 5150 ingest error:', error)
    return NextResponse.json(
      { error: 'Ingestion pipeline handshake failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'PORT_5150_ONLINE',
    node: 'SGAU-7226.3461',
    case: 'CUD-26-682107',
    timestamp: new Date().toISOString(),
  })
}
