// File: schemaTypes/documents/article.ts
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
          {title: 'Courses', value: 'courses'},
        ] as const,
      },
    }),

    // PUBLISHING-STYLE IMAGE FIELDS
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

    // BODY CONTENT with DAM integration and video support
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
        // Inline images from DAM
        {
          type: 'imageReference',
          title: 'Inline Image',
        },
        // EXTERNAL VIDEO EMBEDDING (Brightcove, YouTube, Vimeo, etc.)
        {
          type: 'externalVideoReference',
          title: 'External Video',
          description: 'Embed video from external platforms like Brightcove',
        },
        // NATIVE VIDEO EMBEDDING (Self-hosted MP4s from DAM)
        {
          type: 'nativeVideoReference',
          title: 'Native Video',
          description: 'Embed HTML5-playable videos stored in the DAM',
        },
        // Pull quote block
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

    // SEO SETTINGS
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
      media: 'leadImage.asset.image',
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