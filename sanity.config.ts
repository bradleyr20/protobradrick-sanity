// File: sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schema} from './schemaTypes'

// Import icons from @sanity/icons for UI consistency
import {
  DocumentTextIcon,
  ImagesIcon,
  EditIcon,
  TagIcon,
  ImageIcon,
  PlayIcon,
  UserIcon,
  CalendarIcon,
  StarIcon,
  PublishIcon,
  UnpublishIcon,
  ArchiveIcon,
  FolderIcon,
  SearchIcon,
  ClockIcon
} from '@sanity/icons'

// Import golf-specific icons from react-icons
import { FaTrophy, FaFlag, FaGolfBallTee } from 'react-icons/fa6'
import { GiGolfFlag, GiDiscGolfBag } from 'react-icons/gi'
import { PiGolf } from 'react-icons/pi'
import { MdSportsGolf } from 'react-icons/md'

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
              .icon(DocumentTextIcon)
              .child(
                S.list()
                  .title('Articles')
                  .items([
                    S.listItem()
                      .title('All Articles')
                      .icon(FolderIcon)
                      .child(
                        S.documentTypeList('article')
                          .title('All Articles')
                          .filter('_type == "article"')
                      ),
                    S.listItem()
                      .title('Published Articles')
                      .icon(PublishIcon)
                      .child(
                        S.documentTypeList('article')
                          .title('Published Articles')
                          .filter('_type == "article" && status == "published"')
                      ),
                    S.listItem()
                      .title('Draft Articles')
                      .icon(UnpublishIcon)
                      .child(
                        S.documentTypeList('article')
                          .title('Draft Articles')
                          .filter('_type == "article" && status == "draft"')
                      ),
                    S.listItem()
                      .title('Featured Articles')
                      .icon(StarIcon)
                      .child(
                        S.documentTypeList('article')
                          .title('Featured Articles')
                          .filter('_type == "article" && featured == true')
                      ),
                    S.listItem()
                      .title('Archived Articles')
                      .icon(ArchiveIcon)
                      .child(
                        S.documentTypeList('article')
                          .title('Archived Articles')
                          .filter('_type == "article" && status == "archived"')
                      ),
                  ])
              ),

            S.divider(),

            // MEDIA LIBRARY SECTION
            S.listItem()
              .title('Media Library')
              .icon(ImagesIcon)
              .child(
                S.list()
                  .title('Media Library')
                  .items([
                    // Image Assets
                    S.listItem()
                      .title('Image Assets')
                      .icon(ImageIcon)
                      .child(
                        S.list()
                          .title('Image Assets')
                          .items([
                            S.listItem()
                              .title('All Image Assets')
                              .icon(FolderIcon)
                              .child(
                                S.documentTypeList('imageAsset')
                                  .title('All Image Assets')
                                  .filter('_type == "imageAsset"')
                              ),
                            S.listItem()
                              .title('By Category')
                              .icon(TagIcon)
                              .child(
                                S.list()
                                  .title('Images by Category')
                                  .items([
                                    S.listItem()
                                      .title('Tournament Action')
                                      .icon(FaTrophy)
                                      .child(
                                        S.documentTypeList('imageAsset')
                                          .title('Tournament Action')
                                          .filter('_type == "imageAsset" && category == "tournament-action"')
                                      ),
                                    S.listItem()
                                      .title('Player Portraits')
                                      .icon(UserIcon)
                                      .child(
                                        S.documentTypeList('imageAsset')
                                          .title('Player Portraits')
                                          .filter('_type == "imageAsset" && category == "player-portrait"')
                                      ),
                                    S.listItem()
                                      .title('Course/Venue')
                                      .icon(GiGolfFlag)
                                      .child(
                                        S.documentTypeList('imageAsset')
                                          .title('Course/Venue')
                                          .filter('_type == "imageAsset" && category == "course-venue"')
                                      ),
                                    S.listItem()
                                      .title('Equipment')
                                      .icon(GiDiscGolfBag)  // Golf bag icon - perfect for equipment!
                                      .child(
                                        S.documentTypeList('imageAsset')
                                          .title('Equipment')
                                          .filter('_type == "imageAsset" && category == "equipment"')
                                      ),
                                  ])
                              ),
                            S.listItem()
                              .title('Recent Uploads')
                              .icon(ClockIcon)
                              .child(
                                S.documentTypeList('imageAsset')
                                  .title('Recent Uploads')
                                  .filter('_type == "imageAsset"')
                                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
                              ),
                            S.listItem()
                              .title('Needs Credit')
                              .icon(SearchIcon)
                              .child(
                                S.documentTypeList('imageAsset')
                                  .title('Images Missing Credit')
                                  .filter('_type == "imageAsset" && !defined(credit)')
                              ),
                          ])
                      ),
                    
                    S.divider(),
                    
                    // Video Assets
                    S.listItem()
                      .title('Video Assets')
                      .icon(PlayIcon)
                      .child(
                        S.list()
                          .title('Video Assets')
                          .items([
                            S.listItem()
                              .title('All Videos')
                              .icon(FolderIcon)
                              .child(
                                S.documentTypeList('nativeVideoAsset')
                                  .title('All Videos')
                                  .filter('_type == "nativeVideoAsset"')
                              ),
                            S.listItem()
                              .title('By Aspect Ratio')
                              .icon(TagIcon)
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
                              .icon(SearchIcon)
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
              .title('Players')
              .icon(PiGolf)  // Golf ball on tee - works well for players
              .child(
                S.list()
                  .title('Players')
                  .items([
                    S.listItem()
                      .title('All Players')
                      .icon(FolderIcon)
                      .child(
                        S.documentTypeList('player')
                          .title('All Players')
                          .filter('_type == "player"')
                      ),
                    S.listItem()
                      .title('By Tour')
                      .icon(TagIcon)
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
              .title('Tournaments')
              .icon(FaTrophy)
              .child(
                S.list()
                  .title('Tournaments')
                  .items([
                    S.listItem()
                      .title('All Tournaments')
                      .icon(FolderIcon)
                      .child(
                        S.documentTypeList('tournament')
                          .title('All Tournaments')
                          .filter('_type == "tournament"')
                      ),
                    S.listItem()
                      .title('Major Championships')
                      .icon(StarIcon)
                      .child(
                        S.documentTypeList('tournament')
                          .title('Major Championships')
                          .filter('_type == "tournament" && isMajor == true')
                      ),
                    S.listItem()
                      .title('By Tour')
                      .icon(TagIcon)
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
                    S.listItem()
                      .title('Current Year')
                      .icon(CalendarIcon)
                      .child(
                        S.documentTypeList('tournament')
                          .title('2025 Tournaments')
                          .filter('_type == "tournament" && year == 2025')
                      ),
                  ])
              ),

            S.divider(),

            // AUTHORS
            S.listItem()
              .title('Authors')
              .icon(EditIcon)
              .child(
                S.documentTypeList('author')
                  .title('Authors')
                  .filter('_type == "author"')
              ),

            S.divider(),

            // TAXONOMY SECTION
            S.listItem()
              .title('Tags & Taxonomy')
              .icon(TagIcon)
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