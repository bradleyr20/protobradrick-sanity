// File: sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schema} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Golf Content Hub',

  projectId: 'l1vjep0h',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ARTICLES SECTION
            S.listItem()
              .title('📰 Articles')
              .child(
                S.list()
                  .title('Articles')
                  .items([
                    S.listItem()
                      .title('All Articles')
                      .child(
                        S.documentTypeList('article')
                          .title('All Articles')
                          .filter('_type == "article"')
                      ),
                    S.listItem()
                      .title('Published Articles')
                      .child(
                        S.documentTypeList('article')
                          .title('Published Articles')
                          .filter('_type == "article" && status == "published"')
                      ),
                    S.listItem()
                      .title('Draft Articles')
                      .child(
                        S.documentTypeList('article')
                          .title('Draft Articles')
                          .filter('_type == "article" && status == "draft"')
                      ),
                    S.listItem()
                      .title('Featured Articles')
                      .child(
                        S.documentTypeList('article')
                          .title('Featured Articles')
                          .filter('_type == "article" && featured == true')
                      ),
                    S.listItem()
                      .title('By Category')
                      .child(
                        S.list()
                          .title('Articles by Category')
                          .items([
                            S.listItem()
                              .title('LPGA Tour')
                              .child(
                                S.documentTypeList('article')
                                  .title('LPGA Tour Articles')
                                  .filter('_type == "article" && category == "lpga-tour"')
                              ),
                            S.listItem()
                              .title('PGA Tour')
                              .child(
                                S.documentTypeList('article')
                                  .title('PGA Tour Articles')
                                  .filter('_type == "article" && category == "pga-tour"')
                              ),
                            S.listItem()
                              .title('Major Championships')
                              .child(
                                S.documentTypeList('article')
                                  .title('Major Championships')
                                  .filter('_type == "article" && category == "majors"')
                              ),
                            S.listItem()
                              .title('Equipment')
                              .child(
                                S.documentTypeList('article')
                                  .title('Equipment Articles')
                                  .filter('_type == "article" && category == "equipment"')
                              ),
                            S.listItem()
                              .title('Instruction')
                              .child(
                                S.documentTypeList('article')
                                  .title('Instruction Articles')
                                  .filter('_type == "article" && category == "instruction"')
                              ),
                            S.listItem()
                              .title('News')
                              .child(
                                S.documentTypeList('article')
                                  .title('News Articles')
                                  .filter('_type == "article" && category == "news"')
                              ),
                            S.listItem()
                              .title('Courses')
                              .child(
                                S.documentTypeList('article')
                                  .title('Course Articles')
                                  .filter('_type == "article" && category == "courses"')
                              ),
                          ])
                      ),
                  ])
              ),

            S.divider(),

            // MEDIA LIBRARY SECTION
            S.listItem()
              .title('📸 Media Library')
              .child(
                S.list()
                  .title('Media Library')
                  .items([
                    // Enhanced Media Browser (from plugin)
                    S.listItem()
                      .title('Media Browser')
                      .child(
                        S.component()
                          .component(() => import('sanity-plugin-media').then(mod => mod.MediaEditor))
                          .title('Media Browser')
                      ),
                    
                    S.divider(),
                    
                    // Detailed Image Asset Management
                    S.listItem()
                      .title('Image Assets (Detailed)')
                      .child(
                        S.list()
                          .title('Image Assets')
                          .items([
                            S.listItem()
                              .title('All Image Assets')
                              .child(
                                S.documentTypeList('imageAsset')
                                  .title('All Image Assets')
                                  .filter('_type == "imageAsset"')
                              ),
                            S.listItem()
                              .title('By Category')
                              .child(
                                S.list()
                                  .title('Images by Category')
                                  .items([
                                    S.listItem()
                                      .title('Tournament Action')
                                      .child(
                                        S.documentTypeList('imageAsset')
                                          .title('Tournament Action')
                                          .filter('_type == "imageAsset" && category == "tournament-action"')
                                      ),
                                    S.listItem()
                                      .title('Player Portraits')
                                      .child(
                                        S.documentTypeList('imageAsset')
                                          .title('Player Portraits')
                                          .filter('_type == "imageAsset" && category == "player-portrait"')
                                      ),
                                    S.listItem()
                                      .title('Course/Venue')
                                      .child(
                                        S.documentTypeList('imageAsset')
                                          .title('Course/Venue')
                                          .filter('_type == "imageAsset" && category == "course-venue"')
                                      ),
                                    S.listItem()
                                      .title('Equipment')
                                      .child(
                                        S.documentTypeList('imageAsset')
                                          .title('Equipment')
                                          .filter('_type == "imageAsset" && category == "equipment"')
                                      ),
                                    S.listItem()
                                      .title('Awards/Celebration')
                                      .child(
                                        S.documentTypeList('imageAsset')
                                          .title('Awards/Celebration')
                                          .filter('_type == "imageAsset" && category == "awards"')
                                      ),
                                    S.listItem()
                                      .title('Lifestyle')
                                      .child(
                                        S.documentTypeList('imageAsset')
                                          .title('Lifestyle')
                                          .filter('_type == "imageAsset" && category == "lifestyle"')
                                      ),
                                    S.listItem()
                                      .title('Stock/Generic')
                                      .child(
                                        S.documentTypeList('imageAsset')
                                          .title('Stock/Generic')
                                          .filter('_type == "imageAsset" && category == "stock"')
                                      ),
                                  ])
                              ),
                            S.listItem()
                              .title('Recent Uploads')
                              .child(
                                S.documentTypeList('imageAsset')
                                  .title('Recent Uploads')
                                  .filter('_type == "imageAsset"')
                                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
                              ),
                            S.listItem()
                              .title('Rights Managed')
                              .child(
                                S.documentTypeList('imageAsset')
                                  .title('Rights Managed Images')
                                  .filter('_type == "imageAsset" && rightsManaged == true')
                              ),
                            S.listItem()
                              .title('Needs Credit')
                              .child(
                                S.documentTypeList('imageAsset')
                                  .title('Images Missing Credit')
                                  .filter('_type == "imageAsset" && !defined(credit)')
                              ),
                          ])
                      ),
                  ])
              ),

            S.divider(),

            // PEOPLE & ENTITIES SECTION
            S.listItem()
              .title('👥 People & Entities')
              .child(
                S.list()
                  .title('People & Entities')
                  .items([
                    S.listItem()
                      .title('Authors')
                      .child(
                        S.documentTypeList('author')
                          .title('Authors')
                          .filter('_type == "author"')
                      ),
                    S.listItem()
                      .title('Players')
                      .child(
                        S.list()
                          .title('Players')
                          .items([
                            S.listItem()
                              .title('All Players')
                              .child(
                                S.documentTypeList('player')
                                  .title('All Players')
                                  .filter('_type == "player"')
                              ),
                            S.listItem()
                              .title('LPGA Players')
                              .child(
                                S.documentTypeList('player')
                                  .title('LPGA Players')
                                  .filter('_type == "player" && tour == "lpga"')
                              ),
                            S.listItem()
                              .title('PGA Players')
                              .child(
                                S.documentTypeList('player')
                                  .title('PGA Players')
                                  .filter('_type == "player" && tour == "pga"')
                              ),
                          ])
                      ),
                    S.listItem()
                      .title('Tournaments')
                      .child(
                        S.list()
                          .title('Tournaments')
                          .items([
                            S.listItem()
                              .title('All Tournaments')
                              .child(
                                S.documentTypeList('tournament')
                                  .title('All Tournaments')
                                  .filter('_type == "tournament"')
                              ),
                            S.listItem()
                              .title('Major Championships')
                              .child(
                                S.documentTypeList('tournament')
                                  .title('Major Championships')
                                  .filter('_type == "tournament" && isMajor == true')
                              ),
                            S.listItem()
                              .title('By Tour')
                              .child(
                                S.list()
                                  .title('Tournaments by Tour')
                                  .items([
                                    S.listItem()
                                      .title('LPGA Tour')
                                      .child(
                                        S.documentTypeList('tournament')
                                          .title('LPGA Tournaments')
                                          .filter('_type == "tournament" && tour == "lpga"')
                                      ),
                                    S.listItem()
                                      .title('PGA Tour')
                                      .child(
                                        S.documentTypeList('tournament')
                                          .title('PGA Tournaments')
                                          .filter('_type == "tournament" && tour == "pga"')
                                      ),
                                  ])
                              ),
                          ])
                      ),
                  ])
              ),

            S.divider(),

            // TAXONOMY SECTION
            S.listItem()
              .title('🏷️ Tags & Taxonomy')
              .child(
                S.documentTypeList('tag')
                  .title('Tags')
                  .filter('_type == "tag"')
              ),
          ])
    }),
    
    // Media plugin with configuration
    media({
      creditLine: {
        enabled: true,
      },
      maximumUploadSize: 10000000, // 10MB limit
    }),
    
    visionTool(),
  ],

  schema,
})