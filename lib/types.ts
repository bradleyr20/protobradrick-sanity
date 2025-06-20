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