// File: schemas/documents/imageAsset_v2.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imageAsset',
  title: 'Image Asset',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for asset management',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Descriptive text for accessibility and SEO',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'credit',
      title: 'Photo Credit',
      type: 'string',
      description: 'Photographer or source attribution',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'creditUrl',
      title: 'Credit URL',
      type: 'url',
      description: 'Link to photographer or source website',
    }),
    defineField({
      name: 'defaultCaption',
      title: 'Default Caption',
      type: 'text',
      description: 'Default caption that can be overridden when used',
      rows: 2,
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Information',
      type: 'string',
      description: 'Copyright holder and year',
    }),
    defineField({
      name: 'license',
      title: 'License Type',
      type: 'string',
      options: {
        list: [
          {title: 'Rights Managed', value: 'rights-managed'},
          {title: 'Royalty Free', value: 'royalty-free'},
          {title: 'Creative Commons', value: 'creative-commons'},
          {title: 'Editorial Use Only', value: 'editorial-only'},
          {title: 'Owned', value: 'owned'},
        ],
      },
    }),
    defineField({
      name: 'usageRights',
      title: 'Usage Rights',
      type: 'text',
      description: 'Specific usage restrictions or permissions',
      rows: 3,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Tags for asset organization and search',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Tournament', value: 'tournament'},
          {title: 'Player Portrait', value: 'player-portrait'},
          {title: 'Course', value: 'course'},
          {title: 'Equipment', value: 'equipment'},
          {title: 'Action Shot', value: 'action'},
          {title: 'Lifestyle', value: 'lifestyle'},
          {title: 'Historical', value: 'historical'},
        ],
      },
    }),
    defineField({
      name: 'dateTaken',
      title: 'Date Taken',
      type: 'date',
      description: 'When the photo was taken',
    }),
    defineField({
      name: 'expirationDate',
      title: 'License Expiration Date',
      type: 'date',
      description: 'When usage rights expire (if applicable)',
    }),
    defineField({
      name: 'renditions',
      title: 'Renditions',
      type: 'object',
      description: 'Pre-defined crops and sizes for different contexts',
      fields: [
        {
          name: 'thumbnail',
          title: 'Thumbnail (1:1)',
          type: 'image',
          description: 'Square crop for thumbnails',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'hero',
          title: 'Hero (16:9)',
          type: 'image',
          description: 'Wide crop for hero images',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'vertical',
          title: 'Vertical (9:16)',
          type: 'image',
          description: 'Vertical crop for mobile or social',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'social',
          title: 'Social (1200x630)',
          type: 'image',
          description: 'Open Graph social sharing size',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
      credit: 'credit',
      category: 'category',
    },
    prepare(selection) {
      const {title, credit, category} = selection
      return {
        ...selection,
        subtitle: `${category ? category + ' • ' : ''}${credit || 'No credit'}`,
      }
    },
  },
})