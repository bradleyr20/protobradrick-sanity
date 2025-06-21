// lib/video.ts
import {client} from './sanity'
import {urlFor} from './sanity'

// External video helpers
export function getExternalVideoEmbedData(
  video: ExternalVideo,
  options: {
    playerId?: string
    width?: string
    height?: string
  } = {}
) {
  switch (video.platform) {
    case 'brightcove':
      const accountId = process.env.NEXT_PUBLIC_BRIGHTCOVE_ACCOUNT_ID
      const playerId = options.playerId || video.playerId || 'default'
      return {
        platform: 'brightcove',
        accountId,
        playerId,
        videoId: video.videoId,
        embedUrl: `https://players.brightcove.net/${accountId}/${playerId}_default/index.html?videoId=${video.videoId}`,
      }
    
    case 'youtube':
      return {
        platform: 'youtube',
        videoId: video.videoId,
        embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
      }
    
    case 'vimeo':
      return {
        platform: 'vimeo',
        videoId: video.videoId,
        embedUrl: `https://player.vimeo.com/video/${video.videoId}`,
      }
    
    case 'wistia':
      return {
        platform: 'wistia',
        videoId: video.videoId,
        embedUrl: `https://fast.wistia.net/embed/iframe/${video.videoId}`,
      }
    
    default:
      throw new Error(`Unsupported video platform: ${video.platform}`)
  }
}

// Native video helpers
export function getNativeVideoUrl(asset: NativeVideoAsset): string {
  if (!asset.videoFile?.asset?._ref) return ''
  
  const [, id, extension] = asset.videoFile.asset._ref.match(/file-(.+)-(\w+)$/) || []
  return `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${id}.${extension}`
}

export function getNativeVideoProps(videoRef: NativeVideoReference) {
  return {
    src: getNativeVideoUrl(videoRef.asset),
    poster: videoRef.asset?.thumbnail ? urlFor(videoRef.asset.thumbnail).url() : undefined,
    autoplay: videoRef.autoplay,
    loop: videoRef.loop,
    controls: videoRef.controls,
    muted: videoRef.autoplay, // Browsers require muted for autoplay
    playsInline: true, // Important for mobile
  }
}