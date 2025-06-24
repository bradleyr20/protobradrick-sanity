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

            // VIDEO CONTENT SECTION
            S.listItem()
              .title('🎥 Video Content')
              .child(
                S.list()
                  .title('Video Content')
                  .items([
                    // External Videos (Brightcove, YouTube, etc.)
                    S.listItem()
                      .title('External Videos')
                      .child(
                        S.list()
                          .title('External Videos')
                          .items([
                            S.listItem()
                              .title('All External Videos')
                              .child(
                                S.documentTypeList('externalVideo')
                                  .title('All External Videos')
                                  .filter('_type == "externalVideo"')
                              ),
                            S.listItem()
                              .title('Published Videos')
                              .child(
                                S.documentTypeList('externalVideo')
                                  .title('Published Videos')
                                  .filter('_type == "externalVideo" && status == "published"')
                              ),
                            S.listItem()
                              .title('Draft Videos')
                              .child(
                                S.documentTypeList('externalVideo')
                                  .title('Draft Videos')
                                  .filter('_type == "externalVideo" && status == "draft"')
                              ),
                            S.listItem()
                              .title('By Platform')
                              .child(
                                S.list()
                                  .title('Videos by Platform')
                                  .items([
                                    S.listItem()
                                      .title('Brightcove')
                                      .child(
                                        S.documentTypeList('externalVideo')
                                          .title('Brightcove Videos')
                                          .filter('_type == "externalVideo" && platform == "brightcove"')
                                      ),
                                    S.listItem()
                                      .title('YouTube')
                                      .child(
                                        S.documentTypeList('externalVideo')
                                          .title('YouTube Videos')
                                          .filter('_type == "externalVideo" && platform == "youtube"')
                                      ),
                                    S.listItem()
                                      .title('Vimeo')
                                      .child(
                                        S.documentTypeList('externalVideo')
                                          .title('Vimeo Videos')
                                          .filter('_type == "externalVideo" && platform == "vimeo"')
                                      ),
                                    S.listItem()
                                      .title('Wistia')
                                      .child(
                                        S.documentTypeList('externalVideo')
                                          .title('Wistia Videos')
                                          .filter('_type == "externalVideo" && platform == "wistia"')
                                      ),
                                  ])
                              ),
                            S.listItem()
                              .title('By Category')
                              .child(
                                S.list()
                                  .title('Videos by Category')
                                  .items([
                                    S.listItem()
                                      .title('Tournament Highlights')
                                      .child(
                                        S.documentTypeList('externalVideo')
                                          .title('Tournament Highlights')
                                          .filter('_type == "externalVideo" && category == "tournament-highlights"')
                                      ),
                                    S.listItem()
                                      .title('Player Interviews')
                                      .child(
                                        S.documentTypeList('externalVideo')
                                          .title('Player Interviews')
                                          .filter('_type == "externalVideo" && category == "player-interview"')
                                      ),
                                    S.listItem()
                                      .title('Instruction')
                                      .child(
                                        S.documentTypeList('externalVideo')
                                          .title('Instruction Videos')
                                          .filter('_type == "externalVideo" && category == "instruction"')
                                      ),
                                    S.listItem()
                                      .title('Equipment Reviews')
                                      .child(
                                        S.documentTypeList('externalVideo')
                                          .title('Equipment Reviews')
                                          .filter('_type == "externalVideo" && category == "equipment-review"')
                                      ),
                                    S.listItem()
                                      .title('Course Flyovers')
                                      .child(
                                        S.documentTypeList('externalVideo')
                                          .title('Course Flyovers')
                                          .filter('_type == "externalVideo" && category == "course-flyover"')
                                      ),
                                  ])
                              ),
                          ])
                      ),
                    
                    S.divider(),
                    
                    // Native Video Assets (Self-hosted MP4s)
                    S.listItem()
                      .title('Native Video Assets')
                      .child(
                        S.list()
                          .title('Native Video Assets')
                          .items([
                            S.listItem()
                              .title('All Native Videos')
                              .child(
                                S.documentTypeList('nativeVideoAsset')
                                  .title('All Native Videos')
                                  .filter('_type == "nativeVideoAsset"')
                              ),
                            S.listItem()
                              .title('By Category')
                              .child(
                                S.list()
                                  .title('Native Videos by Category')
                                  .items([
                                    S.listItem()
                                      .title('B-Roll')
                                      .child(
                                        S.documentTypeList('nativeVideoAsset')
                                          .title('B-Roll Videos')
                                          .filter('_type == "nativeVideoAsset" && category == "b-roll"')
                                      ),
                                    S.listItem()
                                      .title('Slow Motion')
                                      .child(
                                        S.documentTypeList('nativeVideoAsset')
                                          .title('Slow Motion Videos')
                                          .filter('_type == "nativeVideoAsset" && category == "slow-motion"')
                                      ),
                                    S.listItem()
                                      .title('Drone Footage')
                                      .child(
                                        S.documentTypeList('nativeVideoAsset')
                                          .title('Drone Footage')
                                          .filter('_type == "nativeVideoAsset" && category == "drone"')
                                      ),
                                    S.listItem()
                                      .title('Animation/Graphics')
                                      .child(
                                        S.documentTypeList('nativeVideoAsset')
                                          .title('Animation/Graphics')
                                          .filter('_type == "nativeVideoAsset" && category == "animation"')
                                      ),
                                    S.listItem()
                                      .title('Short Clips')
                                      .child(
                                        S.documentTypeList('nativeVideoAsset')
                                          .title('Short Clips')
                                          .filter('_type == "nativeVideoAsset" && category == "short-clip"')
                                      ),
                                  ])
                              ),
                            S.listItem()
                              .title('Recent Uploads')
                              .child(
                                S.documentTypeList('nativeVideoAsset')
                                  .title('Recent Video Uploads')
                                  .filter('_type == "nativeVideoAsset"')
                                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
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