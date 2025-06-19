// File: sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Golf Content Hub',

  projectId: 'l1vjep0h',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema,
})

// ============================================

// Generate types for your frontend:
// Run: npx sanity@latest typegen generate
// This creates: sanity.types.ts

// Example usage in your frontend:
// import type {Article, Player} from './sanity.types'