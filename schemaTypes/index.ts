// File: schemaTypes/index.ts
import {type SchemaTypeDefinition} from 'sanity'

import article from './documents/article'
import author from './documents/author'
import player from './documents/player'
import tournament from './documents/tournament'
import tag from './documents/tag'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Documents
    article,
    author,
    player,
    tournament,
    tag,
  ],
}

// ============================================