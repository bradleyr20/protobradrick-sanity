// File: schemaTypes/documents/tournament.ts
import {defineType, defineField} from 'sanity'

const TOUR_TYPES = [
  {title: 'LPGA Tour', value: 'lpga'},
  {title: 'PGA Tour', value: 'pga'},
  {title: 'Major Championship', value: 'major'},
  {title: 'DP World Tour', value: 'dpworld'},
  {title: 'LIV Golf', value: 'liv'},
] as const

export default defineType({
  name: 'tournament',
  title: 'Tournament',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tour',
      title: 'Tour',
      type: 'string',
      options: {
        list: TOUR_TYPES,
      },
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      description: 'Golf course or facility name',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City, State/Country (e.g., FRISCO, Texas)',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 5),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'purse',
      title: 'Prize Money',
      type: 'number',
      description: 'Total prize money in USD',
    }),
    defineField({
      name: 'winner',
      title: 'Winner',
      type: 'reference',
      to: [{type: 'player'}],
      description: 'Tournament winner (if completed)',
    }),
    defineField({
      name: 'isMajor',
      title: 'Major Championship',
      type: 'boolean',
      description: 'Is this a major championship?',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'year',
      location: 'location',
    },
    prepare(selection) {
      const {title, subtitle, location} = selection
      return {
        title,
        subtitle: `${subtitle}${location ? ` • ${location}` : ''}`,
      }
    },
  },
})

// ============================================