import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, SINGLETONS} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Homepage Demo',
  projectId: 'rdso6er5',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
      // singleton approach...
      // structure: (S) => {
      //   return S.list()
      //     .title('Content')
      //     .items([
      //       S.listItem()
      //         .title('Home')
      //         .child(
      //           S.defaultDocument({
      //             schemaType: 'home',
      //             documentId: 'home',
      //           }),
      //         ),
      //     ])
      // },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      const filteredActions = SINGLETONS.includes(context.schemaType as (typeof SINGLETONS)[number])
        ? prev.filter(
            ({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action),
          )
        : prev

      return filteredActions
    },
  },
})
