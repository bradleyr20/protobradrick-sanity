// ============================================
// STEP 1: DAM-Style Image Asset Document
// This serves as your Digital Asset Management system
// ============================================

// File: schemaTypes/documents/imageAsset.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imageAsset',
  title: 'Image Asset',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Asset Title',
      type: 'string',
      description: 'Internal title for DAM organization',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image File',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    // BASE METADATA (entered at upload)
    defineField({
      name: 'credit',
      title: 'Photo Credit',
      type: 'string',
      description: 'Photographer or source credit (mandatory for rights-managed)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultAlt',
      title: 'Default Alt Text',
      type: 'string',
      description: 'Base alt text (can be auto-generated or manual)',
    }),
    defineField({
      name: 'defaultCaption',
      title: 'Default Caption',
      type: 'text',
      description: 'Default caption that travels with the asset',
      rows: 3,
    }),
    // DAM ORGANIZATION
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Search keywords for finding images in DAM',
    }),
    defineField({
      name: 'category',
      title: 'Image Category',
      type: 'string',
      options: {
        list: [
          {title: 'Tournament Action', value: 'tournament-action'},
          {title: 'Player Portrait', value: 'player-portrait'},
          {title: 'Course/Venue', value: 'course-venue'},
          {title: 'Equipment', value: 'equipment'},
          {title: 'Awards/Celebration', value: 'awards'},
          {title: 'Lifestyle', value: 'lifestyle'},
          {title: 'Stock/Generic', value: 'stock'},
        ],
      },
    }),
    defineField({
      name: 'dateShot',
      title: 'Date Shot',
      type: 'date',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    // CONTENT ASSOCIATIONS
    defineField({
      name: 'relatedPlayers',
      title: 'Players in Photo',
      type: 'array',
      of: [{type: 'reference', to: {type: 'player'}}],
    }),
    defineField({
      name: 'relatedTournament',
      title: 'Related Tournament',
      type: 'reference',
      to: [{type: 'tournament'}],
    }),
    // RIGHTS MANAGEMENT
    defineField({
      name: 'rightsManaged',
      title: 'Rights Managed',
      type: 'boolean',
      description: 'Is this a rights-managed image?',
      initialValue: false,
    }),
    defineField({
      name: 'usageRights',
      title: 'Usage Rights',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Rights Type',
          type: 'string',
          options: {
            list: [
              {title: 'Editorial Only', value: 'editorial'},
              {title: 'Commercial OK', value: 'commercial'},
              {title: 'Rights Managed', value: 'rights-managed'},
              {title: 'Staff/Wire Photo', value: 'staff-wire'},
            ],
          },
        },
        {
          name: 'restrictions',
          title: 'Usage Restrictions',
          type: 'text',
          description: 'Any restrictions on usage',
        },
        {
          name: 'expiration',
          title: 'Rights Expiration',
          type: 'date',
          description: 'When usage rights expire (if applicable)',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      credit: 'credit',
      category: 'category',
      media: 'image',
    },
    prepare(selection) {
      const {title, credit, category} = selection
      return {
        title,
        subtitle: `${credit}${category ? ` • ${category}` : ''}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Recently Added',
      name: 'recent',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
    {
      title: 'By Category',
      name: 'category',
      by: [{field: 'category', direction: 'asc'}, {field: 'title', direction: 'asc'}],
    },
  ],
})

// ============================================
// STEP 2: Reusable Image Reference Object
// For context-specific metadata (copyfitting)
// ============================================

// File: schemaTypes/objects/imageReference.ts
export const imageReference = defineType({
  name: 'imageReference',
  title: 'Image Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Image Asset',
      type: 'reference',
      to: [{type: 'imageAsset'}],
      validation: (Rule) => Rule.required(),
    }),
    // CONTEXT-SPECIFIC METADATA (copyfitting)
    defineField({
      name: 'customCaption',
      title: 'Custom Caption',
      type: 'text',
      description: 'Override default caption for this specific use',
      rows: 2,
    }),
    defineField({
      name: 'customAlt',
      title: 'Custom Alt Text',
      type: 'string',
      description: 'Override default alt text if needed for context',
    }),
    defineField({
      name: 'displayOptions',
      title: 'Display Options',
      type: 'object',
      fields: [
        {
          name: 'size',
          title: 'Display Size',
          type: 'string',
          options: {
            list: [
              {title: 'Small', value: 'small'},
              {title: 'Medium', value: 'medium'},
              {title: 'Large', value: 'large'},
              {title: 'Full Width', value: 'full'},
            ],
          },
          initialValue: 'medium',
        },
        {
          name: 'alignment',
          title: 'Alignment',
          type: 'string',
          options: {
            list: [
              {title: 'Left', value: 'left'},
              {title: 'Center', value: 'center'},
              {title: 'Right', value: 'right'},
            ],
          },
          initialValue: 'center',
        },
        {
          name: 'crop',
          title: 'Crop Style',
          type: 'string',
          options: {
            list: [
              {title: 'Default', value: 'default'},
              {title: 'Square', value: 'square'},
              {title: 'Wide (16:9)', value: 'wide'},
              {title: 'Portrait (3:4)', value: 'portrait'},
            ],
          },
          initialValue: 'default',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'asset.title',
      credit: 'asset.credit',
      media: 'asset.image',
      customCaption: 'customCaption',
    },
    prepare(selection) {
      const {title, credit, customCaption} = selection
      return {
        title: title || 'Untitled Image',
        subtitle: `${credit}${customCaption ? ' • Custom caption' : ''}`,
        media: selection.media,
      }
    },
  },
})

// ============================================
// STEP 3: Updated Article Schema with Special Image Types
// Lead, tout, social images as your workflow requires
// ============================================

// File: schemaTypes/documents/article.ts (updated)
import {defineType, defineField} from 'sanity'
import {imageReference} from '../objects/imageReference'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    // ... other article fields ...

    // SPECIAL IMAGE TYPES
    defineField({
      name: 'leadImage',
      title: 'Lead Image',
      type: 'imageReference',
      description: 'Main image that appears at the top of the article',
    }),
    defineField({
      name: 'toutImage',
      title: 'Tout Image',
      type: 'imageReference',
      description: 'Thumbnail image for article promotion on landing pages',
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Media Image',
      type: 'imageReference',
      description: 'Optional: Image for social media sharing (uses lead image if not specified)',
    }),

    // BODY CONTENT with inline images
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          // ... block configuration
        },
        // Inline images using the same reference pattern
        {
          type: 'imageReference',
          title: 'Inline Image',
        },
        // ... other content types
      ],
    }),

    // ... rest of article fields
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'leadImage.asset.image', // Use lead image for preview
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const {author} = selection
      return {
        ...selection,
        subtitle: author ? `by ${author}` : selection.subtitle,
      }
    },
  },
})

// ============================================
// STEP 4: Studio Customization for DAM-like Experience
// ============================================

// File: sanity.config.ts (structure configuration)
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media' // Optional: Enhanced media library

export default defineConfig({
  // ... other config

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Articles section
            S.listItem()
              .title('Articles')
              .child(
                S.documentTypeList('article')
                  .title('Articles')
                  .filter('_type == "article"')
              ),

            S.divider(),

            // DAM section - organized like a media library
            S.listItem()
              .title('📸 Media Library')
              .child(
                S.list()
                  .title('Media Library')
                  .items([
                    S.listItem()
                      .title('All Images')
                      .child(
                        S.documentTypeList('imageAsset')
                          .title('All Images')
                          .filter('_type == "imageAsset"')
                      ),
                    S.listItem()
                      .title('By Category')
                      .child(
                        S.list()
                          .title('By Category')
                          .items([
                            S.listItem()
                              .title('Tournament Action')
                              .child(
                                S.documentTypeList('imageAsset')
                                  .title('Tournament Action')
                                  .filter('_type == "imageAsset" && category == "tournament-action"')
                              ),
                            S.listItem()
                              .title('Player Portraits')
                              .child(
                                S.documentTypeList('imageAsset')
                                  .title('Player Portraits')
                                  .filter('_type == "imageAsset" && category == "player-portrait"')
                              ),
                            // ... more categories
                          ])
                      ),
                    S.listItem()
                      .title('Recent Uploads')
                      .child(
                        S.documentTypeList('imageAsset')
                          .title('Recent Uploads')
                          .filter('_type == "imageAsset"')
                          .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
                      ),
                  ])
              ),

            S.divider(),

            // Other content types
            S.listItem()
              .title('Authors')
              .child(S.documentTypeList('author')),
            S.listItem()
              .title('Players')
              .child(S.documentTypeList('player')),
            // ... etc
          ])
    }),
    // Optional: Enhanced media plugin for better DAM experience
    media(),
  ],

  // ... rest of config
})

// ============================================
// STEP 5: Frontend Helper Functions
// ============================================

// Helper function to resolve image with fallbacks
export function resolveImageWithFallbacks(imageRef: any, fallbacks: any[] = []) {
  if (!imageRef) {
    // Try fallbacks in order
    for (const fallback of fallbacks) {
      if (fallback) return fallback
    }
    return null
  }
  return imageRef
}

// Helper to get effective caption (custom or default)
export function getEffectiveCaption(imageRef: any) {
  return imageRef?.customCaption || imageRef?.asset?.defaultCaption || ''
}

// Helper to get effective alt text (custom or default)
export function getEffectiveAlt(imageRef: any) {
  return imageRef?.customAlt || imageRef?.asset?.defaultAlt || ''
}

// Frontend query example
const articleQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    title,
    leadImage {
      customCaption,
      customAlt,
      displayOptions,
      asset-> {
        title,
        credit,
        defaultCaption,
        defaultAlt,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    },
    toutImage {
      // ... same structure
    },
    socialImage {
      // ... same structure
    },
    body[] {
      _type == "imageReference" => {
        customCaption,
        customAlt,
        displayOptions,
        asset-> {
          title,
          credit,
          defaultCaption,
          defaultAlt,
          image
        }
      },
      _type != "imageReference" => @
    }
  }
`