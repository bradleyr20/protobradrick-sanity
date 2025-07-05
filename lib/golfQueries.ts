// lib/golfQueries.ts
// GROQ queries for golf equipment content

// Query for buying guide with all clubs resolved
export const buyingGuideQuery = `
  *[_type == "buyingGuide" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    clubType,
    contentType,
    introduction,
    evaluationCriteria,
    publishedAt,
    year,
    
    clubs[]-> {
      _id,
      name,
      slug,
      clubType,
      clubSubType,
      variant,
      
      brand-> {
        _id,
        name,
        slug,
        logo
      },
      
      performanceRating,
      awards,
      targetHandicaps,
      whyWeLikeIt,
      
      specifications {
        availableLofts,
        adjustability,
        headWeight,
        lengthOptions,
        soleGrinds,
        finishOptions
      },
      
      heroImage {
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
      
      productImages {
        toeView {
          asset-> {
            image {
              asset-> { _id, url }
            }
          }
        },
        addressView {
          asset-> {
            image {
              asset-> { _id, url }
            }
          }
        }
      },
      
      price,
      hotListScore,
      buyNowUrl,
      featured,
      order
    }
  }
`

// Query for individual club page
export const clubQuery = `
  *[_type == "club" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    clubType,
    clubSubType,
    variant,
    
    brand-> {
      _id,
      name,
      slug,
      logo,
      website,
      description,
      specialties
    },
    
    performanceRating,
    awards,
    targetHandicaps,
    whyWeLikeIt,
    
    specifications,
    
    heroImage {
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
    
    productImages {
      toeView {
        customCaption,
        customAlt,
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
      addressView {
        customCaption,
        customAlt,
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
      additionalImages[] {
        customCaption,
        customAlt,
        asset-> {
          _id,
          title,
          credit,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    },
    
    testerReviews,
    
    manufacturerContent {
      description,
      learnMoreUrl,
      marketingImage {
        asset-> {
          image {
            asset-> { _id, url }
          }
        }
      }
    },
    
    price,
    hotListScore,
    buyNowUrl
  }
`

// Query for club listings (e.g., all drivers)
export const clubListingsQuery = `
  *[_type == "club" && clubType == $clubType] | order(order asc, name asc) {
    _id,
    name,
    slug,
    clubType,
    clubSubType,
    variant,
    
    brand-> {
      name,
      slug
    },
    
    performanceRating,
    awards,
    targetHandicaps,
    
    heroImage {
      asset-> {
        _id,
        title,
        credit,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    },
    
    price,
    hotListScore,
    featured,
    order
  }
`

// Query for buying guide listings
export const buyingGuideListingsQuery = `
  *[_type == "buyingGuide"] | order(year desc, publishedAt desc) {
    _id,
    title,
    slug,
    category,
    clubType,
    contentType,
    publishedAt,
    year,
    
    "clubCount": count(clubs)
  }
`

// Query for brand page
export const brandQuery = `
  *[_type == "brand" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    logo,
    website,
    description,
    specialties,
    
    "clubs": *[_type == "club" && references(^._id)] | order(order asc, name asc) {
      _id,
      name,
      slug,
      clubType,
      clubSubType,
      
      heroImage {
        asset-> {
          image {
            asset-> { _id, url }
          }
        }
      },
      
      price,
      awards
    }
  }
`

// Query for featured clubs
export const featuredClubsQuery = `
  *[_type == "club" && featured == true] | order(order asc, name asc) [0...$limit] {
    _id,
    name,
    slug,
    clubType,
    
    brand-> {
      name,
      slug
    },
    
    heroImage {
      asset-> {
        image {
          asset-> { _id, url }
        }
      }
    },
    
    price,
    awards
  }
`

// Query for Hot List Gold winners
export const hotListGoldQuery = `
  *[_type == "club" && hotListScore.award == "gold"] | order(hotListScore.hotListScore desc) {
    _id,
    name,
    slug,
    clubType,
    
    brand-> {
      name,
      slug
    },
    
    heroImage {
      asset-> {
        image {
          asset-> { _id, url }
        }
      }
    },
    
    hotListScore,
    price
  }
`