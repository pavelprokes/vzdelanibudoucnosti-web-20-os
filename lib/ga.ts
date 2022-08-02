import ReactGA from "react-ga"
import { default as ReactGA4 } from "react-ga4"

const dev = process.env.NODE_ENV !== "production"

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => {
  if (!process.browser) {
    return
  }

  if (!dev) {
    ReactGA.pageview(url)
    ReactGA4.send({ hitType: "pageview", page: url })
  }
}

export interface GaEvent {
  category: string
  action: string
  label?: string
  value?: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GaEvent) => {
  if (!process.browser) {
    return
  }

  if (!dev) {
    ReactGA.event({
      action,
      category,
      label,
      value
    })
    ReactGA4.event({
      action,
      category,
      label,
      value
    })
  }
}

export interface GaPurchaseEvent {
  affiliation: "Website"
  currency: "CZK"
  items: GaPurchaseEventItem[]
  transaction_id: string
  shipping?: number
  value: number
  tax?: number
}

export interface GaPurchaseEventItem {
  item_id: string
  item_name: string
  coupon?: string
  discount?: 0
  affiliation: string
  item_brand: string
  item_category: string
  item_variant: string
  price: number
  currency: "CZK"
  quantity: 1
}

export const purchaseEvent = (purchaseEvent: GaPurchaseEvent) => {
  if (!process.browser) {
    return
  }

  if (!dev) {
    ReactGA.plugin.execute("ec", "setAction", "purchase", purchaseEvent)
  }
}

export interface GaViewEvent {
  currency: "CZK"
  items: GaPurchaseEventItem[]
  value: number
}

export const viewItemEvent = (viewEvent: GaViewEvent) => {
  if (!process.browser) {
    return
  }

  if (!dev) {
    ReactGA.plugin.execute("ec", "setAction", "view_item", viewEvent)
  }
}

export interface GaShareEvent {
  method: string
  content_type: string
  content_id: string
}

export const shareEvent = (shareEvent: GaShareEvent) => {
  if (!process.browser) {
    return
  }

  if (!dev) {
    ReactGA.plugin.execute("ec", "setAction", "share", shareEvent)
  }
}
