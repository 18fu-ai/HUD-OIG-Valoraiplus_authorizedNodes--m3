'use client'

interface MediaPlayerProps {
  mediaUrl: string
  type: 'audio' | 'video'
  fileName: string
}

export default function MediaPlayer({ mediaUrl, type, fileName }: MediaPlayerProps) {
  return (
    <div className="w-full p-4">
      {type === 'audio' && (
        <div className="bg-slate-100 rounded-lg p-4">
          <audio
            controls
            className="w-full"
            title={fileName}
          >
            <source src={mediaUrl} type="audio/*" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {type === 'video' && (
        <video
          controls
          className="w-full h-48 bg-black rounded-lg"
          title={fileName}
        >
          <source src={mediaUrl} type="video/*" />
          Your browser does not support the video element.
        </video>
      )}
    </div>
  )
}
