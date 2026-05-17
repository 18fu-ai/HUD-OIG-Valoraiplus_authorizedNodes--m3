'use client'

interface MediaPlayerProps {
  mediaUrl: string
  type: 'audio' | 'video'
  fileName: string
}

export default function MediaPlayer({ mediaUrl, type, fileName }: MediaPlayerProps) {
  return (
    <div className="w-full">
      {type === 'audio' && (
        <div className="bg-muted rounded-lg p-4">
          <p className="text-xs text-muted-foreground font-mono mb-2 truncate">{fileName}</p>
          <audio controls className="w-full" src={mediaUrl}>
            <track kind="captions" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {type === 'video' && (
        <div className="rounded-lg overflow-hidden bg-black">
          <video
            controls
            className="w-full max-h-64"
            src={mediaUrl}
          >
            <track kind="captions" />
            Your browser does not support the video element.
          </video>
          <div className="bg-muted px-3 py-2">
            <p className="text-xs text-muted-foreground font-mono truncate">{fileName}</p>
          </div>
        </div>
      )}
    </div>
  )
}
