// File: schemas/documents/article.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main headline of the article',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle/Deck',
      type: 'text',
      description: 'Secondary headline or article deck',
      rows: 2,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Article category',
      options: {
        list: [
          {title: 'LPGA Tour', value: 'lpga-tour'},
          {title: 'PGA Tour', value: 'pga-tour'},
          {title: 'Major Championships', value: 'majors'},
          {title: 'Equipment', value: 'equipment'},
          {title: 'Instruction', value: 'instruction'},
          {title: 'News', value: 'news'},
        ] as const,
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption for the image',
        },
        {
          name: 'credit',
          type: 'string',
          title: 'Photo Credit',
          description: 'Photographer or image source credit',
        },
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where the story takes place (e.g., FRISCO, Texas)',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      description: 'Article author reference',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Brief summary for social media and article previews',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'credit',
              type: 'string',
              title: 'Photo Credit',
            },
          ],
        },
        defineType({
          name: 'quote',
          type: 'object',
          title: 'Pull Quote',
          fields: [
            {
              name: 'text',
              type: 'text',
              title: 'Quote Text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'attribution',
              type: 'string',
              title: 'Attribution',
              description: 'Who said this quote',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      description: 'Related tags for categorization and SEO',
    }),
    defineField({
      name: 'relatedPlayers',
      title: 'Related Players',
      type: 'array',
      of: [{type: 'reference', to: {type: 'player'}}],
      description: 'Golf players mentioned in the article',
    }),
    defineField({
      name: 'relatedTournaments',
      title: 'Related Tournaments',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tournament'}}],
      description: 'Golf tournaments mentioned in the article',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines (50-60 characters)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description for search engines (150-160 characters)',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'openGraphImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Image for social media sharing',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Mark as featured to highlight on homepage',
    }),
    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Review', value: 'review'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ] as const,
      },
      initialValue: 'draft',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const {author} = selection
      return {
        ...selection,
        subtitle: author && `by ${author}`,
      }
    },
  },

  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
})

// ============================================

// File: schemas/documents/author.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {name: 'twitter', title: 'Twitter', type: 'string'},
        {name: 'instagram', title: 'Instagram', type: 'string'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})

// ============================================

// File: schemas/documents/player.ts
import {defineType, defineField} from 'sanity'

const TOURS = [
  {title: 'LPGA Tour', value: 'lpga'},
  {title: 'PGA Tour', value: 'pga'},
  {title: 'LIV Golf', value: 'liv'},
  {title: 'DP World Tour', value: 'dpworld'},
] as const

export default defineType({
  name: 'player',
  title: 'Player',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'tour',
      title: 'Tour',
      type: 'string',
      options: {
        list: TOURS,
      },
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'worldRanking',
      title: 'World Ranking',
      type: 'number',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'image',
      title: 'Player Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'age',
      title: 'Age',
      type: 'number',
      validation: (Rule) => Rule.min(16).max(80),
    }),
    defineField({
      name: 'turnedPro',
      title: 'Turned Professional',
      type: 'number',
      description: 'Year turned professional',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear()),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tour',
      media: 'image',
    },
  },
})

// ============================================

// File: schemaTypes/documents/tournament.ts
import {defineType, defineField} from 'sanity'

const TOUR_TYPES = [
  {title: 'LPGA Tour', value: 'lpga'},
  {title: 'PGA Tour', value: 'pga'},
  {title: 'Major Championship', value: 'major'},
  {title: 'DP World Tour', value: 'dpworld'},
  {title: 'LIV Golf', value: 'liv'},
] as const

export default defineType({
  name: 'tournament',
  title: 'Tournament',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tour',
      title: 'Tour',
      type: 'string',
      options: {
        list: TOUR_TYPES,
      },
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      description: 'Golf course or facility name',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, State/Country (e.g., FRISCO, Texas)',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 5),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'purse',
      title: 'Prize Money',
      type: 'number',
      description: 'Total prize money in USD',
    }),
    defineField({
      name: 'winner',
      title: 'Winner',
      type: 'reference',
      to: [{type: 'player'}],
      description: 'Tournament winner (if completed)',
    }),
    defineField({
      name: 'isMajor',
      title: 'Major Championship',
      type: 'boolean',
      description: 'Is this a major championship?',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'year',
      location: 'location',
    },
    prepare(selection) {
      const {title, subtitle, location} = selection
      return {
        title,
        subtitle: `${subtitle}${location ? ` • ${location}` : ''}`,
      }
    },
  },
})

// ============================================

// File: schemaTypes/documents/tag.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Brief description of this tag',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color for tag display (optional)',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i, {
        name: 'hex color',
        invert: false,
      }).optional(),
    }),
    defineField({
      name: 'category',
      title: 'Tag Category',
      type: 'string',
      options: {
        list: [
          {title: 'Topic', value: 'topic'},
          {title: 'Player Type', value: 'player-type'},
          {title: 'Equipment', value: 'equipment'},
          {title: 'Tournament Type', value: 'tournament-type'},
          {title: 'Skill Level', value: 'skill-level'},
          {title: 'General', value: 'general'},
        ] as const,
      },
      initialValue: 'general',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title,
        subtitle: subtitle ? `Category: ${subtitle}` : undefined,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Category',
      name: 'category',
      by: [{field: 'category', direction: 'asc'}, {field: 'name', direction: 'asc'}],
    },
  ],
})

// ============================================

// File: schemaTypes/index.ts
import {type SchemaTypeDefinition} from 'sanity'

import article from './documents/article'
import author from './documents/author'
import player from './documents/player'
import tournament from './documents/tournament'
import tag from './documents/tag'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Documents
    article,
    author,
    player,
    tournament,
    tag,
  ],
}

// ============================================

// File: sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Golf Content Hub',

  projectId: 'your-project-id',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema,
})

// ============================================

// Generate types for your frontend:
// Run: npx sanity@latest typegen generate
// This creates: sanity.types.ts

// Example usage in your frontend:
// import type {Article, Player} from './sanity.types'