// schemaTypes/objects/externalVideoReference.ts

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'externalVideoReference',
  title: 'External Video',
  type: 'object',
  fields: [
    defineField({
      name: 'video',
      title: 'External Video',
      type: 'reference',
      to: [{type: 'externalVideo'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayMode',
      title: 'Display Mode',
      type: 'string',
      options: {
        list: [
          {title: 'Inline', value: 'inline'},
          {title: 'Modal/Lightbox', value: 'modal'},
        ],
      },
      initialValue: 'inline',
    }),
  ],
  preview: {
    select: {
      title: 'video.title',
      subtitle: 'video.duration',
      media: 'video.thumbnail',
      platform: 'video.platform',
    },
    prepare(selection) {
      const platformIcon = {
        brightcove: '📹',
        youtube: '▶️',
        vimeo: '🎬',
        wistia: '🎥',
      }
      const icon = platformIcon[selection.platform] || '📹'
      return {
        title: `${icon} ${selection.title || 'External Video'}`,
        subtitle: selection.subtitle,
        media: selection.media,
      }
    },
  },
})