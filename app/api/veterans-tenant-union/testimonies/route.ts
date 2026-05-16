import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Fetch all testimonies with their media
    const { data: testimonies, error } = await supabase
      .from('veteran_testimonies')
      .select(`
        id,
        tenant_identifier,
        testimony_text,
        created_at,
        testimony_media (
          id,
          media_type,
          file_url,
          file_name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Fetch testimonies error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch testimonies' },
        { status: 500 }
      )
    }

    return NextResponse.json(testimonies)
  } catch (error) {
    console.error('[v0] Get testimonies error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
