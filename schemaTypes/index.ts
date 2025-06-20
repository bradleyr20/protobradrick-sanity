// schemaTypes/index.ts
import {type SchemaTypeDefinition} from 'sanity'

// Documents
import article from './documents/article'
import author from './documents/author'
import imageAsset from './documents/imageAsset'
import player from './documents/player'
import tournament from './documents/tournament'
import tag from './documents/tag'

// Objects
import imageReference from './objects/imageReference'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Documents
    article,
    author,
    imageAsset,
    player,
    tournament,
    tag,
    
    // Objects
    imageReference,
  ],
}