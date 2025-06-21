// schemaTypes/documents/nativeVideoAsset.ts

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'nativeVideoAsset',
  title: 'Native Video Asset',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'Internal title for DAM organization',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Video Thumbnail',
      type: 'image',
      description: 'Poster frame for video player',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'credit',
      title: 'Video Credit',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultCaption',
      title: 'Default Caption',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Search keywords for finding videos in DAM',
    }),
    defineField({
      name: 'category',
      title: 'Video Category',
      type: 'string',
      options: {
        list: [
          {title: 'B-Roll', value: 'b-roll'},
          {title: 'Slow Motion', value: 'slow-motion'},
          {title: 'Drone Footage', value: 'drone'},
          {title: 'Animation/Graphics', value: 'animation'},
          {title: 'Short Clip', value: 'short-clip'},
        ],
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          {title: '16:9', value: '16:9'},
          {title: '9:16 (Vertical)', value: '9:16'},
          {title: '1:1 (Square)', value: '1:1'},
          {title: '4:3', value: '4:3'},
        ],
      },
      initialValue: '16:9',
    }),
    // Rights management similar to imageAsset
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
              {title: 'Owned', value: 'owned'},
              {title: 'Licensed', value: 'licensed'},
              {title: 'Fair Use', value: 'fair-use'},
            ],
          },
        },
        {
          name: 'restrictions',
          title: 'Usage Restrictions',
          type: 'text',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      credit: 'credit',
      duration: 'duration',
      media: 'thumbnail',
    },
    prepare(selection) {
      const {title, credit, duration} = selection
      const formattedDuration = duration 
        ? `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`
        : null
      return {
        title,
        subtitle: `${credit}${formattedDuration ? ` • ${formattedDuration}` : ''}`,
        media: selection.media,
      }
    },
  },
})