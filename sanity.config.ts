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
                    // The Media Browser from the plugin is accessed via the plugin itself
                    // It doesn't need to be manually added to the structure
                    
                    // Detailed Image Asset Management
                    S.listItem()
                      .title('Image Assets')
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
                                  ])
                              ),
                          ])
                      ),
                    
                    S.divider(),
                    
                    // Video Assets
                    S.listItem()
                      .title('Video Assets')
                      .child(
                        S.list()
                          .title('Video Assets')
                          .items([
                            S.listItem()
                              .title('All Videos')
                              .child(
                                S.documentTypeList('nativeVideoAsset')
                                  .title('All Videos')
                                  .filter('_type == "nativeVideoAsset"')
                              ),
                            S.listItem()
                              .title('By Aspect Ratio')
                              .child(
                                S.list()
                                  .title('Videos by Aspect Ratio')
                                  .items([
                                    S.listItem()
                                      .title('16:9 (Landscape)')
                                      .child(
                                        S.documentTypeList('nativeVideoAsset')
                                          .title('16:9 Videos')
                                          .filter('_type == "nativeVideoAsset" && aspectRatio == "16:9"')
                                      ),
                                    S.listItem()
                                      .title('9:16 (Vertical)')
                                      .child(
                                        S.documentTypeList('nativeVideoAsset')
                                          .title('9:16 Vertical Videos')
                                          .filter('_type == "nativeVideoAsset" && aspectRatio == "9:16"')
                                      ),
                                    S.listItem()
                                      .title('1:1 (Square)')
                                      .child(
                                        S.documentTypeList('nativeVideoAsset')
                                          .title('1:1 Square Videos')
                                          .filter('_type == "nativeVideoAsset" && aspectRatio == "1:1"')
                                      ),
                                  ])
                              ),
                            S.listItem()
                              .title('Needs Credit')
                              .child(
                                S.documentTypeList('nativeVideoAsset')
                                  .title('Videos Missing Credit')
                                  .filter('_type == "nativeVideoAsset" && !defined(credit)')
                              ),
                          ])
                      ),
                  ])
              ),

            S.divider(),

            // PLAYERS SECTION
            S.listItem()
              .title('⛳ Players')
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
                      .title('By Tour')
                      .child(
                        S.list()
                          .title('Players by Tour')
                          .items([
                            S.listItem()
                              .title('LPGA Tour')
                              .child(
                                S.documentTypeList('player')
                                  .title('LPGA Players')
                                  .filter('_type == "player" && tour == "lpga"')
                              ),
                            S.listItem()
                              .title('PGA Tour')
                              .child(
                                S.documentTypeList('player')
                                  .title('PGA Players')
                                  .filter('_type == "player" && tour == "pga"')
                              ),
                          ])
                      ),
                  ])
              ),

            S.divider(),

            // TOURNAMENTS SECTION
            S.listItem()
              .title('🏆 Tournaments')
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

            S.divider(),

            // AUTHORS
            S.listItem()
              .title('✍️ Authors')
              .child(
                S.documentTypeList('author')
                  .title('Authors')
                  .filter('_type == "author"')
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
    // This plugin adds its own route for the media browser at /media
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