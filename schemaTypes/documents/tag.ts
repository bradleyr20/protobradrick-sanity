// File: schemaTypes/documents/tag.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Brief description of this tag',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color for tag display (optional)',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i, {
        name: 'hex color',
        invert: false,
      }).optional(),
    }),
    defineField({
      name: 'category',
      title: 'Tag Category',
      type: 'string',
      options: {
        list: [
          {title: 'Topic', value: 'topic'},
          {title: 'Player Type', value: 'player-type'},
          {title: 'Equipment', value: 'equipment'},
          {title: 'Tournament Type', value: 'tournament-type'},
          {title: 'Skill Level', value: 'skill-level'},
          {title: 'General', value: 'general'},
        ] as const,
      },
      initialValue: 'general',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title,
        subtitle: subtitle ? `Category: ${subtitle}` : undefined,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Category',
      name: 'category',
      by: [{field: 'category', direction: 'asc'}, {field: 'name', direction: 'asc'}],
    },
  ],
})

// ============================================