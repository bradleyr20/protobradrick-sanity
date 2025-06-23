// File: lib/image.ts
// Image helper functions for your frontend
// ============================================

import {urlFor} from './sanity'

// Types for your image references
export interface ImageReference {
  asset?: {
    _id: string
    url: string
    title?: string
    credit?: string
    defaultCaption?: string
    defaultAlt?: string
    image?: {
      asset: {
        _id: string
        url: string
      }
    }
  }
  customCaption?: string
  customAlt?: string
  displayOptions?: {
    size?: 'small' | 'medium' | 'large' | 'full'
    alignment?: 'left' | 'center' | 'right'
    crop?: 'default' | 'square' | 'wide' | 'portrait'
  }
}

// Types for article authors
export interface ArticleAuthor {
  author?: {
    _id: string
    name: string
    slug?: { current: string }
    bio?: string
    image?: any
  }
  role?: string
  order?: number
}

// Helper function to resolve image with fallbacks
export function resolveImageWithFallbacks(
  imageRef: ImageReference | null, 
  fallbacks: (ImageReference | null)[] = []
): ImageReference | null {
  if (imageRef?.asset) {
    return imageRef
  }
  
  // Try fallbacks in order
  for (const fallback of fallbacks) {
    if (fallback?.asset) {
      return fallback
    }
  }
  
  return null
}

// Helper to get effective caption (custom or default)
export function getEffectiveCaption(imageRef: ImageReference | null): string {
  if (!imageRef?.asset) return ''
  return imageRef.customCaption || imageRef.asset.defaultCaption || ''
}

// Helper to get effective alt text (custom or default)
export function getEffectiveAlt(imageRef: ImageReference | null): string {
  if (!imageRef?.asset) return ''
  return imageRef.customAlt || imageRef.asset.defaultAlt || ''
}

// Helper to get photo credit
export function getPhotoCredit(imageRef: ImageReference | null): string {
  if (!imageRef?.asset) return ''
  return imageRef.asset.credit || ''
}

// Helper function for displaying article bylines
export function formatByline(authors: ArticleAuthor[]): string {
  if (!authors?.length) return ''
  
  const sortedAuthors = authors
    .sort((a, b) => (a.order || 1) - (b.order || 1))
    .map(a => ({ name: a.author?.name, role: a.role }))
    .filter(a => a.name)
  
  if (sortedAuthors.length === 1) {
    return `By ${sortedAuthors[0].name}`
  } else if (sortedAuthors.length === 2) {
    return `By ${sortedAuthors[0].name} and ${sortedAuthors[1].name}`
  } else {
    return `By ${sortedAuthors[0].name} and ${sortedAuthors.length - 1} others`
  }
}

// Helper to get primary author (first in order)
export function getPrimaryAuthor(authors: ArticleAuthor[]): ArticleAuthor | null {
  if (!authors?.length) return null
  
  return authors
    .sort((a, b) => (a.order || 1) - (b.order || 1))[0] || null
}

// Helper to get authors by role
export function getAuthorsByRole(authors: ArticleAuthor[], role: string): ArticleAuthor[] {
  return authors?.filter(a => a.role === role) || []
}

// Enhanced image URL generator with options
export interface ImageUrlOptions {
  width?: number
  height?: number
  format?: 'webp' | 'jpg' | 'png' | 'auto'
  quality?: number
  fit?: 'crop' | 'fill' | 'max' | 'min'
  crop?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint'
  auto?: 'format' | 'compress'
}

export function getImageUrl(
  imageRef: ImageReference | null,
  options: ImageUrlOptions = {}
): string | null {
  if (!imageRef?.asset) return null

  const {
    width,
    height,
    format = 'auto',
    quality = 80,
    fit = 'max',
    crop = 'center',
    auto = 'format'
  } = options

  // Use the nested image asset if it exists (for imageAsset documents)
  const imageAsset = imageRef.asset.image?.asset || imageRef.asset

  let urlBuilder = urlFor(imageAsset)

  if (width) urlBuilder = urlBuilder.width(width)
  if (height) urlBuilder = urlBuilder.height(height)
  if (format !== 'auto') urlBuilder = urlBuilder.format(format)
  if (quality !== 80) urlBuilder = urlBuilder.quality(quality)
  if (fit !== 'max') urlBuilder = urlBuilder.fit(fit as any)
  if (crop !== 'center') urlBuilder = urlBuilder.crop(crop as any)
  if (auto) urlBuilder = urlBuilder.auto(auto as any)

  return urlBuilder.url()
}

// Responsive image URLs for different breakpoints
export function getResponsiveImageUrls(imageRef: ImageReference | null) {
  if (!imageRef?.asset) return null

  return {
    mobile: getImageUrl(imageRef, { width: 400, format: 'webp' }),
    tablet: getImageUrl(imageRef, { width: 768, format: 'webp' }),
    desktop: getImageUrl(imageRef, { width: 1200, format: 'webp' }),
    large: getImageUrl(imageRef, { width: 1600, format: 'webp' }),
  }
}

// Get image for social media sharing (specific dimensions)
export function getSocialImageUrl(imageRef: ImageReference | null): string | null {
  return getImageUrl(imageRef, {
    width: 1200,
    height: 630,
    fit: 'crop',
    crop: 'center',
    format: 'jpg',
    quality: 85
  })
}

// Get image with display options applied
export function getImageWithDisplayOptions(imageRef: ImageReference | null, baseWidth = 800): string | null {
  if (!imageRef?.asset) return null

  const size = imageRef.displayOptions?.size || 'medium'
  const crop = imageRef.displayOptions?.crop || 'default'

  let width = baseWidth
  let height: number | undefined

  // Apply size
  switch (size) {
    case 'small':
      width = Math.round(baseWidth * 0.5)
      break
    case 'medium':
      width = Math.round(baseWidth * 0.75)
      break
    case 'large':
      width = baseWidth
      break
    case 'full':
      width = Math.round(baseWidth * 1.2)
      break
  }

  // Apply crop ratios
  switch (crop) {
    case 'square':
      height = width
      break
    case 'wide':
      height = Math.round(width * (9/16)) // 16:9 ratio
      break
    case 'portrait':
      height = Math.round(width * (4/3)) // 3:4 ratio
      break
    // 'default' uses original aspect ratio
  }

  return getImageUrl(imageRef, {
    width,
    height,
    fit: height ? 'crop' : 'max',
    format: 'webp',
    quality: 85
  })
}