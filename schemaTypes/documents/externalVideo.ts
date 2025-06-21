// schemaTypes/documents/externalVideo.ts
// Claude

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'externalVideo',
  title: 'External Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'platform',
      title: 'Video Platform',
      type: 'string',
      description: 'The platform hosting this video',
      options: {
        list: [
          {title: 'Brightcove', value: 'brightcove'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'Wistia', value: 'wistia'},
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'brightcove',
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description: 'The video ID from the external platform',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'playerId',
      title: 'Player ID',
      type: 'string',
      description: 'Optional: Platform-specific player ID (if applicable)',
      initialValue: 'default',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom Thumbnail',
      type: 'image',
      description: 'Optional: Override platform thumbnail',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Video duration (e.g., "5:32")',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Video Category',
      type: 'string',
      options: {
        list: [
          {title: 'Tournament Highlights', value: 'tournament-highlights'},
          {title: 'Player Interview', value: 'player-interview'},
          {title: 'Instruction', value: 'instruction'},
          {title: 'Equipment Review', value: 'equipment-review'},
          {title: 'Course Flyover', value: 'course-flyover'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
    }),
    defineField({
      name: 'relatedPlayers',
      title: 'Featured Players',
      type: 'array',
      of: [{type: 'reference', to: {type: 'player'}}],
    }),
    defineField({
      name: 'relatedTournament',
      title: 'Related Tournament',
      type: 'reference',
      to: [{type: 'tournament'}],
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'text',
      description: 'For accessibility and SEO',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
      },
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnail',
      platform: 'platform',
      videoId: 'videoId',
    },
    prepare(selection) {
      const {title, subtitle, platform, videoId} = selection
      return {
        title,
        subtitle: `${subtitle || 'Video'} • ${platform}: ${videoId}`,
        media: selection.media,
      }
    },
  },
})