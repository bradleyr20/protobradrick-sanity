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