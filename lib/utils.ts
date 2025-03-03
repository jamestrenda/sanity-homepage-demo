import {firstValueFrom, Observable} from 'rxjs'
import {type DocumentStore} from 'sanity'
import homeSettings from '../schemaTypes/homeSettings'

/**
 * Fetches the homepage ID by resolving the observable.
 */
export async function getHomepageId(documentStore: DocumentStore) {
  return firstValueFrom(
    listenToQuery<string>(documentStore, `*[_id == "${homeSettings.name}"][0].homepage._ref`),
  )
}

/**
 * Returns an observable for a given Sanity query.
 */
export function listenToQuery<T>(
  documentStore: DocumentStore,
  query: string,
  params: Record<string, any> = {},
): Observable<T> {
  return documentStore.listenQuery(query, params, {}) as Observable<T>
}
