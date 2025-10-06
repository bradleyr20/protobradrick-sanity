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
      name: 'legacy_id',
      title: 'Legacy ID',
      type: 'string',
      description: 'Legacy asset identifier for migration tracking',
      hidden: true,
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