// File: schemaTypes/objects/imageReference.ts
export const imageReference = defineType({
  name: 'imageReference',
  title: 'Image Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Image Asset',
      type: 'reference',
      to: [{type: 'imageAsset'}],
      validation: (Rule) => Rule.required(),
    }),
    // CONTEXT-SPECIFIC METADATA (copyfitting)
    defineField({
      name: 'customCaption',
      title: 'Custom Caption',
      type: 'text',
      description: 'Override default caption for this specific use',
      rows: 2,
    }),
    defineField({
      name: 'customAlt',
      title: 'Custom Alt Text',
      type: 'string',
      description: 'Override default alt text if needed for context',
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
        {
          name: 'crop',
          title: 'Crop Style',
          type: 'string',
          options: {
            list: [
              {title: 'Default', value: 'default'},
              {title: 'Square', value: 'square'},
              {title: 'Wide (16:9)', value: 'wide'},
              {title: 'Portrait (3:4)', value: 'portrait'},
            ],
          },
          initialValue: 'default',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'asset.title',
      credit: 'asset.credit',
      media: 'asset.image',
      customCaption: 'customCaption',
    },
    prepare(selection) {
      const {title, credit, customCaption} = selection
      return {
        title: title || 'Untitled Image',
        subtitle: `${credit}${customCaption ? ' • Custom caption' : ''}`,
        media: selection.media,
      }
    },
  },
})