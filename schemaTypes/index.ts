// schemaTypes/index.ts
import {type SchemaTypeDefinition} from 'sanity'

// Documents
import article from './documents/article'
import author from './documents/author'
import imageAsset from './documents/imageAsset'
import player from './documents/player'
import tournament from './documents/tournament'
import tag from './documents/tag'
import externalVideo from './documents/externalVideo'
import nativeVideoAsset from './documents/nativeVideoAsset'

// NEW: Golf equipment schemas
import club from './documents/club'
import brand from './documents/brand'
import buyingGuide from './documents/buyingGuide'

// Objects
import imageReference from './objects/imageReference'
import externalVideoReference from './objects/externalVideoReference'
import nativeVideoReference from './objects/nativeVideoReference'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Documents
    article,
    author,
    imageAsset,
    player,
    tournament,
    tag,
    externalVideo,
    nativeVideoAsset,
    
    // NEW: Golf equipment documents
    club,
    brand,
    buyingGuide,
    
    // Objects
    imageReference,
    externalVideoReference,
    nativeVideoReference,
  ],
}