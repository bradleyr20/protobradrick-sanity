// ============================================
// File: lib/queries.ts
// GROQ queries for your frontend
// ============================================

// Query for article with all image references resolved
export const articleQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    category,
    location,
    publishedAt,
    excerpt,
    featured,
    status,
    
    // Author
    author-> {
      _id,
      name,
      slug,
      bio,
      image
    },
    
    // Images with full resolution
    leadImage {
      customCaption,
      customAlt,
      displayOptions,
      asset-> {
        _id,
        title,
        credit,
        defaultCaption,
        defaultAlt,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          }
        }
      }
    },
    
    toutImage {
      customCaption,
      customAlt,
      displayOptions,
      asset-> {
        _id,
        title,
        credit,
        defaultCaption,
        defaultAlt,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          }
        }
      }
    },
    
    socialImage {
      customCaption,
      customAlt,
      displayOptions,
      asset-> {
        _id,
        title,
        credit,
        defaultCaption,
        defaultAlt,
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          }
        }
      }
    },
    
    // Body content with resolved images
    body[] {
      _type == "imageReference" => {
        _type,
        _key,
        customCaption,
        customAlt,
        displayOptions,
        asset-> {
          _id,
          title,
          credit,
          defaultCaption,
          defaultAlt,
          image {
            asset-> {
              _id,
              url,
              metadata {
                dimensions
              }
            }
          }
        }
      },
      _type == "block" => @,
      _type == "quote" => @
    },
    
    // Related content
    tags[]-> {
      _id,
      name,
      slug
    },
    
    relatedPlayers[]-> {
      _id,
      name,
      slug,
      tour,
      country
    },
    
    relatedTournaments[]-> {
      _id,
      name,
      slug,
      year,
      location
    },
    
    // SEO
    seo {
      metaTitle,
      metaDescription
    }
  }
`

// Query for article listing
export const articlesQuery = `
  *[_type == "article" && status == "published"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    subtitle,
    slug,
    category,
    publishedAt,
    excerpt,
    featured,
    
    author-> {
      name,
      slug
    },
    
    // Use tout image for listings, fallback to lead image
    "thumbnail": coalesce(
      toutImage {
        customCaption,
        customAlt,
        asset-> {
          _id,
          title,
          credit,
          defaultCaption,
          defaultAlt,
          image
        }
      },
      leadImage {
        customCaption,
        customAlt,
        asset-> {
          _id,
          title,
          credit,
          defaultCaption,
          defaultAlt,
          image
        }
      }
    ),
    
    tags[]-> {
      name,
      slug
    }
  }
`

// Query for featured articles
export const featuredArticlesQuery = `
  *[_type == "article" && status == "published" && featured == true] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    subtitle,
    slug,
    category,
    publishedAt,
    excerpt,
    
    author-> {
      name,
      slug
    },
    
    leadImage {
      customCaption,
      customAlt,
      asset-> {
        _id,
        title,
        credit,
        defaultCaption,
        defaultAlt,
        image
      }
    }
  }