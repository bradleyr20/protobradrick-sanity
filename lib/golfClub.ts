// lib/golfClub.ts
// Helper functions for golf club content

import {Club, BuyingGuide, Brand} from '../sanity.types'

// Helper to format club name with variant
export function getFullClubName(club: Club): string {
  const parts = [club.brand?.name, club.name, club.variant].filter(Boolean)
  return parts.join(' ')
}

// Helper to get effective price display
export function getClubPriceDisplay(club: Club): string {
  if (!club.price?.amount) return ''
  
  if (club.price.priceRange) {
    return club.price.priceRange
  }
  
  const currency = club.price.currency || 'USD'
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'
  
  return `${symbol}${club.price.amount}`
}

// Helper to get MOI rating display
export function getMOIRatingDisplay(club: Club): string {
  if (!club.performanceRating?.value) return ''
  
  const rating = club.performanceRating.value
  const type = club.performanceRating.type || 'MOI'
  
  return `${type.toUpperCase()} Rating: ${rating}`
}

// Helper to get target handicap display
export function getTargetHandicapDisplay(club: Club): string {
  if (!club.targetHandicaps?.length) return ''
  
  const handicaps = club.targetHandicaps.map(h => {
    switch (h) {
      case 'low-handicaps':
        return 'Low Handicaps'
      case 'middle-handicaps':
        return 'Mid Handicaps'
      case 'high-handicaps':
        return 'High Handicaps'
      default:
        return h
    }
  })
  
  return handicaps.join(', ')
}

// Helper to get award badges
export function getAwardBadges(club: Club): string[] {
  return club.awards?.filter(Boolean) || []
}

// Helper to check if club has specific award
export function hasAward(club: Club, award: string): boolean {
  return club.awards?.includes(award) || false
}

// Helper to format adjustability display
export function getAdjustabilityDisplay(club: Club): string {
  const adj = club.specifications?.adjustability
  if (!adj?.type) return 'Fixed'
  
  switch (adj.type) {
    case 'fixed':
      return 'Fixed Hosel'
    case '8-way':
      return '8-way Adjustable Hosel'
    case '12-way':
      return '12-way Adjustable Hosel'
    case '16-way':
      return '16-way Adjustable Hosel'
    case '33-way':
      return '33-way Adjustable Hosel'
    case 'plus-minus-2':
      return '±2° Adjustable'
    default:
      return adj.type
  }
}

// Helper to get available lofts display
export function getLoftsDisplay(club: Club): string {
  const lofts = club.specifications?.availableLofts
  if (!lofts?.length) return ''
  
  return lofts.join('°, ') + '°'
}

// Helper to get club type display name
export function getClubTypeDisplay(club: Club): string {
  switch (club.clubType) {
    case 'driver':
      return 'Driver'
    case 'fairway-wood':
      return 'Fairway Wood'
    case 'hybrid':
      return 'Hybrid'
    case 'iron':
      return 'Iron'
    case 'wedge':
      return 'Wedge'
    case 'putter':
      return 'Putter'
    default:
      return club.clubType || 'Golf Club'
  }
}

// Helper to get club sub-type display name
export function getClubSubTypeDisplay(club: Club): string {
  if (!club.clubSubType) return ''
  
  switch (club.clubSubType) {
    case 'blade-putter':
      return 'Blade Putter'
    case 'mallet-putter':
      return 'Mallet Putter'
    case 'mid-mallet-putter':
      return 'Mid-Mallet Putter'
    case 'game-improvement-iron':
      return 'Game Improvement Iron'
    case 'players-iron':
      return 'Players Iron'
    case 'players-distance-iron':
      return 'Players Distance Iron'
    case 'tour-iron':
      return 'Tour Iron'
    case 'max-forgiveness-driver':
      return 'Max Forgiveness Driver'
    case 'low-spin-driver':
      return 'Low Spin Driver'
    case 'draw-bias-driver':
      return 'Draw Bias Driver'
    case 'tour-driver':
      return 'Tour Driver'
    default:
      return club.clubSubType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }
}

// Helper to sort clubs by display order
export function sortClubsByOrder(clubs: Club[]): Club[] {
  return [...clubs].sort((a, b) => {
    const orderA = a.order || 999
    const orderB = b.order || 999
    return orderA - orderB
  })
}

// Helper to filter clubs by type
export function filterClubsByType(clubs: Club[], type: string): Club[] {
  return clubs.filter(club => club.clubType === type)
}

// Helper to filter clubs by awards
export function filterClubsByAward(clubs: Club[], award: string): Club[] {
  return clubs.filter(club => hasAward(club, award))
}

// Helper to get clubs for a buying guide
export function getClubsForGuide(guide: BuyingGuide, allClubs: Club[]): Club[] {
  if (!guide.clubs?.length) return []
  
  const guideClubIds = guide.clubs.map(ref => ref._id)
  const filteredClubs = allClubs.filter(club => guideClubIds.includes(club._id))
  
  return sortClubsByOrder(filteredClubs)
}