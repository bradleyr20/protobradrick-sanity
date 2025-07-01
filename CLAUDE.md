# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Sanity CMS v3 project called "Golf Content Hub" - a headless CMS designed specifically for golf content management. The project uses React 19, TypeScript, and focuses on digital asset management for golf media.

**Project Details:**
- Project ID: `l1vjep0h`
- Dataset: `production`
- Framework: Sanity CMS v3.93.0 with React 19

## Common Commands

```bash
# Development
npm run dev              # Start Sanity Studio in development mode
npm start               # Start Sanity Studio (production mode)

# Build & Deploy
npm run build           # Build the Sanity Studio
npm run deploy          # Deploy the Studio to Sanity hosting
npm run deploy-graphql  # Deploy GraphQL API

# Code Quality
npx eslint .           # Run ESLint (uses @sanity/eslint-config-studio)
npx prettier --write . # Format code with Prettier
npx tsc --noEmit      # Type check without compilation
```

## Architecture Overview

### Content Model Structure

The schema follows a golf-specific content hierarchy with clear separation of concerns:

**Core Documents:**
- `article` - Central content type with multi-author support, publishing workflow, and three-tier image system (lead, tout, social)
- `player` - Golf players with tour affiliations (PGA, LPGA, LIV, DP World)
- `tournament` - Tournament data with major championship flags
- `author` - Content creators with role-based attribution
- `tag` - Categorized taxonomy system

**Media Assets:**
- `imageAsset` - Full DAM with rights management, categorization, and metadata
- `nativeVideoAsset` - Self-hosted videos with aspect ratio management  
- `externalVideo` - External video platform integration (Brightcove, YouTube, Vimeo, Wistia)

**Reference Objects:**
- `imageReference` - Links to imageAsset with context-specific metadata
- `externalVideoReference` - Links to externalVideo with display controls
- `nativeVideoReference` - Links to nativeVideoAsset with playback options

### Key Architectural Patterns

**Three-Tier Image System:**
- `leadImage` - Primary content image
- `toutImage` - Listing/thumbnail image  
- `socialImage` - Social media sharing image

**Reference Pattern:**
Media assets are separate documents referenced via objects that allow context-specific metadata overrides (captions, alt text, display options).

**Publishing Workflow:**
Articles follow a draft → review → published → archived workflow with featured content promotion.

**Rights Management:**
Built-in usage rights tracking, expiration dates, and credit requirements for enterprise-level asset management.

## Directory Structure

```
schemaTypes/
├── documents/          # Main content types
│   ├── article.ts     # Articles with rich content and workflow
│   ├── player.ts      # Golf players and profiles
│   ├── tournament.ts  # Tournament data and schedules
│   └── ...
├── objects/           # Reference and embedded types
│   ├── imageReference.ts    # Image references with metadata
│   ├── externalVideoReference.ts
│   └── nativeVideoReference.ts
└── index.ts          # Schema export and type definitions

lib/                  # Frontend integration utilities
├── sanity.ts        # Sanity client configuration
├── queries.ts       # GROQ queries for frontend consumption
├── image.ts         # Image processing and responsive helpers
├── video.ts         # Video platform abstraction
└── types.ts         # TypeScript type definitions
```

## Development Guidelines

### Schema Development
- All schema types use TypeScript with strict typing
- Follow golf domain naming conventions (tour, major championship, etc.)
- Media references should use the reference pattern for context-specific metadata
- Maintain separation between content documents and media assets

### Query Development  
- GROQ queries in `lib/queries.ts` should include deep reference resolution
- Use responsive image URL generation via `lib/image.ts` helpers
- Implement fallback logic for missing references or media

### Media Handling
- Images are managed through the `imageAsset` document type with full metadata
- Videos support both native uploads and external platform embedding
- All media requires credit attribution and usage rights tracking
- Use aspect ratio categorization for video content (16:9, 9:16, 1:1)

### Studio Customization
- Custom structure in `sanity.config.ts` provides filtered views by status, category, and tour
- Golf-specific iconography uses react-icons (fa6, gi, pi, md)
- Media library organization includes rights management views

## Configuration Notes

- Auto-updates enabled in CLI configuration
- Media plugin configured with 10MB upload limit and credit line enforcement
- TypeScript strict mode with `noUncheckedIndexedAccess` enabled
- Prettier configured with custom settings (no semicolons, single quotes, 100 char width)

## Type Generation

The project uses Sanity's TypeGen for auto-generated TypeScript types. Schema changes automatically update type definitions in `sanity.types.ts`.

## Golf Domain Context

When working with content, understand these golf-specific concepts:
- **Tours:** LPGA, PGA, LIV Golf, DP World Tour
- **Major Championships:** Special tournaments with `isMajor` flag
- **Equipment Categories:** Clubs, balls, bags, apparel
- **Tournament Action:** Action shots, ceremony photos, course photography
- **Player Rankings:** World ranking integration and tour standings