import { ParsedUrlQuery } from "querystring"

export const getDocumentIdFromUrlQuery = (query: ParsedUrlQuery): string | undefined => {
  if (!query.registrace) {
    return undefined
  }

  if (Array.isArray(query.registrace)) {
    return query.registrace[0]
  }

  return query.registrace
}
