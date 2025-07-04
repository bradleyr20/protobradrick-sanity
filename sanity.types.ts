/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type NativeVideoReference = {
  _type: 'nativeVideoReference'
  asset?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'nativeVideoAsset'
  }
  customCaption?: string
  autoplay?: boolean
  loop?: boolean
  controls?: boolean
  displayOptions?: {
    size?: 'small' | 'medium' | 'large' | 'full'
    alignment?: 'left' | 'center' | 'right'
  }
}

export type ExternalVideoReference = {
  _type: 'externalVideoReference'
  video?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'externalVideo'
  }
  displayMode?: 'inline' | 'modal'
}

export type NativeVideoAsset = {
  _id: string
  _type: 'nativeVideoAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  videoFile?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.fileAsset'
    }
    media?: unknown
    _type: 'file'
  }
  thumbnail?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  credit?: string
  defaultCaption?: string
  keywords?: Array<string>
  category?: 'b-roll' | 'slow-motion' | 'drone' | 'animation' | 'short-clip'
  duration?: number
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3'
  usageRights?: {
    type?: 'owned' | 'licensed' | 'fair-use'
    restrictions?: string
  }
}

export type ExternalVideo = {
  _id: string
  _type: 'externalVideo'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  platform?: 'brightcove' | 'youtube' | 'vimeo' | 'wistia'
  videoId?: string
  playerId?: string
  description?: string
  thumbnail?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  duration?: string
  publishedAt?: string
  category?:
    | 'tournament-highlights'
    | 'player-interview'
    | 'instruction'
    | 'equipment-review'
    | 'course-flyover'
  tags?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'tag'
  }>
  relatedPlayers?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'player'
  }>
  relatedTournament?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'tournament'
  }
  transcript?: string
  status?: 'draft' | 'published' | 'archived'
}

export type Tag = {
  _id: string
  _type: 'tag'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  slug?: Slug
  description?: string
  color?: string
  category?: 'topic' | 'player-type' | 'equipment' | 'tournament-type' | 'skill-level' | 'general'
}

export type ImageAsset = {
  _id: string
  _type: 'imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  credit?: string
  defaultAlt?: string
  defaultCaption?: string
  keywords?: Array<string>
  category?:
    | 'tournament-action'
    | 'player-portrait'
    | 'course-venue'
    | 'equipment'
    | 'awards'
    | 'lifestyle'
    | 'stock'
  dateShot?: string
  location?: string
  relatedPlayers?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'player'
  }>
  relatedTournament?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'tournament'
  }
  rightsManaged?: boolean
  usageRights?: {
    type?: 'editorial' | 'commercial' | 'rights-managed' | 'staff-wire'
    restrictions?: string
    expiration?: string
  }
}

export type Tournament = {
  _id: string
  _type: 'tournament'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  slug?: Slug
  tour?: 'lpga' | 'pga' | 'major' | 'dpworld' | 'liv'
  venue?: string
  location?: string
  year?: number
  startDate?: string
  endDate?: string
  purse?: number
  winner?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'player'
  }
  isMajor?: boolean
}

export type Player = {
  _id: string
  _type: 'player'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  slug?: Slug
  tour?: 'lpga' | 'pga' | 'liv' | 'dpworld'
  country?: string
  worldRanking?: number
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  age?: number
  turnedPro?: number
}

export type Article = {
  _id: string
  _type: 'article'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  subtitle?: string
  category?: 'lpga-tour' | 'pga-tour' | 'majors' | 'equipment' | 'instruction' | 'news' | 'courses'
  leadImage?: ImageReference
  toutImage?: ImageReference
  socialImage?: ImageReference
  location?: string
  publishedAt?: string
  authors?: Array<{
    author?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'author'
    }
    role?: 'author' | 'co-author' | 'contributor' | 'editor' | 'reporter'
    order?: number
    _key: string
  }>
  excerpt?: string
  body?: Array<
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: 'span'
          _key: string
        }>
        style?: 'normal' | 'h2' | 'h3' | 'blockquote'
        listItem?: 'bullet' | 'number'
        markDefs?: Array<{
          href?: string
          blank?: boolean
          _type: 'link'
          _key: string
        }>
        level?: number
        _type: 'block'
        _key: string
      }
    | ({
        _key: string
      } & ImageReference)
    | ({
        _key: string
      } & ExternalVideoReference)
    | ({
        _key: string
      } & NativeVideoReference)
    | {
        text?: string
        attribution?: string
        _type: 'quote'
        _key: string
      }
  >
  tags?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'tag'
  }>
  relatedPlayers?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'player'
  }>
  relatedTournaments?: Array<{
    _ref: string
    _type: 'reference'
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: 'tournament'
  }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  featured?: boolean
  status?: 'draft' | 'review' | 'published' | 'archived'
}

export type Author = {
  _id: string
  _type: 'author'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  slug?: Slug
  bio?: string
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    media?: unknown
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  email?: string
  socialMedia?: {
    twitter?: string
    instagram?: string
  }
}

export type ImageReference = {
  _type: 'imageReference'
  asset?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'imageAsset'
  }
  customCaption?: string
  customAlt?: string
  displayOptions?: {
    size?: 'small' | 'medium' | 'large' | 'full'
    alignment?: 'left' | 'center' | 'right'
    crop?: 'default' | 'square' | 'wide' | 'portrait'
  }
}

export type MediaTag = {
  _id: string
  _type: 'media.tag'
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: Slug
}

export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  height?: number
  width?: number
  aspectRatio?: number
}

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot'
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageCrop = {
  _type: 'sanity.imageCrop'
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityFileAsset = {
  _id: string
  _type: 'sanity.fileAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type SanityImageAsset = {
  _id: string
  _type: 'sanity.imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata'
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type Geopoint = {
  _type: 'geopoint'
  lat?: number
  lng?: number
  alt?: number
}

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData'
  name?: string
  id?: string
  url?: string
}

export type AllSanitySchemaTypes =
  | NativeVideoReference
  | ExternalVideoReference
  | NativeVideoAsset
  | ExternalVideo
  | Tag
  | ImageAsset
  | Tournament
  | Player
  | Article
  | Author
  | ImageReference
  | MediaTag
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityImageHotspot
  | SanityImageCrop
  | SanityFileAsset
  | SanityImageAsset
  | SanityImageMetadata
  | Geopoint
  | Slug
  | SanityAssetSourceData
export declare const internalGroqTypeReferenceTo: unique symbol
