// ============================================
// File: lib/sanity.ts
// Sanity client setup for your frontend
// ============================================

import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'l1vjep0h', // Your project ID
  dataset: 'production',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) to target the latest API version
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// ============================================
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

// ============================================
// File: lib/queries.ts
// GROQ queries for your frontend
// ============================================

// Query for article with all image references resolved
export const articleQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    category,
    location,
    publishedAt,
    excerpt,
    featured,
    status,
    
    // Author
    author-> {
      _id,
      name,
      slug,
      bio,
      image
    },
    
    // Images with full resolution
    leadImage {
      customCaption,
      customAlt,
      displayOptions,
      asset-> {
        _id,
        title,
        credit,
        defaultCaption,
        defaultAlt,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          }
        }
      }
    },
    
    toutImage {
      customCaption,
      customAlt,
      displayOptions,
      asset-> {
        _id,
        title,
        credit,
        defaultCaption,
        defaultAlt,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          }
        }
      }
    },
    
    socialImage {
      customCaption,
      customAlt,
      displayOptions,
      asset-> {
        _id,
        title,
        credit,
        defaultCaption,
        defaultAlt,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          }
        }
      }
    },
    
    // Body content with resolved images
    body[] {
      _type == "imageReference" => {
        _type,
        _key,
        customCaption,
        customAlt,
        displayOptions,
        asset-> {
          _id,
          title,
          credit,
          defaultCaption,
          defaultAlt,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions
              }
            }
          }
        }
      },
      _type == "block" => @,
      _type == "quote" => @
    },
    
    // Related content
    tags[]-> {
      _id,
      name,
      slug
    },
    
    relatedPlayers[]-> {
      _id,
      name,
      slug,
      tour,
      country
    },
    
    relatedTournaments[]-> {
      _id,
      name,
      slug,
      year,
      location
    },
    
    // SEO
    seo {
      metaTitle,
      metaDescription
    }
  }
`

// Query for article listing
export const articlesQuery = `
  *[_type == "article" && status == "published"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    subtitle,
    slug,
    category,
    publishedAt,
    excerpt,
    featured,
    
    author-> {
      name,
      slug
    },
    
    // Use tout image for listings, fallback to lead image
    "thumbnail": coalesce(
      toutImage {
        customCaption,
        customAlt,
        asset-> {
          _id,
          title,
          credit,
          defaultCaption,
          defaultAlt,
          image
        }
      },
      leadImage {
        customCaption,
        customAlt,
        asset-> {
          _id,
          title,
          credit,
          defaultCaption,
          defaultAlt,
          image
        }
      }
    ),
    
    tags[]-> {
      name,
      slug
    }
  }
`

// Query for featured articles
export const featuredArticlesQuery = `
  *[_type == "article" && status == "published" && featured == true] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    subtitle,
    slug,
    category,
    publishedAt,
    excerpt,
    
    author-> {
      name,
      slug
    },
    
    leadImage {
      customCaption,
      customAlt,
      asset-> {
        _id,
        title,
        credit,
        defaultCaption,
        defaultAlt,
        image
      }
    }
  }
`

// ============================================
// File: lib/types.ts (optional but recommended)
// TypeScript types for your frontend
// ============================================

export interface Article {
  _id: string
  title: string
  subtitle?: string
  slug: { current: string }
  category?: string
  location?: string
  publishedAt: string
  excerpt?: string
  featured?: boolean
  status: 'draft' | 'review' | 'published' | 'archived'
  
  author?: {
    _id: string
    name: string
    slug: { current: string }
    bio?: string
    image?: any
  }
  
  leadImage?: ImageReference
  toutImage?: ImageReference
  socialImage?: ImageReference
  
  body?: any[]
  
  tags?: {
    _id: string
    name: string
    slug: { current: string }
  }[]
  
  relatedPlayers?: {
    _id: string
    name: string
    slug: { current: string }
    tour?: string
    country?: string
  }[]
  
  relatedTournaments?: {
    _id: string
    name: string
    slug: { current: string }
    year?: number
    location?: string
  }[]
  
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// In your React component or Next.js page:

import { client } from '@/lib/sanity'
import { articleQuery } from '@/lib/queries'
import { 
  resolveImageWithFallbacks, 
  getImageUrl, 
  getEffectiveCaption,
  getSocialImageUrl 
} from '@/lib/image'

export async function getStaticProps({ params }) {
  const article = await client.fetch(articleQuery, { slug: params.slug })
  
  return {
    props: { article }
  }
}

export default function ArticlePage({ article }) {
  // Get the best image for the article
  const heroImage = resolveImageWithFallbacks(
    article.leadImage,
    [article.toutImage]
  )
  
  // Get optimized image URLs
  const heroImageUrl = getImageUrl(heroImage, { 
    width: 1200, 
    height: 600, 
    fit: 'crop' 
  })
  
  // Get social media image
  const socialImageUrl = getSocialImageUrl(
    resolveImageWithFallbacks(article.socialImage, [article.leadImage])
  )
  
  return (
    <article>
      <img 
        src={heroImageUrl} 
        alt={getEffectiveAlt(heroImage)}
      />
      <figcaption>{getEffectiveCaption(heroImage)}</figcaption>
      {/* ... rest of article */}
    </article>
  )
}
*/