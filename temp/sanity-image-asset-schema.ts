// File: schemas/documents/imageAsset.ts
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

// ============================================

// File: schemas/objects/imageReference.ts
import {defineType, defineField} from 'sanity'

export default defineType({
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
    defineField({
      name: 'caption',
      title: 'Caption Override',
      type: 'text',
      description: 'Override the default caption for this usage',
      rows: 2,
    }),
    defineField({
      name: 'useDefaultCaption',
      title: 'Use Default Caption',
      type: 'boolean',
      description: 'Use the default caption from the image asset',
      initialValue: true,
    }),
    defineField({
      name: 'rendition',
      title: 'Preferred Rendition',
      type: 'string',
      description: 'Which pre-cropped version to use',
      options: {
        list: [
          {title: 'Original', value: 'original'},
          {title: 'Thumbnail', value: 'thumbnail'},
          {title: 'Hero', value: 'hero'},
          {title: 'Vertical', value: 'vertical'},
          {title: 'Social', value: 'social'},
        ],
      },
      initialValue: 'original',
    }),
    defineField({
      name: 'cropOverride',
      title: 'Custom Crop',
      type: 'object',
      description: 'Override crop for this specific usage',
      fields: [
        {
          name: 'top',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(1),
        },
        {
          name: 'bottom',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(1),
        },
        {
          name: 'left',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(1),
        },
        {
          name: 'right',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(1),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'asset.title',
      media: 'asset.image',
      caption: 'caption',
      defaultCaption: 'asset.defaultCaption',
      useDefault: 'useDefaultCaption',
    },
    prepare(selection) {
      const {title, caption, defaultCaption, useDefault} = selection
      const displayCaption = useDefault ? defaultCaption : caption
      return {
        ...selection,
        title: title || 'Untitled Image',
        subtitle: displayCaption || 'No caption',
      }
    },
  },
})

// ============================================

// Updated article.ts schema to use imageReference
// Replace the existing featuredImage field with:
defineField({
  name: 'featuredImage',
  title: 'Featured Image',
  type: 'imageReference',
  validation: (Rule) => Rule.required(),
}),

// And in the body array, replace the image type with:
{
  type: 'imageReference',
},

// For backward compatibility during migration, you might want to keep both old and new fields temporarily:
defineField({
  name: 'featuredImageNew',
  title: 'Featured Image (New)',
  type: 'imageReference',
  description: 'New image reference system',
}),
defineField({
  name: 'featuredImageLegacy',
  title: 'Featured Image (Legacy)',
  type: 'image',
  description: 'DEPRECATED - Use featuredImageNew instead',
  hidden: true, // Hide from editors but keep for migration
}),