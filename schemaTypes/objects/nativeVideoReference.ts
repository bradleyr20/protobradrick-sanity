// schemaTypes/objects/nativeVideoReference.ts
// This file defines a Sanity schema for an object that references an external video.
// It includes fields for the video reference and display mode, with validation and preview settings.

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'nativeVideoReference',
  title: 'Native Video',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Video Asset',
      type: 'reference',
      to: [{type: 'nativeVideoAsset'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customCaption',
      title: 'Custom Caption',
      type: 'text',
      description: 'Override default caption for this specific use',
      rows: 2,
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Autoplay when visible (will be muted)',
      initialValue: false,
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'controls',
      title: 'Show Controls',
      type: 'boolean',
      initialValue: true,
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
      ],
    }),
  ],
  preview: {
    select: {
      title: 'asset.title',
      duration: 'asset.duration',
      media: 'asset.thumbnail',
    },
    prepare(selection) {
      const {title, duration} = selection
      const formattedDuration = duration 
        ? `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`
        : null
      return {
        title: `🎬 ${title || 'Native Video'}`,
        subtitle: formattedDuration,
        media: selection.media,
      }
    },
  },
})