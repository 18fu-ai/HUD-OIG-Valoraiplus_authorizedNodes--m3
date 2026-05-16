import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const formData = await request.formData()

    const tenant_identifier = formData.get('tenant_identifier') as string
    const testimony_text = formData.get('testimony_text') as string

    if (!tenant_identifier || !testimony_text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert testimony
    const { data: testimony, error: testimonyError } = await supabase
      .from('veteran_testimonies')
      .insert({
        tenant_identifier,
        testimony_text,
      })
      .select()
      .single()

    if (testimonyError) {
      console.error('[v0] Testimony insert error:', testimonyError)
      return NextResponse.json(
        { error: 'Failed to create testimony' },
        { status: 500 }
      )
    }

    // Handle media files
    const mediaFiles = formData.getAll('media_*')
    
    for (const file of mediaFiles) {
      if (file instanceof File) {
        // Upload file to Supabase Storage
        const fileName = `${testimony.id}/${Date.now()}-${file.name}`
        const { error: uploadError } = await supabase
          .storage
          .from('veteran-testimony-media')
          .upload(fileName, file)

        if (uploadError) {
          console.error('[v0] Media upload error:', uploadError)
          continue
        }

        // Get public URL
        const { data: urlData } = supabase
          .storage
          .from('veteran-testimony-media')
          .getPublicUrl(fileName)

        // Insert media record
        const { error: mediaError } = await supabase
          .from('testimony_media')
          .insert({
            testimony_id: testimony.id,
            file_url: urlData.publicUrl,
            file_name: file.name,
            file_size: file.size,
            mime_type: file.type,
            media_type: file.type.startsWith('image/')
              ? 'image'
              : file.type.startsWith('audio/')
              ? 'audio'
              : file.type.startsWith('video/')
              ? 'video'
              : 'document',
          })

        if (mediaError) {
          console.error('[v0] Media record insert error:', mediaError)
        }
      }
    }

    return NextResponse.json(
      { success: true, testimony_id: testimony.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
