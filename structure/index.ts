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
      map((id) => {
        if (!id) return homeSettings // if no homepage has been set, show the home settings singleton
        return S.document() // otherwise, show the actual homepage
          .schemaType('page')
          .documentId(id)
      }),
    )

  const home = S.listItem().title('Home').icon(HomeIcon).child(getHomepage)

  const getFilteredPages = () =>
    getHomepageObservable(context.documentStore).pipe(
      map((id) => {
        return S.documentTypeList('page')
          .filter(
            `_type == "page" && ($id == null || _id != $id && !(_id in path("drafts." + $id)))`,
          )
          .params({
            id,
          })
          .apiVersion('v2025-03-03')
          .title('Pages')
      }),
    )

  const pages = S.listItem().title('Pages').icon(PageIcon).child(getFilteredPages)

  const settings = S.listItem()
    .title('Settings')
    .icon(SettingsIcon)
    .child(S.list().title('Settings').items([homeSettingsListItem]))

  return S.list()
    .id('root')
    .title('Content')
    .items([home, S.divider(), pages, S.divider(), settings])
}
