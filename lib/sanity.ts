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