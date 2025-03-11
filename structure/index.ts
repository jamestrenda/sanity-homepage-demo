import {map} from 'rxjs'
import type {StructureResolver} from 'sanity/structure'
import {icon as HomeIcon} from '../schemaTypes/homeSettings'
import {icon as PageIcon} from '../schemaTypes/page'
import {SettingsIcon} from 'lucide-react'
import {getHomepageObservable} from '../lib/utils'

export const structure: StructureResolver = async (S, context) => {
  const homeSettings = S.defaultDocument({
    schemaType: 'homeSettings',
    documentId: 'homeSettings',
  }).title('Home Settings')

  const homeSettingsListItem = S.listItem()
    .title('Home')
    .id('home')
    .icon(HomeIcon)
    .child(homeSettings)

  const getHomepage = () =>
    getHomepageObservable(context.documentStore).pipe(
      map(
        (id) =>
          id
            ? S.document().schemaType('page').documentId(id) // Show the actual homepage
            : homeSettings, // Show home settings if no homepage is set
      ),
    )

  const home = S.listItem().title('Home').icon(HomeIcon).child(getHomepage)

  const getFilteredPages = () =>
    getHomepageObservable(context.documentStore).pipe(
      map((id) =>
        S.documentTypeList('page')
          .filter(
            `_type == "page" && ($id == null || _id != $id && !(_id in path("drafts." + $id)))`,
          )
          .params({id})
          .apiVersion('v2025-03-03')
          .title('Pages'),
      ),
    )

  const pages = S.listItem().title('Pages').icon(PageIcon).child(getFilteredPages)

  const settings = S.listItem()
    .title('Settings')
    .icon(SettingsIcon)
    .child(S.list().title('Settings').items([homeSettingsListItem]))

  return getHomepageObservable(context.documentStore).pipe(
    map((homepageId) => {
      const items = [pages, S.divider(), settings]

      if (homepageId) {
        items.unshift(home, S.divider())
      }

      return S.list().id('root').title('Content').items(items)
    }),
  )
}
