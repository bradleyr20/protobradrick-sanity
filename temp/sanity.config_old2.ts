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
              .title('Articles')
              .icon(() => '📄')
              .child(
                S.list()
                  .title('Articles')
                  .items([
                    S.listItem()
                      .title('All Articles')
                      .child(
                        S.documentTypeList('article')
                          .title('All Articles')
                      ),
                    S.listItem()
                      .title('Published Articles')
                      .child(
                        S.documentTypeList('article')
                          .title('Published Articles')
                          .filter('_type == "article" && status == "published"')
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

            // VIDEO CONTENT SECTION
            S.listItem()
              .title('Video Content')
              .icon(() => '🎬')
              .child(
                S.list()
                  .title('Video Content')
                  .items([
                    S.listItem()
                      .title('External Videos')
                      .child(
                        S.documentTypeList('externalVideo').title('External Videos')
                      ),
                    S.listItem()
                      .title('Native Video Assets')
                      .child(
                        S.documentTypeList('nativeVideoAsset').title('Native Video Assets')
                      ),
                  ])
              ),

            S.divider(),

            // PEOPLE & ENTITIES SECTION
            S.listItem()
              .title('People & Entities')
              .icon(() => '👥')
              .child(
                S.list()
                  .title('People & Entities')
                  .items([
                    S.listItem()
                      .title('Authors')
                      .child(
                        S.documentTypeList('author').title('Authors')
                      ),
                    S.listItem()
                      .title('Players')
                      .child(
                        S.documentTypeList('player').title('Players')
                      ),
                    S.listItem()
                      .title('Tournaments')
                      .child(
                        S.documentTypeList('tournament').title('Tournaments')
                      ),
                  ])
              ),

            S.divider(),

            // TAXONOMY SECTION
            S.listItem()
              .title('Tags')
              .icon(() => '🏷️')
              .child(
                S.documentTypeList('tag').title('Tags')
              ),
          ]),
    }),
    
    // Media plugin will add a "Media" tool to the main navigation
    media(),
    
    visionTool(),
  ],

  schema,
})