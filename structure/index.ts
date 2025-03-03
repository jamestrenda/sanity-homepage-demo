import {firstValueFrom, Observable, map} from 'rxjs'
import type {StructureResolver} from 'sanity/structure'
import {icon as HomeIcon} from '../schemaTypes/homeSettings'
import {icon as PageIcon} from '../schemaTypes/page'
import {SettingsIcon} from 'lucide-react'

export const structure: StructureResolver = async (S, context) => {
  const chooseHomepage = S.defaultDocument({
    schemaType: 'homeSettings',
    documentId: 'homeSettings',
  }).title('Home Settings')

  const homeSettings = S.listItem().title('Home').id('home').icon(HomeIcon).child(chooseHomepage)

  async function getHomepageId() {
    const homepageId = await firstValueFrom(
      context.documentStore.listenQuery(
        `*[_id == "homeSettings"][0].homepage._ref`,
        {},
        {},
      ) as Observable<string>,
    )

    return homepageId
  }

  const homepageId = await getHomepageId()

  const home = S.listItem()
    .title('Home')
    .icon(HomeIcon)
    .child(() =>
      context.documentStore.listenQuery(`*[_id == "homeSettings"][0].homepage._ref`, {}, {}).pipe(
        map((id) => {
          if (!id) return chooseHomepage // if no homepage has been set, show the home settings singleton
          return S.document() // otherwise, show the actual homepage
            .schemaType('page')
            .documentId(id)
        }),
      ),
    )

  const pages = S.listItem()
    .title('Pages')
    .icon(PageIcon)
    .child(
      S.documentTypeList('page')
        .filter(`_type == "page" && ($id == null || _id != $id && !(_id in path("drafts." + $id)))`)
        .params({id: homepageId})
        .apiVersion('v2025-03-03')
        .title('Pages'),
    )

  const settings = S.listItem()
    .title('Settings')
    .icon(SettingsIcon)
    .child(S.list().title('Settings').items([homeSettings]))

  return S.list()
    .id('root')
    .title('Content')
    .items([home, S.divider(), pages, S.divider(), settings])
}
