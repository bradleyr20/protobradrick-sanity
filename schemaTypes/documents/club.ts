import {defineField, defineType, defineArrayMember} from 'sanity'

// Golf Club Document Type
export default defineType({
  name: 'club',
  title: 'Golf Club',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'legacy_id',
      title: 'Legacy ID',
      type: 'string',
      description: 'Legacy content identifier for migration tracking',
      hidden: true
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string'
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'e.g., "Triple Diamond", "Max", "LS", "Pro", "Tour", "SFT"'
    }),
    defineField({
      name: 'clubType',
      title: 'Club Type',
      type: 'string',
      options: {
        list: [
          {title: 'Driver', value: 'driver'},
          {title: 'Fairway Wood', value: 'fairway-wood'},
          {title: 'Hybrid', value: 'hybrid'},
          {title: 'Iron', value: 'iron'},
          {title: 'Wedge', value: 'wedge'},
          {title: 'Putter', value: 'putter'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'clubSubType',
      title: 'Club Sub-Type',
      type: 'string',
      options: {
        list: [
          // Putter subtypes
          {title: 'Blade Putter', value: 'blade-putter'},
          {title: 'Mallet Putter', value: 'mallet-putter'},
          {title: 'Mid-Mallet Putter', value: 'mid-mallet-putter'},
          // Iron subtypes
          {title: 'Game Improvement Iron', value: 'game-improvement-iron'},
          {title: 'Players Iron', value: 'players-iron'},
          {title: 'Players Distance Iron', value: 'players-distance-iron'},
          {title: 'Tour Iron', value: 'tour-iron'},
          // Driver subtypes
          {title: 'Max Forgiveness Driver', value: 'max-forgiveness-driver'},
          {title: 'Low Spin Driver', value: 'low-spin-driver'},
          {title: 'Draw Bias Driver', value: 'draw-bias-driver'},
          {title: 'Tour Driver', value: 'tour-driver'}
        ]
      },
      description: 'More specific categorization within the main club type'
    }),
    defineField({
      name: 'performanceRating',
      title: 'Performance Rating',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Rating Type',
          type: 'string',
          options: {
            list: [
              {title: 'MOI Rating', value: 'moi'},
              {title: 'Forgiveness Rating', value: 'forgiveness'},
              {title: 'Distance Rating', value: 'distance'},
              {title: 'Feel Rating', value: 'feel'},
              {title: 'Spin Rating', value: 'spin'}
            ]
          },
          initialValue: 'moi'
        }),
        defineField({
          name: 'value',
          title: 'Rating Value',
          type: 'string',
          options: {
            list: [
              {title: 'Extreme', value: 'EXTREME'},
              {title: 'High', value: 'HIGH'},
              {title: 'Above Average', value: 'ABOVE AVERAGE'},
              {title: 'Moderate', value: 'MODERATE'},
              {title: 'Low', value: 'LOW'}
            ]
          },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'link',
          title: 'Explanation Link',
          type: 'url'
        })
      ]
    }),
    defineField({
      name: 'awards',
      title: 'Awards & Recognition',
      type: 'array',
      of: [defineArrayMember({
        type: 'string',
        options: {
          list: [
            {title: 'Top 5 in Performance', value: 'Performance'},
            {title: 'Top 5 in Forgiveness', value: 'Forgiveness'},
            {title: 'Top 5 in Sound/Feel', value: 'Sound/Feel'},
            {title: 'Top 5 in Innovation', value: 'Innovation'},
            {title: 'Top 5 in Distance', value: 'Distance'},
            {title: 'Top 5 in Accuracy', value: 'Accuracy'},
            {title: 'Hot List Gold', value: 'Hot List Gold'},
            {title: 'Hot List Silver', value: 'Hot List Silver'}
          ]
        }
      })],
      description: 'Categories where this club ranks in the top 5 or award levels'
    }),
    defineField({
      name: 'targetHandicaps',
      title: 'Target Handicaps',
      type: 'array',
      of: [defineArrayMember({
        type: 'string',
        options: {
          list: [
            {title: 'Low Handicaps', value: 'low-handicaps'},
            {title: 'Middle Handicaps', value: 'middle-handicaps'},
            {title: 'High Handicaps', value: 'high-handicaps'}
          ]
        }
      })],
      validation: Rule => Rule.min(1).error('At least one target handicap must be selected')
    }),
    defineField({
      name: 'whyWeLikeIt',
      title: 'Why We Like It',
      type: 'array',
      of: [defineArrayMember({type: 'text'})],
      description: 'Bullet-pointed list of key features and benefits'
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        defineField({
          name: 'availableLofts',
          title: 'Available Lofts',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          description: 'Available loft angles (e.g., "8", "9", "10.5", "12")'
        }),
        defineField({
          name: 'adjustability',
          title: 'Adjustability',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Adjustability Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Fixed Hosel', value: 'fixed'},
                  {title: '8-way Adjustable Hosel', value: '8-way'},
                  {title: '12-way Adjustable Hosel', value: '12-way'},
                  {title: '16-way Adjustable Hosel', value: '16-way'},
                  {title: '33-way Adjustable Hosel', value: '33-way'},
                  {title: 'Plus/Minus 2 Degrees', value: 'plus-minus-2'}
                ]
              }
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text'
            })
          ]
        }),
        defineField({
          name: 'shaftOptions',
          title: 'Shaft Options',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          description: 'Available shaft types/materials'
        }),
        defineField({
          name: 'gripOptions',
          title: 'Grip Options',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          description: 'Available grip types'
        }),
        // Putter-specific fields
        defineField({
          name: 'headWeight',
          title: 'Head Weight (grams)',
          type: 'number',
          description: 'For putters - head weight in grams'
        }),
        defineField({
          name: 'lengthOptions',
          title: 'Length Options',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          description: 'Available lengths (e.g., "33-38 inches")'
        }),
        defineField({
          name: 'neckTypes',
          title: 'Neck Types',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          description: 'Available neck configurations for putters'
        }),
        // Wedge-specific fields
        defineField({
          name: 'soleGrinds',
          title: 'Sole Grinds',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          description: 'Available sole grind options'
        }),
        defineField({
          name: 'finishOptions',
          title: 'Finish Options',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          description: 'Available finish types (e.g., Tour Satin, Black Satin)'
        }),
        // General specifications
        defineField({
          name: 'setConfiguration',
          title: 'Set Configuration',
          type: 'string',
          description: 'For iron sets - which clubs are included'
        }),
        defineField({
          name: 'constructionMaterial',
          title: 'Construction Material',
          type: 'string',
          description: 'Primary material (e.g., "303 stainless steel", "carbon steel")'
        })
      ]
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'imageReference',
      description: 'Main product image'
    }),
    defineField({
      name: 'productImages',
      title: 'Product Images',
      type: 'object',
      fields: [
        defineField({
          name: 'toeView',
          title: 'Toe View',
          type: 'imageReference',
          description: 'Side view showing toe of club'
        }),
        defineField({
          name: 'addressView',
          title: 'Address View',
          type: 'imageReference',
          description: 'View from address position'
        }),
        defineField({
          name: 'additionalImages',
          title: 'Additional Images',
          type: 'array',
          of: [defineArrayMember({
            type: 'imageReference'
          })]
        })
      ]
    }),
    defineField({
      name: 'testerReviews',
      title: 'Tester Reviews',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({
            name: 'testerName',
            title: 'Tester Name',
            type: 'string'
          }),
          defineField({
            name: 'age',
            title: 'Age',
            type: 'number'
          }),
          defineField({
            name: 'handicap',
            title: 'Handicap',
            type: 'string',
            description: 'e.g., "5", "0", "+3"'
          }),
          defineField({
            name: 'yearsTestingExperience',
            title: 'Years Testing Experience',
            type: 'string',
            description: 'e.g., "2 years testing", "10+ years testing"'
          }),
          defineField({
            name: 'review',
            title: 'Review Text',
            type: 'text'
          })
        ]
      })]
    }),
    defineField({
      name: 'manufacturerContent',
      title: 'From the Manufacturer',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text'
        }),
        defineField({
          name: 'learnMoreUrl',
          title: 'Learn More URL',
          type: 'url'
        }),
        defineField({
          name: 'marketingImage',
          title: 'Marketing Image',
          type: 'imageReference'
        })
      ]
    }),
    defineField({
      name: 'buyNowUrl',
      title: 'Buy Now URL',
      type: 'url',
      description: 'Link to purchase the product'
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
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as featured if this club appears in top categories'
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for sorting/display (lower numbers appear first)'
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        defineField({
          name: 'amount',
          title: 'Price Amount',
          type: 'number',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              {title: 'USD', value: 'USD'},
              {title: 'EUR', value: 'EUR'},
              {title: 'GBP', value: 'GBP'}
            ]
          },
          initialValue: 'USD'
        }),
        defineField({
          name: 'priceRange',
          title: 'Price Range',
          type: 'string',
          description: 'For products with multiple price points (e.g., "$180/$230")'
        })
      ]
    }),
    defineField({
      name: 'hotListScore',
      title: 'Hot List Score',
      type: 'object',
      fields: [
        defineField({
          name: 'gdScore',
          title: 'GD Score',
          type: 'number'
        }),
        defineField({
          name: 'hotListScore',
          title: 'Hot List Score',
          type: 'number'
        }),
        defineField({
          name: 'award',
          title: 'Award Level',
          type: 'string',
          options: {
            list: [
              {title: 'Hot List Gold', value: 'gold'},
              {title: 'Hot List Silver', value: 'silver'}
            ]
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand.name',
      clubType: 'clubType',
      clubSubType: 'clubSubType',
      media: 'heroImage.asset.image',
      price: 'price.amount'
    },
    prepare({title, subtitle, clubType, clubSubType, media, price}) {
      const subTitle = [
        subtitle,
        clubSubType || clubType,
        price ? `$${price}` : null
      ].filter(Boolean).join(' • ')
      
      return {
        title,
        subtitle: subTitle,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Club Type',
      name: 'clubTypeAsc',
      by: [
        {field: 'clubType', direction: 'asc'},
        {field: 'clubSubType', direction: 'asc'}
      ]
    },
    {
      title: 'Price Low to High',
      name: 'priceAsc',
      by: [
        {field: 'price.amount', direction: 'asc'}
      ]
    }
  ]
})