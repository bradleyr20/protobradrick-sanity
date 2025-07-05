import {defineField, defineType, defineArrayMember} from 'sanity'

// Buying Guide Document Type
export default defineType({
  name: 'buyingGuide',
  title: 'Buying Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'Hot List'
    }),
    defineField({
      name: 'clubType',
      title: 'Club Type',
      type: 'string',
      options: {
        list: [
          {title: 'Drivers', value: 'drivers'},
          {title: 'Irons', value: 'irons'},
          {title: 'Putters', value: 'putters'},
          {title: 'Wedges', value: 'wedges'},
          {title: 'Fairway Woods', value: 'fairway-woods'},
          {title: 'Hybrids', value: 'hybrids'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          {title: 'Buying Guide', value: 'buying-guide'},
          {title: 'Review', value: 'review'},
          {title: 'Comparison', value: 'comparison'},
          {title: 'Hot List', value: 'hot-list'}
        ]
      },
      initialValue: 'buying-guide'
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'array',
      of: [defineArrayMember({type: 'block'})]
    }),
    defineField({
      name: 'evaluationCriteria',
      title: 'Evaluation Criteria',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      initialValue: ['Look/Sound/Feel', 'Innovation', 'Performance']
    }),
    defineField({
      name: 'clubs',
      title: 'Golf Clubs',
      type: 'array',
      of: [defineArrayMember({
        type: 'reference',
        to: [{type: 'club'}]
      })]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.min(2020).max(2030),
      initialValue: () => new Date().getFullYear()
    })
  ],
  preview: {
    select: {
      title: 'title',
      clubType: 'clubType',
      year: 'year'
    },
    prepare({title, clubType, year}) {
      return {
        title,
        subtitle: `${clubType} • ${year}`
      }
    }
  }
})