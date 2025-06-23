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

    // PUBLISHING-STYLE IMAGE FIELDS WITH VALIDATION
    defineField({
      name: 'leadImage',
      title: 'Lead Image',
      type: 'imageReference',
      description: 'Primary image for the article content. If no tout image is specified, this will also be used for article listings.',
    }),
    defineField({
      name: 'toutImage',
      title: 'Tout Image',
      type: 'imageReference',
      description: 'Image for article listings and social sharing. Leave empty to use lead image.',
      validation: (Rule) => 
        Rule.custom((toutImage, context) => {
          const leadImage = context.document?.leadImage
          
          // If no lead image, tout image is required
          if (!leadImage && !toutImage) {
            return 'Either Lead Image or Tout Image is required'
          }
          
          return true
        })
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
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'author',
              title: 'Author',
              type: 'reference',
              to: [{type: 'author'}],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              options: {
                list: [
                  {title: 'Author', value: 'author'},
                  {title: 'Co-author', value: 'co-author'},
                  {title: 'Contributing Writer', value: 'contributor'},
                  {title: 'Editor', value: 'editor'},
                  {title: 'Reporter', value: 'reporter'},
                ],
              },
              initialValue: 'author',
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
              description: 'Display order (1 = first author)',
              validation: (Rule) => Rule.min(1),
              initialValue: 1,
            },
          ],
          preview: {
            select: {
              name: 'author.name',
              role: 'role',
              order: 'order',
            },
            prepare(selection) {
              const {name, role, order} = selection
              return {
                title: name || 'Unknown Author',
                subtitle: `${role} (${order})`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Article contributors in order of attribution',
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

  // DOCUMENT-LEVEL VALIDATION FOR IMAGE REQUIREMENTS
  validation: [
    (Rule) => Rule.custom((doc) => {
      if (!doc.leadImage && !doc.toutImage) {
        return 'Article must have either a Lead Image or Tout Image'
      }
      return true
    })
  ],

  preview: {
    select: {
      title: 'title',
      authors: 'authors',
      leadImage: 'leadImage.asset.image',
      toutImage: 'toutImage.asset.image',
      subtitle: 'subtitle',
      status: 'status',
    },
    prepare(selection) {
      const {authors, leadImage, toutImage, status} = selection
      // Use tout image if available, fallback to lead image
      const previewImage = toutImage || leadImage
      
      // Format author names
      let authorText = ''
      if (authors && authors.length > 0) {
        const authorNames = authors
          .sort((a, b) => (a.order || 1) - (b.order || 1))
          .map(a => a.author?.name)
          .filter(Boolean)
        
        if (authorNames.length === 1) {
          authorText = `by ${authorNames[0]}`
        } else if (authorNames.length === 2) {
          authorText = `by ${authorNames[0]} & ${authorNames[1]}`
        } else if (authorNames.length > 2) {
          authorText = `by ${authorNames[0]} & ${authorNames.length - 1} others`
        }
      }
      
      return {
        ...selection,
        subtitle: authorText || selection.subtitle,
        media: previewImage,
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