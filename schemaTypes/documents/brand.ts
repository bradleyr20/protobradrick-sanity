import {defineField, defineType, defineArrayMember} from 'sanity'

// Brand Document Type
export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name'
      }
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [defineArrayMember({
        type: 'string',
        options: {
          list: [
            {title: 'Drivers', value: 'drivers'},
            {title: 'Irons', value: 'irons'},
            {title: 'Putters', value: 'putters'},
            {title: 'Wedges', value: 'wedges'},
            {title: 'Fairway Woods', value: 'fairway-woods'},
            {title: 'Hybrids', value: 'hybrids'},
            {title: 'Complete Sets', value: 'complete-sets'}
          ]
        }
      })]
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo'
    }
  }
})